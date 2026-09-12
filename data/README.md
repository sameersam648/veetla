# Data Schemas & Authoritative Catalog

This directory contains the production seed data and schema definitions for **Veetla Artisan Foods** on Wix Studio.

---

## 1. `wix-stores-catalog-import.json`

Authoritative JSON import payload configured for the native **Wix Stores** engine.

### Product Catalog Breakdown (10 Production SKUs)
1. **Banana Chips Combo** (`VTL-KRL-BCC`): Kerala Series Flagship Combo.
2. **Atreyapuram Mango Jelly** (`VTL-AND-AMJ`): Andhra Series Limited Edition Sweet.
3. **Salted Jackfruit Chips** (`VTL-KRL-SJC`): Kerala Series Seasonal Snack.
4. **Sweet Banana Chips** (`VTL-KRL-SBC`): Kerala Series Jaggery Coated Sweet.
5. **Salted Banana Chips** (`VTL-KRL-NBC`): Kerala Series Flagship Best Seller.
6. **Ajivot - 250 mL** (`VTL-WEL-AJV`): Specialty / Wellness Herbal Digestive Tonic.
7. **Jaggery Gavvalu** (`VTL-AND-JGV`): Andhra Series Shell Pastry.
8. **Onion Murruku** (`VTL-AND-OMK`): Andhra Series Crispy Savoury.
9. **Ribbon Pakodi** (`VTL-AND-RPK`): Andhra Series Spiced Ribbons.
10. **Pappu chekkalu** (`VTL-AND-PCK`): Andhra Series Chana Dal Crackers.

### Structure Specification
Each product entry defines:
* `id`, `name`, `slug`, `sku`
* `description`: Artisanal heritage narrative, cold-pressed coconut oil notes, regional origin.
* `price`: Authoritative base INR pricing.
* `ribbon`: Merchandising badge (`Best Seller`, `Traditional Heritage`, `Customer Favorite`, etc.).
* `collections`: Array of collection memberships (`all-products`, `kerala-series`, `andhra-series`, `specialty`).
* `variants`: Weight tiers (e.g. 200g, 400g, 800g, 1kg) with exact price differentials.
* `customFields`:
  * `Regional Series`: Kerala, Andhra, or Specialty.
  * `Key Ingredients`: Cold-pressed coconut oil, Nendran bananas, jaggery, spices.
  * `Shelf Life`: Storage and freshness duration (typically 45–90 days).
  * `Cultural Sign-off`: `~ നാടൻ രുചി ~` or `~ ఘుమఘుమలాడే రుచి ~`.

---

## 2. `reviews-cms-schema.json`

CMS Collection schema and verified customer testimonials for the `#reviewsRepeater` component on `Home.zgshv.js`.

### Fields
* `reviewerName` (Text)
* `reviewerLocation` (Text: e.g. Bengaluru, Kochi, Hyderabad)
* `rating` (Number: 5)
* `reviewTitle` (Text)
* `reviewText` (Text)
* `productPurchased` (Text)
* `isVerifiedBuyer` (Boolean: true)
* `reviewDate` (Date)
* `featured` (Boolean: true)
