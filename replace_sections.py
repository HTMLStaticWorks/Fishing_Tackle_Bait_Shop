import re
import glob

# The new HTML snippet to replace the old ones
NEW_SECTIONS = """        <!-- LATEST SECTIONS -->
        <section class="section" style="padding-bottom: 30px;">
            <div class="container">
                <div class="split-newsletter">
                    <div class="split-newsletter-media">
                        <img src="https://images.pexels.com/photos/13783256/pexels-photo-13783256.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Beautiful fishing spot" loading="lazy">
                    </div>
                    <div class="split-newsletter-content">
                        <span class="eyebrow-badge" style="background: rgba(255,255,255,0.2); color: #fff; margin-bottom: 15px; border:none;">Stay Updated</span>
                        <h2>Join the Angler's Club</h2>
                        <p>Get the latest local fishing reports, tackle reviews, and exclusive guided trip discounts delivered straight to your inbox.</p>
                        <form class="split-form" onsubmit="event.preventDefault();">
                            <input type="email" placeholder="Enter your email address" required>
                            <button type="submit" class="btn btn-primary" style="background:var(--accent); color:#000;">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" style="padding-top: 30px;">
            <div class="container">
                <div class="magazine-promo">
                    <div class="magazine-img-left">
                        <img src="https://images.pexels.com/photos/12906291/pexels-photo-12906291.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Fishing reel" loading="lazy">
                    </div>
                    <div class="magazine-content">
                        <span class="eyebrow-badge">Limited Offer</span>
                        <h2>Book Your Adventure</h2>
                        <p>Experience the thrill of a guided fishing trip with our local experts. Get 15% off your first full-day excursion.</p>
                        <a href="trips.html" class="btn btn-primary">Claim Offer</a>
                    </div>
                    <div class="magazine-img-right">
                        <img src="https://images.pexels.com/photos/7633013/pexels-photo-7633013.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Fisherman casting" loading="lazy">
                    </div>
                </div>
            </div>
        </section>"""

pattern = re.compile(r'<!-- LATEST SECTIONS -->.*?</main>', re.DOTALL)

for file_path in glob.glob('*.html'):
    if file_path == 'contact.html':
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<!-- LATEST SECTIONS -->' in content:
        new_content = pattern.sub(NEW_SECTIONS + '\n    </main>', content)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
