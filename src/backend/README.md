# Velo Server Backend (`src/backend/`)

This directory houses the secure, server-side business logic and lifecycle hooks for **Veetla Artisan Foods**.

---

## 1. Web Modules

### `cart.web.js`
Authoritative cart validation engine.
* `verifyCartSubtotal(cartItems)`: Validates line items against active Wix Stores catalog pricing, checking for inventory availability and recalculating the true subtotal on the server.
* `getFreeShippingThreshold()`: Returns the authoritative threshold (`₹499`) and standard rate (`₹49`).

### `shipping.web.js`
Authoritative shipping rate calculator for domestic delivery in India.
* `calculateShippingRate(subtotal, tier)`:
  * If `subtotal >= 499`: Standard delivery is **₹0 (FREE)**.
  * If `subtotal < 499`: Standard delivery is **₹49**.
  * Express delivery: Always **₹99** regardless of subtotal.
  * Guarantees zero client-side manipulation of shipping charges during checkout session creation.

### `events.js`
eCommerce event listeners reacting to transactional triggers:
* `wixEcom_onOrderPaid(event)`:
  * Triggers when payment completes via Wix Hosted Checkout.
  * Generates a compliant 5% GST tax invoice via `@wix/invoicing`.
  * Sends automated customer notification and order summary.
* `wixEcom_onOrderCanceled(event)`:
  * Restores reserved inventory counts in Wix Stores.

---

## 2. Permissions (`permissions.json`)

Controls web module function invocations:

```json
{
  "web-methods": {
    "backend/shipping.web.js": {
      "calculateShippingRate": {
        "anonymous": true,
        "siteMember": true,
        "siteOwner": true
      }
    },
    "backend/cart.web.js": {
      "verifyCartSubtotal": {
        "anonymous": true,
        "siteMember": true,
        "siteOwner": true
      },
      "getFreeShippingThreshold": {
        "anonymous": true,
        "siteMember": true,
        "siteOwner": true
      }
    }
  }
}
```
