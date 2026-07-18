// Nkwadi Events & Furniture Hire — shared behaviour
document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('nav.links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
      });
    });
  }

  // Scroll reveal animation
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';
      document.querySelectorAll('.faq-item').forEach(function (other) {
        other.setAttribute('data-open', 'false');
        other.querySelector('.faq-a').style.maxHeight = null;
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Quotation request form -> WhatsApp
  var WHATSAPP_NUMBER = '27632782436'; // 063 278 2436 in international format, no leading zero
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var eventType = form.eventType.value;
      var eventDate = form.eventDate.value;
      var guests = form.guests.value.trim();
      var message = form.message.value.trim();
      var services = Array.prototype.slice.call(form.querySelectorAll('input[name="services"]:checked'))
        .map(function (cb) { return cb.value; });

      if (!name || !phone || !eventType) {
        status.textContent = 'Please fill in your name, phone number and event type.';
        status.className = 'form-status error';
        return;
      }

      var lines = [
        'Hi Nkwadi, I would like a quote:',
        'Name: ' + name,
        'Phone: ' + phone,
        'Event type: ' + eventType,
        eventDate ? 'Event date: ' + eventDate : null,
        guests ? 'Guests: ' + guests : null,
        services.length ? 'Services needed: ' + services.join(', ') : null,
        message ? 'Details: ' + message : null
      ].filter(Boolean);

      var text = encodeURIComponent(lines.join('\n'));
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;

      status.textContent = 'Opening WhatsApp with your request…';
      status.className = 'form-status success';
      window.open(url, '_blank', 'noopener');
      form.reset();
    });
  }

  // Quick WhatsApp booking button (floating + header, if data attribute present)
  document.querySelectorAll('[data-whatsapp-quick]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var text = encodeURIComponent('Hi Nkwadi, I would like to book your services for an upcoming event.');
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;
      window.open(url, '_blank', 'noopener');
    });
  });

});
