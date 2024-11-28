import { ConfirmationModalComponent } from "./core/components/confirmation-modal/confirmation-modal.component";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./core/components/header/header.component";
import { ModalComponent } from "./core/components/modal/modal.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		RouterOutlet,
		HeaderComponent,
		ModalComponent,
		ConfirmationModalComponent,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "front-end";
}
