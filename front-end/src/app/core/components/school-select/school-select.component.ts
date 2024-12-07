import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import {
    SchoolDtoNoPagingResp,
    SchoolDtoNoPagingRespSchema,
} from './../../types';
import { SelectLabelComponent } from '../select-label/select-label.component';
import { FormGroup } from '@angular/forms';
import { SchoolDtoNoPagingPipe } from './school-dto-no-paging.pipe';

@Component({
    selector: 'app-school-select',
    standalone: true,
    imports: [SelectLabelComponent, SchoolDtoNoPagingPipe],
    templateUrl: './school-select.component.html',
    styleUrl: './school-select.component.css',
})
export class SchoolSelectComponent implements OnInit {
    @Input() name!: string;
    @Input() type!: string;
    @Input() group!: FormGroup;
    @Input() value?: string;
    @Output() loadingEvent = new EventEmitter<boolean>();
    schools?: SchoolDtoNoPagingResp;
    loading = true;

    constructor(private apiService: ApiService) {}

    getSchools() {
        const params = { params: { disablePaging: true } };

        this.apiService.get('school', params).subscribe({
            next: data => {
                const result = SchoolDtoNoPagingRespSchema.safeParse(data);
                if (result.success) {
                    this.schools = result.data;
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
        this.getSchools();
    }
}
