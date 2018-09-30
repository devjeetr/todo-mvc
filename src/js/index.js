import {el} from 'vanillajs-framework';
// import * as componentFramework from 'component-framework';
import TodoList from './TodoComponents/TodoList';
import '../sass/style.scss';

window.onload = () => {
  const todoList = Object.create(TodoList);
  const app = el('div.#app').render(document.body);
  todoList.init();
  el('header').attr('textContent', 'TodoMVC').render(app);
  todoList.render(app);
};