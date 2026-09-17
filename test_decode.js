const strings = [
'Â©', 'Ã¢Â­Â ', 'Ã¢ËœÂ°', 'Ã¢ËœÂ¼', 'Ã¢â‚¬Â¢', 'Ã¢â‚¬â€ ', 'Ã¢â‚¬â€œ', 'Ã¢â€ â€˜', 'Ã¢â€šÂ¹', 
'Ã°Å¸Â Å¸', 'Ã°Å¸ÂªÂ ', 'Ã°Å¸Å½Â£', 'Ã°Å¸â€¢â€™', 'Ã°Å¸â€œÂ ', 'Ã°Å¸â€œÂ§', 'Ã°Å¸â€œÅ¾', 
'ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ', 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ', 'Ã‚Â©', 'â˜°', 'â˜¼', 'â†‘', 'â€¢', 
'ðŸŒ®Â ', 'ðŸŒŠ', 'ðŸŽ£'
];

function decodeMojibake(str) {
    let current = str;
    for (let i = 0; i < 4; i++) {
        try {
            const decoded = Buffer.from(current, 'latin1').toString('utf8');
            if (decoded.includes('') || decoded === current) break;
            current = decoded;
        } catch (e) {
            break;
        }
    }
    return current;
}

strings.forEach(s => {
    console.log(`${s}  =>  ${decodeMojibake(s)}`);
});
