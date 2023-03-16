import { CustomerModule } from "@multi-framework/core";
import express from "express";
const routes = express.Router();
const {
    ListCustomersUseCase,
    FindCustomerByIdUseCase,
    CreateCustomerUseCase,
    UpdateCustomerUseCase
} = CustomerModule;

routes.get("/", async (req, res) => {
    const usecase = new ListCustomersUseCase();
    const list = await usecase.execute({
        currentPage: parseInt(req.query["page"]) || 1,
        itemsPerPage: parseInt(req.query["items-per-page"]) || 10
    });

    res.json(list);
});

routes.get("/:id", async (req, res) => {
    const usecase = new FindCustomerByIdUseCase();
    const customer = await usecase.execute(req.params.id);
    if (customer) {
        return res.json(customer);
    }

    res.status(404).json({ message: "Customer not found" });
});

routes.post("/", async (req, res) => {
    const usecase = new CreateCustomerUseCase();
    const customer = await usecase.execute(req.body);

    res.json(customer);
});

routes.put("/:id", async (req, res) => {
    try {
        const usecase = new UpdateCustomerUseCase();
        const id = parseInt(req.params.id) || 0;
        if (id) {
            let customer = req.body;
            customer.id = id;
            customer = await usecase.execute(customer);
            if (customer) {
                return res.json(customer);
            }
        }
        throw new Error("ID must be number");
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
});

export default routes;
