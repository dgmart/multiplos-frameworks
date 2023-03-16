import { DeepPartial } from "typeorm";
import { Customer } from "./customer";
import { ds } from "../data-source";

export class CreateCustomerUseCase {
    async execute(customer: DeepPartial<Customer>): Promise<Customer> {
        const em = await ds.getEntityManager();
        const rawCustomer = em.create(Customer, customer);
        await em.insert(Customer, rawCustomer);

        return rawCustomer as Customer;
    }
}
