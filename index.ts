import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from "./PhotoComponent/photo.component";


const MJ_Photo_COMPONENTS = [
                            PhotoComponent,
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

export {PhotoComponent};