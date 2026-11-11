import fs from 'node:fs';
import path from 'node:path';

// Keep every public marketing subpage aligned with the homepage's shared chrome.
const source = fs.readFileSync('scripts/shared-footer.html', 'utf8');
const footer = source.match(/<footer\b[\s\S]*?<\/footer>/)[0];
const faviconTags = `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!file.endsWith('.html')) continue;
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace('</head>', faviconTags + '\n</head>');
    if (file === path.join('dist', 'index.html')) {
      fs.writeFileSync(file, html);
      continue;
    }
    html = html.replace(/<html\b([^>]*)>/i, (_, attrs) => {
      if (/class=/.test(attrs)) return '<html' + attrs.replace(/class="([^"]*)"/, 'class="$1 p101-subpage"') + '>';
      return '<html' + attrs + ' class="p101-subpage">';
    });
    html = html.replace(/<aside\b[^>]*class="social"[^>]*>[\s\S]*?<\/aside>/g, '');
    html = html.replace(/<footer\b[\s\S]*?<\/footer>/g, '');
    if (!html.includes('id="pay101-shared-header"')) html = html.replace(/<body\b[^>]*>/i, '$&<div id="pay101-shared-header"></div>');
    html = html.replace('</head>', '<link rel="stylesheet" href="/shared-header/header.css"><link rel="stylesheet" href="/pay101-footer.css"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/pay101-subpages.css"></head>');
    html = html.replace('</body>', footer + (html.includes('src="/shared-header/header.js"') ? '' : '<script type="module" src="/shared-header/header.js"></script>') + '</body>');
    fs.writeFileSync(file, html);
  }
}
walk('dist');
console.log('Applied homepage branding and shared footer to all static marketing subpages.');
