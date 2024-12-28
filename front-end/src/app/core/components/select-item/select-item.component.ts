import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ItemNoPaging, ItemsNoPagingRespSchema } from '../../types';
import { SelectLabelComponent } from './../select-label/select-label.component';
import { ItemsNoPagingPipe } from './items-no-paging.pipe';

@Component({
    selector: 'app-select-item',
    standalone: true,
    imports: [SelectLabelComponent, ItemsNoPagingPipe],
    templateUrl: './select-item.component.html',
    styleUrl: './select-item.component.css',
})
export class SelectItemComponent implements OnInit {
    @Input({ required: true }) path!: string;
    @Input({ required: true }) message!: string;
    @Input({ required: true }) name!: string;
    @Input({ required: true }) group!: FormGroup;
    @Input({ required: true }) label!: string;
    @Output() loadingEvent = new EventEmitter<boolean>();

    loading = true;
    items?: ItemNoPaging[];

    constructor(private apiService: ApiService) {}

    getItems() {
        const params = { params: { disablePaging: true } };

        this.apiService.get(this.path, params).subscribe({
            next: data => {
                const result = ItemsNoPagingRespSchema.safeParse(data);
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
