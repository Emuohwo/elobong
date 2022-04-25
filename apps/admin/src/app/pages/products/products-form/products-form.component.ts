import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, Product, ProductsService } from '@elobong/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  editMode = false;
  isSubmitted = false;
  form!: FormGroup
  categories: Category[] = [];
  imageDisplay?: string | ArrayBuffer | null;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this._initForm()
    this._getCategories()
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [false],
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      // console.log(key)
      // console.log(this.productForm[key].value);
      productFormData.append(key, this.productForm[key].value)
    })

    this._addProduct(productFormData)
  }

  onCancel() {
    // 
  }

  onImageUpload(event: Event) {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      this.form.patchValue({image: file})
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file)
    }
  }
  
  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe( (product: Product) =>{
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`Product ${product.name} was created successfully`
      });
      timer(2000).toPromise().then(() => {
        this.location.back()
      })
    },
    () => {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'An error occurred while creating product, please try agin later'
      });
    })
  }

  get productForm() {
    return this.form.controls;
  }

}
