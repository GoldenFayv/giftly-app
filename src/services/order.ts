import http from "./api";
import type { IOrder } from "../types/order";
import type { IApiResponse } from "../types/api-response";

export async function getOrder(orderId: Id): Promise<IOrder> {
    const response = await http().get<IApiResponse<IOrder>>(`/orders/${orderId}`);

    return response.data;
}