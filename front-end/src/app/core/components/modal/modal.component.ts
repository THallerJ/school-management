import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
    constructor(private modalService: ModalService) {}
    isOpen$!: Observable<boolean>;

    close() {
        this.modalService.closeModal();
    }

    ngOnInit() {
        this.isOpen$ = this.modalService.getIsOpen();
    }
}
