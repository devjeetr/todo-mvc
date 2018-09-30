import Component from "../Component/Component";
import { el } from "vanillajs-framework";

let TodoItem = Object.create(Component);

TodoItem.init = function(text) {
  Component.init.call(this);

  // create all dom elements
  this.__root = el('div.todo-list-todo-item-root');

  this.$checkboxDiv = el('div.todo-list-todo-item-checkbox-div');
  this.$todoTextDiv = el('div.todo-list-todo-item-text-div');
  this.$deleteButton = el('div.todo-list-todo-item-delete-button-div');

  this.$checkbox = el("input").attr("type", "checkbox");

  // set attributes
  this.$deleteButton.attr("textContent", "Delete");
  this.$todoTextDiv.attr("textContent", text);

  // setup dom tree
  this.$checkbox.render(this.$checkboxDiv);

  this.$checkboxDiv.render(this.__root.dom());
  this.$todoTextDiv.render(this.__root.dom());
  this.$deleteButton.render(this.__root.dom());

  // add events
  this.__events.TODO_CHECKBOX_TOGGLED = 'TODO_CHECKBOX_TOGGLED';
  this.__events.TODO_DELETE_BUTTON_CLICKED = 'TODO_DELETE_BUTTON_CLICKED';

  // add event emitters
  this.$checkbox.on('click',
                    (e) => {
                      this.__eventStore.publish(this.__events.TODO_CHECKBOX_TOGGLED, e.target.checked);
                    });
  this.$deleteButton.on('click', 
                        (e) => {
                          this.__eventStore.publish(this.__events.TODO_DELETE_BUTTON_CLICKED);
                        });
}

export default TodoItem;