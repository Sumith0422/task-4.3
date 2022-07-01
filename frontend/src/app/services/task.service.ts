import { Injectable } from '@angular/core';
import { WebService } from './web.service'
import Task from '../models/tasks'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webService: WebService) { }

  getTasks(userId: string) {
    return this.webService.get(`users/${userId}/tasks`);
  }

  createTasks(userId: string, title: string) {
    return this.webService.post(`users/${userId}/tasks`, { title });
  }

  deleteTask(userID: string, taskId: string) {
    return this.webService.delete(`users/${userID}/tasks/${taskId}`);
  }

  setCompleted(userId: string, task: Task) {
     return this.webService.patch(`users/${userId}/tasks/${task._id}`, { completed: !task.completed });
  }
}
