import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MediaQueryService {
    private widthSubject = new Subject<number>();
    private width?: number;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        if (isPlatformBrowser(this.platformId)) {
            this.udpateWidth();

            window.addEventListener('resize', () => {
                this.udpateWidth();
            });
        }
    }

    private udpateWidth(): void {
        this.width = window.innerWidth;
        this.widthSubject.next(this.width);
    }

    getCurrentWidth() {
        return this.width ?? -1;
    }

    getWidth(): Observable<number> {
        if (isPlatformBrowser(this.platformId)) {
            return this.widthSubject.asObservable();
        } else {
            return new Observable(observer => {
                observer.next(this.width);
                observer.complete();
            });
        }
    }
}
