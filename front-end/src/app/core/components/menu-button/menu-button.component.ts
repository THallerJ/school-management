import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-menu-button',
    standalone: true,
    imports: [],
    templateUrl: './menu-button.component.html',
    styleUrl: './menu-button.component.css',
})
export class MenuButtonComponent {
    @Input({ required: true }) toggled!: boolean;
    @Output() clickEvent = new EventEmitter();

    toggleMenuButton() {
        this.toggled = !this.toggled;
        this.clickEvent.emit();
    }
}
