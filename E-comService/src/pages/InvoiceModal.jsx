import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadInvoicePDF } from "./downloadPDF";
import {
  FaTimes,
  FaStore,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaCreditCard,
  FaTag,
  FaShippingFast,
  FaEnvelope,
  FaPrint,
  FaQrcode,
  FaBuilding,
  FaDownload,
  FaSpinner,
  FaRupeeSign,
  FaBox,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InvoiceModal = ({ order, onClose }) => {
  const invoiceRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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

  const handleDownload = () => {
    downloadInvoicePDF(order);
  };
  const generateInvoiceNumber = (orderId) => {
    return `INV-${orderId.substring(0, 8).toUpperCase()}`;
  };

  const calculateSubtotal = () => {
    return order.items.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
      0,
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 500 ? 0 : 40;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const numberToWords = (num) => {
    const words = [
      "Zero",
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

    if (num < 20) return words[num];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] + (num % 10 ? " " + words[num % 10] : "")
      );
    return (
      Math.floor(num / 100) +
      " Hundred " +
      (num % 100 ? numberToWords(num % 100) : "")
    );
  };

  const getAmountInWords = () => {
    const total = Math.floor(calculateTotal());
    return `Rupees ${numberToWords(total)} Only`;
  };

  // Enhanced PDF download with better table formatting
  const downloadPDF = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        allowTaint: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save(`${generateInvoiceNumber(order._id)}.pdf`);

      // Show success message
      const toast = document.createElement("div");
      toast.className =
        "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in";
      toast.textContent = "✅ PDF Downloaded Successfully!";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try printing instead.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Print invoice function
  const printInvoice = () => {
    const printContent = invoiceRef.current;
    if (!printContent) return;

    setIsPrinting(true);

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to print the invoice");
      setIsPrinting(false);
      return;
    }

    const styles = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: white;
          padding: 20px;
        }
        
        .print-container {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
        }
        
        @media print {
          body {
            padding: 0;
            margin: 0;
          }
          .no-print {
            display: none;
          }
          @page {
            size: A4;
            margin: 10mm;
          }
        }
        
        /* Header Styles */
        .print-header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 3px solid #f97316;
        }
        
        .print-logo {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #f97316, #dc2626);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          color: white;
          font-size: 28px;
        }
        
        .print-company-name {
          font-size: 24px;
          font-weight: 800;
          color: #f97316;
          margin-bottom: 5px;
        }
        
        .print-address {
          color: #6b7280;
          font-size: 11px;
        }
        
        .print-contact {
          color: #6b7280;
          font-size: 10px;
          margin-top: 5px;
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        /* Title Row */
        .print-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .print-title h2 {
          font-size: 22px;
          font-weight: 800;
          color: #1f2937;
        }
        
        .print-title p {
          font-size: 10px;
          color: #6b7280;
        }
        
        .print-invoice-box {
          background: #fff7ed;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #fed7aa;
          text-align: center;
        }
        
        .print-invoice-box .label {
          font-size: 10px;
          color: #6b7280;
        }
        
        .print-invoice-box .number {
          font-size: 14px;
          font-weight: bold;
          color: #f97316;
        }
        
        /* Info Cards */
        .print-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 25px;
        }
        
        .print-info-card {
          background: #f9fafb;
          padding: 12px;
          border-radius: 10px;
          border-left: 3px solid #f97316;
        }
        
        .print-card-title {
          font-weight: 700;
          font-size: 11px;
          color: #f97316;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
        }
        
        .print-card-text {
          font-size: 11px;
          margin-bottom: 4px;
        }
        
        /* Enhanced Table Styles */
        .print-table-wrapper {
          margin-bottom: 20px;
          overflow-x: auto;
        }
        
        .print-invoice-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .print-invoice-table th {
          background: linear-gradient(135deg, #f97316, #dc2626);
          color: white;
          padding: 12px 8px;
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .print-invoice-table th:first-child {
          border-top-left-radius: 10px;
        }
        
        .print-invoice-table th:last-child {
          border-top-right-radius: 10px;
        }
        
        .print-invoice-table td {
          padding: 12px 8px;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: middle;
        }
        
        .print-invoice-table tr:last-child td {
          border-bottom: none;
        }
        
        .print-invoice-table tr:hover {
          background-color: #fef3c7;
        }
        
        .print-product-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .print-product-image {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        
        .print-product-name {
          font-weight: 500;
          color: #1f2937;
        }
        
        .text-center {
          text-align: center;
        }
        
        .text-right {
          text-align: right;
        }
        
        .text-left {
          text-align: left;
        }
        
        .font-bold {
          font-weight: bold;
        }
        
        /* Summary Section */
        .print-summary {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        
        .print-summary-card {
          width: 300px;
          background: #f9fafb;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        
        .print-summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 11px;
        }
        
        .print-summary-row.total {
          border-top: 2px solid #e5e7eb;
          margin-top: 8px;
          padding-top: 12px;
          font-weight: 800;
          font-size: 14px;
          color: #f97316;
        }
        
        .print-amount-words {
          font-size: 9px;
          color: #6b7280;
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px dashed #e5e7eb;
        }
        
        /* Bank Details */
        .print-bank {
          background: #fef3c7;
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 15px;
        }
        
        .print-bank-title {
          font-size: 10px;
          font-weight: 700;
          color: #d97706;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .print-bank-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          font-size: 9px;
          color: #78350f;
        }
        
        /* Terms */
        .print-terms {
          margin-bottom: 15px;
        }
        
        .print-terms-title {
          font-size: 10px;
          font-weight: 700;
          color: #374151;
          margin-bottom: 5px;
        }
        
        .print-terms-list {
          font-size: 9px;
          color: #6b7280;
          list-style: none;
          padding-left: 0;
        }
        
        .print-terms-list li {
          margin-bottom: 3px;
          padding-left: 12px;
          position: relative;
        }
        
        .print-terms-list li:before {
          content: "•";
          color: #f97316;
          position: absolute;
          left: 0;
        }
        
        /* Footer */
        .print-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
          margin-top: 10px;
        }
        
        .print-signature-line {
          width: 120px;
          border-top: 1px solid #9ca3af;
          margin-top: 20px;
          padding-top: 3px;
          font-size: 8px;
          color: #9ca3af;
        }
        
        .print-thankyou {
          text-align: center;
        }
        
        .print-thankyou-main {
          font-size: 12px;
          font-weight: 700;
          color: #f97316;
        }
        
        .print-thankyou-sub {
          font-size: 9px;
          color: #6b7280;
        }
        
        .print-qr {
          width: 50px;
          height: 50px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #9ca3af;
        }
        
        .print-footer-bottom {
          text-align: center;
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px solid #e5e7eb;
        }
        
        .print-footer-text {
          font-size: 9px;
          color: #6b7280;
        }
        
        .print-copyright {
          font-size: 8px;
          color: #9ca3af;
          margin-top: 5px;
        }
        
        @media (max-width: 640px) {
          .print-info-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          
          .print-title-row {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .print-summary {
            justify-content: center;
          }
          
          .print-footer {
            flex-direction: column;
            align-items: center;
            gap: 15px;
            text-align: center;
          }
          
          .print-bank-grid {
            grid-template-columns: 1fr;
          }
          
          .print-product-info {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      </style>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${generateInvoiceNumber(order._id)} - ShopiZo</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${styles}
        </head>
        <body>
          <div class="print-container">
            ${printContent.outerHTML}
          </div>
          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
                window.onafterprint = () => {
                  window.close();
                };
              }, 500);
            };
          <\/script>
        </body>
      </html>
    `);

    printWindow.document.close();
    setIsPrinting(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        >
          <div className="bg-white rounded-3xl overflow-hidden">
            {/* Header Actions */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-end gap-3 flex-wrap">
              <button
                // onClick={downloadPDF}
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <FaDownload />
                    Download PDF
                  </>
                )}
              </button>
              <button
                onClick={printInvoice}
                disabled={isPrinting}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPrint />
                Print Invoice
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
              >
                <FaTimes />
                Close
              </button>
            </div>

            {/* Invoice Content - Enhanced Table Format */}
            <div
              ref={invoiceRef}
              className="p-6 bg-white"
              style={{ width: "100%", maxWidth: "100%" }}
            >
              {/* Header */}
              <div className="text-center mb-5 pb-3 border-b-2 border-orange-500">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FaStore className="text-white text-2xl" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  ShopiZo
                </h1>
                <p className="text-gray-500 text-xs">
                  Karanje, Satara, Maharashtra - 415001
                </p>
                <div className="flex items-center justify-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
                  <span>
                    <FaEnvelope className="inline mr-1" size={10} />{" "}
                    support@shopizo.com
                  </span>
                  <span>
                    <FaPhone className="inline mr-1" size={10} /> +91 98220
                    12345
                  </span>
                </div>
              </div>

              {/* Invoice Title */}
              <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    TAX INVOICE
                  </h2>
                  <p className="text-gray-400 text-xs">
                    Original for Recipient
                  </p>
                </div>
                <div className="bg-orange-50 px-4 py-2 rounded-lg border border-orange-200 text-center">
                  <p className="text-gray-500 text-xs">Invoice No.</p>
                  <p className="text-base font-bold text-orange-600">
                    {generateInvoiceNumber(order._id)}
                  </p>
                </div>
              </div>

              {/* Customer & Order Info - Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-bold text-orange-600 text-xs mb-2 flex items-center gap-1">
                    <FaUser size={11} /> BILLED TO:
                  </h3>
                  <p className="text-sm font-semibold text-gray-800">
                    {order.fullName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                    <FaPhone size={9} /> {order.phone}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {order.address}, {order.pincode}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-bold text-orange-600 text-xs mb-2 flex items-center gap-1">
                    <FaShippingFast size={11} /> ORDER DETAILS:
                  </h3>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <FaCalendarAlt size={9} /> Date:{" "}
                    {formatFullDate(order.createdAt)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                    <FaTag size={9} /> ID: {order._id}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                    <FaCreditCard size={9} /> Payment: {order.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Enhanced Product Table */}
              <div className="mb-5 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                      <th className="px-3 py-3 text-left text-sm rounded-tl-lg w-12">
                        #
                      </th>
                      <th className="px-3 py-3 text-left text-sm">
                        Product Details
                      </th>
                      <th className="px-3 py-3 text-center text-sm w-20">
                        Quantity
                      </th>
                      <th className="px-3 py-3 text-right text-sm w-28">
                        Unit Price
                      </th>
                      <th className="px-3 py-3 text-right text-sm w-28 rounded-tr-lg">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => {
                      const price = item.productId?.price || 0;
                      const total = price * item.quantity;
                      const productName =
                        item.productId?.name || "Unknown Product";
                      const productImage =
                        item.productId?.image ||
                        "https://via.placeholder.com/40";

                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-orange-50 transition-colors"
                        >
                          <td className="px-3 py-3 text-sm text-gray-600 text-center">
                            {index + 1}
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={productImage}
                                alt={productName}
                                className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/40";
                                }}
                              />
                              <div>
                                <span className="text-sm font-medium text-gray-800 block">
                                  {productName}
                                </span>
                                <span className="text-xs text-gray-400">
                                  SKU: {item.productId?._id?.slice(-6) || "N/A"}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-sm text-center">
                            <span className="inline-flex items-center justify-center px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-semibold">
                              {item.quantity}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-sm text-right text-gray-600">
                            <span className="flex items-center justify-end gap-0.5">
                              <FaRupeeSign size={9} /> {price.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-sm text-right font-semibold text-gray-800">
                            <span className="flex items-center justify-end gap-0.5">
                              <FaRupeeSign size={9} /> {total.toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td
                        colSpan="4"
                        className="px-3 py-2 text-right text-sm font-semibold text-gray-700"
                      >
                        Total Items:{" "}
                        {order.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}
                      </td>
                      <td className="px-3 py-2 text-right text-sm font-bold text-orange-600">
                        <span className="flex items-center justify-end gap-0.5">
                          <FaRupeeSign size={10} />{" "}
                          {calculateSubtotal().toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Summary Section */}
              <div className="flex justify-end mb-4">
                <div className="w-80 bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium flex items-center gap-0.5">
                        <FaRupeeSign size={10} />{" "}
                        {calculateSubtotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">CGST (9%):</span>
                      <span className="font-medium flex items-center gap-0.5">
                        <FaRupeeSign size={10} />{" "}
                        {(calculateTax() / 2).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">SGST (9%):</span>
                      <span className="font-medium flex items-center gap-0.5">
                        <FaRupeeSign size={10} />{" "}
                        {(calculateTax() / 2).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">
                        {calculateShipping() === 0 ? (
                          "FREE"
                        ) : (
                          <span className="flex items-center gap-0.5">
                            <FaRupeeSign size={10} />{" "}
                            {calculateShipping().toFixed(2)}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold pt-2 border-t-2 border-gray-200">
                      <span className="text-gray-800">Grand Total:</span>
                      <span className="text-orange-600 flex items-center gap-0.5">
                        <FaRupeeSign size={12} /> {calculateTotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 pt-2 border-t border-dashed">
                      <span className="font-semibold">Amount in Words:</span>{" "}
                      {getAmountInWords()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-amber-50 p-3 rounded-lg mb-4">
                <p className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1">
                  <FaBuilding size={10} /> BANK DETAILS:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-semibold">Bank:</span> HDFC Bank,
                    Satara
                  </div>
                  <div>
                    <span className="font-semibold">A/C No:</span>{" "}
                    50200012345678
                  </div>
                  <div>
                    <span className="font-semibold">IFSC:</span> HDFC0001234
                  </div>
                  <div>
                    <span className="font-semibold">UPI:</span> shopizo@hdfcbank
                  </div>
                  <div>
                    <span className="font-semibold">GSTIN:</span> 27AAAAA1234B1Z
                  </div>
                  <div>
                    <span className="font-semibold">PAN:</span> AAAAA1234B
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-700 mb-2">
                  TERMS & CONDITIONS:
                </p>
                <ul className="text-xs text-gray-500 list-disc pl-5 space-y-1">
                  <li>
                    Free shipping on orders above ₹500, else ₹40 charges apply
                  </li>
                  <li>Items cannot be returned after 7 days of delivery</li>
                  <li>For queries: support@shopizo.com | +91 98220 12345</li>
                  <li>
                    This is a system generated invoice and does not require
                    signature
                  </li>
                </ul>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end pt-4 border-t border-gray-200 flex-wrap gap-4">
                <div>
                  <p className="text-xs text-gray-600">For ShopiZo:</p>
                  <div className="mt-5">
                    <p className="text-xs text-gray-400">
                      (Authorized Signatory)
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm font-bold text-orange-600">
                    Thank you for shopping with ShopiZo!
                  </p>
                  <p className="text-xs text-gray-500">
                    We value your trust and satisfaction
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mx-auto">
                    <FaQrcode className="text-2xl text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Scan QR</p>
                </div>
              </div>

              {/* Copyright Footer */}
              <div className="text-center mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  For support, contact: support@shopizo.com | Phone: +91 98220
                  12345
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  ShopiZo - Karanje, Satara, Maharashtra - 415001
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  © {new Date().getFullYear()} ShopiZo. All rights reserved. |
                  CIN: U12345MH2023PTC123456
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InvoiceModal;
