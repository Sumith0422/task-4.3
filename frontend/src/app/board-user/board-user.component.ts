import { Component, OnInit } from '@angular/core';
import { ITodo } from '../models/servey';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  public UserList: ITodo[] = [];
  public objUser: any = new ITodo();
  searchText: any;
  constructor(private dataSRV: DataService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataSRV.getUsers().subscribe((res) => {
      this.UserList = res;
      console.log(res);
    });
  }
  create(objUser: ITodo) {
    var {name,status,created_date,User}  = objUser;

    var t = {
      name,
      status,
      created_date,
      User
    }
    if (this.objUser._id === undefined || this.objUser._id === 0) {
      this.dataSRV.Post(t).subscribe(
        (res) => {
          this.getData();
          this.newData();
          console.log('Data Created Successfully !');
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  update(objUser: ITodo) {
    this.dataSRV.updateUser(objUser._id, objUser).subscribe(
      (res) => {
        this.getData();
        console.log('Data Updated Successfully !');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  delete(objUser: ITodo) {
    var deleteBtn = confirm('Do you want to delete ?');
    if (deleteBtn == true) {
      this.dataSRV.delete(objUser._id).subscribe(
        (res) => {
          this.getData();
          console.log('data deleted successfully');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  edit(objUser: ITodo) {
    this.objUser = objUser;
  }
  onSave() {
    if (this.objUser._id == 0) {
      this.create(this.objUser);
      this.newData();
    } else {
      this.update(this.objUser);
      this.newData();
    }
  }
  newData() {
    this.objUser = new ITodo();
  }
}
