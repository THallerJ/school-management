import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Item } from "../../types";
@Component({
	selector: "app-list-item",
	standalone: true,
	imports: [],
	templateUrl: "./list-item.component.html",
	styleUrl: "./list-item.component.css",
})
export class ListItemComponent implements OnInit {
	@Input() item!: Item;
	@Output() clickEvent = new EventEmitter();
	width!: string;

	ngOnInit() {
		this.width = `${100 / this.item.properties.length}%`;
	}

	onClick() {
		this.clickEvent.emit();
	}
}
