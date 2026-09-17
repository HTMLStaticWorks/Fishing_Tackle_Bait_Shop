const fs = require('fs');
const files = ['products.html', 'reports.html', 'trips.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the border-radius styling
    content = content.replace(/border-bottom-left-radius:\s*40px;\s*border-bottom-right-radius:\s*40px;/g, '');
    
    // Clean up any double spaces or dangling semicolons that might have resulted
    content = content.replace(/margin-bottom: 40px; \s*"/g, 'margin-bottom: 40px;"');
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log("Removed curve from hero sections.");
