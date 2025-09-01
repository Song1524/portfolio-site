// ===== 부드러운 스크롤(헤더 높이만큼 보정) =====
function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector('.header');
  const headerOffset = header ? header.offsetHeight : 0;
  const rectTop = el.getBoundingClientRect().top;
  const targetY = window.scrollY + rectTop - headerOffset + 1; // +1: 경계 겹침 방지
  window.scrollTo({ top: targetY, behavior: 'smooth' });
}

// 메뉴 a 클릭 시 기본 앵커 이동 막고 부드러운 스크롤
document.querySelectorAll('.nav a[data-target], .btn[data-target]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    smoothScrollToId(a.dataset.target);
  });
});

// ===== 스크롤 진행바 =====
const bar = document.getElementById('bar');
function onScrollProgress() {
  const h = document.documentElement;
  const w = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  bar.style.width = w + '%';
}
window.addEventListener('scroll', onScrollProgress);
onScrollProgress();

// ===== 현재 섹션 active 표시 =====
const ids = ['about', 'projects', 'skill', 'contact'];
const links = Array.from(document.querySelectorAll('.nav a[data-target]'));
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const visibleId = entry.target.id;
    links.forEach(a => a.classList.toggle('active', a.dataset.target === visibleId));
  });
}, { rootMargin: '-50% 0px -50% 0px', threshold: 0.01 });

ids.forEach(id => {
  const sec = document.getElementById(id);
  if (sec) obs.observe(sec);
});

// ===== 히어로 문자 살짝 흔들리는 효과(옵션) =====
const words = ['Creativity', 'is my', 'craft', 'abstract', 'thinking', 'is my', 'passion'];
const lettersCol = document.getElementById('lettersCol');
if (lettersCol) {
  words.forEach((w, i) => {
    const row = document.createElement('div');
    row.className = 'row';
    [...w].forEach((ch, idx) => {
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.display = 'inline-block';
      row.appendChild(span);
    });
    lettersCol.appendChild(row);
  });
  function animateLetters() {
    const rows = lettersCol.querySelectorAll('.row');
    const y = window.scrollY || document.documentElement.scrollTop;
    rows.forEach((row, i) => {
      [...row.children].forEach((span, idx) => {
        const dy = Math.sin((idx + i) / 2 + y / 250) * 6;
        span.style.transform = `translateY(${dy}px)`;
      });
    });
    requestAnimationFrame(animateLetters);
  }
  animateLetters();
}

// ===== Projects 데이터 → 카드 렌더 =====
const projects = [
  {title: 'Generative Posters', tags: ['WebGL','Shaders','Three.js'],
   img: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1200&auto=format&fit=crop',
   href: '#', desc: 'Algorithmic poster series exploring noise & flow fields.'},
  {title: 'Campus Voting DApp', tags: ['Spring','Solidity','MySQL'],
   img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop',
   href: '#', desc: 'Gasless blockchain voting with JWT & server-signed txns.'},
  {title: 'Piping Route Optimizer', tags: ['Algorithm','CAD','Optimization'],
   img: 'https://images.unsplash.com/photo-1508704019882-f9cf40e475b4?q=80&w=1200&auto=format&fit=crop',
   href: '#', desc: 'Auto-routing & cost minimization for MEP piping layouts.'}
];
const projectGrid = document.getElementById('projectGrid');
if (projectGrid) {
  projectGrid.innerHTML = projects.map(p => `
    <a class="card" href="${p.href}">
      <div class="thumb"><img alt="" src="${p.img}"></div>
      <div class="card-body">
        <div style="font-weight:600">${p.title}</div>
        <div style="color:#d7d7d7; font-size:.95rem; margin-top:4px">${p.desc}</div>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </a>
  `).join('');
}
