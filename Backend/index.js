const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: '',
    key_secret: '',
});

app.get("/order", async (req, res) => {
    const responseFromRazorPay = await instance.orders.create({
        "amount": (500 * 100),
        "currency": "INR",
        "receipt": "RCP_ID_" + Date.now(),
        "partial_payment": false,
        "notes": {
            "key1": "value3",
            "key2": "value2"
        }
    })
    res.json({
        orderID: responseFromRazorPay.id,
        amount: responseFromRazorPay.amount
    });
})

app.listen(3000);
