import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs/Subscription'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  subscription = new Subscription();
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  get control() { return this.registerForm.controls; }
  
      onSubmit() {
          this.submitted = true;
  
          // stop here if form is invalid
          if (this.registerForm.invalid) {
              return;
          }
  
          this.loading = true;
          this.subscription.add(
          this.authenticationService.register(this.registerForm.value)
              .subscribe(
                  data => {  this.activeModal.close(); },
                  error => {
                      this.error = error;
                      this.loading = false;
                  })
                );
      }

}
