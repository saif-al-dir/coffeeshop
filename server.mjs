import path from 'path';
import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3131;

// Serve static files from the 'dist' directory
app.use(express.static('dist'));

// Endpoint to serve the JSON data directly
app.get('/products', (req, res) => {
  const jsonFilePath = path.join('dist', 'db', 'app.json');
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading JSON file');
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData.products);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
