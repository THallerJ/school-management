import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { ModalService } from '../../services/modal-service.service';

@Component({
    selector: 'app-abstract-view-item',
    standalone: true,
    imports: [],
    templateUrl: './abstract-view-item.component.html',
    styleUrl: './abstract-view-item.component.css',
})
export abstract class AbstractViewItemComponent implements OnInit {
    protected id?: number;
    protected loading = true;
    protected form!: FormGroup;

    constructor(
        protected route: ActivatedRoute,
        protected apiService: ApiService,
        protected router: Router,
        protected modalService: ModalService,
        protected formBuilder: FormBuilder,
    ) {}

    abstract getItem(id: number): void;

    abstract onDelete(): void;

    abstract updateItem(): void;

    abstract patchForm(): void;

    abstract initForm(): void;

    protected initId() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id) this.getItem(this.id);
    }

    protected openModal() {
        this.modalService.openModal();
    }

    ngOnInit() {
        this.initId();
        this.initForm();
    }
}
