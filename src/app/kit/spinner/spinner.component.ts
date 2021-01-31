import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
    @Input() size: string = '120px';
    @Input() borderWidth: string = '8px';
    @Input() colorCode: string = '#ffffff';
    constructor() {
    }

    ngOnInit(): void {
    }

}
