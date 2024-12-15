import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { ModalService } from '../../services/modal-service.service';
import { z } from 'zod';

@Component({
    selector: 'app-abstract-view-item',
    standalone: true,
    imports: [],
    templateUrl: './abstract-view-item.component.html',
    styleUrl: './abstract-view-item.component.css',
})
export abstract class AbstractViewItemComponent<T, S> implements OnInit {
    protected abstract SCHEMA: z.ZodSchema<T>;
    protected abstract PATH: string;
    protected abstract REDIRECT: string;

    protected REGISTRATIONS_PATH = 'registrations';

    protected id?: number;
    protected loading = false;
    protected form!: FormGroup;
    protected item?: T;
    protected errorFlag = false;

    constructor(
        protected route: ActivatedRoute,
        protected apiService: ApiService,
        protected router: Router,
        protected modalService: ModalService,
        protected formBuilder: FormBuilder,
    ) {}

    abstract getUpdatedItem(): S;

    abstract patchForm(): void;

    abstract initForm(): void;

    getItem(id: number) {
        this.loading = true;
        this.errorFlag = false;

        this.apiService.get(this.PATH, { id }).subscribe({
            next: data => {
                const result = this.SCHEMA.safeParse(data);
                if (result.success) this.item = result.data;
                this.patchForm();
                this.loading = false;
            },
            error: error => {
                if (error.status === 0) {
                    return;
                } else {
                    this.loading = false;
                    this.errorFlag = true;
                }
            },
        });
    }

    onDelete = () => {
        if (this.id) {
            this.apiService.delete(this.PATH, { id: this.id }).subscribe(() => {
                this.router.navigate([this.REDIRECT]);
            });
        }
    };

    updateItem() {
        const updatedItem = this.getUpdatedItem();

        this.form.markAsTouched();

        if (this.form.valid && this.id && this.item) {
            this.apiService
                .put<S>(this.PATH, this.id, updatedItem)
                .subscribe(() => {
                    this.router.navigate([this.REDIRECT]);
                });
        }
    }

    protected initId() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id) this.getItem(this.id);
    }

    protected openModal() {
        this.modalService.openModal();
    }

    ngOnInit() {
        this.initId();
        this.initForm();
    }
}
