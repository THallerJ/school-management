import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-item-updated',
    standalone: true,
    imports: [],
    templateUrl: './item-updated.component.html',
    styleUrl: './item-updated.component.css',
})
export class ItemUpdatedComponent {
    @Input() show?: boolean;
}
