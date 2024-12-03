import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "app-list-item",
	standalone: true,
	imports: [],
	templateUrl: "./list-item.component.html",
	styleUrl: "./list-item.component.css",
})
export class ListItemComponent implements OnInit {
	@Input() items!: string[];
	@Output() clickEvent = new EventEmitter();
	width!: string;

	ngOnInit() {
		this.width = `${100 / this.items.length}%`;
	}

	onClick() {
		this.clickEvent.emit();
	}
}
