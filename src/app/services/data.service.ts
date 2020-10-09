import { Injectable } from '@angular/core';
import { Todo } from '../../assets/models/Todo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tasks: Todo[];

  getTasks(): Observable<Todo[]> {
    return of(this.tasks);
  }

  addTask(task: string): void {
    this.tasks.push({task: task, completed: false});
  }

  deleteTask(task: Todo): void {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  constructor() {
    this.tasks = [
      {task: "Mow Yard", completed: false},
      {task: "Invent AI", completed: false},
      {task: "Build Table", completed: true},
      {task: "Build Drone Landing Pad", completed: false},
      {task: "Learn Angular", completed: false},
      {task: "Assemble Computer Desks", completed: true},
      {task: "Fly Drone", completed: true},
      {task: "Celebrate", completed: false}
    ];
  }
}
