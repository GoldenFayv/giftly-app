import { useQuery } from "@tanstack/react-query";

import type { IProduct } from "../types/product";
import type { IApiResponse } from "../types/api-response";
import http from "../services/api";

async function fetchProducts(): Promise<IProduct[]> {
  const response: IApiResponse<IProduct[]> = await http().get<IApiResponse<IProduct[]>>("/products");

  return response.data;
}

async function fetchProduct(slug: string): Promise<IProduct> {
  const response = await http().get<IApiResponse<IProduct>>(`/products/${slug}`);

  return response.data;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useProduct(slug?: string) {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => fetchProduct(slug!),
    enabled: Boolean(slug),
  });
}