import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { z } from 'zod';
import {
    filter,
    take,
    catchError,
    scan,
    Observable,
    switchMap,
    map,
    BehaviorSubject,
    tap,
} from 'rxjs';

@Component({
    selector: 'app-abstract-items-list',
    standalone: true,
    imports: [],
    templateUrl: './abstract-items-list.component.html',
    styleUrl: './abstract-items-list.component.css',
})
export abstract class AbstractItemsListComponent<T> implements OnInit {
    protected abstract PATH: string;
    protected abstract SCHEMA: z.ZodSchema<T[]>;
    protected abstract CREATE_ITEM_PATH: string;

    private page$ = new BehaviorSubject<number>(1);
    protected readonly PAGE_SIZE = 20;
    protected loading = true;
    items$?: Observable<T[]>;

    constructor(
        protected apiService: ApiService,
        protected router: Router,
        private appRef: ApplicationRef,
    ) {}

    getItems() {
        const params = {
            pageNumber: this.page$.value,
            pageSize: this.PAGE_SIZE,
        };

        return this.apiService.get(this.PATH, { params });
    }

    createItem() {
        this.router.navigate([this.CREATE_ITEM_PATH]);
    }

    viewItem(id: number) {
        this.router.navigate([`/${this.PATH}/${id}`]);
    }

    ngOnInit() {
        this.items$ = this.appRef.isStable.pipe(
            filter(stable => stable),
            take(1),
            switchMap(() => this.page$),
            switchMap(() => this.getItems()),
            map(data => {
                const result = this.SCHEMA.safeParse(data);
                return result.success ? result.data : [];
            }),
            scan((acc, curr) => {
                return [...acc, ...curr];
            }, [] as T[]),
            tap(() => {
                this.loading = false;
            }),
            catchError(() => {
                return [];
            }),
        );
    }

    loadMore() {
        this.page$.next(this.page$.value + 1);
    }
}
