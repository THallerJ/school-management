import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MediaQueryService } from '../../services/media-query.service';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, NgTemplateOutlet],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    isMobile = false;
    private readonly MOBILE_WIDTH = 780;

    constructor(private mediaQueryService: MediaQueryService) {
        this.mediaQueryService.getWidth().subscribe(width => {
            this.isMobile = width < this.MOBILE_WIDTH;
        });
    }
}
