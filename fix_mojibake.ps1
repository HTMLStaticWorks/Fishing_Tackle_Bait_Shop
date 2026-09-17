$files = Get-ChildItem -Filter "*.html"

$replacements = [ordered]@{
    "Ã¢ËœÂ¼" = "☼"
    "Ã¢ËœÂ°" = "☰"
    "Ã¢â‚¬â€ " = "—"
    "Ã‚Â©" = "©"
    "Ã¢â‚¬Â¢" = "•"
    "Ã¢â€ â€˜" = "↑"
    "Ã¢â€šÂ¹" = "₹"
    "Ã°Å¸Å’Â¤Ã¯Â¸Â" = "🌮"
    "Ã°Å¸Å’Å " = "🌊"
    "Ã°Å¸Å½Â£" = "🎣"
    "Ã¢Å¡â„¢Ã¯Â¸Â" = "⚙️"
    "Ã°Å¸ÂªÂ±" = "🪱"
    "Ã°Å¸ÂªÂ " = "🪠"
    "Ã¢â‚¬â„¢" = "’"
    "Ã¢â‚¬Å“" = "“"
    "Ã¢â‚¬Â " = "”"
    "Ã°Å¸Â¦Â€" = "🦀"
    "Ã°Å¸Å’Â¤" = "🌮"
}

foreach ($file in $files) {
    # Read as UTF8
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    foreach ($key in $replacements.Keys) {
        $val = $replacements[$key]
        $content = $content.Replace($key, $val)
    }
    
    # Save as UTF8
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Fixed $($file.Name)"
}
