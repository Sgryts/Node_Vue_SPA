import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { Validators, FormGroup, FormBuilder, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IEmailForm } from 'src/app/models/email.model';

@Component({
  selector: 'client-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  public SITE_KEY: string = "";
  public contactForm: FormGroup;

  get name() {
    return this.contactForm.get('name') as FormControl
  }

  public validationErrors = new Map([
    ['name', {
      required: 'This field is required---',
      min: 'Min length 2 characters',
      max: 'Max length 50 characters',
    }],
    ['email', {
      required: 'This field is required',
      type: 'Invalid email address',
    }],
    ['subject', {
      required: 'This field is required',
      min: 'Min length 5 characters',
      max: 'Max length 50 characters',
    }],
    ['body', {
      required: 'This field is required',
      min: 'Min length 5 characters',
      max: 'Max length 200 characters',
    }]
  ]);

  constructor(private fb: FormBuilder, private contactService: ContactService) { }

  ngOnInit() {
    this.setForm();
  }

  private setForm(): void {
    this.contactForm = this.fb.group({
      name: [{
        value: '',
        disabled: false
      },
      [Validators.required,
      Validators.min(10),
      Validators.max(50)]],
      email: [{
        value: '',
        disabled: false
      }, [Validators.required,
      Validators.email,
      Validators.min(50)]],
      subject: [{
        value: '',
        disabled: false
      }, [Validators.required,
      Validators.min(5),
      Validators.max(50)]],
      body: [{
        value: '',
        disabled: false
      }, [Validators.required,
      Validators.min(5),
      Validators.max(200)]],
      captcha: [{
        value: '',
        disabled: false
      }, [Validators.required]]
    })
  }

  resolved(event) {
    // token arrive here
    console.log('EV', event);
  }


  public onSubmit(form: IEmailForm) {
    console.log(form);
    console.log(this.contactForm);
    console.log(this.validationErrors.get('email'));
    this.contactService.sendEmail(form);
  }
}
