const PHONE = '916300125175';
const DISPLAY_PHONE = '+91 6300125175';
const EMAIL = 'rr9121641237@gmail.com';

const headerHTML = `
<div class="topbar"><div class="container topbar-inner">
  <div><i class="fa-solid fa-tooth"></i> Yogesh Dental Lab · Hafeezpet, Hyderabad</div>
  <div class="top-links"><a href="tel:${PHONE}"><i class="fa-solid fa-phone"></i> ${DISPLAY_PHONE}</a><a href="mailto:${EMAIL}"><i class="fa-solid fa-envelope"></i> ${EMAIL}</a></div>
</div></div>
<nav class="nav"><div class="container nav-inner">
  <a class="brand" href="index.html"><span class="brand-mark"><i class="fa-solid fa-tooth"></i></span><span>Yogesh Dental Lab<small>Precision · Innovation · Artistry</small></span></a>
  <button class="menu-toggle" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>
  <div class="backdrop"></div>
  <div class="nav-links">
    <a data-nav href="index.html">Home</a><a data-nav href="about.html">About</a><a data-nav href="products.html">Products</a><a data-nav href="prices.html">Prices</a><a data-nav href="technologies.html">Technologies</a><a data-nav href="gallery.html">Gallery</a><a data-nav href="blog.html">Blog</a><a data-nav class="nav-cta" href="contact.html">Book Consultation</a>
  </div>
</div></nav>`;

const footerHTML = `
<footer class="footer"><div class="footer-top"><div class="container footer-grid">
  <div><div class="brand" style="color:#fff"><span class="brand-mark"><i class="fa-solid fa-tooth"></i></span><span>Yogesh Dental Lab<small style="color:#98abc9">Digital Dental Laboratory</small></span></div><p>We delivered perfect teeth on time. Precision, innovation, artistry and excellence in each smile, with 6+ years of industry experience.</p><div class="socials"><a href="https://wa.me/${PHONE}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a><a href="mailto:${EMAIL}"><i class="fa-solid fa-envelope"></i></a><a href="tel:${PHONE}"><i class="fa-solid fa-phone"></i></a></div></div>
  <div><h4>Quick Links</h4><div class="footer-list"><a href="about.html">About Us</a><a href="products.html">Products</a><a href="prices.html">Prices</a><a href="technologies.html">Technologies</a><a href="gallery.html">Gallery</a><a href="blog.html">Blog</a><a href="contact.html">Contact</a></div></div>
  <div><h4>Products</h4><div class="footer-list"><a href="products.html#zirconia">I-Dent Zirconia</a><a href="products.html#dmls">DMLS</a><a href="products.html#emax">E-MAX CAD</a><a href="products.html#implants">Implant Prosthesis</a><a href="products.html#guides">Surgical Guides</a><a href="products.html#aligners">Clear Aligners</a></div></div>
  <div><h4>Contact</h4><div class="footer-list"><span>3rd Floor, D Sapthagiri Colony,<br>Allwyn X Road, Hafeezpet,<br>Hyderabad, Telangana 500049</span><a href="tel:${PHONE}">${DISPLAY_PHONE}</a><a href="mailto:${EMAIL}">${EMAIL}</a><a href="https://www.google.com/maps/search/?api=1&query=3rd%20Floor%20D%20Sapthagiri%20Colony%20Allwyn%20X%20Road%20Hafeezpet%20Hyderabad%20500049" target="_blank" rel="noopener">Open Google Maps</a></div></div>
</div></div><div class="footer-bottom"><div>© <span id="year"></span> Yogesh Dental Lab. All rights reserved.</div><div>Designed as a fast, responsive static website.</div></div></footer>`;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-site-header]').forEach(el => el.innerHTML = headerHTML);
  document.querySelectorAll('[data-site-footer]').forEach(el => el.innerHTML = footerHTML);
  document.getElementById('year')?.replaceWith(Object.assign(document.createElement('span'), {id:'year', textContent:new Date().getFullYear()}));

  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  const backdrop = document.querySelector('.backdrop');
  const closeMenu = () => { links?.classList.remove('open'); backdrop?.classList.remove('open'); };
  toggle?.addEventListener('click', () => { links?.classList.toggle('open'); backdrop?.classList.toggle('open'); });
  backdrop?.addEventListener('click', closeMenu);
  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  const nav = document.querySelector('.nav');
  const navScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20);
  navScroll(); window.addEventListener('scroll', navScroll, {passive:true});

  const revealObs = new IntersectionObserver(entries => entries.forEach(e => {if(e.isIntersecting)e.target.classList.add('in')}), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  document.querySelectorAll('[data-count]').forEach(el => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    const duration = 1300;
    let started = false;
    const io = new IntersectionObserver(es => {
      if (es[0].isIntersecting && !started) {
        started = true; const t0 = performance.now();
        const tick = now => { const p = Math.min((now-t0)/duration,1); const n = Math.floor(target*(1-Math.pow(1-p,3))); el.textContent = n.toLocaleString()+suffix; if(p<1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick); io.disconnect();
      }
    }, {threshold:.7}); io.observe(el);
  });

  initGallery();
  initContactForm();
});

function initGallery(){
  const filters = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-gallery-item]');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    const val = btn.dataset.filter;
    items.forEach(item => {
      const show = val === 'all' || item.dataset.category === val;
      item.style.display = show ? '' : 'none';
    });
  }));
  const box = document.querySelector('.lightbox');
  const boxImg = document.querySelector('.lightbox img');
  const cap = document.querySelector('.lightbox-caption');
  const close = document.querySelector('.lightbox-close');
  items.forEach(item => item.addEventListener('click', () => {
    const image = item.querySelector('img'); if(!image || !box) return;
    boxImg.src = image.src; boxImg.alt = image.alt; cap.textContent = item.dataset.title || image.alt || 'Yogesh Dental Lab'; box.classList.add('open'); document.body.style.overflow='hidden';
  }));
  const closeBox = () => {box?.classList.remove('open');document.body.style.overflow='';};
  close?.addEventListener('click', closeBox); box?.addEventListener('click', e => {if(e.target===box) closeBox();});
  document.addEventListener('keydown', e => {if(e.key==='Escape') closeBox();});
}

function initContactForm(){
  const form = document.querySelector('#inquiryForm');
  const status = document.querySelector('#formStatus');
  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const msg = [
      'Hello Yogesh Dental Lab,',
      '',
      'I would like to enquire about a dental laboratory case.',
      `Dentist Name: ${data.dentist || ''}`,
      `Clinic Name: ${data.clinic || ''}`,
      `Phone: ${data.phone || ''}`,
      `Service Requested: ${data.service || ''}`,
      `Case Details: ${data.details || ''}`,
      '',
      'Please share the next steps, turnaround time and quotation.'
    ].join('\n');
    const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
    const mailSubject = encodeURIComponent(`Yogesh Dental Lab Inquiry - ${data.service || 'Dental Case'}`);
    const mailBody = encodeURIComponent(msg);
    window.open(`mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`, '_blank');
    window.location.href = waUrl;
    if(status) status.textContent = 'Opening WhatsApp and an email draft with your inquiry details...';
  });
}
