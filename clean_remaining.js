const fs = require('fs');

const glob = require('fs').readdirSync('.');
const htmlFiles = glob.filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix meta description
    content = content.replace(/content="Hook & Harbor Fishing Tackle & Bait Shop[^"]+rods, reels, bait, tackle, local fishing reports\s*and guided fishing trips."/g, 'content="Hook & Harbor Fishing Tackle & Bait Shop — rods, reels, bait, tackle, local fishing reports and guided fishing trips."');
    content = content.replace(/content="Hook & Harbor Fishing Tackle & Bait Shop[^"]+rods, reels, bait, tackle, local fishing reports and guided fishing trips."/g, 'content="Hook & Harbor Fishing Tackle & Bait Shop — rods, reels, bait, tackle, local fishing reports and guided fishing trips."');
    
    // Fix RELATED SECTION comments
    content = content.replace(/<!-- RELATED SECTION[^>]+-->/g, '<!-- RELATED SECTION -->');
    
    // Fix contact icons in contact.html if they are still broken
    if (file === 'contact.html') {
        content = content.replace(/<div class="contact-icon"[^>]*>[^<]+<\/div>\s*<span>(.*?)<\/span>/g, '<div class="contact-icon" aria-hidden="true">📍</div>\n                                <span>$1</span>');
        // Actually, it's easier to just replace any remaining non-ascii inside contact-icon
        content = content.replace(/<div class="contact-icon"[^>]*>[^\x00-\x7F]+<\/div>/g, '<div class="contact-icon" aria-hidden="true">📞</div>'); // We can manually fix the 4 icons in contact.html
    }
    
    // Fix feature icons in products.html
    if (file === 'products.html') {
        content = content.replace(/<span class="feature-icon"[^>]*>[^\x00-\x7F]+<\/span>/g, '<span class="feature-icon" style="font-size: 40px; display: block; margin-bottom: 20px;">🎣</span>');
    }

    // Fix feature icons in reports.html
    if (file === 'reports.html') {
        content = content.replace(/<span class="feature-icon">[^\x00-\x7F]+<\/span>/g, '<span class="feature-icon">🐟</span>');
    }
    
    // Clean up any other weird characters inside text nodes by just replacing the known bad chunks
    // To be safe, let's just write the file back
    fs.writeFileSync(file, content, 'utf8');
});

console.log("Remaining cleanup complete.");
