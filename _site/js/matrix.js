(function () {
  'use strict';

  function initMatrixRain() {
    const canvas = document.getElementById('canvas');
    const bgGlow = document.getElementById('bg_glow');
    const info = document.getElementById('info');
    const fps = document.getElementById('fps');
    if (!canvas || !bgGlow) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dots = [];
    let maxHeight = 0;
    let minHeight = 0;
    let hue = 230;
    const dotCount = 100;
    const maxWidth = 15;
    const minWidth = 2;
    const maxSpeed = 35;
    const minSpeed = 6;
    const hueDif = 50;
    const glow = 10;
    let lastFpsSample = performance.now();
    let frameCount = 0;

    function setGlow() {
      bgGlow.style.background = 'radial-gradient(ellipse at center, hsla(' + hue + ',50%,50%,.55) 0%, rgba(0,0,0,0) 100%)';
    }

    function createDot() {
      return {
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        h: Math.random() * (maxHeight - minHeight) + minHeight,
        w: Math.random() * (maxWidth - minWidth) + minWidth,
        c: Math.random() * ((hue + hueDif) - (hue - hueDif)) + (hue - hueDif),
        m: Math.random() * (maxSpeed - minSpeed) + minSpeed
      };
    }

    function resetDots() {
      dots = [];
      for (let i = 0; i < dotCount; i += 1) {
        dots.push(createDot());
      }
    }

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      maxHeight = height * 0.9;
      minHeight = height * 0.5;
      ctx.globalCompositeOperation = 'lighter';
      resetDots();
    }

    function randomizeHue() {
      hue = Math.random() * 360;
      setGlow();
      resetDots();
    }

    function render(now) {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        const gradient = ctx.createLinearGradient(dot.x, dot.y, dot.x + dot.w, dot.y + dot.h);
        gradient.addColorStop(0.0, 'hsla(' + dot.c + ',50%,50%,0)');
        gradient.addColorStop(0.2, 'hsla(' + (dot.c + 20) + ',50%,50%,.5)');
        gradient.addColorStop(0.5, 'hsla(' + (dot.c + 50) + ',70%,60%,.8)');
        gradient.addColorStop(0.8, 'hsla(' + (dot.c + 80) + ',50%,50%,.5)');
        gradient.addColorStop(1.0, 'hsla(' + (dot.c + 100) + ',50%,50%,0)');

        ctx.beginPath();
        ctx.shadowBlur = glow;
        ctx.shadowColor = 'hsla(' + dot.c + ',50%,50%,1)';
        ctx.fillStyle = gradient;
        ctx.fillRect(dot.x, dot.y, dot.w, dot.h);
        ctx.closePath();

        dot.x += dot.m / 100;
        if (dot.x > width + maxWidth) {
          dot.x = -maxWidth;
        }
      }

      frameCount += 1;
      if (now - lastFpsSample >= 500) {
        if (fps) {
          fps.textContent = Math.round((frameCount * 1000) / (now - lastFpsSample)) + ' FPS';
        }
        frameCount = 0;
        lastFpsSample = now;
      }

      window.requestAnimationFrame(render);
    }

    if (info) {
      info.textContent = 'Click on the background for new colors :)';
    }

    resize();
    setGlow();

    window.addEventListener('resize', resize);
    document.addEventListener('click', function (event) {
      const interactive = event.target.closest('a, button, input, textarea, select, label, summary');
      if (!interactive) {
        randomizeHue();
      }
    });

    window.requestAnimationFrame(render);
  }

  window.initMatrixRain = initMatrixRain;
})();
