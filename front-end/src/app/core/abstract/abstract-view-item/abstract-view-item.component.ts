import { Component, OnInit, ApplicationRef, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ModalService } from '../../services/modal.service';
import { z } from 'zod';
import {
    filter,
    map,
    Subscription,
    take,
    tap,
    of,
    catchError,
    switchMap,
} from 'rxjs';

@Component({
    selector: 'app-abstract-view-item',
    standalone: true,
    imports: [],
    templateUrl: './abstract-view-item.component.html',
    styleUrl: './abstract-view-item.component.css',
})
export abstract class AbstractViewItemComponent<T>
    implements OnInit, OnDestroy
{
    protected abstract SCHEMA: z.ZodSchema<T>;
    protected abstract PATH: string;
    protected abstract REDIRECT: string;
    protected abstract VIEW_REDIRECT: string;

    protected REGISTRATIONS_PATH = 'registrations';

    protected id?: number;
    protected loading = true;
    protected form!: FormGroup;
    protected item?: T;
    protected isFetchError = false;
    protected isDeleteError = false;
    protected updatedFlag = false;

    private stableSub!: Subscription;

    constructor(
        protected route: ActivatedRoute,
        protected apiService: ApiService,
        protected router: Router,
        protected modalService: ModalService,
        protected appRef: ApplicationRef,
    ) {}

    abstract patchForm(): void;

    abstract initForm(): FormGroup;

    getItem(id: number) {
        this.isFetchError = false;
        return this.apiService.get(this.PATH, { id });
    }

    getCurrItem() {
        if (this.id)
            return this.getItem(this.id).pipe(
                map(data => {
                    const result = this.SCHEMA.safeParse(data);
                    return result.success ? result.data : null;
                }),
                tap(item => {
                    if (item) this.item = item;
                    this.loading = false;
                    this.patchForm();
                }),
                catchError(() => {
                    this.isFetchError = true;
                    return of(undefined);
                }),
            );
        else return of(undefined);
    }

    onDelete = () => {
        if (this.id) {
            this.isDeleteError = false;

            this.apiService.delete(this.PATH, { id: this.id }).subscribe({
                next: () => {
                    this.router.navigate([this.REDIRECT]);
                },
                error: () => {
                    this.isDeleteError = true;
                },
            });
        }
    };

    updateItem() {
        this.updatedFlag = false;
        const updatedItem = this.form.value;

        this.form.markAsTouched();

        if (this.form.valid && this.id && this.item) {
            this.apiService
                .put(this.PATH, this.id, updatedItem)
                .subscribe(() => {
                    this.updatedFlag = true;
                });
        }
    }

    viewItem(id: number) {
        this.router.navigate([`/${this.VIEW_REDIRECT}/${id}`]);
    }

    openModal() {
        this.modalService.openModal();
    }

    private initComponent() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        return this.getCurrItem();
    }

    ngOnInit(): void {
        this.form = this.initForm();

        this.stableSub = this.appRef.isStable
            .pipe(
                filter(stable => stable),
                take(1),
                switchMap(() => this.initComponent()),
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.stableSub.unsubscribe();
    }
}
