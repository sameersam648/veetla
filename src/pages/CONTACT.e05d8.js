// Veetla — Contact Page Controller (Wix Studio)
// Preserves native Wix Forms V2 (#371Ee199389C4A93849Ee35B8A15B7Ca1) for secure CRM leads,
// while binding the 8-item FAQ accordion and authentic brand support channels.
import { FAQ_ITEMS } from 'public/veetla-content';

$w.onReady(function () {
  // Native WixFormsV2 form handles customer inquiries and CRM contacts out-of-the-box.
  initContactInfoCards();
  initFaqAccordion();
});

/**
 * Initializes static contact details and support channels.
 */
function initContactInfoCards() {
  if ($w('#contactEmailText')) $w('#contactEmailText').text = 'hello@veetla.in';
  if ($w('#contactPhoneText')) $w('#contactPhoneText').text = '+91 98765 43210';
  if ($w('#contactHoursText')) $w('#contactHoursText').text = 'Monday – Saturday: 9:00 AM – 6:00 PM IST';
  if ($w('#contactAddressText')) $w('#contactAddressText').text = 'Veetla Artisan Kitchens, Kochi, Kerala 682001, India';
}

/**
 * 8-Item Interactive FAQ Accordion.
 */
function initFaqAccordion() {
  const faqRepeater = $w('#faqRepeater');
  if (faqRepeater) {
    faqRepeater.data = FAQ_ITEMS.map((item, idx) => ({ _id: `faq-${idx}`, isExpanded: false, ...item }));
    faqRepeater.onItemReady(($item, itemData) => {
      if ($item('#faqQuestion')) $item('#faqQuestion').text = itemData.q;
      if ($item('#faqAnswer')) {
        $item('#faqAnswer').text = itemData.a;
        $item('#faqAnswer').collapse();
      }

      $item('#faqHeader')?.onClick(() => {
        const answer = $item('#faqAnswer');
        if (answer) {
          if (answer.collapsed) {
            answer.expand();
            if ($item('#faqToggleIcon')) $item('#faqToggleIcon').text = '−';
          } else {
            answer.collapse();
            if ($item('#faqToggleIcon')) $item('#faqToggleIcon').text = '+';
          }
        }
      });
    });
  }
}
