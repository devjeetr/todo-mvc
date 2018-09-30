import {el} from "vanillajs-framework";
import Component from "../Component/Component";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

let TodoList = Object.create(Component);

TodoList.init = function() {
  Component.init.call(this);
  
  // create data stores
  this.todosDataStore = new Map();
  this.todoCounter = 0;

  // create dom elements and components
  this.__root = el('div.todo-list-root-div');
  this.todosRoot = el('div.todo-list-todos-root');

  this.todoInput = Object.create(TodoInput);
  this.todoInput.init();

  // TODO
  // Investigate why __root.append(this.todoInput) 
  // doesn't work

  // build dom tree
  this.todoInput.render(this.__root.dom());
  this.todosRoot.render(this.__root.dom());

  // add event handlers
  this.todoInput.on(          
                    this.todoInput.__events.TODO_SUBMITTED, 
                    addTodo.bind(this)
                  );
    
}

function addTodo(newTodoText) {
  // create new todo item
  let $newTodoItem = Object.create(TodoItem);

  // initialize and add it to root
  $newTodoItem.init(newTodoText);
  $newTodoItem.render(this.todosRoot);

  // store this information in the data store
  this.todoCounter += 1;
  this.todosDataStore.set(this.todoCounter, 
                          {
                            completed: false,
                            $element: $newTodoItem
                          });

  // add event handlers
  $newTodoItem.on($newTodoItem.__events.TODO_CHECKBOX_TOGGLED, 
                  toggleTodoCheckbox.bind(this, this.todoCounter));
  $newTodoItem.on($newTodoItem.__events.TODO_DELETE_BUTTON_CLICKED,
                  deleteTodo.bind(this, this.todoCounter));
  // TODO
  // display filter bar here
}

function toggleTodoCheckbox(id, isChecked){
  this.todosDataStore.get(id).completed = isChecked;
}

function deleteTodo(id){
  console.log(id);
  console.log(this.todosDataStore.get(id));
  // TODO
  // make sure $element is properly deleted
  this.todosDataStore.get(id).$element.detach();
  this.todosDataStore.delete(id);
}


export default TodoList;