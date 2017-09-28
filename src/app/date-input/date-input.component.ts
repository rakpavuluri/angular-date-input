// Sample Integration
// <app-exide-date-picker [day]="'12'" [month]="'12'" [year]="'1994'" (emitDate)="getDate($event)"></app-exide-date-picker>
// Get date is the local function in parent component and $event contains the output object with date, hasError keys.
import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {

  @Input() month: string;
  @Input() day: string;
  @Input() year: string;

  @ViewChild('edpDay') edpDay: ElementRef;
  @ViewChild('edpMonth') edpMonth: ElementRef;
  @ViewChild('edpYear') edpYear: ElementRef;

  @Output() emitDate = new EventEmitter<any>();

  exceptionalKeys = ['ArrowRight', 'ArrowLeft', 'Backspace', 'Tab', 'Enter'];
  constructor() { }

  ngOnInit() {
  }

  checkDay(event: any) {
    const val = event.currentTarget.value;
    if (val > 0 && val <= 31) {
      const day = String(val).split('');
      if (day.length === 2 && this.exceptionalKeys.indexOf(event.code) === -1) {
        this.moveTo(1);
      } else if (day.length > 2) {
        return false;
      } else {
        return true;
      }
    } else {
      event.preventDefault();
      return false;
    }
  }

  checkMonth(event: any) {
    const val = event.currentTarget.value;
    if (val > 0 && val < 13) {
      const month = String(val).split('');
      if (month.length === 2 && event.code !== 'Backspace' && event.code !== 'Tab') {
        this.moveTo(2);
      } else if (month.length > 2) {
        return false;
      } else {
        return true;
      }
    } else {
      event.preventDefault();
      return false;
    }
  }

  checkYear(event: any) {
    const val = event.currentTarget.value;
    if (val > 1850 && val <= 3000) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  moveTo(index: number) {
    if (index === 1) {
      this.edpMonth.nativeElement.focus();
    } else if (index === 2) {
      this.edpYear.nativeElement.focus();
    }
  }

  checkDigits(type: string) {
    switch (type) {
      case 'day':
        if (this.day) {
          const day = String(this.day).split('');
          if (day.length === 1) {
            this.day = '0' + this.day;
          }
        }
        break;
      case 'month':
        if (this.month) {
          const month = String(this.month).split('');
          if (month.length === 1) {
            this.month = '0' + this.month;
          }
        }
        break;
    }
    this.outputData();
  }

  checkError(val: number, type: string, checkUndefined: boolean = false) {
    let error = true;
    switch (type) {
      case 'day':
        if (this.day === undefined || (this.day && Number(this.day) <= 31 && Number(this.day) > 0)) {
          error = false;
        }
        break;
      case 'month':
        if (this.month === undefined || (this.month && Number(this.month) <= 12 && Number(this.month) > 0)) {
          error = false;
        }
        break;
      case 'year':
        if (this.year === undefined || (this.year && Number(this.year) <= 3000 && Number(this.year) > 1850)) {
          error = false;
        }
        break;
    }
    if (checkUndefined && (!this.day || !this.month || !this.year)) {
      return true;
    } else {
      return error;
    }
  }

  outputData() {
    this.emitDate.emit(
      {
        'date': this.day + '-' + this.month + '-' + this.year,
        'hasError': this.checkError(Number(this.day), 'day', true) || this.checkError(Number(this.month), 'month', true)
        || this.checkError(Number(this.year), 'year', true)
      }
    );
  }
}
