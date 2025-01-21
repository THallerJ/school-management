import {
    Component,
    Input,
    OnInit,
    ApplicationRef,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ItemNoPaging, ItemsNoPagingRespSchema } from '../../types';
import { SelectLabelComponent } from './../select-label/select-label.component';
import { ItemsNoPagingPipe } from './items-no-paging.pipe';
import { filter, take, map, catchError, switchMap, Observable, of } from 'rxjs';
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
    @Output() loadingEvent = new EventEmitter();

    loading = true;
    items$?: Observable<ItemNoPaging[]>;

    constructor(
        private apiService: ApiService,
        private appRef: ApplicationRef,
    ) {}

    private setLoadingEvent(loading: boolean) {
        this.loading = loading;
        this.loadingEvent.emit(loading);
    }

    getItems() {
        const params = { params: { disablePaging: true } };
        return this.apiService.get(this.path, params);
    }

    ngOnInit() {
        this.items$ = this.appRef.isStable.pipe(
            filter(stable => stable),
            take(1),
            switchMap(() => this.getItems()),
            map(data => {
                const result = ItemsNoPagingRespSchema.safeParse(data);
                this.setLoadingEvent(false);
                return result.success ? result.data : [];
            }),
            catchError(() => {
                this.setLoadingEvent(false);
                return of([]);
            }),
        );
    }
}
