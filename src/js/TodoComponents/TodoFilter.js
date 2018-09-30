import componentFramework from 'component-framework';
import { el } from 'vanillajs-framework';

const Component = componentFramework.Component;
const utilities = componentFramework.utilities;

const TodoFilter = Object.create(Component);

TodoFilter.init = function init() {
  Component.init.call(this);

  this.__root = el('div.todo-list-filter-root');
  this.__activeElement = null;
  this.__events.FILTER_OPTION_CLICKED = 'FILTER_OPTION_CLICKED';
};

/**
 * adds a new option to the filter menu
 * @param {string} optionText
 */
TodoFilter.option = function option(optionText) {
  const $newOptionItem = el('div.todo-list-filter-option-item');
  $newOptionItem
    .attr('textContent', optionText);

  $newOptionItem.on('mousedown',
    (e) => {
      this.__eventStore.publish(this.__eventStore.FILTER_OPTION_CLICKED, e.target.textContent);

      if (this.__activeElement) {
        this.__activeElement
          .dom()
          .classList
          .remove('filter-option-item--active');
      }
      e.target.classList.add('filter-option-item--active');
      this.__activeElement = $newOptionItem;
    });

  if (!this.__activeElement) {
    this.__activeElement = $newOptionItem;
    $newOptionItem.dom().classList.add('filter-option-item--active');
  }

  $newOptionItem.render(this.__root);

  return this;
};


export default TodoFilter;
