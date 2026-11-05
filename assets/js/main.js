(function(){

  /* =========================================================
     CONFIGURATION — change these values for the real business
     ========================================================= */
  // Enter the business WhatsApp number in international format,
  // digits only, no "+", no spaces, no dashes. Example: "14155551234"
  var WHATSAPP_NUMBER = "447529499294";
  var CONTACT_EMAIL = "mentoshipserong@gmail.com";
  var DISCORD_URL = "https://discord.gg/F9rV4KPUnJ";

  function waLink(message){
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  // All WhatsApp/Discord links on the page are plain <a href> elements
  // (for instant, reliable navigation with no popup-blocker issues).
  // Their real hrefs are set here, from the single config above, so this
  // is the ONLY place you ever need to update the number/link.
  var genericMsg = "Hi Serong Ecom, I have a question about the mentorship programs.";
  ['waFloat', 'finalWaBtn', 'footerWaLink'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.href = waLink(genericMsg);
  });
  ['discordFloat', 'finalDiscordBtn', 'footerDiscordLink'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.href = DISCORD_URL;
  });
  var footerEmail = document.getElementById('footerEmail');
  if(footerEmail){ footerEmail.textContent = CONTACT_EMAIL; }

  /* =========== Mobile menu =========== */
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', function(){
    var open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ mobileMenu.classList.remove('open'); });
  });

  /* =========== FAQ accordion =========== */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(other){
        if(other !== item){
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if(isOpen){
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* =========== Pre-select plan from pricing CTA =========== */
  document.querySelectorAll('[data-plan]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var plan = btn.getAttribute('data-plan');
      var select = document.getElementById('service');
      if(select){
        Array.from(select.options).forEach(function(opt){
          if(opt.text === plan){ select.value = opt.value; }
        });
      }
    });
  });

  /* =========== Scroll reveal =========== */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* =========== Application form =========== */
  var form = document.getElementById('applyForm');
  var statusEl = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');

  function setError(fieldEl, show){
    var wrap = fieldEl.closest('.field');
    if(!wrap) return;
    wrap.classList.toggle('has-error', show);
  }

  function isValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isValidPhone(v){ return v.replace(/[^0-9]/g,'').length >= 7; }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var valid = true;

    var fullName = document.getElementById('fullName');
    if(!fullName.value.trim()){ setError(fullName, true); valid = false; } else { setError(fullName, false); }

    var whatsapp = document.getElementById('whatsapp');
    if(!isValidPhone(whatsapp.value)){ setError(whatsapp, true); valid = false; } else { setError(whatsapp, false); }

    var email = document.getElementById('email');
    if(!isValidEmail(email.value)){ setError(email, true); valid = false; } else { setError(email, false); }

    var hasStore = form.querySelector('input[name="hasStore"]:checked');
    var hasStoreField = document.querySelector('input[name="hasStore"]').closest('.field');
    if(!hasStore){ hasStoreField.classList.add('has-error'); valid = false; } else { hasStoreField.classList.remove('has-error'); }

    var situation = document.getElementById('situation');
    if(!situation.value){ setError(situation, true); valid = false; } else { setError(situation, false); }

    var service = document.getElementById('service');
    if(!service.value){ setError(service, true); valid = false; } else { setError(service, false); }

    var challenge = document.getElementById('challenge');
    if(!challenge.value.trim()){ setError(challenge, true); valid = false; } else { setError(challenge, false); }

    var goal = document.getElementById('goal');
    if(!goal.value.trim()){ setError(goal, true); valid = false; } else { setError(goal, false); }

    if(!valid){
      statusEl.textContent = "Please fill in all required fields.";
      statusEl.style.color = "#D14343";
      return;
    }

    statusEl.style.color = "var(--text-muted)";
    statusEl.textContent = "Submitting your application...";
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    var message =
      "Hi Serong Ecom, I just completed the mentorship application.\n" +
      "Name: " + fullName.value.trim() + "\n" +
      "WhatsApp: " + whatsapp.value.trim() + "\n" +
      "Email: " + email.value.trim() + "\n" +
      "Current Situation: " + situation.value + "\n" +
      "Interested In: " + service.value + "\n" +
      "Main Challenge: " + challenge.value.trim() + "\n" +
      "30-Day Goal: " + goal.value.trim() + "\n" +
      "I'd like to discuss the next steps.";

    // Open WhatsApp immediately (same click, no delay) so it isn't blocked as a popup.
    var link = document.createElement('a');
    link.href = waLink(message);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    statusEl.textContent = "Application received — opening WhatsApp...";
    submitBtn.disabled = false;
    submitBtn.textContent = "Apply Now";
  });

  /* =========== Proof/testimonial carousels: auto-scroll + full manual control =========== */
  document.querySelectorAll('.carousel-row').forEach(function(row){
    var track = row.querySelector('.carousel-track');
    if(!track) return;
    var reverse = track.classList.contains('proof-track-b');
    var setWidth = track.scrollWidth / 2;
    var speed = 55; // px per second auto-scroll pace
    var paused = false;
    var dragging = false;
    var startX = 0, startScroll = 0, moved = false;
    var resumeTimer = null;
    var dragSafety = null;
    var lastTs = null;

    row.scrollLeft = reverse ? setWidth : 1;

    function wrap(){
      setWidth = track.scrollWidth / 2;
      if(row.scrollLeft <= 0) row.scrollLeft += setWidth;
      else if(row.scrollLeft >= setWidth) row.scrollLeft -= setWidth;
    }

    function tick(ts){
      if(lastTs === null) lastTs = ts;
      var dt = (ts - lastTs) / 1000;
      lastTs = ts;
      if(!paused && !dragging && setWidth > 0){
        row.scrollLeft += speed * dt * (reverse ? -1 : 1);
        wrap();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Every pause is self-expiring — nothing can stay paused forever,
    // even if a matching "end" event (mouseleave/mouseup/touchend) never fires.
    function pauseFor(ms){
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function(){ paused = false; }, ms || 1200);
    }

    function endDrag(){
      if(!dragging) return;
      dragging = false;
      row.classList.remove('dragging');
      clearTimeout(dragSafety);
      wrap();
      pauseFor(1000);
    }

    row.addEventListener('mouseenter', function(){ pauseFor(2500); });
    row.addEventListener('mouseleave', function(){ if(!dragging) pauseFor(600); });

    // Faster manual scroll: mouse wheel (vertical) converts to horizontal
    row.addEventListener('wheel', function(e){
      if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
        row.scrollLeft += e.deltaY;
        e.preventDefault();
      }
      pauseFor(1200);
    }, { passive:false });

    // Click-and-drag scroll (desktop mouse), with a safety timeout so a
    // missed mouseup (e.g. releasing outside the window) can never freeze it.
    row.addEventListener('mousedown', function(e){
      dragging = true; moved = false;
      row.classList.add('dragging');
      startX = e.pageX; startScroll = row.scrollLeft;
      clearTimeout(resumeTimer);
      clearTimeout(dragSafety);
      dragSafety = setTimeout(endDrag, 8000);
    });
    window.addEventListener('mousemove', function(e){
      if(!dragging) return;
      var dx = e.pageX - startX;
      if(Math.abs(dx) > 3) moved = true;
      row.scrollLeft = startScroll - dx;
    });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('blur', endDrag);

    // Prevent image click firing right after a drag
    row.addEventListener('click', function(e){
      if(moved){ e.stopPropagation(); e.preventDefault(); moved = false; }
    }, true);

    // Touch swipe / trackpad: native scrolling already works via overflow-x:auto;
    // just pause auto-scroll while the person is actively touching it. The
    // pause self-expires, so an interrupted gesture (touchcancel, or the OS
    // swallowing the touch) can never leave it stuck.
    var touchSafety = null;
    row.addEventListener('touchstart', function(){
      clearTimeout(resumeTimer);
      clearTimeout(touchSafety);
      paused = true;
      touchSafety = setTimeout(function(){ paused = false; }, 6000);
    }, { passive:true });
    function endTouch(){
      clearTimeout(touchSafety);
      wrap();
      pauseFor(1500);
    }
    row.addEventListener('touchend', endTouch);
    row.addEventListener('touchcancel', endTouch);
  });


  var proofUnique = [];
  var proofSeen = {};
  document.querySelectorAll('.proof-card img').forEach(function(img){
    if(!proofSeen[img.src]){
      proofSeen[img.src] = true;
      proofUnique.push({ src: img.src, alt: img.alt });
    }
  });

  var lightbox = document.getElementById('proofLightbox');
  var lightboxImg = document.getElementById('proofLightboxImg');
  var lightboxCount = document.getElementById('proofLightboxCount');
  var lightboxIndex = 0;

  function openLightbox(src){
    lightboxIndex = proofUnique.findIndex(function(p){ return p.src === src; });
    if(lightboxIndex === -1) lightboxIndex = 0;
    renderLightbox();
    lightbox.classList.add('open');
  }
  function renderLightbox(){
    var item = proofUnique[lightboxIndex];
    if(!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCount.textContent = (lightboxIndex + 1) + " / " + proofUnique.length;
  }
  function closeLightbox(){ lightbox.classList.remove('open'); }
  function nextLightbox(){ lightboxIndex = (lightboxIndex + 1) % proofUnique.length; renderLightbox(); }
  function prevLightbox(){ lightboxIndex = (lightboxIndex - 1 + proofUnique.length) % proofUnique.length; renderLightbox(); }

  document.querySelectorAll('.proof-card img').forEach(function(img){
    img.addEventListener('click', function(){ openLightbox(img.src); });
  });
  document.getElementById('proofLightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('proofLightboxNext').addEventListener('click', nextLightbox);
  document.getElementById('proofLightboxPrev').addEventListener('click', prevLightbox);
  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function(e){
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') nextLightbox();
    if(e.key === 'ArrowLeft') prevLightbox();
  });

})();
