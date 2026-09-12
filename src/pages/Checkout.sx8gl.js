// Veetla — Native Wix Stores Checkout Page Controller
// Powered by Wix Studio and native Wix Stores #checkout1 widget
//
// IMPORTANT:
// - Custom createCheckout redirects have been removed to prevent redirect loops.
// - The native #checkout1 widget handles shipping address input, Indian GST tax calculation,
//   payment gateway integration (UPI, Credit/Debit Cards, Net Banking), and order finalization.
// - Complies natively with Level-1 PCI-DSS standards.

$w.onReady(function () {
  const checkout = $w('#checkout1');
  if (checkout) {
    // Native Wix Stores Checkout widget is active on canvas.
    // Address, payment collection, and order submission operate out-of-the-box.
  }
});
