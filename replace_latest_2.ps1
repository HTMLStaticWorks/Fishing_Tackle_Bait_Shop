$reportsContent = @"
        <!-- LATEST SECTIONS -->
        <section class="section" style="padding-bottom: 30px;">
            <div class="container">
                <div class="minimal-capture">
                    <h2>Weekly Fishing Reports</h2>
                    <p>Get the latest catch data, water conditions, and hot spots delivered every Friday morning.</p>
                    <form onsubmit="event.preventDefault();">
                        <input type="email" placeholder="Enter your email address" required>
                        <button type="submit" class="btn btn-primary" style="background:var(--accent); color:#000;">Sign Up</button>
                    </form>
                </div>
            </div>
        </section>
        <section class="section" style="padding-top: 30px;">
            <div class="container">
                <div class="grid-promo">
                    <div class="grid-promo-images">
                        <img src="https://images.pexels.com/photos/12906291/pexels-photo-12906291.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Lake" loading="lazy">
                        <img src="https://images.pexels.com/photos/7633013/pexels-photo-7633013.jpeg?auto=compress&cs=tinysrgb&w=600" alt="River" loading="lazy">
                    </div>
                    <div class="grid-promo-content">
                        <span class="eyebrow-badge">Need more info?</span>
                        <h2>Talk to our local guides.</h2>
                        <p>Conditions change fast. If you're planning a trip and need up-to-the-minute advice on where the fish are biting, our guides are ready to help you plan your outing.</p>
                        <a href="contact.html" class="btn btn-primary" style="margin-top:20px;">Contact Guides</a>
                    </div>
                </div>
            </div>
        </section>
    </main>
"@

$tripsContent = @"
        <!-- LATEST SECTIONS -->
        <section class="section" style="padding-bottom: 30px;">
            <div class="container">
                <div class="floating-newsletter">
                    <div class="floating-newsletter-content">
                        <span class="eyebrow-badge" style="background: rgba(255,255,255,0.2); color: #fff; border:none; margin-bottom:15px;">Early Access</span>
                        <h2>Exclusive Trip Offers</h2>
                        <p>Join our VIP list to get early access to peak season booking dates before they open to the public.</p>
                        <form onsubmit="event.preventDefault();">
                            <input type="email" placeholder="Your best email address" required>
                            <button type="submit" class="btn btn-primary" style="background:var(--accent); color:#000;">Get Early Access</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" style="padding-top: 30px;">
            <div class="container">
                <div class="hero-promo">
                    <img src="https://images.pexels.com/photos/37409269/pexels-photo-37409269.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Successful fishing trip" loading="lazy">
                    <div class="hero-promo-card">
                        <span class="eyebrow-badge">Corporate & Groups</span>
                        <h2>Custom Group Outings</h2>
                        <p>Looking for a team-building event or a large family outing? We coordinate multi-boat trips with customized itineraries and catering options.</p>
                        <a href="contact.html" class="btn btn-primary">Enquire for Groups</a>
                    </div>
                </div>
            </div>
        </section>
    </main>
"@

$file = "reports.html"
$content = Get-Content $file -Raw
if ($content -match '(?s)<!-- LATEST SECTIONS -->.*?</main>') {
    $content = $content -replace '(?s)<!-- LATEST SECTIONS -->.*?</main>', $reportsContent
    Set-Content -Path $file -Value $content -Encoding UTF8
    Write-Host "Updated $($file)"
}

$file = "trips.html"
$content = Get-Content $file -Raw
if ($content -match '(?s)<!-- LATEST SECTIONS -->.*?</main>') {
    $content = $content -replace '(?s)<!-- LATEST SECTIONS -->.*?</main>', $tripsContent
    Set-Content -Path $file -Value $content -Encoding UTF8
    Write-Host "Updated $($file)"
}
