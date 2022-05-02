import { User } from "@elobong/users";
import { OrderItem } from "./order-item";

export class Order {
    id?: string;
    orderItem?: OrderItem;
    shippingAddress1?: string;
    shippingaddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: User;
    dateOrdered?: string;
}