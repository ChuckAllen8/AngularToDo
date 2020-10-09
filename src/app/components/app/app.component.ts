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

  todoList: Todo[];

  completeTask(task: Todo): void {
    task.completed = true;
  }

  removeTask(task: Todo): void {
    this.data.deleteTask(task);
  }

  addTask(value: string): void {
    if(value != "") {
      this.data.addTask(value);
    }
  }

  allComplete(): boolean {
    let allGood = true;
    this.todoList.forEach(function(value) {
      if(!value.completed) {
        allGood = false;
      }
    });
    return allGood;
  }

  constructor(private data: DataService) {
    data.getTasks().subscribe(tasks => this.todoList = tasks)
  }
}