import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from 'src/app/shared/models/brand';
import { IProduct } from 'src/app/shared/models/product';
import { IProductCreate } from 'src/app/shared/models/productCreate';
import { IType } from 'src/app/shared/models/productType';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
})
export class ProductCreateComponent {
  public productForm: FormGroup;
  public test: IProductCreate;
  public brands: IBrand[];
  public types: IType[];
  public constructor(private shopService: ShopService, private toastr: ToastrService, private router: Router) {}

  public ngOnInit(): void {
    this.getBrands();
    this.getTypes();

    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      pictureForm: new FormControl(null, [Validators.required]),
      productTypeId: new FormControl('', [Validators.required]),
      productBrandId: new FormControl('', [Validators.required]),
    });
  }

  public submit(): void {
    this.shopService.uploadProduct(this.productForm.value).subscribe((response: IProduct) => {
      this.toastr.success('Product created successfully');
      this.router.navigateByUrl('/shop/' + response.id);
    });
  }

  public getFile(file: any): void {
    const uploadedFile = <File>file.target.files[0];
    const extensionAllowed = { png: true, jpeg: true };

    if (uploadedFile.size / 1024 / 1024 > 20) {
      alert('File size should be less than 20MB');
      return;
    }

    if (extensionAllowed) {
      const nam = uploadedFile.name.split('.').pop();
      if (!extensionAllowed[nam]) {
        alert('Please upload ' + Object.keys(extensionAllowed) + ' file.');
        return;
      }
    }

    this.productForm.controls['pictureForm'].setValue(uploadedFile);
  }

  public getBrands(): void {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [...response];
      },
      (error) => {
        console.log(error);
      },
    );
  }

  public getTypes(): void {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [...response];
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
