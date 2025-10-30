# 🎨 Complete Customization Guide - Ethereal Restaurant

## 🎯 Quick Customization (30 Minutes)

### 1. Change Restaurant Name

**File**: `index.html`

**Find and Replace**:
- Search: `Ethereal`
- Replace with: `Your Restaurant Name`

**Locations**:
- Page title (line ~7)
- Navigation logo (line ~35)
- Hero section (line ~75)
- Footer (line ~720)

---

### 2. Update Contact Information

**File**: `index.html`

**Phone Numbers**:
```html
<!-- Find: -->
+1 (555) 123-4567

<!-- Replace with: -->
Your actual phone number
```

**Email Addresses**:
```html
<!-- Find: -->
info@ethereal-dining.com

<!-- Replace with: -->
your@email.com
```

**Physical Address**:
```html
<!-- Find: -->
123 Gourmet Avenue
New York, NY 10001

<!-- Replace with: -->
Your actual address
```

---

### 3. Update Opening Hours

**File**: `index.html`

**Location**: Reservation section (~line 520)

```html
<p>Tue - Sat: 6:00 PM - 11:00 PM</p>
<p>Sun: 5:00 PM - 10:00 PM</p>
<p>Monday: Closed</p>
```

Change to your actual hours.

---

### 4. Customize Menu Items

**File**: `index.html`

**Location**: Menu section (~line 280)

**Template for each item**:
```html
<div class="menu-item" data-aos="fade-up">
    <div class="menu-item-header">
        <h3>Dish Name</h3>
        <span class="menu-price">$XX</span>
    </div>
    <p class="menu-description">Your description here</p>
</div>
```

**To Add New Item**:
1. Copy the entire `menu-item` div
2. Paste below existing items
3. Update name, price, and description

**To Remove Item**:
1. Delete the entire `menu-item` div

---

### 5. Update Social Media Links

**File**: `index.html`

**Location**: Footer section (~line 680)

```html
<a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
<a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
<a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
<a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
```

Replace `#` with your actual social media URLs.

---

## 🎨 Advanced Customization

### Change Color Scheme

**File**: `assets/css/styles.css`

**Location**: Top of file (~line 8)

```css
:root {
    /* Primary Colors */
    --primary-color: #2c2416;      /* Main dark color */
    --secondary-color: #8b7355;    /* Secondary brown */
    --accent-gold: #d4af37;        /* Gold accent */
    --accent-copper: #b87333;      /* Copper accent */
    
    /* Text Colors */
    --text-dark: #1a1a1a;          /* Dark text */
    --text-light: #f5f5f5;         /* Light text */
    --text-gray: #666;             /* Gray text */
    
    /* Background Colors */
    --bg-light: #fafafa;           /* Light background */
    --bg-dark: #0f0f0f;            /* Dark background */
}
```

**Popular Color Schemes**:

#### Modern Blue
```css
--primary-color: #1a2332;
--accent-gold: #4a90e2;
```

#### Elegant Purple
```css
--primary-color: #2d1b3d;
--accent-gold: #9b59b6;
```

#### Fresh Green
```css
--primary-color: #1b4332;
--accent-gold: #52b788;
```

#### Warm Orange
```css
--primary-color: #2c1810;
--accent-gold: #ff6b35;
```

---

### Change Fonts

**Step 1**: Choose fonts at [Google Fonts](https://fonts.google.com)

**Step 2**: Update font import in `index.html` (~line 11)

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR-HEADING-FONT&family=YOUR-BODY-FONT&display=swap" rel="stylesheet">
```

**Step 3**: Update CSS variables in `assets/css/styles.css`

```css
:root {
    --font-heading: 'Your Heading Font', serif;
    --font-body: 'Your Body Font', sans-serif;
}
```

**Recommended Combinations**:

1. **Classic Elegance**:
   - Heading: Playfair Display
   - Body: Lato

2. **Modern Minimal**:
   - Heading: Raleway
   - Body: Open Sans

3. **Luxury Feel**:
   - Heading: Cinzel
   - Body: Montserrat

4. **Contemporary**:
   - Heading: Poppins
   - Body: Inter

---

### Replace Images

#### Option 1: Use Your Own Images

**Step 1**: Place images in `assets/images/` folder

**Step 2**: Update image paths in `index.html`

**Before**:
```html
<img src="https://images.unsplash.com/photo-xxxxx" alt="Description">
```

**After**:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

**Recommended Image Sizes**:
- Hero slides: 1920x1080px
- About section: 800x600px
- Signature dishes: 600x400px
- Gallery: 800x600px
- Testimonials: 100x100px (circular)

#### Option 2: Use Different Stock Photos

**Free Stock Photo Sites**:
- [Unsplash](https://unsplash.com) - High quality, free
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images
- [Foodiesfeed](https://foodiesfeed.com) - Food-specific

**How to Use**:
1. Find image you like
2. Copy image URL
3. Replace existing URL in HTML

---

### Customize Hero Section

**File**: `index.html`

**Change Hero Text**:
```html
<p class="hero-subtitle">Welcome to</p>
<h1 class="hero-title">Ethereal</h1>
<p class="hero-description">A culinary journey beyond imagination</p>
```

**Change Hero Images**:
```html
<div class="hero-slide active">
    <div class="hero-bg" style="background-image: url('YOUR-IMAGE-URL')"></div>
</div>
```

**Add More Slides**:
1. Copy entire `hero-slide` div
2. Paste below existing slides
3. Remove `active` class
4. Update image URL

---

### Modify About Section

**File**: `index.html`

**Update Story**:
```html
<p class="about-text">
    Your restaurant's story here...
</p>
```

**Change Features**:
```html
<div class="feature-item">
    <div class="feature-icon">
        <i class="fas fa-your-icon"></i>
    </div>
    <div class="feature-text">
        <h4>Feature Title</h4>
        <p>Feature Description</p>
    </div>
</div>
```

**Find Icons**: [Font Awesome Icons](https://fontawesome.com/icons)

---

### Customize Animations

**File**: `assets/js/main.js`

**Change Animation Duration**:
```javascript
AOS.init({
    duration: 1000,  // Change to 500, 1500, 2000, etc.
    once: true,
    offset: 100,
});
```

**Change Hero Slider Speed**:
```javascript
let autoSlide = setInterval(nextSlide, 5000); // Change 5000 to desired milliseconds
```

**Change Testimonial Slider Speed**:
```javascript
setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
}, 6000); // Change 6000 to desired milliseconds
```

---

### Add New Menu Category

**File**: `index.html`

**Step 1**: Add tab button
```html
<button class="tab-btn" data-tab="your-category">Your Category</button>
```

**Step 2**: Add menu category section
```html
<div class="menu-category" id="your-category">
    <div class="menu-grid">
        <!-- Add menu items here -->
    </div>
</div>
```

---

### Customize Footer

**File**: `index.html`

**Add/Remove Footer Sections**:
```html
<div class="footer-section">
    <h4>Section Title</h4>
    <ul class="footer-links">
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
    </ul>
</div>
```

**Update Copyright**:
```html
<p>&copy; 2024 Your Restaurant Name. All rights reserved.</p>
```

---

### Modify Google Maps

**File**: `index.html`

**Get Your Map Embed Code**:
1. Go to [Google Maps](https://maps.google.com)
2. Search for your address
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace existing iframe in contact section

---

## 🎨 Style Customization

### Change Button Styles

**File**: `assets/css/styles.css`

**Find**: `.btn-primary` (~line 250)

```css
.btn-primary {
    background: var(--accent-gold);
    color: var(--primary-color);
    border: 2px solid var(--accent-gold);
    border-radius: 50px; /* Change for different shape */
}
```

**Button Shape Options**:
- `border-radius: 0;` - Square
- `border-radius: 5px;` - Slightly rounded
- `border-radius: 30px;` - Pill shape
- `border-radius: 50%;` - Circle (for icon buttons)

---

### Adjust Spacing

**File**: `assets/css/styles.css`

**Section Padding**:
```css
:root {
    --section-padding: 120px 0; /* Change to 80px, 100px, 150px, etc. */
}
```

**Container Width**:
```css
.container {
    max-width: 1400px; /* Change to 1200px, 1600px, etc. */
}
```

---

### Modify Navigation

**File**: `assets/css/styles.css`

**Sticky Navigation Background**:
```css
.navbar.scrolled {
    background: rgba(15, 15, 15, 0.98); /* Change color and opacity */
}
```

**Navigation Height**:
```css
.navbar {
    padding: 25px 0; /* Change to 15px, 30px, etc. */
}
```

---

## 🔧 Advanced Features

### Enable Custom Cursor

**File**: `assets/js/main.js`

**Find** (last lines):
```javascript
// Uncomment to enable custom cursor
// initCustomCursor();
```

**Change to**:
```javascript
// Uncomment to enable custom cursor
initCustomCursor();
```

---

### Add Favicon

**Step 1**: Create or download favicon (16x16 or 32x32 px)

**Step 2**: Place in root folder as `favicon.ico`

**Step 3**: Add to `index.html` in `<head>`:
```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

---

### Add More Gallery Images

**File**: `index.html`

**Copy this structure**:
```html
<div class="gallery-item" data-aos="zoom-in" data-aos-duration="800">
    <img src="YOUR-IMAGE-URL" alt="Description">
    <div class="gallery-overlay">
        <i class="fas fa-search-plus"></i>
    </div>
</div>
```

---

### Customize Form Fields

**File**: `index.html`

**Add New Field**:
```html
<div class="form-group">
    <input type="text" id="field-name" required>
    <label for="field-name">Field Label</label>
</div>
```

**Field Types**:
- `type="text"` - Text input
- `type="email"` - Email input
- `type="tel"` - Phone input
- `type="date"` - Date picker
- `type="time"` - Time picker
- `type="number"` - Number input

---

## 📱 Mobile Customization

### Adjust Mobile Breakpoints

**File**: `assets/css/styles.css`

**Find media queries** (~line 1100):
```css
@media (max-width: 768px) {
    /* Mobile styles */
}
```

Change `768px` to your preferred breakpoint.

---

### Customize Mobile Menu

**File**: `assets/css/styles.css`

**Mobile Menu Width**:
```css
.nav-menu {
    width: 80%; /* Change to 70%, 90%, etc. */
}
```

**Mobile Menu Background**:
```css
.nav-menu {
    background: var(--primary-color); /* Change color */
}
```

---

## 🎯 Performance Optimization

### Optimize Images

**Tools**:
- [TinyPNG](https://tinypng.com) - Compress PNG/JPG
- [Squoosh](https://squoosh.app) - Convert to WebP
- [ImageOptim](https://imageoptim.com) - Mac app

**Recommended**:
- Format: WebP or JPG
- Quality: 80-85%
- Max size: 500KB per image

---

### Minify CSS/JS (Optional)

**Tools**:
- [CSS Minifier](https://cssminifier.com)
- [JavaScript Minifier](https://javascript-minifier.com)

**Note**: Keep original files as backup!

---

## 🎉 Final Tips

1. **Test After Each Change**: Always test in browser
2. **Keep Backups**: Save original files
3. **Use Version Control**: Consider using Git
4. **Mobile First**: Always check mobile view
5. **Browser Testing**: Test in multiple browsers
6. **Ask for Feedback**: Get user opinions

---

**🌟 You now have complete control over your restaurant website!**

*Happy customizing!* 🎨

