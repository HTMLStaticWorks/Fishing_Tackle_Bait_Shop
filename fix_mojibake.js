const fs = require('fs');
const path = require('path');

const replacements = {
    'Ã¢ËœÂ¼': '☼',          
    'Ã¢ËœÂ°': '☰',          
    'Ã¢â‚¬â€ ': '—',          
    'Ã‚Â©': '©',             
    'Ã¢â‚¬Â¢': '•',            
    'Ã¢â€ â€˜': '↑',          
    'Ã¢â€šÂ¹': '₹',           
    'Ã°Å¸Å’Â¤Ã¯Â¸Â': '🌮',     
    'Ã°Å¸Å’Å ': '🌊',         
    'Ã°Å¸Å½Â£': '🎣',         
    'Ã¢Å¡â„¢Ã¯Â¸Â': '⚙️',        
    'Ã°Å¸ÂªÂ±': '🪱',         
    'Ã°Å¸ÂªÂ ': '🪠',         
    'Ã¢â‚¬â„¢': '’',           
    'Ã¢â‚¬Å“': '“',           
    'Ã¢â‚¬Â ': '”',           
    'Ã°Å¸Â¦Â€': '🦀',         
    'Ã°Å¸Å’Â¤': '🌮',
};

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // First, let's try the automated cp1252 recovery for robustness!
    // Wait, node doesn't have native cp1252 easily without iconv-lite. Let's just use replaceAll.
    
    Object.keys(replacements).forEach(bad => {
        const good = replacements[bad];
        content = content.split(bad).join(good);
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
});
