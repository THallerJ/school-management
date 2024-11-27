import { Component, Input, Output, EventEmitter } from "@angular/core";
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
	@Input() showModal!: boolean;
	@Output() showModalChange = new EventEmitter<boolean>();

	onClose() {
		this.showModal = false;
		this.showModalChange.emit(this.showModal);
	}

	onOkClick = () => {
		this.onOk();
	};
}
