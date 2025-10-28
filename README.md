# 🚀 3D Animated Portfolio Website

A cutting-edge, fully responsive 3D animated portfolio website built with modern web technologies. Features immersive 3D scenes, smooth scroll-triggered animations, and cinematic transitions.

![Portfolio Preview](https://via.placeholder.com/800x400/0a0a0a/00ffff?text=3D+Portfolio+Website)

## ✨ Features

### 🎭 **Immersive 3D Experience**
- **React Three Fiber** for 3D scenes and animations
- **Wireframe sphere** and **particle systems** in the background
- **Mouse-following lights** and interactive 3D elements
- **Post-processing effects** (bloom, chromatic aberration, vignette)

### 🎬 **Cinematic Animations**
- **GSAP ScrollTrigger** for scroll-driven animations
- **Framer Motion** for smooth UI transitions
- **Anime.js** for fine-grained vector animations
- **Lenis** for buttery smooth scrolling

### 📱 **Responsive Design**
- **Mobile-first** approach with Tailwind CSS
- **Glassmorphism** design elements
- **Cyberpunk/futuristic** color palette
- **Performance optimized** for all devices

### 🎯 **Interactive Sections**

#### **Hero Section**
- 3D animated background with floating particles
- Glassmorphism card with animated text reveal
- Floating social links with hover effects

#### **About Section**
- Parallax 3D avatar with floating elements
- Animated text reveals and skill badges
- Interactive stats counter

#### **Skills Section**
- **3D orbiting skill icons** around a central logo
- Interactive 3D scene with drag controls
- Categorized skill display with hover effects

#### **Projects Section**
- **3D project preview modals** with Three.js
- Filter system with smooth transitions
- Hover animations and interactive cards

#### **Contact Section**
- **Animated SVG line drawing** around the form
- Interactive contact form with validation
- Animated submit states and success messages

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing

### **3D & Animation**
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **@react-three/postprocessing** - Post-processing effects
- **Three.js** - 3D graphics library

### **Animation Libraries**
- **GSAP** - Professional animation library
- **Framer Motion** - React animation library
- **Anime.js** - Lightweight animation library
- **Lenis** - Smooth scroll library

### **Styling**
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Glassmorphism and custom animations

## 🚀 Quick Start

### **Prerequisites**
- Node.js 16+ 
- npm or yarn

### **Installation**

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd 3d-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── LoadingScreen.jsx    # Animated loading screen
│   ├── Navigation.jsx       # Responsive navigation
│   └── Scene3D.jsx         # Main 3D background scene
├── sections/           # Page sections
│   ├── Hero.jsx            # Hero section with 3D background
│   ├── About.jsx           # About section with parallax
│   ├── Skills.jsx          # 3D orbiting skills
│   ├── Projects.jsx        # Projects with 3D modals
│   └── Contact.jsx         # Animated contact form
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles and Tailwind
```

## 🎨 Customization

### **Colors**
Update the color palette in `tailwind.config.js`:
```javascript
colors: {
  primary: '#0a0a0a',      // Dark background
  secondary: '#1a1a1a',    // Secondary dark
  accent: '#00ffff',       // Cyan accent
  'accent-pink': '#ff0080', // Pink accent
  'accent-purple': '#8000ff', // Purple accent
}
```

### **3D Elements**
Modify 3D objects in `src/components/Scene3D.jsx`:
- Change particle count and colors
- Adjust floating shapes
- Modify lighting and effects

### **Animations**
Customize animations in each section:
- **GSAP** animations for scroll triggers
- **Framer Motion** for UI transitions
- **Anime.js** for text and SVG animations

### **Content**
Update your personal information:
- **Hero section**: Name, title, description
- **About section**: Bio, skills, stats
- **Projects section**: Your actual projects
- **Contact section**: Your contact information

## 🔧 Performance Optimization

### **3D Performance**
- Uses `Suspense` for lazy loading 3D components
- Optimized particle counts for mobile devices
- Efficient use of `useFrame` hooks
- Post-processing effects with performance controls

### **Bundle Optimization**
- Vite's built-in code splitting
- Tree shaking for unused code
- Optimized asset loading
- Compressed production builds

### **Mobile Optimization**
- Reduced particle counts on mobile
- Touch-friendly interactions
- Responsive 3D scenes
- Optimized animations for 60fps

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

*Note: WebGL support required for 3D features*

## 🎯 SEO Features

- **Meta tags** for social sharing
- **Open Graph** protocol support
- **Semantic HTML** structure
- **Responsive images** and assets
- **Performance optimized** loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** community for amazing 3D web capabilities
- **React Three Fiber** team for the excellent React integration
- **GSAP** for professional animation tools
- **Tailwind CSS** for the utility-first approach

## 📞 Support

If you have any questions or need help customizing the portfolio:

- 📧 Email: hello@yourname.com
- 💼 LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourname)
- 🐦 Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

**Made with ❤️ and lots of ☕**

*Ready to create something amazing? Let's build the future of web experiences together!*


