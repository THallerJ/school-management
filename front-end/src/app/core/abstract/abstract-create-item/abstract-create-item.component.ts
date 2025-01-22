import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-abstract-create-item',
    standalone: true,
    imports: [],
    templateUrl: './abstract-create-item.component.html',
    styleUrl: './abstract-create-item.component.css',
})
export abstract class AbstractCreateItemComponent implements OnInit {
    protected abstract PATH: string;
    protected abstract REDIRECT: string;

    protected disableButton = false;
    protected form!: FormGroup;

    constructor(
        protected apiService: ApiService,
        protected router: Router,
    ) {}

    abstract initForm(): void;

    protected createItem() {
        this.disableButton = true;
        const createdSchool = this.form.value;

        this.form?.markAsTouched();

        if (this.form?.valid && createdSchool) {
            this.apiService.post(this.PATH, createdSchool).subscribe(() => {
                this.disableButton = false;
                this.router.navigate([this.REDIRECT]);
            });
        } else {
            this.disableButton = false;
        }
    }

    ngOnInit() {
        this.initForm();
    }
}
