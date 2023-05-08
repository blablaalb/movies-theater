import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { userDTO } from '../security.models';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {
  users: userDTO[] | null = null;
  page: number = 1;
  pageSize: number = 10;
  totalAmountOfRecords: string | null = null;
  columnsToDisplay = ["email", "actions"];

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.securityService.getUsers(this.page, this.pageSize).subscribe((httpResponse: HttpResponse<userDTO[]>) => {
      this.users = httpResponse.body;
      this.totalAmountOfRecords = httpResponse.headers.get("totalAmountOfRecords");
    })
  }

  makeAdmin(userId: string) {
    this.securityService.makeAdmin(userId).subscribe(() => {
      Swal.fire("Success", "The operation was successful", "success");
    });
  }

  removeAdmin(userId: string) {
    this.securityService.removeAdmin(userId).subscribe(() => {
      Swal.fire("Success", "The operation was successful", "success");
    });
  }

}
