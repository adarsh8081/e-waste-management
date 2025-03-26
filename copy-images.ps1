$sourceDir = "D:\hack-pro\e-waste\products_images"
$destDir = "D:\hack-pro\e-waste-management\src\assets\products_images"

# Create destination directory if it doesn't exist
New-Item -ItemType Directory -Force -Path $destDir

# Copy each file individually
Copy-Item "$sourceDir\1.jpg" "$destDir\1.jpg"
Copy-Item "$sourceDir\2.png" "$destDir\2.png"
Copy-Item "$sourceDir\3.webp" "$destDir\3.webp"
Copy-Item "$sourceDir\4.avif" "$destDir\4.avif"
Copy-Item "$sourceDir\5.webp" "$destDir\5.webp"
Copy-Item "$sourceDir\6.avif" "$destDir\6.avif"
Copy-Item "$sourceDir\7.jpg" "$destDir\7.jpg"
Copy-Item "$sourceDir\8.jpg" "$destDir\8.jpg"
Copy-Item "$sourceDir\9.jpg" "$destDir\9.jpg"
Copy-Item "$sourceDir\10.jpg" "$destDir\10.jpg"
Copy-Item "$sourceDir\11.jpg" "$destDir\11.jpg"
Copy-Item "$sourceDir\12.jpg" "$destDir\12.jpg"
Copy-Item "$sourceDir\13.jpg" "$destDir\13.jpg"
Copy-Item "$sourceDir\14.webp" "$destDir\14.webp"
Copy-Item "$sourceDir\15.jpg" "$destDir\15.jpg" 