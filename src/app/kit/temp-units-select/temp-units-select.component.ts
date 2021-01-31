import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-temp-units-select',
    templateUrl: './temp-units-select.component.html',
    styleUrls: ['./temp-units-select.component.scss']
})
export class TempUnitsSelectComponent implements OnInit {
    @Output() units: EventEmitter<string> = new EventEmitter<string>();
    constructor() {
    }
    get defaultUnit() {
        return localStorage.getItem('ronastest-temp-units');
    }
    radioChanged(event) {
        this.units.emit(event.target.value);
    }
    ngOnInit(): void {
    }

}
