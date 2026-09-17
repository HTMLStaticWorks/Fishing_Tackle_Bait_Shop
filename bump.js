const fs = require('fs');
const files = require('fs').readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/href="css\/style\.css\?v=\d+"/g, 'href="css/style.css?v=15"');
    fs.writeFileSync(file, content, 'utf8');
});
console.log("Bumped cache in HTML files.");
