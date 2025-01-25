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
    doAnimation = false;

    toggleMenuButton() {
        this.doAnimation = true;
        this.toggled = !this.toggled;
        this.clickEvent.emit();
    }
}
