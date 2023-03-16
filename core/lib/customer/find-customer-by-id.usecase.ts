import { Customer } from "./customer";
import { ds } from "../data-source";

export class FindCustomerByIdUseCase {
    async execute(id: number): Promise<Customer | null> {
        const em = await ds.getEntityManager();
        return await em.getRepository(Customer).findOneBy({ id });
    }
}
