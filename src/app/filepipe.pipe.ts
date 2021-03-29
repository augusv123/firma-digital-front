import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filepipe'
})
export class FilepipePipe implements PipeTransform {

  transform(value: any): any {
    value = value.replace( "public/forms/", ""  )
    value = value.replace( "public/signedForms/", ""  )

    value = value.replace( ".json", ""  )
    value = value.replace( ".pdf", ""  )
    
    return value;
  }

}
