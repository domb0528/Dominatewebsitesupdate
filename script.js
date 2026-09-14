const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];

const updateActive = () => {
  let current = 'home';
  const y = window.scrollY + 140;
  sections.forEach(section => {
    if (section.offsetTop <= y) current = section.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
};

window.addEventListener('scroll', updateActive, { passive: true });
updateActive();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Home-page quote popup
const quoteModal = document.querySelector('#quoteModal');
const quoteTriggers = document.querySelectorAll('.quote-trigger');
const quoteClose = document.querySelectorAll('[data-quote-close]');
const quoteForm = document.querySelector('#quoteForm');

const openQuote = () => {
  if (!quoteModal) return;
  quoteModal.classList.add('open');
  quoteModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => quoteModal.querySelector('input')?.focus(), 50);
};
const closeQuote = () => {
  if (!quoteModal) return;
  quoteModal.classList.remove('open');
  quoteModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};
quoteTriggers.forEach(btn => btn.addEventListener('click', openQuote));
quoteClose.forEach(btn => btn.addEventListener('click', closeQuote));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuote(); });

quoteForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(quoteForm);
  const subject = `Website Quote Request - ${data.get('business') || 'New Project'}`;
  const body = [
    `Name: ${data.get('name') || ''}`,
    `Business: ${data.get('business') || ''}`,
    `Phone: ${data.get('phone') || ''}`,
    `Email: ${data.get('email') || ''}`,
    `Current Website: ${data.get('website') || ''}`,
    `Service: ${data.get('service') || ''}`,
    '',
    'Project Details:',
    data.get('message') || ''
  ].join('\n');
  window.location.href = `mailto:dominickbirge04@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
