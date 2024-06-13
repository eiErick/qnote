const html = document.documentElement;
if (html.classList[0] === 'system') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) html.classList.toggle('dark');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) html.classList.toggle('light');
}
