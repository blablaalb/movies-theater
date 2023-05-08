import { Component, OnInit } from '@angular/core';
import { ActorsService } from '../actors.service';
import { actorDTO } from '../actors.model';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {

  actors!: actorDTO[];
  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  constructor(private actorsService: ActorsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.actorsService.get(this.currentPage, this.pageSize).subscribe((response: HttpResponse<actorDTO[]>) => {
      this.actors = response.body as actorDTO[];
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    });
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  delete(id: number) {
    this.actorsService.delete(id).subscribe(() => {
      this.loadData();
    });
  }

}
