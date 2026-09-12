import { webMethod, Permissions } from 'wix-web-module';

const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING_RATE = 49;
const EXPRESS_SHIPPING_SURCHARGE = 99;

/**
 * Server-authoritative shipping calculation.
 * Preserves the Veetla business rules:
 * - Free shipping on orders >= ₹499
 * - Otherwise ₹49 standard shipping
 * - ₹99 optional express delivery
 */
export const calculateShippingOptions = webMethod(
  Permissions.Anyone,
  async (subtotal) => {
    const verifiedSubtotal = Math.max(0, Number(subtotal) || 0);
    const standardCost = verifiedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_RATE;
    const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - verifiedSubtotal);
    const progressPercent = Math.min(100, Math.round((verifiedSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

    return {
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      subtotal: verifiedSubtotal,
      remainingForFree,
      progressPercent,
      isFreeShippingUnlocked: standardCost === 0,
      methods: [
        {
          code: 'standard',
          title: 'Standard Delivery',
          description: '3 – 5 business days',
          cost: standardCost,
          isFree: standardCost === 0
        },
        {
          code: 'express',
          title: 'Express Delivery',
          description: '1 – 2 business days',
          cost: EXPRESS_SHIPPING_SURCHARGE,
          isFree: false
        }
      ]
    };
  }
);
