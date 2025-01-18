import {
    Component,
    Input,
    OnInit,
    ApplicationRef,
    ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ItemNoPaging, ItemsNoPagingRespSchema } from '../../types';
import { SelectLabelComponent } from './../select-label/select-label.component';
import { ItemsNoPagingPipe } from './items-no-paging.pipe';
import { filter, take, map, catchError, switchMap, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-select-item',
    standalone: true,
    imports: [SelectLabelComponent, ItemsNoPagingPipe, AsyncPipe, NgIf],
    templateUrl: './select-item.component.html',
    styleUrl: './select-item.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectItemComponent implements OnInit {
    @Input({ required: true }) path!: string;
    @Input({ required: true }) message!: string;
    @Input({ required: true }) name!: string;
    @Input({ required: true }) group!: FormGroup;
    @Input({ required: true }) label!: string;

    loading = true;
    items$?: Observable<ItemNoPaging[]>;

    constructor(
        private apiService: ApiService,
        private appRef: ApplicationRef,
    ) {}

    getItems() {
        this.loading = true;
        const params = { params: { disablePaging: true } };

        return this.apiService.get(this.path, params).pipe(
            map(data => {
                const result = ItemsNoPagingRespSchema.safeParse(data);
                this.loading = false;
                return result.success ? result.data : [];
            }),
            catchError(() => {
                this.loading = false;
                return [];
            }),
        );
    }

    ngOnInit() {
        this.items$ = this.appRef.isStable.pipe(
            filter(stable => stable),
            take(1),
            switchMap(() => this.getItems()),
        );
    }
}
