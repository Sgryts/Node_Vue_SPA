import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin, IUser } from 'src/app/models/user.model';
import { takeWhile, tap, filter } from 'rxjs/operators';
import { AdminStateFacade } from '../state/state.facade';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private adminFacade: AdminStateFacade,
    private router: Router) { }

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
    this.loginForm.get('email').setErrors(null);
    this.loginForm.get('password').setErrors(null);
    this.adminFacade.login$(form.email, form.password);

    combineLatest([
      this.adminFacade.getUser$,
      this.adminFacade.getAuthError$
    ]).pipe(
      tap(([user, error]: [IUser, string]) => {
        if (user?.isAuthenticated) {
          return this.router.navigateByUrl('/admin');
        } else {
          this.loginForm.get('email').setErrors({ invalid: true })
          this.loginForm.get('password').setErrors({ invalid: true })
        }
      }),
      takeWhile(() => this.isComponentActive)
    ).subscribe();
  }
}