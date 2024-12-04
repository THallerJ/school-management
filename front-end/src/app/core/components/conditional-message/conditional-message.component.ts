import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-conditional-message',
    standalone: true,
    imports: [],
    templateUrl: './conditional-message.component.html',
    styleUrl: './conditional-message.component.css',
})
export class ConditionalMessageComponent {
    @Input() condition!: boolean;
    @Input() message!: string;
}
