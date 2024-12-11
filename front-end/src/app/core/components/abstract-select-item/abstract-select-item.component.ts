import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api-service.service';
import { z } from 'zod';

@Component({
    selector: 'app-abstract-select-item',
    standalone: true,
    imports: [],
    templateUrl: './abstract-select-item.component.html',
    styleUrl: './abstract-select-item.component.css',
})
export abstract class AbstractSelectItemComponent<T> implements OnInit {
    protected abstract PATH: string;
    protected abstract SCHEMA: z.ZodSchema<T[]>;

    protected loading = true;
    protected items?: T[];

    @Input() name!: string;
    @Input() group!: FormGroup;
    @Output() loadingEvent = new EventEmitter<boolean>();

    constructor(private apiService: ApiService) {}

    getItems() {
        const params = { params: { disablePaging: true } };

        this.apiService.get(this.PATH, params).subscribe({
            next: data => {
                const result = this.SCHEMA.safeParse(data);
                if (result.success) {
                    this.items = result.data;
                }

                this.loading = false;
                this.loadingEvent.emit(this.loading);
            },
            error: error => {
                this.loading = false;
                this.loadingEvent.emit(this.loading);

                if (error.status === 0) {
                    return;
                }
            },
        });
    }

    ngOnInit() {
        this.getItems();
    }
}
