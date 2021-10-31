const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const offersRoutes = require("./routes/offers");
const ordersRoutes = require ('./routes/orders');
const notificationsRoutes = require ('./routes/notifications');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const db = require("./models");
const Role = db.role;

//connect to DB
mongoose
  .connect(process.env.DB_CONNNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo is up."))
  .catch((err) => console.log("Mongo is Down. Raison :", err));
//Import routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/offers", offersRoutes);
app.use('/orders', ordersRoutes);
app.use('/notifications', notificationsRoutes);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our Pastry" });
});

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
