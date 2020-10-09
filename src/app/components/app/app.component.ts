import { Component } from '@angular/core';
import { Todo } from '../../../assets/models/Todo';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tasks';
  filter: string;

  todoList: Todo[];
  allTasks: Todo[];

  completeTask(task: Todo): void {
    task.completed = true;
    this.filterTasks();
  }

  removeTask(task: Todo): void {
    this.data.deleteTask(task);
    this.filterTasks();
  }

  addTask(value: string): void {
    if(value != "") {
      this.data.addTask(value);
    }
    this.filterTasks();
  }

  saveTask(task: Todo, update: string) {
    task.task = update;
    this.filterTasks();
  }

  filterTasks() {
    if(!(this.filter === undefined || this.filter === "")) {
      this.todoList = [];
      for(let item of this.allTasks) {
        let reg = `.*${this.filter}.*`.toLowerCase();
        if(item.task.toLowerCase().match(reg)) {
          this.todoList.push(item);
        }
      }
    }
    else if(!(this.filter === undefined)) {
      this.populateTasks();
    }
  }

  populateTasks() {
    this.todoList = [];
    for(let item of this.allTasks) {
      this.todoList.push(item);
    }
  }

  allComplete(): boolean {
    let allGood = true;
    this.allTasks.forEach(function(value) {
      if(!value.completed) {
        allGood = false;
      }
    });
    return allGood;
  }

  constructor(private data: DataService) {
    data.getTasks().subscribe(tasks => this.allTasks = tasks)
    this.populateTasks();
    this.filter = "";
  }
}