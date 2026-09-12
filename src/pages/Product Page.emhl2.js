// Veetla — Native Wix Stores Dynamic Product Detail Page Controller
// Powered by Wix Studio and native Wix Stores #productPage1 widget
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  const nativeProductPage = $w('#productPage1');
  if (nativeProductPage) {
    // Native Wix Stores Product Page operates out-of-the-box
  }

  initProductStorySections();
  await initRelatedProducts();
});

function initProductStorySections() {
  const tabIngredientsBtn = $w('#tabIngredientsBtn');
  const tabNutritionBtn = $w('#tabNutritionBtn');
  const tabStorageBtn = $w('#tabStorageBtn');

  const panelIngredients = $w('#panelIngredients');
  const panelNutrition = $w('#panelNutrition');
  const panelStorage = $w('#panelStorage');

  if (tabIngredientsBtn && tabNutritionBtn && tabStorageBtn) {
    tabIngredientsBtn.onClick(() => {
      panelIngredients?.show();
      panelNutrition?.hide();
      panelStorage?.hide();
    });

    tabNutritionBtn.onClick(() => {
      panelIngredients?.hide();
      panelNutrition?.show();
      panelStorage?.hide();
    });

    tabStorageBtn.onClick(() => {
      panelIngredients?.hide();
      panelNutrition?.hide();
      panelStorage?.show();
    });
  }
}

async function initRelatedProducts() {
  const relatedRepeater = $w('#relatedProductsRepeater');
  if (!relatedRepeater) return;

  try {
    const results = await wixData.query('Stores/Products')
      .limit(4)
      .find();

    if (results.items.length > 0) {
      relatedRepeater.data = results.items;
      relatedRepeater.onItemReady(($item, itemData) => {
        if ($item('#relatedProdName')) $item('#relatedProdName').text = itemData.name || '';
        if ($item('#relatedProdPrice')) $item('#relatedProdPrice').text = itemData.formattedPrice || `₹${itemData.price}`;
        if ($item('#relatedProdImg') && itemData.mainMedia) $item('#relatedProdImg').src = itemData.mainMedia;
        $item('#relatedProdCard')?.onClick(() => {
          if (itemData.productPageUrl) wixLocation.to(itemData.productPageUrl);
        });
      });
    }
  } catch (err) {
    console.warn('[ProductPage] Related products notice:', err.message);
  }
}
