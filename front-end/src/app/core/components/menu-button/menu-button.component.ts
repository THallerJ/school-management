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
    hovering = false;

    toggleMenuButton() {
        this.toggled = !this.toggled;
        this.clickEvent.emit();
    }

    onMouseEnter() {
        this.hovering = true;
    }

    onMouseLeave() {
        this.hovering = false;
    }
}
