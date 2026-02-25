import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateReceipt = (order, shop) => {

    const doc = new jsPDF();
    const shopOrder = order.shopOrders[0];

    // ===============================
    // HEADER LEFT SIDE (Restaurant Name)
    // ===============================
    doc.setFontSize(18);
    doc.setTextColor(255, 17, 0);
    doc.text("SwadMitra Restaurant", 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text("Order Receipt", 14, 28);

    // ===============================
    // HEADER RIGHT SIDE (Restaurant Address)
    // ===============================
    doc.setFontSize(11);

    const rightX = 140;
    let rightY = 20;

    // Title
    doc.text("Restaurant Address:", rightX, rightY);
    rightY += 6;
    doc.text("Restaurant Address:", 140, 20);
    doc.text(shop?.name || "", rightX, rightY);
    rightY += 6;

    // Wrap long address properly
    const addressLines = doc.splitTextToSize(
        shop?.address || "",
        55
    );

    doc.text(addressLines, rightX, rightY);

    // ✅ Proper spacing (5 instead of 10)
    rightY += addressLines.length * 5 + 6;



    // Divider Line
    doc.line(14, 45, 196, 45);

    // ===============================
    // ORDER INFO
    // ===============================
    doc.setFontSize(11);
    doc.text(`Order ID: ${order._id}`, 14, 55);
    doc.text(
        `Date: ${new Date(order.createdAt).toLocaleString()}`,
        14,
        62
    );
    doc.text(`Payment Method: ${order.paymentMethod}`, 14, 69);
    doc.text(`Payment Status: ${order.paymentStatus}`, 14, 76);

    // Divider
    doc.line(14, 82, 196, 82);

    // ===============================
    // DELIVERY ADDRESS (User Name Inside)
    // ===============================
    doc.setFontSize(13);
    doc.text("Delivery Address:", 14, 92);

    doc.setFontSize(11);
    doc.text(order.deliveryAddress.name, 14, 100);

    doc.text(
        `${order.deliveryAddress.buildingName}, ${order.deliveryAddress.landmark}`,
        14,
        107
    );

    doc.text(
        `${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pinCode}`,
        14,
        114
    );

    doc.text(`Mobile: ${order.deliveryAddress.mobile}`, 14, 121);

    // Divider
    doc.line(14, 128, 196, 128);

    // ===============================
    // ITEMS TABLE
    // ===============================
    const tableData = shopOrder.shopOrderItems.map((item) => [
        item.name,
        item.qty,
        `₹${item.price}`,
        `₹${item.total}`,
    ]);

    autoTable(doc, {
        startY: 135,
        head: [["Item", "Qty", "Price", "Total"]],
        body: tableData,
        theme: "grid",
        headStyles: {
            fillColor: [255, 17, 0],
        },
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    // ===============================
    // TOTAL SECTION
    // ===============================
    doc.setFontSize(12);
    // doc.text(`Sub Total: ₹${shopOrder.subTotal}`, 140, finalY);
    doc.text(`Total Amount: ₹${order.totalAmount}`, 140, finalY + 8);

    doc.line(14, finalY + 15, 196, finalY + 15);

    // ===============================
    // FOOTER
    // ===============================
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
        "Thank you for ordering with SwadMitra!",
        14,
        finalY + 25
    );
    doc.text(
        "This is a system generated invoice.",
        14,
        finalY + 32
    );

    doc.save(`Receipt_${order._id}.pdf`);
};
