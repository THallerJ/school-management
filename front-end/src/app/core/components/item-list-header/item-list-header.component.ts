import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-item-list-header",
	standalone: true,
	imports: [],
	templateUrl: "./item-list-header.component.html",
	styleUrl: "./item-list-header.component.css",
})
export class ItemListHeaderComponent implements OnInit {
	@Input() columns!: string[];
	width!: string;

	ngOnInit() {
		this.width = `${100 / this.columns.length}%`;
	}
}
