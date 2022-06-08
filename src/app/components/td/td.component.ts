import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'td-container',
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.scss'],
})
export class TdComponent implements OnInit {
  @Input() data1: string | number | null = null;
  @Input() data2: string | number | null = null;
  @Input() linkPrefix: string | null = null;
  constructor() {}

  ngOnInit(): void {
    console.log(this.data1, this.data2, this.linkPrefix)
  }
}
