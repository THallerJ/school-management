import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-list-item",
	standalone: true,
	imports: [],
	templateUrl: "./list-item.component.html",
	styleUrl: "./list-item.component.css",
})
export class ListItemComponent implements OnInit {
	@Input() items!: string[];
	width!: string;

	ngOnInit() {
		this.width = `${100 / this.items.length}%`;
	}
}
