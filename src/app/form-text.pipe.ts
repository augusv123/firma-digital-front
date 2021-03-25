import { Pipe, PipeTransform, Sanitizer } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'formText',
  pure : false
})
export class FormTextPipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){

  }
  transform(formtext: any, inputs: any[], myform : FormGroup): any {
    var texttotransform = formtext
  
    if(inputs != null && texttotransform != null){

        
        Object.keys(myform.controls).forEach(key => {
          // const valor = '&#xE5C9'+myform.get(key).value+'&#xE5C9'
          const valor = '<ion-badge color="primary">'+myform.get(key).value+'</ion-badge>'
          var valorpararemplazar = myform.get(key).value 
          if(valorpararemplazar == null) valorpararemplazar = "["+key+"]"
          texttotransform = texttotransform.replace( "["+key+"]", valorpararemplazar  )
        });
     
    }
    // return this.sanitizer.bypassSecurityTrustStyle(texttotransform);
    return texttotransform;
  }

}
