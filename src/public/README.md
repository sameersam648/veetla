# Shared Frontend Assets (`src/public/`)

This directory contains global styles and centralized static content shared across all Wix Studio pages and Velo controllers.

---

## 1. `veetla-theme.css`

Centralized design system tokens, typography rules, component classes, and animations.

### Design Tokens
* `--color-ivory: #F8F4EC` (Warm cream primary background)
* `--color-ivory-dark: #EDE6D6` (Alternating section background)
* `--color-forest: #264A35` (Signature brand green & primary buttons)
* `--color-forest-dark: #1B3627` (Deep forest footer & hover state)
* `--color-olive: #536841` (Secondary accent & category tags)
* `--color-brown: #3B2919` (Primary typography & Andhra series motif)
* `--color-brown-light: #6B5545` (Muted copy & metadata)
* `--color-gold: #A67C3D` (Premium accent, star ratings & borders)
* `--color-border: #D4C4A8` (Warm border dividers)
* `--color-card: #FFFFFF` (Card surface background)

### Typography
* **Headings:** `Playfair Display`, serif (400, 500, 600, 700, 800)
* **Body & UI:** `Poppins`, sans-serif (300, 400, 500, 600, 700)

### Reusable UI Classes
* `.veetla-btn-primary`: Signature forest green action button.
* `.veetla-btn-secondary`: Outlined forest button.
* `.veetla-btn-hero-secondary`: High-contrast ivory outline button for hero backdrops.
* `.veetla-btn-gold`: Gold accent action button.
* `.veetla-card`: Elevated product card with smooth hover lift (`translateY(-4px)`).
* `.veetla-line-art-divider`: 20px repeating SVG sine wave pattern.
* `.veetla-progress-track` & `.veetla-progress-fill`: Animated free shipping threshold tracker.

---

## 2. `veetla-content.js`

Central content store providing static brand copy, lore, and structured datasets:

* `ANNOUNCEMENTS`: 4 rotating promo lines displayed in the 3.5s header ticker.
* `TRUST_PILLARS`: 6 core quality badges (Cold-Pressed Coconut Oil, Traditional Recipes, Zero Preservatives, Small Batch Fresh, Direct Farm Sourcing, 100% Vegetarian).
* `CUSTOMER_REVIEWS`: 4 verified customer testimonials with 5-star ratings.
* `HERITAGE_TIMELINE`: Milestones from 1987 (Grandmother's kitchen in Alappuzha) to 2024 (Modern artisanal expansion).
* `CORE_VALUES`: 6 foundational brand pillars.
* `ARTISANAL_PROCESS`: 6-step craftsmanship methodology.
* `FAQS`: 8 accordion questions and answers covering ingredients, freshness, shipping, and storage.
* `PRODUCTS`: Reference catalog containing the 10 production SKUs with lore and ingredient metadata.
