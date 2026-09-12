// Veetla — Master Page Controller (Global Site Shell)
// Preserves native Wix Studio shopping cart icon (#shoppingCartIcon1),
// Members login bar (#membersLoginBar1), account navigation (#accountNavBar1),
// and main menu (#horizontalMenu1).
import wixLocation from 'wix-location';
import { currentCart } from 'wix-ecom-frontend';
import { ANNOUNCEMENTS } from 'public/veetla-content';

let announcementIndex = 0;

$w.onReady(async function () {
  initAnnouncementBar();
  initGlobalNavigation();
  initMobileMenu();
  await initMiniCartDrawer();
});

/**
 * Announcement bar rotator.
 * Rotates through 4 brand messages every 3.5 seconds.
 */
function initAnnouncementBar() {
  const textElem = $w('#announcementText');
  if (!textElem) return;

  textElem.text = ANNOUNCEMENTS[0];
  setInterval(() => {
    announcementIndex = (announcementIndex + 1) % ANNOUNCEMENTS.length;
    textElem.text = ANNOUNCEMENTS[announcementIndex];
  }, 3500);
}

/**
 * Header & navigation button bindings.
 */
function initGlobalNavigation() {
  $w('#logoBtn')?.onClick(() => wixLocation.to('/'));
  $w('#navHome')?.onClick(() => wixLocation.to('/'));
  $w('#navShop')?.onClick(() => wixLocation.to('/category-page'));
  $w('#navKerala')?.onClick(() => wixLocation.to('/kerala-series'));
  $w('#navAndhra')?.onClick(() => wixLocation.to('/andhra-series'));
  $w('#navStory')?.onClick(() => wixLocation.to('/our-story'));
  $w('#navContact')?.onClick(() => wixLocation.to('/contact'));
  $w('#shopNowBtn')?.onClick(() => wixLocation.to('/category-page'));

  // Mobile menu internal links if present
  $w('#mobNavHome')?.onClick(() => { closeMobileMenu(); wixLocation.to('/'); });
  $w('#mobNavShop')?.onClick(() => { closeMobileMenu(); wixLocation.to('/category-page'); });
  $w('#mobNavKerala')?.onClick(() => { closeMobileMenu(); wixLocation.to('/kerala-series'); });
  $w('#mobNavAndhra')?.onClick(() => { closeMobileMenu(); wixLocation.to('/andhra-series'); });
  $w('#mobNavStory')?.onClick(() => { closeMobileMenu(); wixLocation.to('/our-story'); });
  $w('#mobNavContact')?.onClick(() => { closeMobileMenu(); wixLocation.to('/contact'); });
  $w('#mobShopNowBtn')?.onClick(() => { closeMobileMenu(); wixLocation.to('/category-page'); });
}

/**
 * Mobile responsive navigation drawer toggle.
 */
function initMobileMenu() {
  const menuBtn = $w('#mobileMenuBtn');
  const menuBox = $w('#mobileMenuBox');

  if (menuBtn && menuBox) {
    menuBtn.onClick(() => {
      if (menuBox.collapsed) {
        menuBox.expand();
      } else {
        menuBox.collapse();
      }
    });
  }
}

function closeMobileMenu() {
  $w('#mobileMenuBox')?.collapse();
}

/**
 * Shopping Cart Badge & Mini-Cart Drawer Controller.
 * Integrates natively with wix-ecom-frontend currentCart.
 */
async function initMiniCartDrawer() {
  await refreshCartBadge();

  // Mini-cart drawer trigger
  $w('#cartIconBtn')?.onClick(async () => {
    const drawer = $w('#cartDrawerBox');
    if (drawer) {
      await updateDrawerContent();
      drawer.expand();
    } else {
      // Fallback to Cart Page if custom drawer is not on canvas
      wixLocation.to('/cart-page');
    }
  });

  $w('#closeDrawerBtn')?.onClick(() => {
    $w('#cartDrawerBox')?.collapse();
  });

  // Listen to cross-page cart state mutations
  try {
    if (currentCart.onChange) {
      currentCart.onChange(async () => {
        await refreshCartBadge();
        await updateDrawerContent();
      });
    }
  } catch (err) {
    console.warn('[MasterPage] Cart listener notice:', err);
  }
}

async function refreshCartBadge() {
  try {
    const cart = await currentCart.getCurrentCart();
    const count = cart?.lineItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
    const badge = $w('#cartBadge');
    if (badge) {
      if (count > 0) {
        badge.text = String(count);
        badge.show();
      } else {
        badge.hide();
      }
    }
  } catch (err) {
    console.warn('[MasterPage] Cart badge count notice:', err);
  }
}

async function updateDrawerContent() {
  const drawerRepeater = $w('#drawerItemsRepeater');
  if (!drawerRepeater) return;

  try {
    const cart = await currentCart.getCurrentCart();
    const items = cart?.lineItems || [];
    const subtotal = Number(cart?.priceSummary?.subtotal?.amount || 0);

    drawerRepeater.data = items.map(item => ({ _id: item._id, ...item }));
    drawerRepeater.onItemReady(($item, itemData) => {
      if ($item('#drawerItemName')) $item('#drawerItemName').text = itemData.productName?.original || itemData.name || '';
      if ($item('#drawerItemPrice')) {
        const lineTotal = Number(itemData.price?.amount || 0) * (itemData.quantity || 1);
        $item('#drawerItemPrice').text = `₹${lineTotal}`;
      }
      if ($item('#drawerItemQty')) $item('#drawerItemQty').text = String(itemData.quantity || 1);
      if ($item('#drawerItemImg') && itemData.image?.url) $item('#drawerItemImg').src = itemData.image.url;

      $item('#drawerQtyPlus')?.onClick(async () => {
        await currentCart.updateLineItemsQuantity([{ _id: itemData._id, quantity: itemData.quantity + 1 }]);
      });
      $item('#drawerQtyMinus')?.onClick(async () => {
        if (itemData.quantity > 1) {
          await currentCart.updateLineItemsQuantity([{ _id: itemData._id, quantity: itemData.quantity - 1 }]);
        }
      });
      $item('#drawerItemRemove')?.onClick(async () => {
        await currentCart.removeLineItems([itemData._id]);
      });
    });

    if ($w('#drawerSubtotal')) {
      $w('#drawerSubtotal').text = `₹${subtotal.toLocaleString('en-IN')}`;
    }

    // Free shipping threshold indicator (₹499 rule)
    const remaining = Math.max(0, 499 - subtotal);
    if ($w('#drawerShippingNotice')) {
      $w('#drawerShippingNotice').text = remaining === 0
        ? '🎉 Free Shipping Unlocked!'
        : `Add ₹${remaining} more for free shipping`;
    }

    if ($w('#drawerProgressBar')) {
      const pct = Math.min(100, Math.round((subtotal / 499) * 100));
      $w('#drawerProgressBar').value = pct;
    }

    $w('#drawerCheckoutBtn')?.onClick(async () => {
      try {
        const checkout = await currentCart.createCheckout();
        if (checkout?.checkoutUrl) {
          wixLocation.to(checkout.checkoutUrl);
        }
      } catch (err) {
        console.error('[MasterPage] Checkout initialization notice:', err);
        wixLocation.to('/cart-page');
      }
    });
  } catch (e) {
    console.warn('[MasterPage] Drawer content update notice:', e);
  }
}
