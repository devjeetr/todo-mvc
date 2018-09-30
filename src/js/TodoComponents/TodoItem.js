import { el } from 'vanillajs-framework';
import componentFramework from 'component-framework';

const Component = componentFramework.Component;

const TodoItem = Object.create(Component);

TodoItem.init = function (text) {
  Component.init.call(this);

  this.__text = text;
  // create all dom elements
  this.__root = el('div.todo-list-todo-item-root');

  this.$checkboxDiv = el('div.todo-list-todo-item-checkbox-div');
  this.$todoTextDiv = el('div.todo-list-todo-item-text-div');
  this.$deleteButton = el('div.todo-list-todo-item-delete-button-div');
  this.$todoEditInput = el('input').attr('type', 'text');
  this.$checkbox = el('input').attr('type', 'checkbox');

  // set attributes
  this.$deleteButton.attr('textContent', 'Delete');
  this.$todoTextDiv.attr('textContent', text);

  // setup dom tree
  this.$checkbox.render(this.$checkboxDiv);

  this.$checkboxDiv.render(this.__root.dom());
  this.$todoTextDiv.render(this.__root.dom());
  this.$deleteButton.render(this.__root.dom());

  // add events
  this.__events.TODO_CHECKBOX_TOGGLED = 'TODO_CHECKBOX_TOGGLED';
  this.__events.TODO_DELETE_BUTTON_CLICKED = 'TODO_DELETE_BUTTON_CLICKED';
  this.__events.TODO_ITEM_EDITED = 'TODO_ITEM_EDITED';

  // add event emitters
  this.$checkbox.on('click',
    (e) => {
      this.__eventStore.publish(this.__events.TODO_CHECKBOX_TOGGLED, e.target.checked);
    });
  this.$deleteButton.on('click',
    (e) => {
      this.__eventStore.publish(this.__events.TODO_DELETE_BUTTON_CLICKED);
    });

  this.$todoTextDiv.on('dblclick', (e) => {
    e.preventDefault();
    makeEditable.call(this, true);
  });

  // TODO 
  // uncomment
  // this.$todoEditInput.on('blur', (e) => {
  //   this.__text = e.target.value;
  //   makeEditable.call(this, false);
  //   this.__eventStore.publish(this.__events.TODO_ITEM_EDITED);
  // });

  this.$todoEditInput.on('keydown', (e) => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      e.preventDefault();
      this.__eventStore.publish(this.__events.TODO_ITEM_EDITED);
      this.__text = e.target.value;
      makeEditable.call(this, false);
    } else if (e.keyCode === 27) {
      e.preventDefault();
      makeEditable.call(this, false);
    }
  });
};

function makeEditable(isEditable) {
  if (isEditable) {
    this.$todoTextDiv.dom().innerHTML = '';
    this.$todoTextDiv.dom().classList.add('todo-item--editing');
    this.$todoEditInput.render(this.$todoTextDiv);
    this.$todoEditInput.attr('value', this.__text);
    this.$todoEditInput.dom().focus();
  } else {
    this.$todoTextDiv.dom().classList.remove('todo-item--editing');
    this.$todoTextDiv.attr('textContent', this.__text);
  }
}

export default TodoItem;
