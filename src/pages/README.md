# Velo Page Controllers (`src/pages/`)

This directory contains the page-level Velo controllers bound to the visual Wix Studio canvas.

---

## 1. Controller Directory & Page Mapping

| Page File | Page Name | Route | Core Responsibilities |
| :--- | :--- | :--- | :--- |
| `masterPage.js` | Global Master | All Pages | 3.5s Announcement ticker, sticky navigation, mobile drawer, mini-cart slide-out, live cart badge |
| `Home.zgshv.js` | Home | `/` | 14 sections, Hero CTAs, Trust bar, Best sellers repeater, Featured products, Reviews repeater, Newsletter |
| `Category Page.uyrzx.js` | Shop All | `/category-page` | Keyword search, Category filters, Price tiers (<₹200, ₹200–₹300, >₹300), In-stock toggle, Sorting |
| `Product Page.emhl2.js` | Product Detail | `/product-page/:slug` | Native PDP preservation, Tab navigation (Ingredients, Nutrition, Storage), Related products query |
| `Kerala Series.hi0ef.js` | Kerala Series | `/kerala-series` | Strict 4-item Kerala repeater query, Coconut oil storytelling, Malayalam sign-off (`~ നാടൻ രുചി ~`) |
| `Andhra Series.s7l8j.js` | Andhra Series | `/andhra-series` | Strict 5-item Andhra repeater query, Godavari jaggery lore, Telugu sign-off (`~ ఘుమఘుమలాడే రుచి ~`) |
| `Our Story.tgn3x.js` | Our Story | `/our-story` | 1987–2024 heritage timeline, 6 core values, 6-step artisanal process repeater |
| `CONTACT.e05d8.js` | Contact | `/contact` | Native Wix CRM form (`$w.WixFormsV2`), 8-item interactive FAQ accordion, Direct support channels |
| `Cart Page.m0kas.js` | Cart Page | `/cart-page` | Native `#shoppingCart1`, Dynamic ₹499 free shipping progress notice and meter |
| `Checkout.sx8gl.js` | Checkout | `/checkout` | Native `#checkout1` Level 1 PCI-DSS compliant checkout session handler |
| `Side Cart.samze.js` | Side Cart Drawer | Lightbox | Slide-out cart repeater, item stepper, subtotal, and direct checkout trigger |
| `Thank You Page.sbg1l.js` | Thank You | `/thank-you-page` | Native order confirmation, order tracking link, and tax invoice dispatch notice |
| `My Orders.uz2op.js` | My Orders | `/account/my-orders` | Member purchase history and parcel status |

---

## 2. Visual Canvas Element ID Contracts

When designing or modifying visual elements in the **Wix Studio Editor**, ensure element IDs match the controller contracts below:

### Global Master (`masterPage.js`)
* `#announcementText`: Text element cycling announcements every 3.5s.
* `#navHome`, `#navShop`, `#navKerala`, `#navAndhra`, `#navStory`, `#navContact`: Main navigation buttons.
* `#mobileMenuBtn`, `#mobileMenuBox`: Mobile drawer toggle and container.
* `#cartIconBtn`, `#cartBadge`: Cart icon and dynamic count badge.
* `#drawerItemsRepeater`: Mini-cart slide-out repeater.
* `#drawerSubtotalText`: Live subtotal display.
* `#drawerShippingMeter`: Free shipping threshold progress meter.

### Home (`Home.zgshv.js`)
* `#heroShopBtn`, `#heroStoryBtn`: Hero CTA action buttons.
* `#trustPillarsRepeater`: 6-pillar trust badge repeater.
* `#bestSellersRepeater`: Top 4 best-selling products repeater.
* `#featuredProductsRepeater`: Curated 8-product collection repeater.
* `#reviewsRepeater`: Customer testimonial repeater.
* `#newsletterEmail`, `#newsletterSubmitBtn`, `#newsletterSuccessBox`: Newsletter capture form.

### Shop All (`Category Page.uyrzx.js`)
* `#searchInput`: Debounced keyword search input.
* `#categoryRadioGroup`: Category selection radio buttons.
* `#priceFilterGroup`: Price tier selection radio buttons.
* `#inStockToggle`: Available inventory boolean switch.
* `#sortDropdown`: Dynamic sort order dropdown (`price-asc`, `price-desc`, `name-asc`).
* `#productGridRepeater`: Dynamic product card repeater.
* `#emptyStateBox`: Fallback container when no items match filters.

### Product Page (`Product Page.emhl2.js`)
* `#ingredientsTabBtn`, `#nutritionTabBtn`, `#storageTabBtn`: Storytelling tab switch buttons.
* `#ingredientsBox`, `#nutritionBox`, `#storageBox`: Tab content containers.
* `#relatedProductsRepeater`: 4-item related collection repeater.

### Contact (`CONTACT.e05d8.js`)
* `#faqRepeater`: 8-question interactive accordion repeater.
* `#faqToggleBtn`: Expand/collapse question chevron.
* `#faqAnswerText`: Expandable answer box.
