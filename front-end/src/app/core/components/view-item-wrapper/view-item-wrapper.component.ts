import { ModalService } from './../../services/modal-service.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ApiContentWrapperComponent } from '../api-content-wrapper/api-content-wrapper.component';

@Component({
    selector: 'app-view-item-wrapper',
    standalone: true,
    imports: [ConfirmationModalComponent, ApiContentWrapperComponent],
    templateUrl: './view-item-wrapper.component.html',
    styleUrl: './view-item-wrapper.component.css',
})
export class ViewItemWrapperComponent {
    @Input() loading!: boolean;
    @Input() item!: unknown;
    @Output() deleteEvent = new EventEmitter();

    constructor(private modalService: ModalService) {}

    openModal() {
        this.modalService.openModal();
    }

    onClickDelete() {
        this.deleteEvent.emit();
    }
}
