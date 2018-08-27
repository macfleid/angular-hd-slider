import {AfterViewChecked, AfterViewInit, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';
import {DomSanitizer} from '@angular/platform-browser';
import {isPlatformBrowser, isPlatformServer, isPlatformWorkerApp, isPlatformWorkerUi} from '@angular/common';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({opacity: 1, zIndex: 9})),
            state('out', style({opacity: 0, zIndex: 9})),
            transition('out => in', [
                animate(
                    1500, keyframes([
                        style({opacity: 0,  offset: 0}),
                        style({opacity: 0.4,  offset: 0.5}),
                        style({opacity: 1,  offset: 1.0})
                    ])
                )]),
            transition('in => out', [
                animate(
                    800, keyframes([
                        style({opacity: 1,  offset: 0}),
                        style({opacity: 0.8,  offset: 0.7}),
                        style({opacity: 0,  offset: 1.0})
                    ])
                )])
        ])
    ]
})
export class SliderComponent implements OnInit, AfterViewInit, AfterViewChecked {

    @Input() public items: SliderItemViewModel[];
    private currentItem = 0;
    public isOnServer = false;
    public isStarted = false;

    constructor(private _sanitizer: DomSanitizer,
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

    ngOnInit() {}

    ngAfterViewChecked(): void {
        if (!this.isStarted && isPlatformBrowser(this.platformId)) {
            this.isStarted = true;
            setTimeout(() => this.startSlider(), 1000);
        }

    }

    startSlider() {
        // const _this_ = this;
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

    public sanitizeImage(image: string) {
        if (isPlatformServer(this.platformId)) {
            console.log('isPlatformServer');
            return null;
        }
        if (isPlatformBrowser(this.platformId)) {
            console.log('isPlatformBrowser');
        }
        if (isPlatformWorkerApp(this.platformId)) {
            console.log('isPlatformServer');
        }
        if (isPlatformWorkerUi(this.platformId)) {
            console.log('isPlatformWorkerUi');
        }
        console.log('try sanityze : ' + image);
        return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    }

    onLoaderImageLoaded(i: number) {
        this.items[i].isLoaded = true;
        this.items[i].loaderSrc = null;
        this.items[i].srcImg = this.items[i].highSrc;
        this.items[i].currentImgResolution = SliderItemViewModel.HIGH_RESOL;
    }

    onImageLoaded(i: number) {
        if (this.items[i].currentImgResolution === SliderItemViewModel.HIGH_RESOL) {
            return;
        }
        this.items[i].isLoaded = true;
        if (this.items.filter((value) => value.isLoaded === true).length === this.items.length) {
            // start load full res img
            setTimeout(() => {
                this.items.forEach((item) => {
                    item.loaderSrc = item.highSrc;
                    item.isLoaded = false;
                });
            }, 3000);
        }
    }

}

export class SliderItemViewModel {
    public static OUT_STATE = 'out';
    public static IN_STATE = 'in';
    public static LOW_RESOL = 'low';
    public static HIGH_RESOL = 'high';
    public srcImg?: String;
    public loaderSrc?: String;
    public isLoaded?: boolean;
    public currentImgResolution?: String;
    public lowSrc?: String;
    public highSrc?: String;
    public state?: string;
    public visible?: boolean;
}
