import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./config/connectDb.js";
import { corsConfig } from "./config/corsConfig.js";

// routes
import { checkUser, userRoles } from "./middlewares/auth.middleware.js";
import authRouter from "./routes/auth/auth.route.js";
import adminProductsRouter from "./routes/admin/products.routes.js";
import shopProductsRouter from "./routes/shop/products.route.js";
import cartRouter from "./routes/shop/cart.route.js";
import shoppingAddressRouter from "./routes/shop/address.route.js";

configDotenv();

connectDb();

const app = express();

app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/admin/products", adminProductsRouter);

app.use("/api/shopping/products", shopProductsRouter);
app.use("/api/shopping/cart", checkUser, cartRouter);
app.use("/api/shopping/address", checkUser, shoppingAddressRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});
