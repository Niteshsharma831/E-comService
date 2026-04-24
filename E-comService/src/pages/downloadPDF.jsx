import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ---------------- HELPERS ---------------- */

const formatFullDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const generateInvoiceNumber = (orderId) => {
  return `INV-${orderId.substring(0, 8).toUpperCase()}`;
};

const calculateSubtotal = (order) =>
  order.items.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0,
  );

const calculateTax = (order) => calculateSubtotal(order) * 0.18;

const calculateShipping = (order) => (calculateSubtotal(order) > 500 ? 0 : 40);

const calculateTotal = (order) =>
  calculateSubtotal(order) + calculateTax(order) + calculateShipping(order);

/* -------- NUMBER TO WORDS -------- */

const numberToWords = (num) => {
  if (num === 0) return "Zero";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (num < 20) return ones[num];
  if (num < 100)
    return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
  if (num < 1000)
    return (
      ones[Math.floor(num / 100)] +
      " Hundred" +
      (num % 100 ? " " + numberToWords(num % 100) : "")
    );
  if (num < 100000)
    return (
      numberToWords(Math.floor(num / 1000)) +
      " Thousand" +
      (num % 1000 ? " " + numberToWords(num % 1000) : "")
    );
  if (num < 10000000)
    return (
      numberToWords(Math.floor(num / 100000)) +
      " Lakh" +
      (num % 100000 ? " " + numberToWords(num % 100000) : "")
    );
  return (
    numberToWords(Math.floor(num / 10000000)) +
    " Crore" +
    (num % 10000000 ? " " + numberToWords(num % 10000000) : "")
  );
};

const getAmountInWords = (order) => {
  const total = Math.floor(calculateTotal(order));
  return `Rupees ${numberToWords(total)} Only`;
};

/* ---------------- MAIN FUNCTION ---------------- */

export const downloadInvoicePDF = (order) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Equal margins on both sides (15mm left, 15mm right)
  const margin = 15;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  const rightX = pageWidth - margin;

  const invoiceNo = generateInvoiceNumber(order._id);

  /* ========== HEADER SECTION ========== */

  let yPos = margin + 5;

  // Company Name
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(249, 115, 22);
  pdf.text("ShopiZo", margin, yPos);

  // Tagline
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(9);
  pdf.setTextColor(100, 100, 100);
  pdf.text("Your Trusted Shopping Partner", margin, yPos + 6);

  // Company Details
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(80, 80, 80);
  pdf.text("Karanje, Satara, Maharashtra - 415001", margin, yPos + 14);
  pdf.text(
    "Email: support@shopizo.com | Phone: +91 98220 12345",
    margin,
    yPos + 19,
  );
  pdf.text("GSTIN: 27AAAAA1234B1Z | PAN: AAAAA1234B", margin, yPos + 24);

  // Invoice Title and Number (Right Aligned)
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text("TAX INVOICE", rightX, yPos + 5, { align: "right" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(80, 80, 80);
  pdf.text(`Invoice No: ${invoiceNo}`, rightX, yPos + 13, { align: "right" });
  pdf.text(`Date: ${formatFullDate(order.createdAt)}`, rightX, yPos + 19, {
    align: "right",
  });
  pdf.text(`Order ID: ${order._id}`, rightX, yPos + 25, { align: "right" });

  // Divider Line
  yPos = yPos + 35;
  pdf.setDrawColor(249, 115, 22);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPos, rightX, yPos);

  /* ========== BILLING INFORMATION ========== */

  yPos = yPos + 10;

  // Customer Details Section
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(249, 115, 22);
  pdf.text("BILLING DETAILS", margin, yPos);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(0, 0, 0);

  const customerY = yPos + 6;
  pdf.text("Customer Name:", margin, customerY);
  pdf.text(order.fullName, margin + 35, customerY);

  pdf.text("Phone Number:", margin, customerY + 6);
  pdf.text(order.phone, margin + 35, customerY + 6);

  pdf.text("Address:", margin, customerY + 12);
  const addressLines = pdf.splitTextToSize(
    `${order.address}, ${order.pincode}`,
    60,
  );
  pdf.text(addressLines, margin + 35, customerY + 12);

  // Payment Details Section (Right Side)
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(249, 115, 22);
  pdf.text("PAYMENT DETAILS", rightX - 60, yPos, { align: "right" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(0, 0, 0);

  const paymentY = yPos + 6;
  pdf.text("Payment Method:", rightX - 60, paymentY, { align: "right" });
  pdf.text(order.paymentMethod, rightX, paymentY, { align: "right" });

  pdf.text("Payment Status:", rightX - 60, paymentY + 6, { align: "right" });
  pdf.text("Paid", rightX, paymentY + 6, { align: "right" });

  pdf.text("Transaction ID:", rightX - 60, paymentY + 12, { align: "right" });
  pdf.text(order._id.slice(-12), rightX, paymentY + 12, { align: "right" });

  pdf.text("Payment Date:", rightX - 60, paymentY + 18, { align: "right" });
  pdf.text(formatFullDate(order.createdAt), rightX, paymentY + 18, {
    align: "right",
  });

  yPos = yPos + 38;

  /* ========== PRODUCTS TABLE ========== */

  const tableData = order.items.map((item, index) => {
    const price = item.productId?.price || 0;
    const productName = item.productId?.name || "Unknown Product";

    return [
      index + 1,
      productName,
      item.quantity,
      `₹${price.toFixed(2)}`,
      `₹${(price * item.quantity).toFixed(2)}`,
    ];
  });

  autoTable(pdf, {
    startY: yPos,
    head: [["Sl.No", "Product Description", "Qty", "Unit Price", "Total"]],
    body: tableData,
    theme: "striped",
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 9,
      cellPadding: 5,
      valign: "middle",
      lineColor: [220, 220, 220],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [249, 115, 22],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 10,
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 12, halign: "center" },
      1: { cellWidth: 85 },
      2: { cellWidth: 15, halign: "center" },
      3: { cellWidth: 25, halign: "right" },
      4: { cellWidth: 25, halign: "right" },
    },
    alternateRowStyles: {
      fillColor: [255, 247, 237],
    },
  });

  let currentY = pdf.lastAutoTable.finalY + 8;

  /* ========== AMOUNT SUMMARY SECTION ========== */

  const subtotal = calculateSubtotal(order);
  const tax = calculateTax(order);
  const shipping = calculateShipping(order);
  const total = calculateTotal(order);

  // Summary Box - Right Aligned
  const summaryX = pageWidth - 70;
  const summaryWidth = 55;

  // Summary Header
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(249, 115, 22);
  pdf.text("AMOUNT SUMMARY", summaryX, currentY);

  currentY += 5;

  // Summary Lines
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(80, 80, 80);

  pdf.text("Subtotal:", summaryX, currentY);
  pdf.text(`₹${subtotal.toFixed(2)}`, rightX, currentY, { align: "right" });

  currentY += 6;

  pdf.text("CGST (9%):", summaryX, currentY);
  pdf.text(`₹${(tax / 2).toFixed(2)}`, rightX, currentY, { align: "right" });

  currentY += 6;

  pdf.text("SGST (9%):", summaryX, currentY);
  pdf.text(`₹${(tax / 2).toFixed(2)}`, rightX, currentY, { align: "right" });

  currentY += 6;

  pdf.text("Shipping:", summaryX, currentY);
  pdf.text(
    shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`,
    rightX,
    currentY,
    { align: "right" },
  );

  currentY += 8;

  // Divider before total
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.2);
  pdf.line(summaryX, currentY, rightX, currentY);

  currentY += 5;

  // Grand Total
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(220, 38, 38);
  pdf.text("GRAND TOTAL:", summaryX, currentY);
  pdf.text(`₹${total.toFixed(2)}`, rightX, currentY, { align: "right" });

  currentY += 8;

  // Amount in Words
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  const amountWords = getAmountInWords(order);
  const wordsLines = pdf.splitTextToSize(amountWords, contentWidth - 50);
  pdf.text(wordsLines, margin, currentY);

  currentY += 12;

  /* ========== BANK DETAILS ========== */

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(249, 115, 22);
  pdf.text("BANK DETAILS FOR REFERENCE", margin, currentY);

  currentY += 5;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(80, 80, 80);

  const bankDetails = [
    `Bank Name: HDFC Bank, Satara Branch`,
    `Account Number: 50200012345678`,
    `IFSC Code: HDFC0001234`,
    `UPI ID: shopizo@hdfcbank`,
  ];

  bankDetails.forEach((detail, index) => {
    pdf.text(detail, margin, currentY + index * 4.5);
  });

  currentY += 22;

  /* ========== TERMS & CONDITIONS ========== */

  pdf.setDrawColor(249, 115, 22);
  pdf.setLineWidth(0.3);
  pdf.line(margin, currentY, rightX, currentY);

  currentY += 5;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(50, 50, 50);
  pdf.text("TERMS & CONDITIONS", margin, currentY);

  currentY += 5;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(100, 100, 100);

  const terms = [
    "1. Free shipping on orders above ₹500, otherwise ₹40 shipping charges apply.",
    "2. Returns accepted within 7 days of delivery with original packaging.",
    "3. For support, contact us at support@shopizo.com or call +91 98220 12345.",
    "4. This is a system generated invoice and doesn't require physical signature.",
  ];

  terms.forEach((term) => {
    const termLines = pdf.splitTextToSize(term, contentWidth);
    pdf.text(termLines, margin, currentY);
    currentY += 4.5 * termLines.length;
  });

  currentY += 5;

  /* ========== FOOTER ========== */

  // Decorative footer line
  pdf.setDrawColor(249, 115, 22);
  pdf.setLineWidth(0.5);
  pdf.line(margin, currentY, rightX, currentY);

  currentY += 6;

  // Thank You Message
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(249, 115, 22);
  pdf.text(
    "✨ Thank you for shopping with ShopiZo! ✨",
    pageWidth / 2,
    currentY,
    { align: "center" },
  );

  currentY += 6;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  pdf.text(
    "We value your trust and look forward to serving you again",
    pageWidth / 2,
    currentY,
    { align: "center" },
  );

  currentY += 6;

  // Support Information
  pdf.setFontSize(8);
  pdf.setTextColor(80, 80, 80);
  pdf.text(
    "For support: support@shopizo.com | Toll Free: 1800-123-4567",
    pageWidth / 2,
    currentY,
    { align: "center" },
  );

  currentY += 5;

  // Website
  pdf.text(
    "🌐 www.shopizo.com | 📱 Follow us: @shopizo",
    pageWidth / 2,
    currentY,
    { align: "center" },
  );

  currentY += 6;

  // Copyright
  pdf.setFontSize(7);
  pdf.setTextColor(150, 150, 150);
  pdf.text(
    `© ${new Date().getFullYear()} ShopiZo. All rights reserved.`,
    pageWidth / 2,
    currentY,
    { align: "center" },
  );
  pdf.text(
    "Karanje, Satara, Maharashtra - 415001",
    pageWidth / 2,
    currentY + 4,
    { align: "center" },
  );

  // Add page number at bottom of each page
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(7);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, {
      align: "center",
    });
  }

  /* ========== SAVE PDF ========== */

  pdf.save(`${invoiceNo}.pdf`);
};
