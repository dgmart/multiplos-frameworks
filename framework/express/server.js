import express from "express";
import customerRoutes from "./src/routes/customer.routes.js";

const app = express();
app.use(express.json());
app.use("/customers", customerRoutes);
app.listen(8001, () => {
    console.log("app express iniciado na porta 8001");
});
