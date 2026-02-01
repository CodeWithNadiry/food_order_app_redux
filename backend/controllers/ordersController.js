import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get absolute folder path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createOrder(req, res) {
  const orderData = req.body.orderData;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing Data' });
  }

  const customer = orderData.customer;

  if (!customer.email || !customer.email.includes('@') || !customer.name?.trim() ||
      !customer.street?.trim() || !customer['postal-code']?.trim() || !customer.city?.trim()) {
    return res.status(400).json({
      message: 'Missing data: Email, name, street, postal code or city is missing.'
    });
  }

  const newOrder = {
    ...orderData,
    id: Math.random().toString()
  };

  // Absolute path to orders.json
  const ordersPath = path.join(__dirname, '../data/orders.json');

  // Read, update, write
  const ordersFile = await fs.readFile(ordersPath, 'utf-8');
  const allOrders = JSON.parse(ordersFile) || [];

  allOrders.push(newOrder);
  await fs.writeFile(ordersPath, JSON.stringify(allOrders));

  res.status(201).json({ message: 'Order Created!' });
}