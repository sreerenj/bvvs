(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var nav = document.getElementById('nav');
  var toggle = document.querySelector('.nav-toggle');

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('i').className = 'fa-solid fa-bars';
      }
    });
  }

  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Product filter
  var filters = document.querySelectorAll('.filter');
  var products = document.querySelectorAll('.product[data-type]');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.dataset.filter;
      products.forEach(function (p) { p.hidden = f !== 'all' && p.dataset.type !== f; });
    });
  });

  // Product modal
  var modal = document.getElementById('product-modal');
  if (modal) {
    var lastFocus = null;
    var fill = function (p) {
      modal.querySelector('img').src = p.dataset.img;
      modal.querySelector('img').alt = p.dataset.name;
      modal.querySelector('[data-f="name"]').textContent = p.dataset.name;
      modal.querySelector('[data-f="desc"]').textContent = p.dataset.desc || '';
      modal.querySelector('[data-f="type"]').textContent = p.dataset.type;
      var q = modal.querySelector('[data-f="qty"]');
      q.textContent = p.dataset.qty || 'Contact us';
    };
    var close = function () {
      modal.classList.remove('is-open');
      if (lastFocus) lastFocus.focus();
    };
    products.forEach(function (p) {
      p.addEventListener('click', function () {
        lastFocus = p; fill(p); modal.classList.add('is-open');
        modal.querySelector('.modal-close').focus();
      });
    });
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    modal.querySelector('.modal-close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  // Contact form: opens the visitor's mail app with the message pre-filled
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = 'Name: ' + d.get('name') + '\nPhone: ' + d.get('phone') + '\nEmail: ' + d.get('email') + '\n\n' + d.get('message');
      var subject = '[' + d.get('topic') + '] Enquiry from website';
      window.location.href = 'mailto:bhaskaravilasam@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
