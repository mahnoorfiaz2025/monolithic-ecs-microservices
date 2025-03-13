const express = require('express');
const { getUsers } = require('./services/usersService');
const { getProducts } = require('./services/productsService');
const { getOrders } = require('./services/ordersService');
const { sendNotification } = require('./services/notificationsService');
const { analyzeTraffic } = require('./services/peakHoursAnalyzerService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => res.send('Monolithic Node.js App Running'));
app.get('/users', (req, res) => res.json(getUsers()));
app.get('/products', (req, res) => res.json(getProducts()));
app.get('/orders', (req, res) => res.json(getOrders()));
app.post('/notifications', (req, res) => {
    sendNotification(req.body.message);
    res.send("Notification sent successfully");
});
app.get('/peak-hours', (req, res) => res.send(analyzeTraffic()));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
