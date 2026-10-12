/**
 * کمکی‌های فرمت‌بندی مربوط به بخش صورت‌accounts
 * استفاده از Intl برای فرمت اعداد و ارز به صورت locale-aware
 */

/**
 * فرمت کردن مبلغ به صورت خلاصه با واحد پول
 * در حالت فارسی: "۳۹,۰۰۰,۰۰۰ ریال / ماه"
 * در حالت انگلیسی: "IRR 39,000,000/mo"
 */
export function buildAmountLabel(value: number, locale: string): string {
  const formatter = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    maximumFractionDigits: 0,
    useGrouping: true,
  });
  const amount = formatter.format(value);

  if (locale === "fa") {
    return `${amount} ریال / ماه`;
  }
  return `IRR ${amount}/mo`;
}

/**
 * فرمت کردن یک مبلغ ساده بدون واحد
 */
export function formatAmountNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(value);
}

/**
 * فرمت تاریخ فاکتور به صورت کوتاه
 */
export function formatInvoiceDate(date: Date, locale: string): string {
  const localeKey = locale === "fa" ? "fa-IR-u-ca-persian" : "en-US";
  return new Intl.DateTimeFormat(localeKey, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * فرمت تاریخ رسید به صورت بلند
 */
export function formatReceiptDate(date: Date, locale: string): string {
  const localeKey = locale === "fa" ? "fa-IR-u-ca-persian" : "en-US";
  return new Intl.DateTimeFormat(localeKey, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * ساخت HTML رسید فاکتور برای دانلود
 */
export function buildReceiptHtml(invoice: {id: string; date: Date; dueDate: Date; amount: number; cardLabel: string; status: string; method: string}, locale: string): string {
  const statusText = invoice.status === "paid" ? "Paid" : invoice.status === "pending" ? "Pending" : "Failed";
  const methodText = invoice.method === "online" ? "Online Payment" : "Bank Transfer";

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Invoice ${invoice.id}</title>
      </head>
      <body style="font-family: Arial, sans-serif; padding: 32px; color: #111827;">
        <div style="max-width: 760px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 18px; padding: 24px;">
          <h1 style="margin: 0 0 12px; font-size: 28px;">Invoice Receipt</h1>
          <p style="margin: 0 0 20px; color: #6b7280;">${invoice.id}</p>
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
            <div>
              <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: .12em;">Issued</div>
              <div>${formatReceiptDate(invoice.date, locale)}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: .12em;">Due</div>
              <div>${formatReceiptDate(invoice.dueDate, locale)}</div>
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <div style="display: flex; justify-content: space-between; margin: 18px 0;">
            <span>Plan</span>
            <strong>Pro Plan</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 18px 0;">
            <span>Payment method</span>
            <strong>${methodText}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 18px 0;">
            <span>Card</span>
            <strong>${invoice.cardLabel}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 18px 0;">
            <span>Amount</span>
            <strong>${buildAmountLabel(invoice.amount, locale)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 18px 0;">
            <span>Status</span>
            <strong>${statusText}</strong>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * دانلود فاکتور به صورت فایل HTML
 */
export function downloadInvoiceHtml(invoice: {id: string; date: Date; dueDate: Date; amount: number; cardLabel: string; status: string; method: string}, locale: string): void {
  const html = buildReceiptHtml(invoice, locale);
  const blob = new Blob([html], {type: "text/html;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `invoice-${invoice.id.toLowerCase()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}