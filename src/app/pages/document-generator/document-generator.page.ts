import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonCheckbox, IonRadioGroup, ModalController, ToastController } from '@ionic/angular';
import FormJSon from '../../../assets/test.json';
import AdvancedJSon from '../../../assets/advancedJson.json';
import { FormService } from 'src/app/form.service';
import { OptionsPagePage } from 'src/app/options-page/options-page.page';
import { ActivatedRoute } from '@angular/router';


export class Options {
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  children?: RootObject[];
  constructor(){
    this.required = false
  }
}

export interface RootObject {
  key: string;
  type: string;
  options: Options;
}
export class DynamicFormControl {
  key: string;
  type: string;
  options : Options
  positionKey : any
  children : DynamicFormControl[]
  selectOptions : SelectOption[]
  constructor(){
    this.key = ""
    this.type =""
    this.children = []
    this.selectOptions = []
    this.positionKey= "default"
    this.options = new Options()
    

    
  }
}
export class SelectOption{
  label: string
  value : any
  constructor(){
    
  }
}
export class CompleteDynamicForm {
  formText: string;
  inputs : DynamicFormControl[]
  categoriesColor 
  title
  mail
  constructor(dynamicform,formtext, categoriesColor = '#808080',title = "Formulario sin titulo",mail ="avidal@grupopiero.com"){
   
    this.inputs = dynamicform
    this.formText = formtext
    this.categoriesColor = categoriesColor
    this.title = title
    this.mail = mail
  }
}
export class Subtitle{
  label: string
  input : any
  constructor(label){
    this.input =  []
    this.label = label
  }
}

@Component({
  selector: 'app-document-generator',
  templateUrl: './document-generator.page.html',
  styleUrls: ['./document-generator.page.scss'],
})
export class DocumentGeneratorPage implements OnInit {
  myForm;
  newForm : FormGroup;
  simpleForm ;
  advancedForm  = AdvancedJSon;
  count = 0
  btnpressed = false
  lastclicked = ""
  dynamicform  : DynamicFormControl[]
  formText =""
  formularioDinamico 
  loaded = false
  pruebadevariable = "ahroa"
  categoriesColor
  title
  item={isValid:true}
  mail
  subtitulosInputs : Subtitle[] = []
  constructor(private fb : FormBuilder, private alertCrtl : AlertController,private formService: FormService,public modalController: ModalController ,public toastController: ToastController,private route:ActivatedRoute) {
    this.newForm = this.fb.group({})
    // this.createAdvancedControls(this.advancedForm)
    console.log(this.myForm)
    this.dynamicform = []

    this.addInput()
    // this.getAllFiles()
   }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('documentId'));
  }
  submitForm(){
    console.log("submited")
  }
  createControls(controls: any){
    for(let control of controls){
      const newFormControl = new FormControl();
      // if(control.options.required){
      //   newFormControl.setValidators(Validators.required);
      // }
      this.myForm.addControl(control.key,newFormControl)
    }
  }
  createAdvancedControls(controls: Array<RootObject>){
    for(let control of controls){
      const newFormControl = new FormControl();

     if(control.type == 'group'){
       const newGroup =  new FormGroup({});
       control.options.children.map(child =>{
         const newControl = new FormControl();
         newGroup.addControl(child.key, newFormControl)
       })
       this.myForm.addControl(control.key, newGroup)
     }
     else if (control.type == 'array'){
      const newArray = new FormArray([])
      const oneGroup =  new FormGroup({})
      control.options.children.map(child => {
        oneGroup.addControl(child.key, new FormControl());
      })
      newArray.push(oneGroup)
      this.myForm.addControl(control.key,newArray)
     }
    }
  }

  getFormArray(key){
    return <FormArray>this.myForm.controls[key]
  }
  removeArrayGroup(arrayName, index){
    const control = this.getFormArray(arrayName)
    control.removeAt(index)

  }
  addArrayGruop(arrayName,objectSchemaChildren){
    const control = this.getFormArray(arrayName)
    const oneGroup = new FormGroup({})
    objectSchemaChildren.map(child => {
        oneGroup.addControl(child.key, new FormControl())
      })
      control.push(oneGroup)
  }

  addInput(){
    const dinamicFormControl = new DynamicFormControl()
    this.dynamicform.push(dinamicFormControl)
    console.log(this.dynamicform)
  }
  // addInput(){
  //   const control = new FormControl()
    
  //   this.formularioDinamico
  // }
  removeInput(){
    this.dynamicform.pop()
    console.log(this.dynamicform)
  }
    addChildren(parent? : DynamicFormControl ){
   
    const dinamicFormControl = new DynamicFormControl()
    dinamicFormControl.key = parent.key + "child"

    if(parent.children == undefined){

      console.log("undefined children")
    parent = new DynamicFormControl()
    parent.children.push(dinamicFormControl)
    this.dynamicform.push(parent)
    }
    else{
      console.log("creating child")

    parent.children.push(dinamicFormControl)
    parent.options.type = "array"
    console.log(this.dynamicform)
    console.log(JSON.stringify(this.dynamicform))
    
    }
  }
  saveForm(){
    const completedynamicForm = new CompleteDynamicForm(this.dynamicform,this.formText,this.categoriesColor, this.title,this.mail)
    
    this.formService.requestVacations(completedynamicForm).subscribe(
      res => {
        console.log(res)
        this.presentToast("Se genero con exito el nuevo formulario: " +this.title)
      },
      error =>  {
        this.presentToast("Oops, hubo un error " +this.title)

        console.log(error)
      }
    )
  }
  getAllFiles(){
    this.formService.getAllFiles().subscribe( 
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }
  // getForm(){
  //   this.formService.getForm().subscribe( 
  //     res => {
  //       let obj = JSON.parse(res.toString());
  //       this.simpleForm = obj
  //       // console.log(obj)

  //       // this.transformText(this.simpleForm.inputs)
  //       this.createControls(obj.inputs)
  //       this.loaded = true
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }

   getCaretPosition(textarea) {
    if(this.lastclicked != ""){

      const position = textarea.selectionStart;
      this.formText = this.formText.replace( "["+this.lastclicked+"]", "")
      const start = this.formText.substr(0 , position)
      const end  = this.formText.substr(  position , this.formText.length )
      console.log(start)
      console.log(end)
      this.formText = start + "["+this.lastclicked+"]" + end
      console.log(position)
    }
}
  tooglePressed(key){
    this.lastclicked = key
    // this.btnpressed = !this.btnpressed
  }
  returnSimpleFormFormText(){
    return this.simpleForm.formText
  }
  addOption(dinamicform){
    dinamicform.selectOptions.push(new SelectOption())

  }
  reorderItems(ev) {
    const itemMove = this.dynamicform.splice(ev.detail.from, 1)[0];
    this.dynamicform.splice(ev.detail.to, 0, itemMove);
    console.log(ev)
    ev.detail.complete();
}  
addSubtitulo(){
  const count = this.subtitulosInputs.length +1
  this.subtitulosInputs.push(new Subtitle("categoria "+ count))
}
borrarSubtitulo(index){
  this.subtitulosInputs.splice(index,1)
}
colorPickerOpened(event){
console.log(event)
}
colorPickerClosed(event){
  console.log(event)

}
colorChanged(event){
  this.categoriesColor = event.color
}

toggleValid(){
  this.item.isValid = !this.item.isValid
}
async openOptionsModal(input : DynamicFormControl) {
  const modal = await this.modalController.create({
    component: OptionsPagePage,
    cssClass: 'my-custom-class',
    componentProps: {
      'type': input.type,
      'input': input,

    }
  });
  return await modal.present();
}

async presentToast(message) {
  const toast = await this.toastController.create({
    message: message,
    duration: 4000,
    position: 'top'
  });
  toast.present();
}
doReorder(ev: CustomEvent<any>,radiok : IonRadioGroup) {
  console.log(radiok.value)
  radiok.value = 0
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively
  console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
  let draggedItem = this.dynamicform.splice(ev.detail.from,1)[0];
  this.dynamicform.splice(ev.detail.to,0,draggedItem)
  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder group
  ev.detail.complete();
}
 

  


}
