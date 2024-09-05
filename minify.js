const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify: minifyHtml } = require('html-minifier-terser');

const cssFilePath = 'style.css';
const htmlFiles = ['index.html', 'about.html', 'contact.html', 'pricing.html']; // List all HTML files

// Ensure the dist directory exists
const distDir = 'dist';
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Function to minify CSS
function minifyCss() {
  const css = fs.readFileSync(cssFilePath, 'utf8');
  const minifiedCss = new CleanCSS().minify(css).styles;
  fs.writeFileSync(path.join(distDir, path.basename(cssFilePath)), minifiedCss);
  console.log(`Minified CSS written to ${path.join(distDir, path.basename(cssFilePath))}`);
}

// Function to minify HTML
async function minifyHtmlFiles() {
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const minifiedHtml = await minifyHtml(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeAttributeQuotes: true,
    });
    fs.writeFileSync(path.join(distDir, path.basename(file)), minifiedHtml);
    console.log(`Minified HTML written to ${path.join(distDir, path.basename(file))}`);
  }
}

// Run the minification functions
minifyCss();
minifyHtmlFiles().catch(console.error);
