import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-conditional-message',
    standalone: true,
    imports: [],
    templateUrl: './conditional-message.component.html',
    styleUrl: './conditional-message.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionalMessageComponent {
    @Input({ required: true }) condition!: boolean;
    @Input({ required: true }) message!: string;
}
