import http from "./api";
import type { IPayment } from "../types/payment";
import type { IApiResponse } from "../types/api-response";

export async function verifyPayment(reference: string): Promise<IPayment> {
    const response = await http().get<IApiResponse<IPayment>>(`/payments/${reference}/verify`);

    return response.data;
}

export async function retryPayment(reference: string): Promise<IPayment> {
    const response = await http().post<IApiResponse<IPayment>>(`/payments/${reference}/retry`);

    return response.data;
}