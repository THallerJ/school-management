import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../types';
@Component({
    selector: 'app-list-item',
    standalone: true,
    imports: [],
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.css',
})
export class ListItemComponent {
    @Input({ required: true }) item!: Item;
    @Output() clickEvent = new EventEmitter();
    @Output() buttonEvent = new EventEmitter();

    onClick() {
        this.clickEvent.emit();
    }

    onButtonClick() {
        this.buttonEvent.emit();
    }
}
