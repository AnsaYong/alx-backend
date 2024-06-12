// 9-stock.js
import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

// List of products
const listProducts = [
    { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
    { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
    { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
    { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

// Function to get item by ID
function getItemById(id) {
    return listProducts.find(item => item.itemId === id);
}

// Set up Redis client and promisify functions
const client = createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

async function reserveStockById(itemId, stock) {
    await setAsync(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
    const stock = await getAsync(`item.${itemId}`);
    return stock ? parseInt(stock, 10) : null;
}

// Set up Express server
const app = express();
const port = 1245;

// Route to get the list of products
app.get('/list_products', (req, res) => {
    res.json(listProducts);
});

// Route to get details of a specific product
app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId, 10);
    const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const currentStock = await getCurrentReservedStockById(itemId) || product.initialAvailableQuantity;
  return res.json({
    ...product,
    currentQuantity: currentStock
  });
});

// Route to reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const currentStock = await getCurrentReservedStockById(itemId) || product.initialAvailableQuantity;

  if (currentStock <= 0) {
    return res.json({ status: 'Not enough stock available', itemId });
  }

  await reserveStockById(itemId, currentStock - 1);
  return res.json({ status: 'Reservation confirmed', itemId });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
