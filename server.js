const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// অ্যাপ তৈরি এবং পোর্ট সেটআপ
const app = express();
const PORT = process.env.PORT || 3000;

let totalSale = 0;  // মোট বিক্রয়ের হিসাব রাখার জন্য ভেরিয়েবল

// মিডলওয়্যার
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// বিক্রয় ফর্ম পেজ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sale.html'));
});

// বিক্রয় ডাটা প্রোসেসিং
app.post('/sale', (req, res) => {
    const { product, price, quantity } = req.body;
    const saleAmount = price * quantity;
    totalSale += saleAmount;  // মোট বিক্রয়ে যোগ

    res.send(`
        <h1>বিক্রয় রসিদ</h1>
        <p><strong>পণ্য:</strong> ${product}</p>
        <p><strong>দর:</strong> ${price} টাকা</p>
        <p><strong>পরিমাণ:</strong> ${quantity}</p>
        <p><strong>মোট মূল্য:</strong> ${saleAmount} টাকা</p>
        <p><strong>মোট বিক্রয়:</strong> ${totalSale} টাকা</p>
        <a href="/">পুনরায় বিক্রয় করুন</a>
    `);
});

// সার্ভার শুরু
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
