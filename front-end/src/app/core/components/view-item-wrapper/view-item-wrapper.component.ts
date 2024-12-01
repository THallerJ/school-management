import { ModalService } from "./../../services/modal-service.service";
import { Component, Input } from "@angular/core";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
	selector: "app-view-item-wrapper",
	standalone: true,
	imports: [ConfirmationModalComponent, SpinnerComponent],
	templateUrl: "./view-item-wrapper.component.html",
	styleUrl: "./view-item-wrapper.component.css",
})
export class ViewItemWrapperComponent {
	@Input() loading!: boolean;
	@Input() item!: unknown;
	@Input() onDelete!: () => void;

	constructor(private modalService: ModalService) {}

	openModal() {
		this.modalService.openModal();
	}
}
