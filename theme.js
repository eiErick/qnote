const html = document.documentElement;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) html.classList.toggle('dark');
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) html.classList.toggle('light');

