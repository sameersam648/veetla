// Veetla — Andhra Series Collection Controller (Wix Studio)
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { currentCart } from 'wix-ecom-frontend';
import { ANDHRA_PRODUCT_NAMES, REGIONAL_HERITAGE } from 'public/veetla-content';

const WIX_STORES_APP_ID = '215238eb-2247-491a-ad38-e50b8022f74e';

$w.onReady(async function () {
  initAndhraHero();
  initAndhraStory();
  await loadAndhraProducts();
});

function initAndhraHero() {
  $w('#andhraHeroBtn')?.onClick(() => {
    $w('#andhraProductsSection')?.scrollTo();
  });
}

function initAndhraStory() {
  const andhraData = REGIONAL_HERITAGE.andhra;

  if ($w('#andhraLoreTitle')) $w('#andhraLoreTitle').text = 'The Spirit of Andhra: Fiery Spices & Festive Savouries';
  if ($w('#andhraLoreBody')) $w('#andhraLoreBody').text = andhraData.lore;
  if ($w('#andhraSignOff')) $w('#andhraSignOff').text = andhraData.scriptFlourish;
}

async function loadAndhraProducts() {
  const repeater = $w('#andhraRepeater');
  if (!repeater) return;

  try {
    let results = await wixData.query('Stores/Products')
      .hasSome('name', ANDHRA_PRODUCT_NAMES)
      .find();

    if (results.items.length === 0) {
      results = await wixData.query('Stores/Products')
        .hasSome('collections', ['Andhra Series'])
        .find();
    }

    const items = (results.items || []).filter(product => {
      const pName = (product.name || '').toLowerCase();
      if (pName.includes('ajivot')) return false;
      return ANDHRA_PRODUCT_NAMES.some(aName => pName.includes(aName.toLowerCase())) ||
        pName.includes('gavvalu') || pName.includes('murruku') || pName.includes('pakodi') ||
        pName.includes('chekkalu') || pName.includes('jelly');
    });

    if (items.length > 0) {
      repeater.data = items;
      repeater.onItemReady(($item, product) => {
        if ($item('#andhraProdTitle')) $item('#andhraProdTitle').text = product.name || '';
        if ($item('#andhraProdDesc')) $item('#andhraProdDesc').text = product.description || '';
        if ($item('#andhraProdPrice')) $item('#andhraProdPrice').text = product.formattedPrice || `₹${product.price}`;
        if ($item('#andhraProdImg') && product.mainMedia) $item('#andhraProdImg').src = product.mainMedia;

        if ($item('#andhraProdBadge')) {
          if (product.ribbon) {
            $item('#andhraProdBadge').text = product.ribbon;
            $item('#andhraProdBadge').show();
          } else {
            $item('#andhraProdBadge').hide();
          }
        }

        $item('#andhraCardWrapper')?.onClick(() => {
          if (product.productPageUrl) wixLocation.to(product.productPageUrl);
        });

        $item('#andhraAddBtn')?.onClick(async (e) => {
          if (e?.stopPropagation) e.stopPropagation();
          try {
            $item('#andhraAddBtn').label = '...';
            await currentCart.addToCurrentCart({
              lineItems: [{
                catalogReference: { appId: WIX_STORES_APP_ID, catalogItemId: product._id },
                quantity: 1
              }]
            });
            $item('#andhraAddBtn').label = 'Added ✓';
            setTimeout(() => {
              if ($item('#andhraAddBtn')) $item('#andhraAddBtn').label = 'Add to Cart';
            }, 1500);
          } catch (err) {
            console.error('[Veetla Andhra] Add to cart error:', err);
            $item('#andhraAddBtn').label = 'Add to Cart';
          }
        });
      });
    }
  } catch (err) {
    console.warn('[Veetla Andhra] Query notice:', err.message);
  }
}
