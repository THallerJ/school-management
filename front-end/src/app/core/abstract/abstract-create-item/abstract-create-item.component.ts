import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';

@Component({
    selector: 'app-abstract-create-item',
    standalone: true,
    imports: [],
    templateUrl: './abstract-create-item.component.html',
    styleUrl: './abstract-create-item.component.css',
})
export abstract class AbstractCreateItemComponent<T> implements OnInit {
    protected abstract PATH: string;
    protected abstract REDIRECT: string;

    protected form!: FormGroup;

    constructor(
        protected formBuilder: FormBuilder,
        protected apiService: ApiService,
        protected router: Router,
    ) {}

    abstract initForm(): void;

    abstract getCreatedItem(): T;

    protected createItem() {
        const createdSchool = this.getCreatedItem();

        this.form?.markAsTouched();

        if (this.form?.valid && createdSchool) {
            this.apiService.post<T>(this.PATH, createdSchool).subscribe(() => {
                this.router.navigate([this.REDIRECT]);
            });
        }
    }

    ngOnInit() {
        this.initForm();
    }
}
