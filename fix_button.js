const fs = require('fs');
const glob = require('fs').readdirSync('.');
const htmlFiles = glob.filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Hardcode the back-to-top button
    content = content.replace(/<button class="back-to-top"[^>]*>[\s\S]*?<\/button>/g, '<button class="back-to-top" id="backToTop" type="button" aria-label="Move to top">\n          ↑ Move to Top\n        </button>');
    
    // Bump cache
    content = content.replace(/href="css\/style\.css\?v=\d+"/g, 'href="css/style.css?v=11"');
    
    fs.writeFileSync(file, content, 'utf8');
});
