import { Component, OnInit } from '@angular/core';
import { GlobalData } from 'src/app/shared/global.data';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public globalData: GlobalData) { }

  ngOnInit(): void {
  }

}
