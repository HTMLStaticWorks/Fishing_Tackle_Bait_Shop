$files = Get-ChildItem -Filter "*.html"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # 1. Remove topbar text
    $content = $content -replace '(?m)^[ \t]*<span>Local fishing knowledge â€¢ Quality tackle â€¢ Guided trips</span>\r?\n?', ''

    # 2. Remove Contact navlink
    $content = $content -replace '(?m)^[ \t]*<a (?:class="active" )?href="contact\.html">Contact</a>\r?\n?', ''

    # 3. Move CTA button
    if ($content -match '(?m)^[ \t]*<a class="nav-cta" href="contact\.html">Enquire Now</a>\r?\n?') {
        $content = $content -replace '(?m)^[ \t]*<a class="nav-cta" href="contact\.html">Enquire Now</a>\r?\n?', ''
        
        $replacement = "`$1<a class=`"nav-cta`" href=`"contact.html`">Enquire Now</a>`r`n`$1`$2"
        $content = $content -replace '(?m)^([ \t]*)(<button class="menu-btn")', $replacement
    }

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}
