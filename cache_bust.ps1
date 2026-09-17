$files = Get-ChildItem -Filter "*.html"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Update css/style.css to css/style.css?v=2 to bust cache
    $content = $content -replace 'href="css/style\.css(\?v=\d+)?"', 'href="css/style.css?v=2"'

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}
