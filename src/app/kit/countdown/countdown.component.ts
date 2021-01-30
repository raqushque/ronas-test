import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
    private resetListener = new BehaviorSubject(false);
    private sub: Subscription;
    showCountdown: boolean = false;
    constructor() {
    }
    resetCountdown() {
        this.resetListener.next(true);
    }
    disableCountdown() {
        this.showCountdown = false;
    }
    ngOnInit(): void {
        this.sub = this.resetListener.subscribe(val => {
            if (val) {
                this.showCountdown = false;
                setTimeout((_ => {
                    this.showCountdown = true;
                }), 0);
            }
        });
    }

}
