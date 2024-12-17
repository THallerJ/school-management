import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-menu-button',
    standalone: true,
    imports: [],
    templateUrl: './menu-button.component.html',
    styleUrl: './menu-button.component.css',
})
export class MenuButtonComponent {
    toggled = false;
    @Output() clickEvent = new EventEmitter();

    toggleMenuButton() {
        this.toggled = !this.toggled;
        this.clickEvent.emit();
    }
}
