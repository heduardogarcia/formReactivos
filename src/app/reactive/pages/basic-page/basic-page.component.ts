import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


const rtx5090={
  name:'RTX 5090',
  price:2500,
  inStorage:7
}
@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  //crear el formulario reactivo con FormGroup

  // public myForm:FormGroup= new FormGroup({
//   name : new FormControl(''),
//   price:  new FormControl(0),
//   inStorage:  new FormControl(0)

  // });

  //pára crearlo con form builder injectar le servicio en el constructor

  constructor(private fb:FormBuilder){

  }

  public myForm: FormGroup= this.fb.group({
       name : ['',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z0-9 ]*')]],
       price : [0,[Validators.required,Validators.min(0)]],
       inStorage :[0,[Validators.required,Validators.min(0)]],
  })

  ngOnInit(): void {
    // this.myForm.reset(rtx5090);
  }
  isValidField(field: string):boolean|null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field:string): string |null{
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      console.log(key);

      switch (key) {

        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
        case 'pattern':
          return `El campo no acepta caracteres especiales`;
      }

    }


    return null;
  }
  onSave():void{
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset({name:'',price:0,inStorage:0});
    console.log(this.myForm.value);


  }

}
