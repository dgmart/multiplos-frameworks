import { Customer } from "./customer";
import { ds } from "../data-source";

export class UpdateCustomerUseCase {
    async execute(customer: Customer): Promise<Customer> {
        const em = await ds.getEntityManager();
        const rawCustomer = await em.preload(Customer, customer);
        if (rawCustomer) {
            await em.save(rawCustomer);

            return rawCustomer;
        }

        throw new Error("Customer not found");
    }
}
