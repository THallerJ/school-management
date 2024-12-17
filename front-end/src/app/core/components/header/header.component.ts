import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MediaQueryService } from '../../services/media-query.service';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, NgTemplateOutlet, MenuButtonComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    isMobile = false;
    private readonly MOBILE_WIDTH = 780;

    constructor(private mediaQueryService: MediaQueryService) {
        this.mediaQueryService.getWidth().subscribe(width => {
            this.isMobile = width < this.MOBILE_WIDTH;
        });
    }

    ngOnInit(): void {
        this.isMobile =
            this.mediaQueryService.getCurrentWidth() < this.MOBILE_WIDTH;
    }

    onClickMenu() {
        console.log('hello world')
    }
}
