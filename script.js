
const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
if(menuToggle&&nav){menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));}
const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});reveals.forEach(el=>io.observe(el));}else reveals.forEach(el=>el.classList.add('visible'));
function ensureQuoteModal(){let modal=document.getElementById('quoteModal');if(modal)return modal;document.body.insertAdjacentHTML('beforeend',`<div class="quote-modal" id="quoteModal" aria-hidden="true"><div class="quote-backdrop" data-quote-close></div><div class="quote-dialog" role="dialog" aria-modal="true" aria-labelledby="quoteTitle"><button class="quote-close" type="button" aria-label="Close quote form" data-quote-close>×</button><p class="eyebrow">GET A FREE MOCKUP</p><h2 id="quoteTitle">Tell Me About Your Project</h2><p class="quote-intro">Share a few details and your email app will open a pre-filled request to Dominick.</p><form id="quoteForm"><div class="form-grid"><div class="field"><label for="qName">Your Name</label><input id="qName" name="name" required></div><div class="field"><label for="qBusiness">Business Name</label><input id="qBusiness" name="business" required></div><div class="field"><label for="qPhone">Phone</label><input id="qPhone" name="phone" type="tel"></div><div class="field"><label for="qEmail">Email</label><input id="qEmail" name="email" type="email" required></div><div class="field full"><label for="qWebsite">Current Website</label><input id="qWebsite" name="website" type="url" placeholder="https://"></div><div class="field full"><label for="qService">What do you need?</label><select id="qService" name="service"><option>New website</option><option>Website redesign</option><option>Landing page</option><option>SEO / website improvements</option><option>Ongoing website support</option></select></div><div class="field full"><label for="qMessage">Project Details</label><textarea id="qMessage" name="message" placeholder="Tell me what your business does and what you want the website to accomplish."></textarea></div></div><button class="btn btn-primary quote-submit" type="submit">Send Project Request →</button></form><p class="quote-alt">Or email <a href="mailto:dominickbirge04@gmail.com">dominickbirge04@gmail.com</a></p></div></div>`);modal=document.getElementById('quoteModal');modal.querySelectorAll('[data-quote-close]').forEach(el=>el.addEventListener('click',closeQuote));modal.querySelector('#quoteForm').addEventListener('submit',sendQuote);return modal;}
function openQuote(){const m=ensureQuoteModal();m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>m.querySelector('input')?.focus(),60)}
function closeQuote(){const m=document.getElementById('quoteModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
function sendQuote(e){e.preventDefault();const f=new FormData(e.currentTarget);const subject=encodeURIComponent(`Website Project Request - ${f.get('business')||'New Lead'}`);const body=encodeURIComponent(`Name: ${f.get('name')||''}
Business: ${f.get('business')||''}
Phone: ${f.get('phone')||''}
Email: ${f.get('email')||''}
Current Website: ${f.get('website')||''}
Service: ${f.get('service')||''}

Project Details:
${f.get('message')||''}`);window.location.href=`mailto:dominickbirge04@gmail.com?subject=${subject}&body=${body}`;}
document.querySelectorAll('.quote-trigger').forEach(b=>b.addEventListener('click',openQuote));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeQuote()});


// Project mockup lightbox
function ensureProjectModal(){
  let modal=document.getElementById('projectModal');
  if(modal) return modal;
  document.body.insertAdjacentHTML('beforeend',`<div class="project-modal" id="projectModal" aria-hidden="true"><div class="project-modal-backdrop" data-project-close></div><div class="project-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle"><div class="project-modal-head"><h2 id="projectModalTitle">Project Mockup</h2><button class="project-modal-close" type="button" aria-label="Close project preview" data-project-close>×</button></div><div class="project-modal-stage"><img id="projectModalImage" src="" alt=""></div></div></div>`);
  modal=document.getElementById('projectModal');
  modal.querySelectorAll('[data-project-close]').forEach(el=>el.addEventListener('click',closeProjectModal));
  return modal;
}
function openProjectModal(src,title){
  const modal=ensureProjectModal();
  const img=modal.querySelector('#projectModalImage');
  const heading=modal.querySelector('#projectModalTitle');
  img.src=src;
  img.alt=`${title||'Project'} full website mockup`;
  heading.textContent=title||'Project Mockup';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('project-modal-open');
  setTimeout(()=>modal.querySelector('.project-modal-close')?.focus(),40);
}
function closeProjectModal(){
  const modal=document.getElementById('projectModal');
  if(!modal)return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('project-modal-open');
}
document.querySelectorAll('.project-popup-trigger').forEach(el=>el.addEventListener('click',e=>{
  e.preventDefault();
  openProjectModal(el.dataset.projectPopup,el.dataset.projectTitle);
}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProjectModal()});

// Premium page/nav interaction polish
(function(){
  const body=document.body;
  body.classList.add('page-preload');
  requestAnimationFrame(()=>requestAnimationFrame(()=>body.classList.remove('page-preload')));

  document.querySelectorAll('a[href]').forEach(link=>{
    link.addEventListener('click',e=>{
      const href=link.getAttribute('href');
      if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target==='_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      let url;
      try{url=new URL(href,location.href)}catch{return}
      if(url.origin!==location.origin) return;
      if(url.pathname===location.pathname && url.hash){return;}
      e.preventDefault();
      body.classList.add('page-leaving');
      setTimeout(()=>{location.href=url.href},170);
    });
  });
})();
