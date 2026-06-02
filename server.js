const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/hotelDB')
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Order Schema
const OrderSchema = new mongoose.Schema({
  table: Number,
  items: Array,
  status: String,
  time: String,
  note: String
});

const Order = mongoose.model('Order', OrderSchema);


// 👉 CREATE ORDER
app.post('/orders', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.send("Order Saved");
});

// 👉 GET ALL ORDERS
app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// 👉 UPDATE STATUS
app.put('/orders/:id', async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// 👉 DELETE ORDER
app.delete('/orders/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, ()=>console.log("Server running on port 5000"));