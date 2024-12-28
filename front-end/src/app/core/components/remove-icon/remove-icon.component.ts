import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-remove-icon',
    standalone: true,
    imports: [],
    templateUrl: './remove-icon.component.svg',
    styleUrl: './remove-icon.component.css',
})
export class RemoveIconComponent {
    @Input() height = 24;
    @Input() width = 24;
}
