import { select } from '../settings.js';

class Searchbar {
  constructor(wrapper) {
    const thisSearchbar = this;

    thisSearchbar.dom = {};
    thisSearchbar.dom.wrapper = wrapper;
    thisSearchbar.dom.input = thisSearchbar.dom.wrapper.querySelector(
      select.searchbar.input
    );
    thisSearchbar.dom.button = thisSearchbar.dom.wrapper.querySelector(
      select.searchbar.button
    );
  }

  initActions() {
    const thisSearchbar = this;
    thisSearchbar.dom.input.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        thisSearchbar.announce();
      }
    });
    thisSearchbar.dom.button.addEventListener('click', function (event) {
      event.preventDefault();
      thisSearchbar.announce();
    });
  }
  announce() {
    const thisSearchbar = this;
    // emit custom event with search phrase
    const event = new CustomEvent('search', {
      bubbles: true,
      detail: {
        value: thisSearchbar.dom.input.value,
      },
    });
    thisSearchbar.dom.wrapper.dispatchEvent(event);
  }
}

export default Searchbar;
