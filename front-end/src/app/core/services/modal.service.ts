import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private isOpen = false;
    private isOpenSubject: Subject<boolean> = new Subject<boolean>();

    observeState() {
        return this.isOpenSubject.asObservable();
    }

    getIsOpen(): Observable<boolean> {
        return this.isOpenSubject.asObservable();
    }

    openModal(): void {
        this.isOpenSubject.next(true);
    }

    closeModal(): void {
        this.isOpenSubject.next(false);
    }
}
