import { Component, OnInit, forwardRef, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import {photoInputOptions} from './photoInputOptions';


export function PhotoValidator(photoURL) {
    return (c: AbstractControl) => {
        
       // let v = c.value;
        let v = photoURL;
        
       //To Solve Problem of Submit Disabled if value null
        if(!v)
            {
                c.setErrors(null);   
            }
        

        var Extension = v.substring(
                v.lastIndexOf('.') + 1).toLowerCase();


      let err = {
              validatePhoto: true
                 };

      return  (Extension == "gif" || Extension == "png" || Extension == "bmp"
        || Extension == "jpeg" || Extension == "jpg" || !v ) ?  null : err;


    }
  }


@Component({
    selector: 'input-photo',
    templateUrl: './photoInput.component.html',
    styleUrls: ['./photoInput.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhotoInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhotoInputComponent), multi: true }
  ]
})
export class PhotoInputComponent implements ControlValueAccessor, OnChanges {

  propagateChange:any = () => {};
  validateFn:any = () => {};
  @Input('photoValue') _photoValue = 0;
  @Input() photoURL;
  @Input() options : photoInputOptions = {theme:{circlePhoto:null,background:null}};
  PhotoSRC :string; 
  PhotoBackground:string;
  
//To Get File Input Element in HTML
  @ViewChild('NgxPhotoFileInput') 
  private NgxPhotoFileInput: ElementRef;    

  
  
  get photoValue() {
    return this._photoValue;
  }
  
  set photoValue(val) {
    this._photoValue = val;
    this.propagateChange(val);
  }

  ngOnChanges(inputs) {

          this.PhotoSRC = this.photoURL;
          this.PhotoBackground = this.PhotoSRC ? 'url('+ this.PhotoSRC +')': 'none';
  
          this.validateFn = PhotoValidator(this.PhotoSRC);
  }

  writeValue(value) {
    if (value) {
      this.photoValue = value;
    }
    else
    {
        this.NgxPhotoFileInput.nativeElement.value = null;
        this.validateFn = PhotoValidator(this.PhotoSRC);
    }
    
    //Fix Error if options = null because we need all options values in html 
    let NullOptions : photoInputOptions = {theme:{circlePhoto:null,background:null}}
    this.options =  Object.assign(NullOptions , this.options);

    this.PhotoSRC = this.photoURL;
    this.PhotoBackground = this.PhotoSRC ? 'url('+ this.PhotoSRC +')': 'none';

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

  if(value)
      {
      //global variable refrence to AddComponent class for inner functions
      
      this.validateFn = PhotoValidator(value);
      
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
      myReader.onload = function(e:any) {
          
      control.PhotoSRC = e.target.result;
      control.PhotoBackground = control.PhotoSRC ? 'url('+ control.PhotoSRC +')': 'none';
      
      };
      myReader.readAsDataURL(photo.files[0]);
          }
      else
          {
                  this.PhotoSRC = this.photoURL;
                  this.PhotoBackground = this.PhotoSRC ? 'url('+ this.PhotoSRC +')': 'none';
          
          }

      }
  }
  
  
  fileremove(photo: any)
  {
      photo.value = null;
      this.PhotoSRC = this.photoURL;
      this.validateFn = PhotoValidator(this.PhotoSRC);
      this.PhotoBackground = this.PhotoSRC ? 'url('+ this.PhotoSRC +')': 'none';
      this.photoValue =   null;    
  }

}

