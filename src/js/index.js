import {el} from 'vanillajs-framework';
import TodoList from './TodoComponents/TodoList';

window.onload = () => {
  const todoList = Object.create(TodoList);
  todoList.init();
  todoList.render(document.body);
};