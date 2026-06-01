(function() {
  var AUTH_KEY = 'lc_poetry_auth';
  var VALID = 'granted_2026';

  if (sessionStorage.getItem(AUTH_KEY) === VALID) return;

  // Create overlay
  var overlay = document.createElement('div');
  overlay.id = 'auth-gate';
  overlay.innerHTML = [
    '<div class="auth-box">',
    '  <h2>🔒 Study Notes</h2>',
    '  <p>Enter the password to access these notes.</p>',
    '  <input type="password" id="auth-input" placeholder="Password" autocomplete="off" />',
    '  <button id="auth-btn">Enter</button>',
    '  <p id="auth-error" style="display:none;color:#C96442;margin-top:10px;font-size:0.9rem;">Incorrect password. Try again.</p>',
    '</div>'
  ].join('\n');

  var style = document.createElement('style');
  style.textContent = [
    '#auth-gate { position:fixed; inset:0; z-index:99999; background:#FAF9F5; display:flex; align-items:center; justify-content:center; }',
    '.auth-box { background:#fff; border:1px solid #E8E6E1; border-radius:16px; padding:2.5rem; max-width:360px; width:90%; text-align:center; box-shadow:0 4px 20px rgba(0,0,0,0.08); }',
    '.auth-box h2 { color:#8A46CE; margin:0 0 0.5rem; font-size:1.5rem; }',
    '.auth-box p { color:#6F6F78; margin:0 0 1.2rem; font-size:0.95rem; }',
    '#auth-input { width:100%; padding:12px 16px; border:1px solid #E8E6E1; border-radius:10px; font-size:1rem; outline:none; transition:border-color 0.2s; }',
    '#auth-input:focus { border-color:#1C6BBB; }',
    '#auth-btn { margin-top:12px; width:100%; padding:12px; background:#1C6BBB; color:#fff; border:none; border-radius:10px; font-size:1rem; font-weight:600; cursor:pointer; transition:background 0.2s; }',
    '#auth-btn:hover { background:#1559a0; }'
  ].join('\n');

  document.head.appendChild(style);
  document.body.appendChild(overlay);

  function attempt() {
    var val = document.getElementById('auth-input').value;
    if (val.toLowerCase() === 'lc2026') {
      sessionStorage.setItem(AUTH_KEY, VALID);
      overlay.remove();
      style.remove();
    } else {
      document.getElementById('auth-error').style.display = 'block';
      document.getElementById('auth-input').value = '';
      document.getElementById('auth-input').focus();
    }
  }

  document.getElementById('auth-btn').addEventListener('click', attempt);
  document.getElementById('auth-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') attempt();
  });

  setTimeout(function() { document.getElementById('auth-input').focus(); }, 100);
})();
