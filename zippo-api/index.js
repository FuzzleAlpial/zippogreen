const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lelien123",
  database: "csia",
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes

//Products
app.get('/zippo/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/bestseller', (req, res) => {
  connection.query('SELECT * FROM products WHERE isBestseller=\"1\"', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/classics', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Classics\"', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/premium', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Premium\"', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/asia', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Asia\"', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/slim', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Slim\"', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

//Price Sort
app.get('/zippo/products/bestseller/priceSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE isBestseller=\"1\" ORDER BY Price', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/classics/priceSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Classics\" ORDER BY Price', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/premium/priceSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Premium\" ORDER BY Price', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/asia/priceSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Asia\" ORDER BY Price', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/slim/priceSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Slim\" ORDER BY Price', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

//Descending price sort
app.get('/zippo/products/bestseller/descPriceSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE isBestseller=\"1\" ORDER BY Price DESC', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/classics/descPriceSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Classics\" ORDER BY Price DESC', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/premium/descPriceSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Premium\" ORDER BY Price DESC', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/asia/descPriceSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Asia\" ORDER BY Price DESC', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/slim/descPriceSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Slim\" ORDER BY Price DESC', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

//Default sort
app.get('/zippo/products/bestseller/defaultSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE isBestseller=\"1\" ORDER BY id', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/classics/defaultSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Classics\" ORDER BY id', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/premium/defaultSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Premium\" ORDER BY id', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/asia/defaultSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Asia\" ORDER BY id', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/products/slim/defaultSort', (req, res) => {
  connection.query('SELECT * FROM products WHERE Category=\"Slim\" ORDER BY id', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});


//Login and registration credentials
app.post('/zippo/authenticate', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT id, password FROM account WHERE username = ?';
  connection.query(query, username, (err, result) => {
    if (err || password !== result[0].password) {
      res.status(401).json({ error: 'Error verifying credentials' });
    } else {
      res.status(200).json({success: true, id: result[0].id});
    }
  });
});

app.post('/zippo/account', (req, res) => {
  const { username,
    password
     } = req.body;
  const query = 'INSERT INTO account (username, password) VALUES (?, ?)';

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding account' });
    } else {
      res.json({ message: 'Account added successfully', id: result.insertId });
    }
  });
});

//Order and Payment
app.get('/zippo/order', (req, res) => {
  connection.query('SELECT * FROM `order`', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching orders' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/productOrder', (req, res) => {
  connection.query('SELECT * FROM productorder', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching orders' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/order/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM `order` WHERE id = ?';
  
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching orders' });
    } else {
      res.json(result);
    }
  });
});

app.get('/zippo/productOrder', (req, res) => {
  connection.query('SELECT id FROM products', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(result);
    }
  });
});

app.post('/zippo/order', (req, res) => {
  const { accountID,
    receiverName, 
    receiverAddress,
    receiverPN,
    receiverEmail,
    time,
    paymentMethod } = req.body;
  const query = 'INSERT INTO `order` (accountID, receiverName, receiverAddress, receiverPN, receiverEmail, time, paymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?)';

  connection.query(query, [parseInt(accountID), receiverName, receiverAddress, receiverPN, receiverEmail, time, parseInt(paymentMethod)], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Order added successfully', id: result.insertId });
    }
  });
});

app.post('/zippo/productOrder', (req, res) => {
  const { quantities,
    productID,
    orderID } = req.body;
  const query = 'INSERT INTO productorder (quantities, productID, orderID) VALUES (?, ?, ?); UPDATE products SET Stock = Stock - ? WHERE id = ?;';
  connection.query(query, [quantities, productID, orderID, quantities, productID], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error adding product order' });
    } else {
      res.json({ message: 'Product order added successfully', id: result.insertId });
    }
  });
});

//Add
app.post('/zippo/products', (req, res) => {
  const { id, productsName, category, price, isBestseller, stock, description, image } = req.body;
  const query = 'INSERT INTO products (id, productsName, category, price, isBestseller, stock, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(query, [id, productsName, category, price, isBestseller, stock, description, image], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding product' });
    } else {
      res.json({ message: 'Product added successfully', productId: result.insertId });
    }
  });
});


//Delete product
app.delete('/zippo/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error removing product' });
      console.log(err)
    } else {
      res.json({ message: 'Product removed successfully' });
      console.log(id)
    }
  });
});

//Update product
app.patch('/zippo/products', (req, res) => {
  const { productsName, category, price, isBestseller, stock, description, image, id } = req.body;
  const query = 'UPDATE products SET ProductsName = ?, Category = ?, Price = ?, isBestseller = ?, Stock = ?, Description = ?, Image = ? WHERE id = ?';

  connection.query(query, [productsName, category, price, isBestseller, stock, description, image, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error updating product' });
      console.log(err)
    } else {
      res.json({ message: 'Product updated successfully', result });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

