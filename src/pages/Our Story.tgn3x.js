// Veetla — Our Story Page Controller (Wix Studio)
import wixLocation from 'wix-location';
import {
  HERITAGE_TIMELINE,
  BRAND_VALUES,
  SIX_STEP_PROCESS
} from 'public/veetla-content';

$w.onReady(function () {
  initStoryNavigation();
  initTimelineRepeater();
  initValuesRepeater();
  initProcessRepeater();
});

function initStoryNavigation() {
  $w('#exploreKeralaBtn')?.onClick(() => wixLocation.to('/kerala-series'));
  $w('#exploreAndhraBtn')?.onClick(() => wixLocation.to('/andhra-series'));
  $w('#storyShopNowBtn')?.onClick(() => wixLocation.to('/category-page'));
}

function initTimelineRepeater() {
  const timelineRepeater = $w('#storyTimelineRepeater') || $w('#timelineRepeater');
  if (timelineRepeater) {
    timelineRepeater.data = HERITAGE_TIMELINE.map((item, idx) => ({ _id: `time-${idx}`, ...item }));
    timelineRepeater.onItemReady(($item, itemData) => {
      if ($item('#timelineYear')) $item('#timelineYear').text = itemData.year;
      if ($item('#timelineTitle')) $item('#timelineTitle').text = itemData.title;
      if ($item('#timelineDesc')) $item('#timelineDesc').text = itemData.description;
    });
  }
}

function initValuesRepeater() {
  const valuesRepeater = $w('#valuesRepeater') || $w('#coreValuesRepeater');
  if (valuesRepeater) {
    valuesRepeater.data = BRAND_VALUES.map((item, idx) => ({ _id: `val-${idx}`, ...item }));
    valuesRepeater.onItemReady(($item, itemData) => {
      if ($item('#valueTitle')) $item('#valueTitle').text = itemData.title;
      if ($item('#valueDesc')) $item('#valueDesc').text = itemData.description;
    });
  }
}

function initProcessRepeater() {
  const processRepeater = $w('#processRepeater') || $w('#stepsRepeater');
  if (processRepeater) {
    processRepeater.data = SIX_STEP_PROCESS.map((item, idx) => ({ _id: `step-${idx}`, ...item }));
    processRepeater.onItemReady(($item, itemData) => {
      if ($item('#stepNumber')) $item('#stepNumber').text = itemData.step;
      if ($item('#stepTitle')) $item('#stepTitle').text = itemData.title;
      if ($item('#stepDesc')) $item('#stepDesc').text = itemData.description;
    });
  }
}
