import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent} from 'src/app/register/register.component';
import {Subscription} from 'rxjs/Subscription'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
    signinDialog: any;
    subscription = new Subscription();
    



  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal) {
     }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  get control() { return this.loginForm.controls; }
  
      onSubmit() {
          this.submitted = true;
  
          // stop here if form is invalid
          if (this.loginForm.invalid) {
              return;
          }
  
          this.loading = true;
          this.subscription.add(
          this.authenticationService.login(this.control.email.value, this.control.password.value)
              .pipe(first())
              .subscribe(
                  data => {
                      
                      this.router.navigate(['/']);
                  },
                  error => {
                      this.error = error;
                      this.loading = false;
                  }));
      }

      signin() {
        this.signinDialog = this.modalService.open(RegisterComponent, {ariaLabelledBy: 'modal-basic-title'})
      }    

}
