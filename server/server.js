require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
   origin: "http://localhost:5173",
}));


//user api routers
app.use("/api/users", require("./router/log/auth"));
app.use("/api/user", require("./router/admin/authenticateUser"));
app.use("/api/user/comment", require("./router/comments/comments"));
app.use("/api/user/profile", require("./router/profiles/profiles"));
app.use("/api/user/cart", require("./router/cart/cartItems"));

// admin api routers
app.use("/api/admin/users", require("./router/admin/authorizeAdmin"));
app.use("/api/admin/product", require("./router/products/product"));
app.use("/api/admin/category", require("./router/products/category"));

app.use(( err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "something rely went wrong!",
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{ console.log(`server running on port ${PORT}`)});