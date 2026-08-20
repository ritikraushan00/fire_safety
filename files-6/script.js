// FALCON FIRE SYSTEM — shared behaviour

document.addEventListener('DOMContentLoaded', function () {

  /* mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* product filter (products.html) */
  var filterBar = document.querySelector('.filter-bar');
  var cards = document.querySelectorAll('.product-card');
  if (filterBar && cards.length) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      cards.forEach(function (card) {
        var match = cat === 'all' || card.getAttribute('data-category') === cat;
        card.classList.toggle('hidden', !match);
      });
      var countEl = document.getElementById('resultCount');
      if (countEl) {
        var visible = document.querySelectorAll('.product-card:not(.hidden)').length;
        countEl.textContent = visible;
      }
    });
  }

  /* contact form -> prefilled WhatsApp message (contact.html) */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var product = form.product.value;
      var message = form.message.value.trim();
      var status = document.getElementById('formStatus');

      if (!name || !phone || !message) {
        status.textContent = 'Please fill in your name, phone number and enquiry before sending.';
        status.className = 'form-status show';
        return;
      }

      var text = 'Enquiry from website%0A' +
        'Name: ' + encodeURIComponent(name) + '%0A' +
        'Phone: ' + encodeURIComponent(phone) + '%0A' +
        'Product interested: ' + encodeURIComponent(product || 'Not specified') + '%0A' +
        'Message: ' + encodeURIComponent(message);

      status.textContent = 'Opening WhatsApp with your enquiry filled in \u2014 just hit send there.';
      status.className = 'form-status show ok';

      window.open('https://wa.me/917949090405?text=' + text, '_blank');
      form.reset();
    });
  }

  /* footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
