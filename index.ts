import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoInputComponent } from "./PhotoInputComponent/photoInput.component";


const MJ_Photo_COMPONENTS = [
                            PhotoInputComponent,
                          ];


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
                 ...MJ_Photo_COMPONENTS,
                 ],
  exports: [
            ...MJ_Photo_COMPONENTS,
            ],

})

export class PhotoModule {

  static forRoot() {
    return {
      ngModule: PhotoModule
    }
  }

}

export {PhotoInputComponent};