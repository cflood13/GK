# Background Gradient Animation

Animated gradient backgrounds adapted from [21st.dev](https://21st.dev) for vanilla JS/EJS.

## Quick Start

Add the `bg-gradient-animation` class to any container:

```html
<section class="bg-gradient-animation theme-construction" style="min-height: 100vh;">
  <!-- Your content here (will appear above the animation) -->
  <div style="position: relative; z-index: 10;">
    <h1>Your Content</h1>
  </div>
</section>
```

The animation auto-initializes on page load.

## Theme Variants

| Class | Description |
|-------|-------------|
| (default) | Blue/orange GK brand colors |
| `theme-construction` | Dark blue to black gradient |
| `theme-dark` | Purple/cyan cyberpunk style |
| `theme-sunset` | Orange/red warm gradient |

## Example: Hero Section with Animation

Replace your current hero section:

```html
<!-- Before -->
<section class="hero" style="background-image: url('/images/hero-bg.jpg');">
  <div class="hero-overlay"></div>
  ...
</section>

<!-- After: Gradient Animation Background -->
<section class="hero bg-gradient-animation theme-construction">
  <!-- Remove hero-overlay, the gradient provides the background -->
  <div class="hero-content" style="position: relative; z-index: 10;">
    ...
  </div>
</section>
```

## Custom Colors

Override CSS variables in your stylesheet:

```css
.bg-gradient-animation.theme-custom {
  --gradient-bg-start: rgb(YOUR_R, YOUR_G, YOUR_B);
  --gradient-bg-end: rgb(YOUR_R, YOUR_G, YOUR_B);
  --first-color: R, G, B;   /* No rgb(), just the values */
  --second-color: R, G, B;
  --third-color: R, G, B;
  --fourth-color: R, G, B;
  --fifth-color: R, G, B;
  --pointer-color: R, G, B; /* Mouse follow color */
  --size: 80%;              /* Size of gradient blobs */
  --blending: hard-light;   /* Blend mode */
}
```

## JavaScript API

```javascript
// Manual initialization
BackgroundGradientAnimation.init();

// Create on specific element
BackgroundGradientAnimation.create(element, { interactive: true });

// Destroy animation
BackgroundGradientAnimation.destroy(element);

// Destroy all
BackgroundGradientAnimation.destroyAll();
```

## Build Commands

```bash
# Build CSS once
npm run css:build

# Watch for changes (development)
npm run css:watch

# Development with auto-reload
npm run dev
```

## Using Tailwind Utility Classes

You can now use Tailwind utility classes anywhere in your EJS templates:

```html
<div class="flex items-center gap-4 p-6 bg-primary text-white rounded-lg shadow-lg">
  <span class="text-2xl font-bold">Hello Tailwind!</span>
</div>
```

Available brand colors:
- `bg-primary`, `text-primary`, `border-primary` (and `-light`, `-dark` variants)
- `bg-secondary`, `text-secondary`, `border-secondary` (and variants)
- `bg-gaf-red`, `bg-gaf-dark`

## Performance Notes

- Animation uses CSS transforms (GPU accelerated)
- Mouse tracking uses `requestAnimationFrame` for smooth 60fps
- Safari fallback uses simpler blur filter
- Total CSS addition: ~3KB minified
