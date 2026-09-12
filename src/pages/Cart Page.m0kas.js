// Veetla — Native Wix Stores Shopping Cart Page Controller
// Powered by Wix Studio and native Wix Stores #shoppingCart1 widget
import { currentCart } from 'wix-ecom-frontend';

const FREE_SHIPPING_THRESHOLD = 499;

$w.onReady(async function () {
  const shoppingCart = $w('#shoppingCart1');
  if (shoppingCart) {
    // Native Wix Stores Shopping Cart widget operates out-of-the-box on canvas
  }

  await updateFreeShippingMeter();

  try {
    if (currentCart.onChange) {
      currentCart.onChange(async () => {
        await updateFreeShippingMeter();
      });
    }
  } catch (err) {
    console.warn('[CartPage] Cart listener notice:', err);
  }
});

async function updateFreeShippingMeter() {
  const noticeElem = $w('#freeShippingNotice');
  const progressElem = $w('#shippingProgressBar');

  if (!noticeElem && !progressElem) return;

  try {
    const cart = await currentCart.getCurrentCart();
    const subtotal = Number(cart?.priceSummary?.subtotal?.amount || 0);

    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

    if (noticeElem) {
      if (remaining === 0 && subtotal > 0) {
        noticeElem.text = '🎉 Congratulations! You have unlocked FREE Shipping!';
      } else {
        noticeElem.text = `Add ₹${remaining} more to your cart to qualify for FREE shipping!`;
      }
    }

    if (progressElem) {
      progressElem.value = progressPercent;
    }
  } catch (err) {
    console.warn('[CartPage] Free shipping calculation notice:', err.message);
  }
}
