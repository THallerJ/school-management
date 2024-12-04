import { ModalService } from './../../services/modal-service.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-confirmation-modal',
    standalone: true,
    imports: [ModalComponent],
    templateUrl: './confirmation-modal.component.html',
    styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent {
    @Output() okEvent = new EventEmitter();

    constructor(private modalService: ModalService) {}

    onClose() {
        this.modalService.closeModal();
    }

    onClickOk() {
        this.modalService.closeModal();
        this.okEvent.emit();
    }
}
