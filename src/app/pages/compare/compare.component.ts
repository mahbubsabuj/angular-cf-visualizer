import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  user1: string = '';
  user2: string = '';
  value1: string = ''
  constructor() { }
  
  ngOnInit(): void {
  }
  handleSubmit(cfHandle: string) {

  }
}
