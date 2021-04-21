import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormTextPipe } from 'src/app/form-text.pipe';
import { FormService } from 'src/app/form.service';
import { ToastService } from 'src/app/services/toast.service';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-form-completion',
  templateUrl: './form-completion.page.html',
  styleUrls: ['./form-completion.page.scss'],
})
export class FormCompletionPage implements OnInit {
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
  avatarUrl  : string =""
  filteredForms
  filter
  file
  constructor(private router: Router,private fb : FormBuilder, private alertCrtl : AlertController,private formService: FormService,
     private vacacionesService :VacacionesService, private toastService :ToastService , private formTextPipe : FormTextPipe,public datepipe: DatePipe, public route : ActivatedRoute) {
    this.myForm = this.fb.group({})
    const newFormControl = new FormControl()
    this.myForm.addControl("texto",newFormControl)
    this.avatarUrl = localStorage.getItem('avatarUrl')
     this.file = this.route.snapshot.paramMap.get('file');

    
   }

  ngOnInit() {

    if(this.file){
      this.getForm(this.file)
    }
  }
  clearControls(){
    this.myForm = this.fb.group({})
    this.simpleForm = null
    this.categorias = []
  }


  getForm(fileID){
    this.formService.getCompletionForm(fileID).subscribe(
      res => {
        this.selectedFile = res
        this.clearControls()
            let obj = JSON.parse(this.selectedFile.valor);
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
    this.vacacionesService.requestVacations(this.simpleForm,this.selectedFile.firma_apoderado).subscribe(
      (res: any) => { 
        console.log(res)
        this.downLoadFile(res, "application/pdf","pdf")
        this.router.navigate(['/home']);
     
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
        this.filteredForms = res

      },
      error => {
        console.log(error)
      }
    )
  }
  searchAndFilterItems() {
    
    // const filteredItems = this.users.filter(item => {
    //     // Apply filters
    // });
    this.filteredForms  = this.files.filter(file => {
    var  nombre = file.nombre
    

      return nombre.toLowerCase().indexOf(this.filter.toLowerCase()) > -1;

    });
  }
  vencido(fechaVencimiento){
    if(fechaVencimiento == null) return true
    var todaysdate =new Date();
    let latest_date =this.datepipe.transform(todaysdate, 'yyyy-MM-dd');
    if(fechaVencimiento > latest_date) return true
    return false
    console.log(latest_date)
    console.log(fechaVencimiento)
  }
}