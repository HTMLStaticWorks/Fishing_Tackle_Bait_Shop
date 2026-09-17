import os
import re

files = [
    "index.html",
    "home2.html",
    "contact.html",
    "products.html",
    "reports.html",
    "trips.html"
]

for file in files:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove "Local fishing knowledge â€¢ Quality tackle â€¢ Guided trips" line
    # Depending on encoding it might be read slightly differently, we'll use a broad pattern
    content = re.sub(r'^[ \t]*<span>Local fishing knowledge.*Guided trips</span>\n?', '', content, flags=re.MULTILINE)

    # 2. Remove `<a href="contact.html">Contact</a>`
    # Also need to handle cases where it might have class="active" in contact.html
    content = re.sub(r'^[ \t]*<a (class="active" )?href="contact\.html">Contact</a>\n?', '', content, flags=re.MULTILINE)

    # 3. Move `<a class="nav-cta" href="contact.html">Enquire Now</a>` from `.nav-links` to `.nav-actions`
    cta_pattern = r'^[ \t]*<a class="nav-cta" href="contact\.html">Enquire Now</a>\n?'
    cta_match = re.search(cta_pattern, content, flags=re.MULTILINE)
    if cta_match:
        cta_str = cta_match.group(0)
        content = content.replace(cta_str, '')

        menu_btn_pattern = r'^([ \t]*)<button class="menu-btn"'
        
        def replace_func(m):
            indent = m.group(1)
            # The cta_str might have \n, we just construct cleanly
            return f'{indent}<a class="nav-cta" href="contact.html">Enquire Now</a>\n{indent}<button class="menu-btn"'
        
        content = re.sub(menu_btn_pattern, replace_func, content, flags=re.MULTILINE)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file}")
