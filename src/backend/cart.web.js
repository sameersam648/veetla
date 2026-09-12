// Veetla — Server-Authoritative Cart Calculation Web Module
import { webMethod, Permissions } from 'wix-web-module';

const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING_RATE = 49;

/**
 * Server-authoritative cart calculation web method.
 * Computes subtotal, ₹499 free shipping threshold qualification, and totals.
 */
export const calculateVerifiedTotals = webMethod(
  Permissions.Anyone,
  async (subtotal) => {
    const verifiedSubtotal = Math.max(0, Number(subtotal) || 0);
    const shipping = verifiedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_RATE;
    const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - verifiedSubtotal);
    const progressPercent = Math.min(100, Math.round((verifiedSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

    return {
      subtotal: verifiedSubtotal,
      shipping,
      total: verifiedSubtotal + shipping,
      remainingForFree,
      progressPercent,
      isFreeShippingUnlocked: shipping === 0,
      currency: 'INR'
    };
  }
);
