# NEURON Tasks - Cyberpunk Design System

## Overview
A comprehensive design system for the NEURON Tasks application featuring a futuristic cyberpunk aesthetic with neon accents, glassmorphism effects, and neural network theming.

## Design Philosophy

### Core Principles
- **Futuristic Minimalism**: Clean interfaces with subtle sci-fi elements
- **Performance First**: Smooth 60fps animations optimized for mid-range devices
- **Accessibility**: High contrast ratios and clear focus indicators
- **Consistency**: Unified visual language across all components
- **Neural Theming**: AI/brain-inspired terminology and iconography

### Visual Identity
- **Theme**: Cyberpunk with neural network aesthetics
- **Mood**: Professional, futuristic, impressive for recruiters
- **Target**: SaaS tool that feels cutting-edge yet usable

## Color Palette

### Primary Colors
```css
/* Neon Green (Primary Brand) */
--neon-green: #00ff88
--neon-lime: #88ff00
--neon-dark: #00cc66

/* Neon Cyan (Secondary) */
--neon-cyan: #00ffff
--neon-blue: #0088ff

/* Dark Theme Base */
--cyber-darker: #0a0a0f
--cyber-dark: #1a1a2e
--cyber-card: #16213e
--cyber-border: #2a3f5f

/* Light Theme Base */
--light-bg: #ffffff
--light-card: #f8fafc
--light-border: #e2e8f0
```

### Semantic Colors
```css
/* Status Colors */
--success: #00ff88
--warning: #ffaa00
--error: #ff4444
--info: #00aaff

/* Priority Colors */
--priority-high: #ff4444
--priority-medium: #ffaa00
--priority-low: #00ff88

/* Neutral Grays */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
```

## Typography

### Font Families
```css
/* Primary Font - Clean & Modern */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Monospace Font - Code & Data */
font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

### Font Scales
```css
/* Headings */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; } /* 36px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* 30px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; } /* 24px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; } /* 20px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; } /* 18px */

/* Body Text */
.text-base { font-size: 1rem; line-height: 1.5rem; } /* 16px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; } /* 14px */
.text-xs { font-size: 0.75rem; line-height: 1rem; } /* 12px */
```

### Typography Usage
- **Headings**: Inter font, bold weight, sentence case
- **Body Text**: Inter font, regular weight
- **Code/Data**: JetBrains Mono, uppercase labels
- **Buttons**: Inter font, medium weight, uppercase
- **Captions**: Small size, gray color, monospace for technical data

## Layout System

### Grid & Spacing
```css
/* Container Sizes */
.container { max-width: 1200px; margin: 0 auto; }
.container-sm { max-width: 640px; }
.container-lg { max-width: 1400px; }

/* Spacing Scale (Tailwind-based) */
.space-1 { margin/padding: 0.25rem; } /* 4px */
.space-2 { margin/padding: 0.5rem; } /* 8px */
.space-3 { margin/padding: 0.75rem; } /* 12px */
.space-4 { margin/padding: 1rem; } /* 16px */
.space-6 { margin/padding: 1.5rem; } /* 24px */
.space-8 { margin/padding: 2rem; } /* 32px */
.space-12 { margin/padding: 3rem; } /* 48px */
```

### Responsive Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## Component Patterns

### Glass Morphism Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

/* Dark theme variant */
.dark .glass {
  background: rgba(22, 33, 62, 0.3);
  border: 1px solid rgba(42, 63, 95, 0.5);
}
```

### Holographic Cards
```css
.holographic-card {
  position: relative;
  background: linear-gradient(135deg, 
    rgba(0, 255, 136, 0.1) 0%, 
    rgba(0, 204, 102, 0.05) 100%);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 16px;
  overflow: hidden;
}

.holographic-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(0, 255, 136, 0.2), 
    transparent);
  transition: left 0.5s;
}

.holographic-card:hover::before {
  left: 100%;
}
```

### Neon Glow Effects
```css
.neon-glow {
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.neon-text {
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.neon-border {
  border: 2px solid #00ff88;
  box-shadow: 
    0 0 10px rgba(0, 255, 136, 0.3),
    inset 0 0 10px rgba(0, 255, 136, 0.1);
}
```

### Hover Lift Effect
```css
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

## Animation Patterns

### Framer Motion Variants
```javascript
// Page Transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Stagger Children
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hover Animations
const hoverVariants = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

// Loading Spinner
const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};
```

### CSS Transitions
```css
/* Standard Transitions */
.transition-colors { transition: color 0.15s ease-in-out; }
.transition-transform { transition: transform 0.15s ease-in-out; }
.transition-all { transition: all 0.15s ease-in-out; }

/* Smooth Scrolling */
html { scroll-behavior: smooth; }

/* Focus Transitions */
.input-focus {
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
```

## Component Library

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #00ff88, #00cc66);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 136, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #00ff88;
  border: 2px solid #00ff88;
  padding: 10px 22px;
}

/* Ghost Button */
.btn-ghost {
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
  border: 1px solid rgba(0, 255, 136, 0.3);
}
```

### Form Elements
```css
/* Input Fields */
.input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-family: 'Inter', sans-serif;
}

.input:focus {
  border-color: #00ff88;
  box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
  outline: none;
}

/* Select Dropdown */
.select {
  appearance: none;
  background-image: url("data:image/svg+xml...");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

/* Toggle Switch */
.toggle {
  width: 56px;
  height: 32px;
  background: #374151;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle.active {
  background: #00ff88;
}

.toggle::after {
  content: '';
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
  transition: transform 0.2s;
}

.toggle.active::after {
  transform: translateX(24px);
}
```

### Cards
```css
/* Base Card */
.card {
  background: rgba(22, 33, 62, 0.3);
  border: 1px solid rgba(42, 63, 95, 0.5);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

/* Task Card */
.task-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s ease;
}

.task-card:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Stats Card */
.stats-card {
  background: linear-gradient(135deg, 
    rgba(0, 255, 136, 0.1), 
    rgba(0, 204, 102, 0.05));
  border: 1px solid rgba(0, 255, 136, 0.2);
  text-align: center;
  padding: 20px;
}
```

### Navigation
```css
/* Sidebar */
.sidebar {
  width: 280px;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(42, 63, 95, 0.5);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40;
}

/* Navigation Item */
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: #9ca3af;
}

.nav-item:hover {
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
  transform: translateX(4px);
}

.nav-item.active {
  background: linear-gradient(135deg, 
    rgba(0, 255, 136, 0.2), 
    rgba(0, 204, 102, 0.1));
  color: #00ff88;
  border-left: 3px solid #00ff88;
}

/* Topbar */
.topbar {
  height: 80px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}
```

### Modals
```css
/* Modal Backdrop */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 50;
}

/* Modal Content */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(22, 33, 62, 0.95);
  border: 1px solid rgba(42, 63, 95, 0.8);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
}

/* Modal Header */
.modal-header {
  padding: 24px;
  border-bottom: 1px solid rgba(42, 63, 95, 0.5);
  background: rgba(0, 255, 136, 0.05);
}

/* Modal Body */
.modal-body {
  padding: 24px;
  overflow-y: auto;
}
```

## Iconography

### Icon System
- **Library**: Lucide React icons
- **Style**: Outline style, consistent stroke width
- **Sizes**: 16px, 20px, 24px, 32px
- **Colors**: Match text color or use accent colors

### Icon Usage Patterns
```javascript
// Standard Icon Sizes
<Icon className="w-4 h-4" /> // 16px - Small buttons, inline
<Icon className="w-5 h-5" /> // 20px - Navigation, form fields
<Icon className="w-6 h-6" /> // 24px - Headers, prominent buttons
<Icon className="w-8 h-8" /> // 32px - Large features, avatars

// Icon Colors
<Icon className="text-neon-green" /> // Primary actions
<Icon className="text-gray-400" /> // Secondary/inactive
<Icon className="text-red-400" /> // Destructive actions
<Icon className="text-amber-400" /> // Warnings
```

### Neural/AI Themed Icons
- **Brain**: AI Assistant, intelligence features
- **Zap**: Performance, energy, quick actions
- **Activity**: Analytics, monitoring, pulse
- **Cpu**: Processing, computation
- **Network**: Connections, integrations
- **Target**: Goals, objectives, focus

## Particle Effects

### Background Particles
```javascript
// Particle Configuration
const particleConfig = {
  count: 50, // Low count for performance
  size: { min: 1, max: 3 },
  speed: { min: 0.1, max: 0.5 },
  color: '#00ff88',
  opacity: { min: 0.1, max: 0.3 },
  connections: true,
  connectionDistance: 150
};

// Performance Optimizations
- Use requestAnimationFrame for smooth animation
- Limit particle count on mobile devices
- Use CSS transforms for GPU acceleration
- Implement viewport culling for off-screen particles
```

## Responsive Design

### Mobile-First Approach
```css
/* Base styles for mobile */
.container { padding: 16px; }
.sidebar { transform: translateX(-100%); }
.grid { grid-template-columns: 1fr; }

/* Tablet styles */
@media (min-width: 768px) {
  .container { padding: 24px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container { padding: 32px; }
  .sidebar { transform: translateX(0); }
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Component Adaptations
- **Navigation**: Collapsible sidebar on mobile
- **Cards**: Stack vertically on small screens
- **Modals**: Full-screen on mobile, centered on desktop
- **Forms**: Single column on mobile, multi-column on desktop

## Accessibility

### Focus Management
```css
/* Focus Indicators */
.focus-visible {
  outline: 2px solid #00ff88;
  outline-offset: 2px;
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #00ff88;
  color: black;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
}

.skip-link:focus {
  top: 6px;
}
```

### Color Contrast
- **Text on Dark**: Minimum 4.5:1 contrast ratio
- **Interactive Elements**: Minimum 3:1 contrast ratio
- **Focus Indicators**: High contrast, visible borders
- **Error States**: Clear color coding with text labels

### Keyboard Navigation
- **Tab Order**: Logical flow through interactive elements
- **Escape Key**: Close modals and dropdowns
- **Arrow Keys**: Navigate through lists and menus
- **Enter/Space**: Activate buttons and links

## Performance Guidelines

### Animation Performance
```css
/* Use transform and opacity for smooth animations */
.animate-smooth {
  transform: translateZ(0); /* Force GPU acceleration */
  will-change: transform, opacity;
}

/* Avoid animating layout properties */
/* ❌ Don't animate: width, height, padding, margin */
/* ✅ Do animate: transform, opacity, filter */
```

### Loading States
```javascript
// Skeleton Loading
const SkeletonCard = () => (
  <div className="glass rounded-lg p-4 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
  </div>
);

// Progressive Loading
- Show skeleton states immediately
- Load critical content first
- Use lazy loading for images and heavy components
- Implement virtual scrolling for large lists
```

### Bundle Optimization
- **Code Splitting**: Route-based and component-based
- **Tree Shaking**: Remove unused code
- **Image Optimization**: WebP format, responsive images
- **Font Loading**: Preload critical fonts, font-display: swap

## Dark/Light Theme System

### Theme Variables
```css
:root {
  /* Light theme */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
}

[data-theme="dark"] {
  /* Dark theme */
  --bg-primary: #0a0a0f;
  --bg-secondary: #1a1a2e;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --border-color: #374151;
}
```

### Theme Implementation
```javascript
// Theme Context
const ThemeContext = createContext();

// Theme Toggle
const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};
```

## Component Specifications

### Button Variants
1. **Primary**: Neon gradient, white text, hover lift
2. **Secondary**: Transparent background, neon border
3. **Ghost**: Subtle background, neon text
4. **Danger**: Red gradient for destructive actions
5. **Icon**: Square button with icon only

### Input Variants
1. **Default**: Glass background, neon focus
2. **Search**: With search icon, rounded corners
3. **Password**: With visibility toggle
4. **Select**: Custom dropdown arrow
5. **Textarea**: Resizable, minimum height

### Card Variants
1. **Basic**: Simple glass effect
2. **Holographic**: Animated shine effect
3. **Stats**: Centered content, large numbers
4. **Task**: Checkbox, priority indicators
5. **Feature**: Icon, title, description layout

## Implementation Notes

### CSS Custom Properties
```css
/* Use CSS variables for consistent theming */
.component {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
```

### Utility Classes
```css
/* Common utility patterns */
.glass { /* glassmorphism effect */ }
.neon-glow { /* neon glow effect */ }
.hover-lift { /* hover elevation */ }
.transition-smooth { /* smooth transitions */ }
.gradient-neon { /* neon gradient */ }
.text-glow { /* text glow effect */ }
```

### Component Composition
- **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
- **Compound Components**: Related components grouped together
- **Render Props**: Flexible component APIs
- **Hooks**: Reusable stateful logic

## Future Enhancements

### Planned Features
1. **Advanced Animations**: Micro-interactions, page transitions
2. **3D Elements**: CSS 3D transforms, WebGL effects
3. **Sound Design**: Subtle audio feedback
4. **Haptic Feedback**: Mobile vibration patterns
5. **AR/VR Ready**: Spatial design considerations

### Scalability
- **Design Tokens**: Centralized design values
- **Component Library**: Standalone package
- **Documentation**: Interactive component playground
- **Testing**: Visual regression testing
- **Performance**: Continuous monitoring

---

This design system serves as the foundation for maintaining consistency and quality across the NEURON Tasks application while enabling rapid development and future scalability.