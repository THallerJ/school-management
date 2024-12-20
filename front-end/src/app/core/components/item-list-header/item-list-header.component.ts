import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-item-list-header',
    standalone: true,
    imports: [],
    templateUrl: './item-list-header.component.html',
    styleUrl: './item-list-header.component.css',
})
export class ItemListHeaderComponent {
    @Input({ required: true }) columns!: string[];
    @Input() hasButton?: boolean;
}
