import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ILogin } from 'src/app/models/user.model';
import { takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  public loginForm: FormGroup;
  private isComponentActive: boolean = true;

  public validationErrors = new Map([
    ['email', {
      required: 'This field is required',
      type: 'Invalid email address',
      invalid: 'Invalid email or password'
    }],
    ['password', {
      required: 'This field is required',
      invalid: 'Invalid email or password'
    }]
  ]);

  ngOnInit(): void {
    this.setForm();
  }

  private setForm() {
    this.loginForm = this.fb.group({
      email: [{
        value: '',
        disabled: false
      }, [Validators.required,
      Validators.email,
      Validators.maxLength(50)]],
      password: [{
        value: '',
        disabled: false
      }, [Validators.required]],
    })
  }

  public onSubmit(form: ILogin): void {
    this.authService.logIn(form.email, form.password)
      .pipe(
        tap((data) => { }),
        takeWhile(() => this.isComponentActive)
      )
      .subscribe();
  }
}
