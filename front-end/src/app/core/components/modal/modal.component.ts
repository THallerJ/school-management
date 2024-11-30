import { ModalService } from "./../../services/modal-service.service";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-modal",
	standalone: true,
	imports: [],
	templateUrl: "./modal.component.html",
	styleUrl: "./modal.component.css",
})
export class ModalComponent implements OnInit {
	isOpen?: boolean;
	constructor(private modalService: ModalService) {}

	close() {
		this.modalService.closeModal();
	}

	ngOnInit() {
		this.modalService.observeState().subscribe((isOpen) => {
			this.isOpen = isOpen;
		});
	}
}
