# 🍽️ Ethereal - Premium Fine Dining Restaurant Website

A stunning, world-class restaurant website featuring sophisticated design, smooth animations, and exceptional user experience. Built with pure HTML, CSS, and JavaScript.

## ✨ Features

### 🎨 Design Excellence
- **Elegant Color Palette**: Sophisticated earth tones with gold accents
- **Premium Typography**: Cormorant Garamond for headings, Montserrat for body text
- **Smooth Animations**: AOS (Animate On Scroll) library integration
- **Parallax Effects**: Dynamic scrolling effects for immersive experience
- **Custom Cursor**: Optional enhanced cursor interaction (commented out by default)

### 📱 Fully Responsive
- **Mobile-First Design**: Optimized for all screen sizes
- **Touch-Friendly**: Perfect mobile navigation and interactions
- **Hamburger Menu**: Smooth mobile navigation experience
- **Adaptive Layouts**: Grid systems that adjust beautifully across devices

### 🎯 Key Sections

1. **Hero Section**
   - Auto-playing image slider with 3 stunning backgrounds
   - Smooth fade transitions with Ken Burns effect
   - Navigation dots and arrow controls
   - Scroll indicator animation

2. **About Section**
   - Engaging story with feature highlights
   - Animated experience badge (25+ years)
   - Image hover effects
   - Three key features with icons

3. **Signature Dishes Preview**
   - 3 featured dishes with hover effects
   - Image zoom on hover
   - "View Details" overlay buttons
   - Pricing display

4. **Menu Section**
   - Tabbed interface (Appetizers, Mains, Desserts, Beverages)
   - Smooth tab transitions
   - Detailed dish descriptions with pricing
   - Hover effects on menu items

5. **Gallery**
   - 6 high-quality food and restaurant images
   - Lightbox modal for full-size viewing
   - Zoom-in animations
   - Click to expand functionality

6. **Reservation System**
   - Beautiful contact form with floating labels
   - Form validation (email, phone, date, guests)
   - Success/error notifications
   - Opening hours and contact information

7. **Testimonials**
   - Sliding testimonial cards
   - 5-star ratings
   - Customer photos and credentials
   - Auto-sliding carousel

8. **Contact Section**
   - Contact information with icons
   - Embedded Google Maps
   - Social media links
   - Responsive grid layout

9. **Footer**
   - Newsletter subscription
   - Quick links
   - Policy links
   - Copyright information

### 🚀 Interactive Features

- **Smooth Scrolling**: Seamless navigation between sections
- **Sticky Navigation**: Navbar with scroll effect and background change
- **Active Link Highlighting**: Auto-updates based on scroll position
- **Scroll to Top Button**: Appears after scrolling down
- **Image Modal**: Click gallery images to view full-size
- **Form Validation**: Real-time validation with user feedback
- **Preloader**: Elegant loading animation on page load
- **Intersection Observer**: Optimized scroll-based animations

### 🎭 Animations

- **Fade In/Out**: Smooth element appearances
- **Slide In**: Elements sliding from different directions
- **Zoom Effects**: Image scaling on hover
- **Float Animation**: Floating badge effect
- **Ken Burns Effect**: Subtle image movement in hero
- **Loading Bar**: Animated preloader
- **Notification Slides**: Toast-style notifications

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Advanced styling with CSS Grid, Flexbox, animations
- **JavaScript (ES6+)**: Modern vanilla JavaScript
- **AOS Library**: Animate On Scroll
- **Font Awesome**: Icon library
- **Google Fonts**: Cormorant Garamond & Montserrat
- **Unsplash**: High-quality stock images

## 📁 Project Structure

```
out-of-thisworld/
│
├── index.html              # Main HTML file
├── README.md              # Project documentation
│
└── assets/
    ├── css/
    │   └── styles.css     # All styles and animations
    │
    ├── js/
    │   └── main.js        # All JavaScript functionality
    │
    └── images/            # Image assets folder (ready for custom images)
```

## 🚀 Getting Started

### Option 1: Direct Opening
1. Simply open `index.html` in your web browser
2. No server required for basic functionality

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## 🎨 Customization Guide

### Colors
Edit the CSS variables in `assets/css/styles.css`:
```css
:root {
    --primary-color: #2c2416;
    --secondary-color: #8b7355;
    --accent-gold: #d4af37;
    --accent-copper: #b87333;
    /* ... more colors */
}
```

### Images
Replace the Unsplash URLs in `index.html` with your own images:
- Hero slider: 3 images (1920x1080 recommended)
- About section: 1 image (800x600 recommended)
- Signature dishes: 3 images (600x400 recommended)
- Gallery: 6 images (800x600 recommended)

### Content
- **Restaurant Name**: Search and replace "Ethereal" in `index.html`
- **Menu Items**: Edit the menu sections in `index.html`
- **Contact Info**: Update phone, email, address in contact section
- **Social Links**: Update href attributes in footer social links

### Fonts
Change fonts by editing the Google Fonts import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR-FONT&display=swap" rel="stylesheet">
```

## 🌟 Advanced Features

### Enable Custom Cursor
Uncomment the last line in `assets/js/main.js`:
```javascript
// initCustomCursor(); // Remove the comment slashes
```

### Adjust Animation Speed
Modify AOS settings in `assets/js/main.js`:
```javascript
AOS.init({
    duration: 1000,  // Change animation duration
    once: true,      // Animation happens only once
    offset: 100,     // Offset from viewport
});
```

### Hero Slider Speed
Change auto-slide interval in `assets/js/main.js`:
```javascript
let autoSlide = setInterval(nextSlide, 5000); // 5000ms = 5 seconds
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Optimizations

- **Lazy Loading**: Images load as they enter viewport
- **CSS Animations**: Hardware-accelerated transforms
- **Intersection Observer**: Efficient scroll detection
- **Debounced Scroll Events**: Optimized scroll listeners
- **Minification Ready**: Code structure ready for minification

## 📝 SEO Features

- Semantic HTML5 elements
- Meta descriptions and keywords
- Alt text for all images
- Proper heading hierarchy
- Mobile-friendly design
- Fast loading times

## 🔧 Future Enhancements

- [ ] Backend integration for reservation system
- [ ] CMS integration for menu management
- [ ] Multi-language support
- [ ] Online ordering system
- [ ] Table availability calendar
- [ ] Customer review submission
- [ ] Blog section
- [ ] Email newsletter integration

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Credits

- **Design & Development**: Custom built from scratch
- **Images**: Unsplash (replace with your own)
- **Icons**: Font Awesome
- **Fonts**: Google Fonts
- **Animation Library**: AOS by Michał Sajnóg

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📞 Support

For questions or support, please refer to the documentation above or customize the contact section with your information.

---

**Built with ❤️ for exceptional dining experiences**

*Ethereal - Where passion meets perfection*

