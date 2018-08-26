# ApparenceHdSlider

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.
The aim is to load low resolution images first to let your pages load faster. 
    How it works :
      1 : Load low resolution images
      2 : Then it loads high resolution images on the background one after another
      3 : When an images has his high res image loaded, the src is updated to show the high res image

## Use the HdSlider
Just import the HdSliderModule in your application and BrowserAnimationModule like this :
```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // <-- import it
    HdSliderLibModule //<-- import it
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Now you can use the hd Slider
```
<enl-hd-slider-lib [items]="
                [
                  {
                      highSrc: '../assets/img1.jpg',
                      lowSrc: '../assets/apparence.png'
                  },
                  {
                      highSrc: '../assets/img2.jpg',
                      lowSrc: '../assets/apparence.png'
                  }
                ]" #AppSlider></enl-hd-slider-lib>
```

## Build the lib

Run `npm run package` to build the library.


Made by http://apparence.io, french mobile development agency
