import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
	selector: "app-modal",
	standalone: true,
	imports: [NgIf],
	templateUrl: "./modal.component.html",
	styleUrl: "./modal.component.css",
})
export class ModalComponent {
	@Input() showModal!: boolean;
	@Output() showModalChange = new EventEmitter<boolean>();

	onClose() {
		this.showModal = false;
		this.showModalChange.emit(this.showModal);
	}
}
