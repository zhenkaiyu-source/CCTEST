# PowerShell script to create a simple ceramic-style icon
# This creates a 256x256 PNG icon with an orange gradient ceramic pot symbol

Add-Type -AssemblyName System.Drawing

$width = 256
$height = 256
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# Draw gradient background (orange theme)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF(0, 0)),
    (New-Object System.Drawing.PointF($width, $height)),
    [System.Drawing.Color]::FromArgb(217, 119, 6),  # #d97706
    [System.Drawing.Color]::FromArgb(245, 158, 11)   # #f59e0b
)
$graphics.FillRectangle($brush, 0, 0, $width, $height)

# Draw a simple ceramic pot shape (vase outline)
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 8)
$pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

$graphics.DrawArc($pen, 78, 40, 100, 60, 180, 180)  # Top curve
$graphics.DrawLine($pen, 128, 70, 128, 100)         # Neck
$graphics.DrawCurve($pen, @(New-Object System.Drawing.Point(78, 120),
                              New-Object System.Drawing.Point(50, 160),
                              New-Object System.Drawing.Point(78, 200)), 0.5)  # Body left
$graphics.DrawCurve($pen, @(New-Object System.Drawing.Point(178, 120),
                              New-Object System.Drawing.Point(206, 160),
                              New-Object System.Drawing.Point(178, 200)), 0.5)  # Body right
$graphics.DrawLine($pen, 78, 200, 178, 200)         # Bottom

# Add "瓷" character
$font = New-Object System.Drawing.Font("Microsoft YaHei", 72, [System.Drawing.FontStyle]::Bold)
$brushText = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$graphics.DrawString("瓷", $font, $brushText, 88, 80)

# Save as PNG
$bitmap.Save("$PSScriptRoot\public\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Icon created: $PSScriptRoot\public\icon.png"
