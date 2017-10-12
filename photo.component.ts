import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';


export function PhotoValidator(photoURL) {
    return (c: FormControl) => {
        
       // let v = c.value;
        let v = photoURL;
        

        var Extension = v.substring(
                v.lastIndexOf('.') + 1).toLowerCase();


      let err = {
              validatePhoto: true
                 };

        return (Extension == "gif" || Extension == "png" || Extension == "bmp"
        || Extension == "jpeg" || Extension == "jpg") ?  null : err;
 

    }
  }


@Component({
    selector: 'input-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhotoComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhotoComponent), multi: true }
  ]
})
export class PhotoComponent implements ControlValueAccessor, OnChanges {

  propagateChange:any = () => {};
  validateFn:any = () => {};
  @Input('photoValue') _photoValue = 0;
  @Input() counterRangeMax;
  @Input() counterRangeMin;
  @Input() photoURL= "assets/forms/photo/media/img/nophoto.png";
  PhotoSRC :string;    
  
  get photoValue() {
    return this._photoValue;
  }
  
  set photoValue(val) {
    this._photoValue = val;
    this.propagateChange(val);
  }

  ngOnChanges(inputs) {
          this.PhotoSRC = this.photoURL;
          this.validateFn = PhotoValidator(this.PhotoSRC);
  }

  writeValue(value) {
    if (value) {
      this.photoValue = value;
    }
    this.PhotoSRC = this.photoURL;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
  

  validate(c: FormControl) {
    return this.validateFn(c);
  }
  
  
  
  
  fileChange(photo: any){
      // Get Value Of File Input
      let value : string = photo.value;

      //global variable refrence to AddComponent class for inner functions
      
      this.validateFn = PhotoValidator(photo.value);
      
      // photo from file upload input
      this.photoValue =  photo.files[0];    

      
      var Extension = value.substring(
              value.lastIndexOf('.') + 1).toLowerCase();

      // chang preview photo src if file is a photo
      if (Extension == "gif" || Extension == "png" || Extension == "bmp"
          || Extension == "jpeg" || Extension == "jpg")
          {
      var control = this;
            
      var myReader: FileReader = new FileReader();
      myReader.onload = function(e:any) {control.PhotoSRC = e.target.result;};
      myReader.readAsDataURL(photo.files[0]);
          }
      else
          {
          this.photoValue = null;
          this.PhotoSRC = this.photoURL;
          }
  }
  
  
  fileremove()
  {
      this.PhotoSRC = this.photoURL;
      this.validateFn = PhotoValidator(this.PhotoSRC);
      this.photoValue =   null;    
  }

}

