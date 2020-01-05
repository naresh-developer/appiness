import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/_services/common-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs/Subscription'



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products : any =[];
  category : any =[];
  productForm: FormGroup;
  loading = false;
  submitted = false;
  productDialog :any;
  error = '';
  subscription = new Subscription();
  

  constructor(private formBuilder: FormBuilder,
    private commonServiceService:CommonServiceService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.productList();
    this.categoryList();
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', Validators.required],
      category_id:['', Validators.required],
  });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  productList(){
    this.subscription.add(
    this.commonServiceService.productList().subscribe((val: any)=>{
      if(val.data.length){
        this.products = val.data;
      }
    }, error=>{
      console.log(error);
    })
  );
  }
  categoryList(){
    this.subscription.add(
    this.commonServiceService.categoryList().subscribe((val:any)=>{
      if(val.data.length){
        this.category = val.data;
      }
    }, error=>{
      console.log(error);
    })
  );
  }

  addProduct(content){
    this.productDialog = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
   
  }

  get control() { return this.productForm.controls; }
  
  onSubmit(){
    this.submitted = true;
    
            // stop here if form is invalid
            if (this.productForm.invalid) {
                return;
            }
    
            this.loading = true;
            this.subscription.add(
            this.commonServiceService.createProduct(this.productForm.value)
                .subscribe(
                    data => {
                        
                      this.productDialog.close();
                        this.productList();
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                    }));
        }

}
