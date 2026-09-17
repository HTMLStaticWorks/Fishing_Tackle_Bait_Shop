const fs = require('fs');

const mappings = {
    // Top-level meta description
    "Ã¢â‚¬â€": "—",
    "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â": "—",
    "ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â": "—",
    "A'A,AAAA,A,AAAA?sAA,A?": "—", // this might be powershell mangling
    
    // Header/Footer UI
    "â˜°": "☰",
    "Ã¢ËœÂ°": "☰",
    "â˜¼": "☼",
    "Ã¢ËœÂ¼": "☼",
    "Ã‚Â©": "©",
    "Â©": "©",
    "â€¢": "•",
    "Ã¢â‚¬Â¢": "•",
    "â†‘": "↑",
    "Ã¢â€ â€˜": "↑",

    // Pricing
    "Ã¢â€šÂ¹": "₹",
    "A?sA1": "₹",
    
    // Emojis from contact & products & reports
    "Ã°Å¸â€œÂ": "📍",
    "Ã°Å¸â€œÂ§": "📧",
    "Ã°Å¸â€œÅ¾": "📞",
    "Ã°Å¸â€¢â€™": "🕰️",
    
    "Ã°Å¸Â Å¸": "🐟",
    "Ã°Å¸ÂªÂ": "🪱",
    "Ã°Å¸Å½Â£": "🎣",
    "Ã¢Â­Â": "⭐",
    
    // From screenshots in reports.html:
    "ðŸŒ®Â": "🐟",
    "ðŸŒŠ": "🌊",
    "ðŸŽ£": "🎣",
    "dYOrA?": "🐟", // powershell output of ðŸŒ®Â
    "dYOS": "🌊",
    "dYZ": "🎣"
};

// Also we can just brute-force replace some known raw byte sequences
// Let's actually define the literal bytes we saw in the files
function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Double mojibake dashes
    content = content.replace(/ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â /g, '—');
    content = content.replace(/ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â /g, '—');
    content = content.replace(/Ã¢â‚¬â€œ/g, '–');
    content = content.replace(/Ã¢â‚¬â€ /g, '—');
    
    // Contact icons
    content = content.replace(/Ã°Å¸â€œÂ /g, '📍');
    content = content.replace(/Ã°Å¸â€œÂ§/g, '📧');
    content = content.replace(/Ã°Å¸â€œÅ¾/g, '📞');
    content = content.replace(/Ã°Å¸â€¢â€™/g, '🕰️');
    
    // Product icons
    content = content.replace(/Ã°Å¸Â Å¸/g, '🐟');
    content = content.replace(/Ã°Å¸ÂªÂ /g, '🪱');
    content = content.replace(/Ã°Å¸Å½Â£/g, '🎣');
    content = content.replace(/Ã¢Â­Â /g, '⭐');
    
    // Reports icons
    content = content.replace(/ðŸŒ®Â /g, '🐟');
    content = content.replace(/ðŸŒŠ/g, '🌊');
    content = content.replace(/ðŸŽ£/g, '🎣');
    
    // UI elements
    content = content.replace(/Ã¢â€ â€˜/g, '↑');
    content = content.replace(/â†‘/g, '↑');
    content = content.replace(/Ã¢ËœÂ°/g, '☰');
    content = content.replace(/â˜°/g, '☰');
    content = content.replace(/Ã¢ËœÂ¼/g, '☼');
    content = content.replace(/â˜¼/g, '☼');
    
    // Footer / generic
    content = content.replace(/Ã‚Â©/g, '©');
    content = content.replace(/Â©/g, '©');
    content = content.replace(/Ã¢â‚¬Â¢/g, '•');
    content = content.replace(/â€¢/g, '•');
    content = content.replace(/Ã¢â€šÂ¹/g, '₹');
    
    // Because sometimes `â†‘` is `Ã¢â€ â€˜` and if we replace `â†‘` first, we break the longer one.
    // That's why longer strings are first in the list.
    
    fs.writeFileSync(filePath, content, 'utf8');
}

const glob = require('fs').readdirSync('.');
const htmlFiles = glob.filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    cleanFile(file);
    console.log("Cleaned " + file);
});
