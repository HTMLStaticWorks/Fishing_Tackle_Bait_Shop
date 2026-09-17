const fs = require('fs');

let lines = fs.readFileSync('contact.html', 'utf8').split('\n');

// We want to delete:
// - Lines 192-217 (section compact)
// - Lines 219-255 (LATEST SECTIONS + newsletter + magazine)

// To be safe, we'll just reconstruct the file.
// Keep 0 to 190 (which is line index 190, so slice(0, 191))
// Keep line 217 (index 217) which is </section> for .page
// Keep line 255 onwards (index 255) which is </main>

// Let's verify the contents:
// console.log(lines[190]); // should be </section>
// console.log(lines[217]); // should be </section>
// console.log(lines[255]); // should be </main>

let newLines = [
    ...lines.slice(0, 191), // Up to closing section of contact-grid
    lines[217], // </section> (closing page)
    ...lines.slice(255) // </main> onwards
];

let finalContent = newLines.join('\n');
finalContent = finalContent.replace(/href="css\/style\.css\?v=\d+"/g, 'href="css/style.css?v=16"');

fs.writeFileSync('contact.html', finalContent, 'utf8');
console.log("Deleted the 3 promo sections from contact.html");
