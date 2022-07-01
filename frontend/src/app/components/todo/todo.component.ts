import {
  Input,
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";

import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

import { NgModule } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import Task from "src/app/models/tasks";
import { TaskService } from "src/app/services/task.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  //   encapsulation: ViewEncapsulation.None,
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent {
  public userId;
  tasks: Task[] = [];

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.userId = this.getCurrentUserId();
    this.taskService
      .getTasks(this.userId)
      .subscribe(
        (tasks: Task[]) => (
          (this.tasks = tasks),
          tasks.sort((a, b) =>
            a.completed > b.completed ? 1 : b.completed > a.completed ? -1 : 0
          )
        )
      );
  }

  form: FormGroup = new FormGroup({
    addDetails: new FormControl("", Validators.required)
  });

  data = [
    {
      item: "All"
    },
    {
      item: "Active"
    },
    {
      item: "Completed"
    }
  ];

  getCurrentUserId() {
    const user = this.auth.getUserDetails();
    return user._id;
  }

  resetAddDetailsForm() {
    this.form.reset();
    this.form.controls.addDetails.setErrors(null);
  }

  logCheckBoxClick(task) {
    console.log(task);
    this.taskService
      .setCompleted(this.userId, task)
      .subscribe(() => (task.completed = !task.completed));
  }

  showDeleteBtn(item) {
    let completedItems = this.tasks.filter(task => task.completed);
    return completedItems.length > 1 && item == "Completed";
  }

  deleteTask(task) {
    console.log(task);

    this.taskService
      .deleteTask(this.userId, task._id)
      .subscribe(
        (tasks: Task) =>
          (this.tasks = this.tasks.filter(t => t._id != task._id))
      );

    this._snackBar.open("Task Deleted", "Done", {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "bottom"
    });
  }

  deleteAllCompleted() {
    console.log(this.tasks);
    this.tasks.forEach(element => {
      if (element.completed) {
        this.deleteTask(element);
      }
    });

    this._snackBar.open("Deleted All Completed", "Done", {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "bottom"
    });
  }

  submit() {
    if (this.form.invalid) {
      console.log("Invalid");
      return;
    }

    //  Create new task
    this.taskService
      .createTasks(this.userId, this.form.value.addDetails)
      .subscribe((tasks: Task[]) => this.getTasks());

    this.resetAddDetailsForm();

    this._snackBar.open("Task Added", "Done", {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "bottom"
    });
  }
}
