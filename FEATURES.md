# 🌟 Portfolio Website - Abhishek P T

A stunning, modern, multi-page portfolio website with advanced features including dark/light mode, parallax effects, and smooth animations powered by Anime.js.

## ✨ Features

### 🎨 Design Features
- **Modern Glassmorphism Design** - Beautiful frosted glass effect with backdrop blur
- **Gradient Accents** - Eye-catching gradient colors throughout
- **Responsive Layout** - Fully responsive on all devices (mobile, tablet, desktop)
- **Professional Typography** - Clean, readable Poppins font

### 🌓 Dark/Light Mode
- Smooth theme switching with toggle button
- Theme preference saved in localStorage
- Seamless color transitions
- Optimized for both light and dark environments

### 🎬 Animations (Anime.js)
- **Page Load Animations** - Smooth fade-in on page load
- **Scroll Reveal** - Elements animate as you scroll down
- **Hover Effects** - Interactive card animations on hover
- **Button Animations** - Engaging button interactions
- **Text Animations** - Dynamic typing effect with Typed.js
- **Progress Bars** - Animated skill progress indicators
- **Radial Progress** - Circular professional skills display

### 🌊 Parallax Effects
- **Background Parallax** - Depth effect on scroll
- **Image Parallax** - Profile images move with scroll
- **Multi-layer Parallax** - Creates stunning depth perception

### 📱 Pages
1. **Home** (`index.html`)
   - Hero section with animated introduction
   - Profile showcase
   - Featured services cards
   - Quick links to resume and socials

2. **About** (`about.html`)
   - Personal story and background
   - Interactive highlight cards
   - Resume download and design portfolio links
   - Image hover effects

3. **Skills** (`skills.html`)
   - Technical skills with animated progress bars
   - Professional skills with radial charts
   - Expertise showcase with hover animations
   - Icon-based skill representation

4. **Projects** (`projects.html`)
   - Project showcase with image overlays
   - Interactive hover effects
   - Direct links to project documents
   - Categorized portfolio items

5. **Contact** (`contact.html`)
   - Contact information cards
   - Interactive contact form
   - Social media links
   - Animated form validation

### 🎯 Interactive Elements
- **Scroll Progress Bar** - Visual indicator of page scroll progress
- **Back to Top Button** - Quick navigation with smooth scroll
- **Smooth Scrolling** - Seamless page navigation
- **Intersection Observer** - Efficient scroll-triggered animations
- **Active Page Highlighting** - Navigation shows current page

### 🚀 Performance
- **Lightweight** - Optimized animations with Anime.js (only 17KB)
- **CSS Variables** - Easy theme customization
- **Modern CSS** - Uses latest CSS features (backdrop-filter, CSS Grid, Flexbox)
- **Lazy Loading** - Animations trigger only when visible

## 📁 File Structure

```
Portfolio/
│
├── index.html          # Home page
├── about.html          # About page
├── skills.html         # Skills page
├── projects.html       # Projects page
├── contact.html        # Contact page
│
├── files/
│   ├── style.css      # Main stylesheet with all modern features
│   └── script.js      # JavaScript with animations and interactions
│
└── img/               # Images directory
```

## 🎨 Color Scheme

### Dark Mode (Default)
- Background: `#0a0a0a`
- Secondary BG: `#131313`
- Text: `#ffffff`
- Accent: `#CF1512`

### Light Mode
- Background: `#f5f5f5`
- Secondary BG: `#ffffff`
- Text: `#1a1a1a`
- Accent: `#CF1512`

### Gradients
- Gradient 1: Purple (`#667eea` → `#764ba2`)
- Gradient 2: Pink (`#f093fb` → `#f5576c`)
- Gradient 3: Blue (`#4facfe` → `#00f2fe`)
- Gradient 4: Green (`#43e97b` → `#38f9d7`)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Variables
- **JavaScript (ES6+)** - Interactive functionality
- **Anime.js** (v3.2.1) - Lightweight animation library
- **Typed.js** (v2.0.16) - Typing animation
- **Boxicons** - Icon library
- **Font Awesome** - Additional icons

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 📝 Customization

### Change Theme Colors
Edit CSS variables in `files/style.css`:
```css
:root {
    --main-color: #YOUR_COLOR;
    --accent-color: #YOUR_COLOR;
}
```

### Add New Animations
Use Anime.js in `files/script.js`:
```javascript
anime({
    targets: '.your-element',
    translateY: [0, -20],
    duration: 800,
    easing: 'easeOutExpo'
});
```

### Modify Parallax Speed
Adjust the speed multiplier in `script.js`:
```javascript
element.style.transform = `translateY(${scrolled * 0.5}px)`;
// Change 0.5 to your desired speed
```

## 🚀 Quick Start

1. Clone or download the repository
2. Open `index.html` in your browser
3. Navigate between pages using the navigation menu
4. Try the dark/light mode toggle (moon/sun icon)
5. Scroll to see animations and parallax effects!

## 📱 Responsive Breakpoints

- Desktop: > 1200px
- Tablet: 768px - 1200px
- Mobile: < 768px

## 🎓 Learning Resources

- [Anime.js Documentation](https://animejs.com/documentation/)
- [CSS Backdrop Filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## 📄 License

This portfolio is created for Abhishek P T. Feel free to use it as inspiration for your own portfolio!

## 🤝 Credits

- **Design & Development**: Enhanced portfolio with modern web technologies
- **Animations**: Powered by Anime.js
- **Icons**: Boxicons & Font Awesome

---

Made with ❤️ and lots of ☕

**Version 2.0** - Enhanced Multi-Page Portfolio with Advanced Features
