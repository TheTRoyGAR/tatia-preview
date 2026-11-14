(function () {
  var f = document.getElementById('f'), msg = document.getElementById('msg'), go = document.getElementById('go');
  var url = (window.TATIA_CONFIG || {}).orderEndpoint || '';
  function say(t) { msg.textContent = t; msg.style.display = 'block'; }
  if (!url) { go.disabled = true; go.textContent = 'Order booking opens soon'; }
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!url) return;
    var d = Object.fromEntries(new FormData(f).entries());
    if (d.website) return;
    if (!d.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || '') || !/^\+?[0-9 ()\-]{7,20}$/.test((d.phone||'').trim()) || !d.place || !d.idea || !d.ok) {
      say('Please fill in your name, a valid email, your mobile number with country code, your city, your idea, and tick the box.'); return;
    }
    go.disabled = true;
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
      .then(function (r) { if (!r.ok) throw 0; f.reset(); say('Thank you. Your order booking was sent. TATIA™ brand will be in touch.'); })
      .catch(function () { go.disabled = false; say('Sorry, that did not send. Please try again in a moment.'); });
  });
})();
