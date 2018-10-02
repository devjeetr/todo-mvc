import {el} from 'vanillajs-framework';

import TodoList from './TodoComponents/TodoList';
import '../sass/style.scss';
import '../../public/fonts/woff2.css';

window.onload = () => {
  const todoList = Object.create(TodoList);
  const app = el('div.#app').render(document.body);
  todoList.init();
  el('header').attr('textContent', 'TodoMVC').render(app);
  todoList.render(app);
};