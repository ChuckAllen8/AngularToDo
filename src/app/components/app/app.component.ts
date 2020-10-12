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
  onlyIncomplete: boolean;

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
    this.populateTasks();
    if(this.filter) {
      let reg = `.*${this.filter}.*`.toLowerCase();
      this.todoList = this.todoList.filter(x => x.task.toLowerCase().match(reg));
    }
  }

  populateTasks() {
    this.todoList = this.allTasks.filter(x => (!this.onlyIncomplete || !x.completed));
  }

  allComplete(): boolean {
    return (this.allTasks.length == 0 || this.allTasks.filter(x => x.completed).length == this.allTasks.length);
  }

  constructor(private data: DataService) {
    data.getTasks().subscribe(tasks => this.allTasks = tasks)
    this.filter = "";
    this.onlyIncomplete = false;
    this.filterTasks();
  }
}