import componentFramework from 'component-framework';
import { el } from 'vanillajs-framework';

const Component = componentFramework.Component;

let TodoInput = Object.create(Component);

TodoInput.init = function () {
  Component.init.call(this);

  // create elements 
  this.__root = el('div.todo-list-input-root');
  this.$todoInput = el('input').attrs(
                                  {
                                    'type': 'text',
                                    'placeholder': 'What needs to be done?'
                                  }
                                );
  this.__root.append(this.$todoInput);

  // create events
  this.__events.TODO_SUBMITTED = 'TODO_SUBMITTED';
  
  // add event handlers
  this.$todoInput.on('keydown', (e) => {
    if (e.keyCode === 13 && e.target.value.length > 0){
      this.__eventStore
          .publish(
                    this.__events.TODO_SUBMITTED, 
                    e.target.value
                  );
      
      // TODO
      // find out why $todoInput.attr("value", "") doesn't
      // clear the input field
      this.$todoInput.dom().value = "";
    }
  });
}

export default TodoInput;
