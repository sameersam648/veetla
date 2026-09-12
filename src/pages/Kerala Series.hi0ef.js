// Veetla — Kerala Series Collection Controller (Wix Studio)
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { currentCart } from 'wix-ecom-frontend';
import { KERALA_PRODUCT_NAMES, REGIONAL_HERITAGE } from 'public/veetla-content';

const WIX_STORES_APP_ID = '215238eb-2247-491a-ad38-e50b8022f74e';

$w.onReady(async function () {
  initKeralaHero();
  initKeralaStory();
  await loadKeralaProducts();
});

function initKeralaHero() {
  $w('#keralaHeroBtn')?.onClick(() => {
    $w('#keralaProductsSection')?.scrollTo();
  });
}

function initKeralaStory() {
  const keralaData = REGIONAL_HERITAGE.kerala;

  if ($w('#keralaLoreTitle')) $w('#keralaLoreTitle').text = 'The Land of Coconuts & Heirloom Flavours';
  if ($w('#keralaLoreBody')) $w('#keralaLoreBody').text = keralaData.lore;
  if ($w('#keralaSignOff')) $w('#keralaSignOff').text = keralaData.scriptFlourish;
}

async function loadKeralaProducts() {
  const repeater = $w('#keralaRepeater');
  if (!repeater) return;

  try {
    let results = await wixData.query('Stores/Products')
      .hasSome('name', KERALA_PRODUCT_NAMES)
      .find();

    if (results.items.length === 0) {
      results = await wixData.query('Stores/Products')
        .hasSome('collections', ['Kerala Series'])
        .find();
    }

    const items = (results.items || []).filter(product => {
      const pName = (product.name || '').toLowerCase();
      return KERALA_PRODUCT_NAMES.some(kName => pName.includes(kName.toLowerCase())) ||
        pName.includes('banana') || pName.includes('jackfruit');
    });

    if (items.length > 0) {
      repeater.data = items;
      repeater.onItemReady(($item, product) => {
        if ($item('#keralaProdTitle')) $item('#keralaProdTitle').text = product.name || '';
        if ($item('#keralaProdDesc')) $item('#keralaProdDesc').text = product.description || '';
        if ($item('#keralaProdPrice')) $item('#keralaProdPrice').text = product.formattedPrice || `₹${product.price}`;
        if ($item('#keralaProdImg') && product.mainMedia) $item('#keralaProdImg').src = product.mainMedia;

        if ($item('#keralaProdBadge')) {
          if (product.ribbon) {
            $item('#keralaProdBadge').text = product.ribbon;
            $item('#keralaProdBadge').show();
          } else {
            $item('#keralaProdBadge').hide();
          }
        }

        $item('#keralaCardWrapper')?.onClick(() => {
          if (product.productPageUrl) wixLocation.to(product.productPageUrl);
        });

        $item('#keralaAddBtn')?.onClick(async (e) => {
          if (e?.stopPropagation) e.stopPropagation();
          try {
            $item('#keralaAddBtn').label = '...';
            await currentCart.addToCurrentCart({
              lineItems: [{
                catalogReference: { appId: WIX_STORES_APP_ID, catalogItemId: product._id },
                quantity: 1
              }]
            });
            $item('#keralaAddBtn').label = 'Added ✓';
            setTimeout(() => {
              if ($item('#keralaAddBtn')) $item('#keralaAddBtn').label = 'Add to Cart';
            }, 1500);
          } catch (err) {
            console.error('[Veetla Kerala] Add to cart error:', err);
            $item('#keralaAddBtn').label = 'Add to Cart';
          }
        });
      });
    }
  } catch (err) {
    console.warn('[Veetla Kerala] Query notice:', err.message);
  }
}
