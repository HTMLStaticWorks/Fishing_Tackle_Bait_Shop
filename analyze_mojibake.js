const fs = require('fs');
const glob = require('fs').readdirSync('.');

const htmlFiles = glob.filter(f => f.endsWith('.html'));
const weirdChars = new Set();
const weirdStrings = new Set();

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Regex to find sequences of non-ascii characters (excluding standard punctuation if possible, but let's just match any sequence of characters outside standard ASCII)
    const matches = content.match(/[^\x00-\x7F]+/g);
    if (matches) {
        matches.forEach(m => {
            weirdStrings.add(m);
            for (let i = 0; i < m.length; i++) {
                weirdChars.add(m[i]);
            }
        });
    }
});

console.log("Weird strings found:");
console.log(Array.from(weirdStrings).sort().join('\n'));
