import os
import glob

def fix_mojibake():
    html_files = glob.glob('*.html')
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Some mojibake strings might be double encoded or weird, let's replace manually for safety
        replacements = {
            'Ã¢ËœÂ¼': '☼',          # Sun
            'Ã¢ËœÂ°': '☰',          # Hamburger
            'Ã¢â‚¬â€ ': '—',          # Em dash
            'Ã‚Â©': '©',             # Copyright
            'Ã¢â‚¬Â¢': '•',            # Bullet
            'Ã¢â€ â€˜': '↑',          # Up arrow
            'Ã¢â€šÂ¹': '₹',           # Indian Rupee
            'Ã°Å¸Å’Â¤Ã¯Â¸Â': '🌦️',     # Weather/cloud? Or maybe it's just meant to be an emoji
            'Ã°Å¸Å’Å ': '🌊',         # Wave
            'Ã°Å¸Å½Â£': '🎣',         # Fishing pole
            'Ã¢Å¡â„¢Ã¯Â¸Â': '⚙️',        # Gear
            'Ã°Å¸ÂªÂ±': '🪱',         # Worm
            'Ã°Å¸ÂªÂ': '🪠',         # Plunger (or maybe 🪤 trap?)
            'Ã¢â‚¬â„¢': '’',           # Right single quote
            'Ã¢â‚¬Å“': '“',           # Left double quote
            'Ã¢â‚¬Â ': '”',           # Right double quote
            'Ã¢â‚¬': '’',            # generic fallback
            'Ã¯Â¸Â': '',             # Variation selector
            'Ã°Å¸Å’Â¤': '🌮',         # Taco
            'Ã°Å¸Â¦Â€': '🦀',         # Crab
        }
        
        # We can also attempt programmatic recovery
        def recover(text):
            try:
                # Mojibake string -> encode as cp1252 -> decode as utf-8
                return text.encode('cp1252').decode('utf-8')
            except Exception:
                return text
        
        # We will use programmatic recovery for the entire file because manual dictionary might miss some
        try:
            # First encode the current UTF-8 string into cp1252 bytes
            raw_bytes = content.encode('cp1252')
            # Decode the bytes back to UTF-8
            recovered_content = raw_bytes.decode('utf-8')
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(recovered_content)
            print(f"Successfully recovered {file} using cp1252 encoding.")
        except Exception as e:
            print(f"Programmatic recovery failed for {file}: {e}")
            # Fallback to manual dictionary replacement
            for bad, good in replacements.items():
                content = content.replace(bad, good)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Used dictionary replacement for {file}.")

if __name__ == '__main__':
    fix_mojibake()
