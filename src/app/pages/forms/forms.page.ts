import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { FormTextPipe } from 'src/app/form-text.pipe';
import { FormService } from 'src/app/form.service';
import { ToastService } from 'src/app/services/toast.service';
import { VacacionesService } from 'src/app/services/vacaciones.service';
import { DynamicFormControl } from '../document-generator/document-generator.page';

export class FinalForm{
  inputs
  formText
  title
}
@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})



export class FormsPage implements OnInit {
  myForm : FormGroup;
  newForm : FormGroup;
  simpleForm ;
  count = 0
  btnpressed = false
  lastclicked = ""
  formText =""
  loaded = false
  selectedForm = "none"
  pruebadevariable = "ahroa"
  categorias = []
  files 
  selectedFile
  constructor(private fb : FormBuilder, private alertCrtl : AlertController,private formService: FormService,
     private vacacionesService :VacacionesService, private toastService :ToastService , private formTextPipe : FormTextPipe) {
    this.myForm = this.fb.group({})
    const newFormControl = new FormControl()
    this.myForm.addControl("texto",newFormControl)
   }

  ngOnInit() {
    this.getAllFiles()
  }

  getForm(filename){
    console.log("calling function")
    this.formService.getForm(filename).subscribe( 
      res => {
        let obj = JSON.parse(res.toString());
        this.simpleForm = obj
        // console.log(obj)

        // this.transformText(this.simpleForm.inputs)
        this.createControls(obj.inputs)
     
        obj.inputs.forEach(input => {
          this.categorias.push(input.positionKey)
        });
        this.categorias = this.categorias.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        })
        console.log(res)
        this.loaded = true
      },
      error => {
        console.log(error)
      }
    )
  }
  createControls(controls: any){

    this.myForm = this.fb.group({})

    controls.forEach((control, index) => {
      const newFormControl = new FormControl();
      if(control.options.required){
        newFormControl.setValidators(Validators.required);
      }
      if(control.options.hasmin){
        newFormControl.setValidators(Validators.min(control.options.min));
      }
      if(control.options.hasmax){
        newFormControl.setValidators(Validators.max(control.options.max));
      }
      if(control.options.hasminlength){
        newFormControl.setValidators(Validators.minLength(control.options.minlength));
      }
  
      this.myForm.addControl(control.key,newFormControl)
    });
   
    console.log(this.myForm)

  }
  signAndSend(){


    var arregloform = this.myForm.value
    this.simpleForm.inputs.forEach(element => {
      console.log(element.key)
      element.value  = arregloform[element.key] 
    });
    this.simpleForm.formText  =  this.formTextPipe.transform( this.simpleForm.formText, this.simpleForm.inputs,this.myForm)
    this.simpleForm.categories = this.categorias
    this.vacacionesService.requestVacations(this.simpleForm).subscribe(
      (res: any) => { 
        console.log(res)
        this.downLoadFile(res, "application/pdf","pdf")
     
      },
      (error: any) => {
        console.log(error)
        this.toastService.presentToast('Network Issue.');
      }
    );
  }
   formatDate(dateTime) {
    var date: Date = new Date(dateTime);
    var dia =  date.getDate();
    var mes =  date.getMonth() +1;
    var año =  date.getFullYear();

    return dia+"/"+mes+"/"+año;
}
  downLoadFile(data: any, type: string,ext:string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "solicituddevacaciones"+ext;
    a.click(); 

  }
  getAllFiles(){
    this.formService.getAllFiles().subscribe( 
      res => {
        console.log(res)
        this.files = res
      },
      error => {
        console.log(error)
      }
    )
  }
}
