# ngx-photo-input
Photo Input Component for Angular 4

# How to Install
```
npm install ngx-photo-input@0.0.11
```
# How does it appear?

![alt text](https://user-images.githubusercontent.com/30666269/31550129-f7a7b40c-b038-11e7-8dd8-4dd9e116d0fe.png)


# How To Use
In the Module Declare NGX Photo Input Component

```
import { PhotoInputComponent } from "ngx-photo-input";

@NgModule({
  declarations: [
                 PhotoInputComponent
                 ]
})

```

In Your Template 

```
<input-photo id="userphoto" [(photoURL)]="users.photoURL" 
name = "userphoto" #userphoto="ngModel" [(ngModel)]="users.photo"></input-photo>
```


photoURL: The url of default or current photo 


# The files that are accepted 
gif, png, bmp, jpeg, jpg.


# Example for  detection of error because of invalide File 

 ```

<span *ngIf="userphoto.errors.validatePhoto">
Photo must be a file of type: jpeg, bmp, png.
</span>

 ```
