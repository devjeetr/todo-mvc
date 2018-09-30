import { el } from 'vanillajs-framework';
import componentFramework from 'component-framework';

import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import TodoStatusBar from './TodoStatusBar';

const Component = componentFramework.Component;

/**
 * TodoList Object
 */
const TodoList = Object.create(Component);

TodoList.init = function () {
  Component.init.call(this);

  // create data stores
  this.todosDataStore = new Map();
  this.todoCounter = 0;

  // create dom elements and components
  this.__root = el('div.todo-list-root-div');
  this.todosRoot = el('div.todo-list-todos-root');


  this.todoInput = Object.create(TodoInput);
  this.TodoStatusBar = Object.create(TodoStatusBar);

  this.todoInput.init();
  this.TodoStatusBar.init();

  // TODO
  // Investigate why __root.append(this.todoInput)
  // doesn't work

  // build dom tree
  this.todoInput.render(this.__root.dom());
  this.todosRoot.render(this.__root.dom());
  this.TodoStatusBar.render(this.__root);

  // add event handlers
  this.todoInput.on(
    this.todoInput.__events.TODO_SUBMITTED,
    addTodo.bind(this),
  );

  this.TodoStatusBar.on(this.TodoStatusBar.__events.FILTER_OPTION_CHANGED,
    changeFilter.bind(this));
  this.TodoStatusBar.on(this.TodoStatusBar.__events.CLEAR_COMPLETED_TODOS_CLICKED,
    clearCompletedTodos.bind(this));
};

function addTodo(newTodoText) {
  // create new todo item
  const $newTodoItem = Object.create(TodoItem);

  // initialize and add it to root
  $newTodoItem.init(newTodoText);
  $newTodoItem.render(this.todosRoot);

  // store this information in the data store
  this.todoCounter += 1;
  this.todosDataStore.set(this.todoCounter,
    {
      completed: false,
      $element: $newTodoItem,
    });

  // add event handlers
  $newTodoItem.on($newTodoItem.__events.TODO_CHECKBOX_TOGGLED,
    toggleTodoCheckbox.bind(this, this.todoCounter));
  
  $newTodoItem.on($newTodoItem.__events.TODO_DELETE_BUTTON_CLICKED,
    deleteTodo.bind(this, this.todoCounter));
  
  $newTodoItem.on($newTodoItem.__events.TODO_ITEM_DB_CLICKED,
    updateTodo.bind(this, this.todoCounter));
  // update remaining
  updateRemaining.call(this);
  // TODO
  // display filter bar here
}

function updateTodo(id) {
}

function changeFilter(filterOption) {
  const FilterMappings = {
    All: () => true,
    Completed: item => item.completed,
    Remaining: item => !item.completed,
  };

  /* eslint-disable */
  for (const todoItem of this.todosDataStore.values()) {
    if (FilterMappings[filterOption](todoItem)) {
      if (!todoItem.$element.dom().parentElement
          || todoItem.$element.dom().parentElement !== this.todosRoot.dom()) {
        todoItem.$element.render(this.todosRoot);
      }
    } else {
      todoItem.$element.detach();
    }
  }
  /* eslint-enable */
}

function clearCompletedTodos() {
  /* eslint-disable */
  let remaining = 0;
  for (const todoId of this.todosDataStore.keys()) {
    const todoItem = this.todosDataStore.get(todoId);
    if (todoItem.completed) {
      todoItem.$element.detach();
      this.todosDataStore.delete(todoItem);
    } else {
      remaining += 1;
    }
  }
  /* eslint-enable */
  updateRemaining.call(this);
}


function toggleTodoCheckbox(id, isChecked) {
  this.todosDataStore.get(id).completed = isChecked;

  updateRemaining.call(this);
}

function updateRemaining(remaining = 0) {
  if (!remaining) {
    /* eslint-disable */
    for (const todoItem of this.todosDataStore.values()) {
      remaining += !todoItem.completed ? 1 : 0;
    }
    /* eslint-enable */
  }

  this.TodoStatusBar.remaining(remaining);
}

function deleteTodo(id) {
  // TODO
  // make sure $element is properly deleted
  this.todosDataStore.get(id).$element.detach();
  this.todosDataStore.delete(id);

  updateRemaining.call(this);
}


export default TodoList;
