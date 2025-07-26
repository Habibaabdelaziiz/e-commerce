import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import ProudectCart from "../ProudectCart/ProudectCart";

export default function Products() {
  const fetchProducts = () => axios.get("https://ecommerce.routemisr.com/api/v1/products");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Products"],
    queryFn: fetchProducts,
    staleTime: 3000,
  });

  const addProductToCart = async (productId) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      console.log("Product added to cart:", data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (isLoading) {
    return <p className="text-center text-green-500">Loading products...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-5 gap-5 mt-5">
      {data?.data.data.map((product) => (
        <ProudectCart key={product._id} product={product} addToCart={addProductToCart} />
      ))}
    </div>
  );
}
