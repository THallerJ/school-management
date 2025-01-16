import {
    ApplicationRef,
    Component,
    NgZone,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { z } from 'zod';
import { filter, Subscription, take } from 'rxjs';

@Component({
    selector: 'app-abstract-items-list',
    standalone: true,
    imports: [],
    templateUrl: './abstract-items-list.component.html',
    styleUrl: './abstract-items-list.component.css',
})
export abstract class AbstractItemsListComponent<T>
    implements OnInit, OnDestroy
{
    protected abstract PATH: string;
    protected abstract SCHEMA: z.ZodSchema<T[]>;
    protected abstract CREATE_ITEM_PATH: string;

    protected page = 1;
    protected readonly PAGE_SIZE = 20;
    protected loading = true;
    items?: T[];

    private stableSub!: Subscription;

    constructor(
        protected apiService: ApiService,
        protected router: Router,
        private appRef: ApplicationRef,
        private zone: NgZone,
    ) {}

    getItems() {
        const params = { pageNumber: this.page, pageSize: this.PAGE_SIZE };

        this.zone.run(() => {
            this.apiService.get(this.PATH, { params }).subscribe({
                next: data => {
                    const result = this.SCHEMA.safeParse(data);
                    if (result.success) {
                        if (this.page === 1) {
                            this.items = result.data;
                        } else if (result.data.length > 0 && this.items) {
                            this.items = [...this.items, ...result.data];
                        }

                        this.page = this.page + 1;
                    }

                    this.loading = false;
                },
                error: error => {
                    this.loading = false;

                    if (error.status === 0) {
                        return;
                    }
                },
            });
        });
    }

    createItem() {
        this.router.navigate([this.CREATE_ITEM_PATH]);
    }

    viewItem(id: number) {
        this.router.navigate([`/${this.PATH}/${id}`]);
    }

    ngOnInit(): void {
        this.stableSub = this.appRef.isStable
            .pipe(
                filter(stable => stable),
                take(1),
            )
            .subscribe(() => {
                this.getItems();
            });
    }

    ngOnDestroy(): void {
        this.stableSub.unsubscribe();
    }
}
