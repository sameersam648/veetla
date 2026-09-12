// Veetla — Home Page Controller (Wix Studio)
// Recreates the visual design, interactive repeaters, and user journeys of the React original.
// Powered dynamically by live Wix Stores products and the central brand content repository.
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { currentCart } from 'wix-ecom-frontend';
import {
  TRUST_PILLARS,
  WHY_CHOOSE_ITEMS,
  CUSTOMER_REVIEWS
} from 'public/veetla-content';

const WIX_STORES_APP_ID = '215238eb-2247-491a-ad38-e50b8022f74e';

$w.onReady(async function () {
  initHeroActions();
  initCollectionCards();
  initStaticRepeaters();
  initNewsletterForm();
  await initDynamicProductRepeaters();
});

/**
 * Hero Section CTA buttons and navigation.
 */
function initHeroActions() {
  $w('#heroShopBtn')?.onClick(() => wixLocation.to('/category-page'));
  $w('#heroStoryBtn')?.onClick(() => wixLocation.to('/our-story'));
  $w('#readOurStoryBtn')?.onClick(() => wixLocation.to('/our-story'));
  $w('#storyTeaserBtn')?.onClick(() => wixLocation.to('/our-story'));
}

/**
 * Regional Collection feature cards (Kerala & Andhra Series).
 */
function initCollectionCards() {
  $w('#keralaCollectionCard')?.onClick(() => wixLocation.to('/kerala-series'));
  $w('#keralaSeriesBtn')?.onClick(() => wixLocation.to('/kerala-series'));
  $w('#exploreKeralaLoreBtn')?.onClick(() => wixLocation.to('/kerala-series'));

  $w('#andhraCollectionCard')?.onClick(() => wixLocation.to('/andhra-series'));
  $w('#andhraSeriesBtn')?.onClick(() => wixLocation.to('/andhra-series'));
  $w('#exploreAndhraLoreBtn')?.onClick(() => wixLocation.to('/andhra-series'));
}

/**
 * Initializes static brand content repeaters (Trust Bar, Why Choose, Customer Reviews).
 */
function initStaticRepeaters() {
  // Trust Bar Repeater
  const trustRepeater = $w('#trustBarRepeater') || $w('#trustRepeater');
  if (trustRepeater) {
    trustRepeater.data = TRUST_PILLARS.map((item, idx) => ({ _id: `trust-${idx}`, ...item }));
    trustRepeater.onItemReady(($item, itemData) => {
      if ($item('#trustTitle')) $item('#trustTitle').text = itemData.title;
      if ($item('#trustDesc')) $item('#trustDesc').text = itemData.description;
    });
  }

  // Why Choose Veetla Repeater
  const whyRepeater = $w('#whyChooseRepeater');
  if (whyRepeater) {
    whyRepeater.data = WHY_CHOOSE_ITEMS.map((item, idx) => ({ _id: `why-${idx}`, ...item }));
    whyRepeater.onItemReady(($item, itemData) => {
      if ($item('#whyTitle')) $item('#whyTitle').text = itemData.title;
      if ($item('#whyDesc')) $item('#whyDesc').text = itemData.description;
    });
  }

  // Customer Reviews Repeater
  const reviewsRepeater = $w('#homeReviewsRepeater') || $w('#reviewsRepeater');
  if (reviewsRepeater) {
    reviewsRepeater.data = CUSTOMER_REVIEWS.map((item, idx) => ({ _id: `rev-${idx}`, ...item }));
    reviewsRepeater.onItemReady(($item, itemData) => {
      if ($item('#reviewAuthor')) $item('#reviewAuthor').text = itemData.name;
      if ($item('#reviewLocation')) $item('#reviewLocation').text = itemData.location;
      if ($item('#reviewText')) $item('#reviewText').text = `“${itemData.text}”`;
      if ($item('#reviewRating')) $item('#reviewRating').text = '★★★★★';
    });
  }
}

/**
 * Initializes Best Sellers and Featured Products repeaters from Wix Stores live catalog.
 */
async function initDynamicProductRepeaters() {
  // Best Sellers Repeater
  const bestSellersRepeater = $w('#bestSellersRepeater');
  if (bestSellersRepeater) {
    try {
      let results = await wixData.query('Stores/Products')
        .hasSome('ribbon', ['Best Seller', 'Top Rated', 'Popular'])
        .limit(4)
        .find();

      if (results.items.length === 0) {
        results = await wixData.query('Stores/Products').limit(4).find();
      }

      if (results.items.length > 0) {
        bestSellersRepeater.data = results.items;
        bestSellersRepeater.onItemReady(($item, product) => {
          bindProductCard($item, product);
        });
      }
    } catch (err) {
      console.warn('[Home] Best Sellers query notice:', err.message);
    }
  }

  // Featured Products Repeater
  const featuredRepeater = $w('#featuredRepeater');
  if (featuredRepeater) {
    try {
      const results = await wixData.query('Stores/Products')
        .limit(8)
        .find();

      if (results.items.length > 0) {
        featuredRepeater.data = results.items;
        featuredRepeater.onItemReady(($item, product) => {
          bindProductCard($item, product);
        });
      }
    } catch (err) {
      console.warn('[Home] Featured products query notice:', err.message);
    }
  }

  $w('#viewAllFeaturedBtn')?.onClick(() => wixLocation.to('/category-page'));
}

/**
 * Binds product data to a standard ProductCard repeater item.
 */
function bindProductCard($item, product) {
  if ($item('#productName')) $item('#productName').text = product.name || '';
  if ($item('#productPrice')) $item('#productPrice').text = product.formattedPrice || `₹${product.price}`;
  if ($item('#productImage') && product.mainMedia) $item('#productImage').src = product.mainMedia;

  if ($item('#productBadge')) {
    if (product.ribbon) {
      $item('#productBadge').text = product.ribbon;
      $item('#productBadge').show();
    } else {
      $item('#productBadge').hide();
    }
  }

  if ($item('#productDescription')) {
    $item('#productDescription').text = product.description || '';
  }

  $item('#productCard')?.onClick(() => {
    if (product.productPageUrl) wixLocation.to(product.productPageUrl);
  });
  $item('#productCardContainer')?.onClick(() => {
    if (product.productPageUrl) wixLocation.to(product.productPageUrl);
  });

  $item('#addToCartBtn')?.onClick(async (e) => {
    if (e?.stopPropagation) e.stopPropagation();
    try {
      $item('#addToCartBtn').label = '...';
      await currentCart.addToCurrentCart({
        lineItems: [{
          catalogReference: {
            appId: WIX_STORES_APP_ID,
            catalogItemId: product._id
          },
          quantity: 1
        }]
      });
      $item('#addToCartBtn').label = 'Added ✓';
      setTimeout(() => {
        if ($item('#addToCartBtn')) $item('#addToCartBtn').label = 'Add to Cart';
      }, 1500);
    } catch (err) {
      console.error('[Home] Add to cart error:', err);
      $item('#addToCartBtn').label = 'Add to Cart';
    }
  });
}

/**
 * Newsletter subscription form logic.
 */
function initNewsletterForm() {
  const emailInput = $w('#newsletterEmailInput') || $w('#newsletterInput');
  const submitBtn = $w('#newsletterSubmitBtn') || $w('#newsletterBtn');
  const successBox = $w('#newsletterSuccessMsg') || $w('#newsletterSuccessBox');

  if (submitBtn && emailInput) {
    submitBtn.onClick(() => {
      const email = emailInput.value?.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        if (emailInput.validity) emailInput.updateValidityIndication();
        return;
      }

      if (successBox) {
        successBox.show();
        emailInput.hide();
        submitBtn.hide();
      } else {
        submitBtn.label = 'Subscribed ✓';
      }
    });
  }
}
