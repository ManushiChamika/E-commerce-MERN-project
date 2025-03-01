const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//middleware setup
app.use(express.json({limit : "25mb"}));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({

    origin: "http://localhost:5173",
    credentials: true
}))

//image import
const uploadImage = require('./src/utils/uploadImage');

//all routes
const authRoutes = require('./src/users/user.route');
//TODO: import product routes
const productRoutes = require('./src/products/products.route');
//TODO: import review routes
const reviewRoutes = require('./src/reviews/reviews.router');
const orderRoutes = require('./src/orders/order.route');
const statsRoutes = require('./src/stats/stats.route')

app.use('/api/auth', authRoutes);
//TODO: use product routes
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);


main()
.then(()=> console.log("mongo db is successfully connected."))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL); 
}

app.get('/', (req, res) => {
  res.send('EzyShopper E-Commerce server is running...........!')
})

//TODO: add a route to upload image
//if you have to send larger image, body parser should be used
app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image).then((url) => res.send(url)).catch((err) => res.status(500).send(err));
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

