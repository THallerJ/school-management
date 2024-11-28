import { ModalService } from "./../../services/modal-service.service";
import { Component, Input } from "@angular/core";
import { ModalComponent } from "../modal/modal.component";

@Component({
	selector: "app-confirmation-modal",
	standalone: true,
	imports: [ModalComponent],
	templateUrl: "./confirmation-modal.component.html",
	styleUrl: "./confirmation-modal.component.css",
})
export class ConfirmationModalComponent {
	@Input() onOk!: () => void;
	constructor(private modalService: ModalService) {}

	onClose() {
		this.modalService.closeModal();
	}

	onClickOk() {
		this.modalService.closeModal();
		this.onOk();
	}
}
