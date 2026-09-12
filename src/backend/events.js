// Veetla — Wix eCommerce Backend Lifecycle Event Hooks
// Native order paid and canceled listeners

/**
 * Event hook triggered automatically when a customer completes payment for an order.
 * Native Wix eCommerce Order Paid lifecycle event.
 */
export async function wixEcom_onOrderPaid(event) {
  const { orderId, orderNumber, priceSummary, buyerInfo } = event.entity || {};
  console.log(`[Veetla Backend] Order #${orderNumber || orderId} marked as PAID. Total: ${priceSummary?.total?.amount || 'N/A'}`);
  // Invoicing: Wix native automated invoicing in Dashboard (eCommerce Settings > Invoices)
  // automatically generates and emails official tax invoices upon payment.
}

/**
 * Event hook triggered when an order is canceled.
 */
export async function wixEcom_onOrderCanceled(event) {
  const { orderId, orderNumber } = event.entity || {};
  console.log(`[Veetla Backend] Order #${orderNumber || orderId} was canceled. Inventory automatically restored by Wix Stores.`);
}
