(function () {
  'use strict';

  function activateTab(card, target) {
    card.querySelectorAll('[data-fullstack-tab]').forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute('data-fullstack-tab') === target);
    });

    card.querySelectorAll('[data-fullstack-panel]').forEach(function (panel) {
      panel.classList.toggle('is-active', panel.getAttribute('data-fullstack-panel') === target);
    });
  }

  function initFullstackDemo() {
    document.querySelectorAll('.portfolio-highlight-card--fullstack').forEach(function (card) {
      card.querySelectorAll('[data-fullstack-tab]').forEach(function (button) {
        button.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          activateTab(card, button.getAttribute('data-fullstack-tab'));
        });
      });
    });
  }

  window.initFullstackDemo = initFullstackDemo;
})();
