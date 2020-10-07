import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tasks';

  todoList: Todo[] = [
    {task: "Mow Yard", completed: false},
    {task: "Invent AI", completed: false},
    {task: "Build Table", completed: true},
    {task: "Build Drone Landing Pad", completed: false},
    {task: "Learn Angular", completed: false},
    {task: "Assemble Computer Desks", completed: true},
    {task: "Fly Drone", completed: true},
    {task: "Celebrate", completed: false},
  ];

  completeTask(task: Todo) {
    task.completed = true;
  }

  removeTask(task: Todo) {
    this.todoList.splice(this.todoList.indexOf(task), 1)
  }

  addTask(value: string) {
    if(value != "") {
      this.todoList.push({task: value, completed: false});
    }
  }

  allComplete() {
    let allGood = true;
    this.todoList.forEach(function(value) {
      if(!value.completed) {
        allGood = false;
      }
    });
    return allGood;
  }
}

export interface Todo {
  task: string;
  completed: boolean;
}