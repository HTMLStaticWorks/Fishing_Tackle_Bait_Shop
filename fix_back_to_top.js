const fs = require('fs');
const glob = require('fs').readdirSync('.');
const htmlFiles = glob.filter(f => f.endsWith('.html'));

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; transition: transform 0.3s ease;" class="top-arrow-icon"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace any variation of the back-to-top button
    content = content.replace(/<button class="back-to-top"[^>]*>[\s\S]*?<\/button>/g, 
        `<button class="back-to-top" id="backToTop" type="button" aria-label="Move to top" style="display: flex; align-items: center; justify-content: center;">\n          ${svgIcon} Move to Top\n        </button>`);
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log("Replaced back-to-top button with SVG across all pages.");
