import { Component, OnInit } from '@angular/core';
import { GlobalUtilService } from 'src/app/core/services/global-util.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public globalUtilService: GlobalUtilService) { }

  ngOnInit(): void {
  }

}
