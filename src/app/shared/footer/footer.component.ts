import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() pager;

  @Output() changePage = new EventEmitter<number>();

  constructor() {}
  setPage(page: number) {
    if (page <= 0) {
      page = 1;
    } else if (page > this.pager.totalPages) {
      return;
    }
    this.changePage.emit(page);
  }
  ngOnInit() {
    console.log(this.pager);
  }
}
