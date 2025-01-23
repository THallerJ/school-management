import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private isOpenSubject: Subject<boolean> = new Subject<boolean>();

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
