// Apply the saved theme before styles paint to prevent a theme flash.
try { document.documentElement.dataset.theme = localStorage.getItem('vp-theme') === 'light' ? 'light' : 'dark'; }
catch { document.documentElement.dataset.theme = 'dark'; }
