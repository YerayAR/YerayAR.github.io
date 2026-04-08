(function () {
  'use strict';

  function initSpotlight() {
    let cursorAtom = null;

    function isDarkModeActive() {
      const theme = document.documentElement.getAttribute('data-theme') || 'auto';
      if (theme === 'dark') return true;
      if (theme === 'light') return false;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function ensureCursorAtom() {
      if (cursorAtom) return cursorAtom;

      cursorAtom = document.createElement('div');
      cursorAtom.className = 'cursor-atom';
      cursorAtom.setAttribute('aria-hidden', 'true');
      cursorAtom.innerHTML = [
        '<span class="cursor-atom__halo"></span>',
        '<span class="cursor-atom__nucleus"></span>',
        '<span class="cursor-atom__orbit cursor-atom__orbit--one"><span class="cursor-atom__electron"></span></span>',
        '<span class="cursor-atom__orbit cursor-atom__orbit--two"><span class="cursor-atom__electron"></span></span>',
        '<span class="cursor-atom__orbit cursor-atom__orbit--three"><span class="cursor-atom__electron"></span></span>'
      ].join('');
      document.body.appendChild(cursorAtom);
      return cursorAtom;
    }

    function updateSpotlight(event) {
      document.documentElement.style.setProperty('--spot-x', event.clientX + 'px');
      document.documentElement.style.setProperty('--spot-y', event.clientY + 'px');
      const atom = ensureCursorAtom();
      atom.style.transform = 'translate(' + event.clientX + 'px, ' + event.clientY + 'px)';
      if (isDarkModeActive()) {
        document.body.setAttribute('data-spotlight', 'on');
        atom.setAttribute('data-active', 'true');
      } else {
        document.body.removeAttribute('data-spotlight');
        atom.removeAttribute('data-active');
      }
    }

    function hideSpotlight() {
      document.body.removeAttribute('data-spotlight');
      if (cursorAtom) {
        cursorAtom.removeAttribute('data-active');
      }
    }

    window.addEventListener('mousemove', updateSpotlight, { passive: true });
    window.addEventListener('mouseleave', hideSpotlight, { passive: true });
  }

  window.initSpotlight = initSpotlight;
})();
