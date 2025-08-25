/* ===== Rotating Hero + Dark Mode Toggle ===== */

// --- Slideshow ---
(function(){
  const slides = Array.from(document.querySelectorAll('.slide'));
  if (!slides.length) return;

  const dotsContainer = document.getElementById('heroDots');
  const prevBtn = document.getElementById('prevHero');
  const nextBtn = document.getElementById('nextHero');

  let index = 0;
  let timer = null;
  const INTERVAL = 6000; // ms

  function renderDots(){
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i === index ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(d);
    });
  }

  function goTo(i){
    slides[index].classList.remove('active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('active');
    renderDots();
    restart();
  }

  function next(){ goTo(index + 1); }
  function prev(){ goTo(index - 1); }

  function start(){ timer = setInterval(next, INTERVAL); }
  function stop(){ if (timer) clearInterval(timer); }
  function restart(){ stop(); start(); }

  renderDots();
  start();

  // controls
  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // pause on hover
  const hero = document.querySelector('.hero');
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
})();

// --- Dark Mode Toggle (persists) ---
(function(){
  const KEY = 'theme';
  const btn = document.getElementById('themeToggle');

  // respect saved preference first
  const saved = localStorage.getItem(KEY);
  if (saved === 'dark') document.documentElement.classList.add('dark');
  if (saved === 'light') document.documentElement.classList.remove('dark');

  if (btn){
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem(KEY, isDark ? 'dark' : 'light');
    });
  }
})();

document.addEventListener('DOMContentLoaded', ()=>{
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;

  let i = 0;
  setInterval(()=>{
    slides[i].classList.remove('active');
    i = (i+1) % slides.length;
    slides[i].classList.add('active');
  }, 6000);
});

