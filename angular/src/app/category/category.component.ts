import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/_services/common-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs/Subscription'


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category : any =[];
  categoryForm: FormGroup;
  loading = false;
  submitted = false;
  categoryDialog :any;
  error = '';
  subscription = new Subscription();
  
  

  constructor(private formBuilder: FormBuilder,
    private commonServiceService:CommonServiceService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.categoryList();
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', Validators.required],
  });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
 
  categoryList(){
    this.subscription.add(
    this.commonServiceService.categoryList().subscribe((val:any)=>{
      if(val.data.length){

        this.category = val.data;
      }
    }, error=>{
      console.log(error);
    }));
  }

  addCategory(content){
   this.categoryDialog = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
   
  }

  deleteCategory(id){
    this.subscription.add(
    this.commonServiceService.deleteCategory(id).subscribe(val=>{
      if(val){
        
        this.categoryList();
            }
    }));
  }

  get control() { return this.categoryForm.controls; }
  
  onSubmit(){
    this.submitted = true;
    
            // stop here if form is invalid
            if (this.categoryForm.invalid) {
                return;
            }
    
            this.loading = true;
            this.subscription.add(
            this.commonServiceService.createCategory(this.categoryForm.value)
                .subscribe(
                    data => {
                        
                        this.categoryList();
                        this.categoryDialog.close();
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                    }));
        }

}
