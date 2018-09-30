import componentFramework from 'component-framework';
import { el } from 'vanillajs-framework';
import TodoFilter from './TodoFilter';

const Component = componentFramework.Component;

/**
 * Status bar component for the TodoList
 */
const TodoStatusBar = Object.create(Component);

TodoStatusBar.init = function init() {
  Component.init.call(this);
  // create html markup
  this.__root = el('div.todo-list-status-bar-root');
  this.$todosRemainingDiv = el('div.todo-list-status-bar-todos-remaining');
  this.$clearTodosDiv = el('div.todo-list-status-bar-clear-todos-div');
  this.$clearTodosButton = el('button.todo-list-status-bar-clear-todos-btn');
  this.TodoFilter = Object.create(TodoFilter);

  // initialize child components
  this.TodoFilter.init();

  //
  const options = ['All', 'Completed', 'Remaining'];
  options.forEach((option) => {
    this.TodoFilter.option(option);
  });

  // setup event handling and associated attributes
  this.__events.FILTER_OPTION_CHANGED = 'FILTER_OPTION_CHANGED';
  this.__events.CLEAR_COMPLETED_TODOS_CLICKED = 'CLEAR_COMPLETED_TODOS_CLICKED';

  this.TodoFilter
    .on(this.TodoFilter.__events.FILTER_OPTION_CHANGED,
      (...args) => {
        this.__eventStore
          .publish(this.__events.FILTER_OPTION_CHANGED, ...args);
      });

  this.$clearTodosButton
    .attr('textContent', 'Clear Completed')
    .on('click', () => {
      this.__eventStore.publish(this.__events.CLEAR_COMPLETED_TODOS_CLICKED);
    });

  // build dom tree
  this.$clearTodosButton.render(this.$clearTodosDiv);
  this.$todosRemainingDiv.render(this.__root);
  this.TodoFilter.render(this.__root);
  this.$clearTodosDiv.render(this.__root);
};


TodoStatusBar.remaining = function (remainingCount) {
  if (remainingCount > 0) {
    this.$todosRemainingDiv.dom().classList.remove('todo-status-bar-none-remaining');
    this.$todosRemainingDiv.dom().classList.add('todo-status-bar-some-remaining');
    this.$todosRemainingDiv.attr('textContent', `${remainingCount} things left to do`);
  } else if (remainingCount === 0) {
    this.$todosRemainingDiv.dom().classList.remove('todo-status-bar-some-remaining');
    this.$todosRemainingDiv.dom().classList.add('todo-status-bar-none-remaining');
    this.$todosRemainingDiv.attr('textContent', 'Nothing left to do!');
  } else if (remainingCount < 0) {
    this.$todosRemainingDiv.dom().classList.remove('todo-status-bar-some-remaining');
    this.$todosRemainingDiv.dom().classList.remove('todo-status-bar-none-remaining');
    this.$todosRemainingDiv.attr('textContent', '');
  }

  return (this);
};

export default TodoStatusBar;
