# Locava Website - Build Instructions

## Performance Optimization

### Minification

To minify CSS and JavaScript files for production:

1. Install dependencies:
```bash
npm install
```

2. Run minification:
```bash
npm run build
```

This will create:
- `styles.min.css` - Minified CSS
- `scripts.min.js` - Minified JavaScript

### Using Minified Files

To use minified files in production, update all HTML files to reference:
- `styles.min.css` instead of `styles.css`
- `scripts.min.js` instead of `scripts.js`

### Image Optimization

All images have been converted to WebP format for better performance. The original JPG/PNG files are kept as fallbacks.

## Deployment

### Netlify

The `_headers` file is configured for Netlify deployment with:
- Long-term caching for static assets (1 year)
- Security headers (HSTS, CSP, X-Frame-Options, etc.)
- Proper cache control for HTML files

### Files to Exclude

The following directories should NOT be deployed:
- `node_modules/` - Development dependencies
- `animation-sample/` - Sample/reference files
- `.git/` - Version control

These are already excluded in `.gitignore`.

## Performance Features

✅ WebP images with fallbacks
✅ Responsive images with srcset
✅ Lazy loading for below-the-fold images
✅ fetchpriority="high" on hero images
✅ Aspect ratios to prevent CLS
✅ Font-display: swap for web fonts
✅ Deferred JavaScript loading
✅ Preconnect to Google Fonts
✅ Reduced motion support
✅ Skip to content link
✅ JSON-LD structured data

## SEO Features

✅ Organization schema
✅ Breadcrumb schema on all pages
✅ FAQPage schema on FAQ page
✅ One H1 per page
✅ Proper heading hierarchy
✅ Descriptive alt text on all images
✅ Canonical URLs
✅ Open Graph tags
✅ Twitter Card tags

## Accessibility Features

✅ Skip to content link (visible on focus)
✅ Proper ARIA labels
✅ Keyboard navigation support
✅ Focus indicators
✅ Reduced motion support
✅ Semantic HTML
✅ Color contrast compliance

