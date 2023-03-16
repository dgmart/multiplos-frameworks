import { DeepPartial } from "typeorm";
import { Customer } from "./customer";
export declare class CreateCustomerUseCase {
    execute(customer: DeepPartial<Customer>): Promise<Customer>;
}
