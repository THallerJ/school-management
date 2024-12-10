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
export abstract class AbstractCreateItemComponent implements OnInit {
    protected loading = true;
    protected form!: FormGroup;

    constructor(
        protected formBuilder: FormBuilder,
        protected apiService: ApiService,
        protected router: Router,
    ) {}

    abstract initForm(): void;
    abstract createItem(): void;

    protected finishLoading() {
        this.loading = false;
    }

    ngOnInit() {
        this.initForm();
    }
}
