// Veetla — Category / Shop Catalog Page Controller (Wix Studio)
// Preserves native Wix Stores #categoryPage1 widget while providing support
// for custom search, multi-faceted filtering, sorting, and responsive repeaters.
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { currentCart } from 'wix-ecom-frontend';

const WIX_STORES_APP_ID = '215238eb-2247-491a-ad38-e50b8022f74e';

let allProducts = [];
let filteredProducts = [];
let searchDebounceTimer = null;

$w.onReady(async function () {
  const nativeCategoryPage = $w('#categoryPage1');
  if (nativeCategoryPage) {
    // Native Wix Stores Category Page handles catalog rendering and pagination
  }

  const customRepeater = $w('#shopProductsRepeater');
  if (customRepeater) {
    await fetchCatalogProducts();
    initFilterHandlers();
    renderProducts();
  }
});

async function fetchCatalogProducts() {
  try {
    const results = await wixData.query('Stores/Products')
      .limit(50)
      .find();

    allProducts = results.items || [];
    filteredProducts = [...allProducts];
  } catch (err) {
    console.warn('[ShopPage] Failed to fetch catalog products:', err.message);
  }
}

function initFilterHandlers() {
  $w('#searchInput')?.onInput(() => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      applyFilters();
    }, 300);
  });

  $w('#sortDropdown')?.onChange(() => {
    applyFilters();
  });

  $w('#filterCategoryRadio')?.onChange(() => {
    applyFilters();
  });

  $w('#filterPriceGroup')?.onChange(() => {
    applyFilters();
  });

  $w('#inStockOnlyCheckbox')?.onChange(() => {
    applyFilters();
  });

  $w('#clearAllFiltersBtn')?.onClick(() => {
    if ($w('#searchInput')) $w('#searchInput').value = '';
    if ($w('#sortDropdown')) $w('#sortDropdown').selectedIndex = 0;
    if ($w('#filterCategoryRadio')) $w('#filterCategoryRadio').selectedIndex = 0;
    if ($w('#filterPriceGroup')) $w('#filterPriceGroup').value = undefined;
    if ($w('#inStockOnlyCheckbox')) $w('#inStockOnlyCheckbox').checked = false;
    applyFilters();
  });
}

function applyFilters() {
  let list = [...allProducts];

  const query = ($w('#searchInput')?.value || '').trim().toLowerCase();
  if (query) {
    list = list.filter(p =>
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query))
    );
  }

  const selectedCat = $w('#filterCategoryRadio')?.value;
  if (selectedCat && selectedCat !== 'all') {
    list = list.filter(p => {
      const cats = p.categories || [];
      const colls = p.collections || [];
      const match = cats.concat(colls).some(c =>
        (typeof c === 'string' && c.toLowerCase().includes(selectedCat.toLowerCase())) ||
        (c?.name && c.name.toLowerCase().includes(selectedCat.toLowerCase()))
      );
      return match;
    });
  }

  const priceRange = $w('#filterPriceGroup')?.value;
  if (priceRange === 'under-200') {
    list = list.filter(p => p.price < 200);
  } else if (priceRange === '200-300') {
    list = list.filter(p => p.price >= 200 && p.price <= 300);
  } else if (priceRange === 'above-300') {
    list = list.filter(p => p.price > 300);
  }

  const inStockOnly = $w('#inStockOnlyCheckbox')?.checked;
  if (inStockOnly) {
    list = list.filter(p => p.inStock !== false);
  }

  const sortBy = $w('#sortDropdown')?.value;
  if (sortBy === 'price-asc') {
    list.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === 'price-desc') {
    list.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortBy === 'name-asc') {
    list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  filteredProducts = list;
  renderProducts();
}

function renderProducts() {
  const repeater = $w('#shopProductsRepeater');
  if (!repeater) return;

  const countText = $w('#resultsCountText');
  if (countText) {
    countText.text = `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}`;
  }

  const emptyState = $w('#emptyStateBox');
  if (filteredProducts.length === 0) {
    repeater.data = [];
    if (emptyState) emptyState.show();
    return;
  }

  if (emptyState) emptyState.hide();

  repeater.data = filteredProducts;
  repeater.onItemReady(($item, product) => {
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
        console.error('[ShopPage] Add to cart error:', err);
        $item('#addToCartBtn').label = 'Add to Cart';
      }
    });
  });
}
