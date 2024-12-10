import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-abstract-items-list',
    standalone: true,
    imports: [],
    templateUrl: './abstract-items-list.component.html',
    styleUrl: './abstract-items-list.component.css',
})
export abstract class AbstractItemsListComponent implements OnInit {
    protected page = 1;
    protected readonly PAGE_SIZE = 20;
    protected loading = true;

    constructor(
        protected apiService: ApiService,
        protected router: Router,
    ) {}

    abstract getItems(): void;

    abstract createItem(): void;

    abstract viewItem(id: number): void;

    ngOnInit(): void {
        this.getItems();
    }
}
