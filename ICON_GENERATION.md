# Icon Generation Guide

The app currently uses `favicon.svg` as the primary icon. To generate all required icon sizes for full PWA support, follow these steps:

## Option 1: Using Online Tools (Recommended)

1. **Visit [Favicon.io](https://favicon.io/favicon-converter/)**
   - Upload the `public/favicon.svg` file
   - Download the generated package
   - Extract and replace files in the `public/` folder

2. **Or use [RealFaviconGenerator](https://realfavicongenerator.net/)**
   - Upload `public/favicon.svg`
   - Customize settings for different platforms
   - Download and extract to `public/` folder

## Option 2: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Navigate to public folder
cd public

# Generate different sizes from SVG
convert favicon.svg -resize 16x16 favicon-16x16.png
convert favicon.svg -resize 32x32 favicon-32x32.png
convert favicon.svg -resize 180x180 apple-touch-icon.png
convert favicon.svg -resize 192x192 logo192.png
convert favicon.svg -resize 512x512 logo512.png

# Generate favicon.ico (multi-size)
convert favicon.svg -define icon:auto-resize=16,32,48 favicon.ico
```

## Option 3: Using Node.js Script

Install dependencies:
```bash
npm install --save-dev sharp
```

Create a script `generate-icons.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'logo192.png' },
  { size: 512, name: 'logo512.png' }
];

async function generateIcons() {
  const svgBuffer = fs.readFileSync('./public/favicon.svg');
  
  for (const { size, name } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`./public/${name}`);
    console.log(`Generated ${name}`);
  }
}

generateIcons().catch(console.error);
```

Run: `node generate-icons.js`

## Required Icon Files

The following files should be in the `public/` folder:

- ✅ `favicon.svg` - Modern browsers (already created)
- ⏳ `favicon.ico` - Legacy browsers
- ⏳ `favicon-16x16.png` - Small favicon
- ⏳ `favicon-32x32.png` - Standard favicon
- ⏳ `apple-touch-icon.png` - iOS home screen (180x180)
- ⏳ `logo192.png` - PWA icon (192x192)
- ⏳ `logo512.png` - PWA icon (512x512)
- ⏳ `safari-pinned-tab.svg` - Safari pinned tab
- ⏳ `mstile-150x150.png` - Windows tile

## Quick Fix (Temporary)

If you need to deploy immediately without all icons:

1. The SVG favicon will work in modern browsers
2. Copy `favicon.svg` to `favicon.ico` as a temporary placeholder
3. Generate proper icons later using one of the methods above

## Testing Icons

After generating icons:

1. Clear browser cache
2. Visit your site
3. Check browser tab for favicon
4. Test PWA installation on mobile
5. Verify icons appear correctly on home screen

## Notes

- SVG favicons are supported by most modern browsers
- PNG icons are required for PWA installation
- ICO format is needed for older browsers
- Apple touch icons should be 180x180px minimum
- PWA icons should be 192x192px and 512x512px