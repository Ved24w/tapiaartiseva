const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1/donations");

const Donation = mongoose.model("Donation", {
  name:String,
  mobile:String,
  amount:Number,
  paymentId:String,
  date:{type:Date, default:Date.now}
});

const razorpay = new Razorpay({
  key_id: "RAZORPAY_LIVE_KEY",
  key_secret: "RAZORPAY_SECRET"
});

app.post("/create-order", async (req,res)=>{
  const {amount,name,mobile} = req.body;

  const order = await razorpay.orders.create({
    amount: amount*100,
    currency:"INR"
  });

  await Donation.create({name,mobile,amount});

  res.send({orderId:order.id, amount:order.amount});
});

app.get("/admin/donations", async (req,res)=>{
  const data = await Donation.find().sort({date:-1});
  res.json(data);
});

app.listen(5000,()=>console.log("Server running"));

function generateReceipt(donation){
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("receipt.pdf"));

  doc.fontSize(18).text("Tapi Mata Aarti Donation Receipt",{align:"center"});
  doc.moveDown();
  doc.text(`Name: ${donation.name}`);
  doc.text(`Mobile: ${donation.mobile}`);
  doc.text(`Amount: ₹${donation.amount}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);

  doc.end();
}
