import { Customer } from "./customer";
export declare class FindCustomerByIdUseCase {
    execute(id: number): Promise<Customer | null>;
}
