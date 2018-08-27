import {AfterViewChecked, AfterViewInit, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {isPlatformBrowser, isPlatformServer, isPlatformWorkerApp, isPlatformWorkerUi} from '@angular/common';
import {HdSliderService} from './hd-slider-service';

@Component({
  selector: 'enl-hd-slider-lib',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [HdSliderService],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, zIndex: 9})),
      state('out', style({opacity: 0, zIndex: 9})),
      transition('out => in', [
        animate(
          1500, keyframes([
            style({opacity: 0, offset: 0}),
            style({opacity: 0.4, offset: 0.5}),
            style({opacity: 1, offset: 1.0})
          ])
        )]),
      transition('in => out', [
        animate(
          800, keyframes([
            style({opacity: 1, offset: 0}),
            style({opacity: 0.8, offset: 0.7}),
            style({opacity: 0, offset: 1.0})
          ])
        )])
    ])
  ]
})
export class HdSliderLibComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() public items: SliderItemViewModel[];
  private currentItem = 0;
  public isStarted = false;

  constructor(private _sanitizer: DomSanitizer,
              private hdSliderService: HdSliderService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngAfterViewInit(): void {
    if (this.items) {
      this.items.forEach((value, index) => {
        value.state = index === 0 ? SliderItemViewModel.IN_STATE : SliderItemViewModel.OUT_STATE;
        value.visible = index === 0;
        value.srcImg = value.lowSrc;
        value.isLoaded = false;
        value.currentImgResolution = SliderItemViewModel.LOW_RESOL;
      });
    }
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    if (!this.isStarted && isPlatformBrowser(this.platformId)) {
      this.isStarted = true;
      setTimeout(() => this.startSlider(), 1000);
      this.loadImagesHighRes(0);
    }

  }

  startSlider() {
    setInterval(() => {
      this.items[this.currentItem].state = SliderItemViewModel.OUT_STATE;
      this.items[this.currentItem].visible = false;
      if (this.currentItem + 1 > this.items.length - 1) {
        this.currentItem = 0;
      } else {
        this.currentItem += 1;
      }
      this.items[this.currentItem].state = SliderItemViewModel.IN_STATE;
      this.items[this.currentItem].visible = true;
    }, 6500);
  }

  public isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  public sanitizeImage(image: string): SafeStyle {
    if (isPlatformServer(this.platformId)) {
      return null;
    }
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  onLoaderImageLoaded(i: number) {
    this.items[i].isLoaded = true;
    this.items[i].loaderSrc = null;
    this.items[i].srcImg = this.items[i].highSrc;
    this.items[i].currentImgResolution = SliderItemViewModel.HIGH_RESOL;
  }

  loadImagesHighRes(i: number) {
    if (i >= this.items.length || this.items[i].currentImgResolution === SliderItemViewModel.HIGH_RESOL) {
      return;
    }
    this.loadImageSrc(i);
  }

  loadImageSrc(i: number) {
    this.hdSliderService.getImageData64(this.items[i].highSrc)
      .subscribe(
        (res: Blob) => {
          const reader = new FileReader();
          const _this_ = this;
          reader.onloadend = function() {
            _this_.items[i].highSrc = reader.result;
            _this_.onLoaderImageLoaded(i);
            _this_.loadImagesHighRes(i + 1);
          }.bind(this);
          reader.readAsDataURL(res);
        }
      );
  }

}

export class SliderItemViewModel {
  public static OUT_STATE = 'out';
  public static IN_STATE = 'in';
  public static LOW_RESOL = 'low';
  public static HIGH_RESOL = 'high';
  public srcImg?: string;
  public loaderSrc?: string;
  public isLoaded?: boolean;
  public currentImgResolution?: String;
  public lowSrc?: string;
  public highSrc?: string;
  public state?: string;
  public visible?: boolean;
}
