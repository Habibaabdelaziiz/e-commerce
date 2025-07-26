import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CounterContext = createContext();

// {
//     "shippingAddress":{
//         "details": "details",
//         "phone": "01010700999",
//         "city": "Cairo"
//         }
// }

export default function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(0)
  const [Cart, setCart] = useState(0)
  const [cartDetails, setCartDetails] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0)
  const [isLoading, setIsLoading] = useState({
    getCart: false,
    deleteProduct: false,
    updateCart: false,
    Chickout: false,
    clearCart: false,

  });
  const [msg, setmsg] = useState({
    getCart: null,
    deleteProduct: null,
    updateCart: null,
    Chickout: null,
    clearCart: null,

  });
  const [numCartItems, setNumCartItems] = useState(0);

  useEffect(() => {
    getCart()
  }, [])
  async function AddProudect(proudect) {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: proudect
        },
        {
          headers: {
            token: localStorage.getItem("userToken")
          }
        }
      )
      console.log(data);
      toast.success("Add to Cart");
      getCart(data.data)
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false);
    }
  }
  async function getCart() {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });

      console.log("Cart Data Response:", data);

      setCartDetails(data);
      setnumOfCartItems(data.numOfCartItems)
      toast.success("Success");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProduct(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });
      console.log(data);
      setCartDetails(data);
      toast.error("Deleted");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function updateCart(id, count) {
    if (count <= 0) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log(data);
      setCartDetails(data);
      setNumCartItems(data.numOfCartItems);
      toast.success("Updated successfully");
    } catch (error) {
      console.error("Error updating the cart item:", error);
      toast.error("Failed to update");
    } finally {
      setIsLoading(false);
    }
  }
  async function Chickout(id, shippingAddress) {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${location.origin}`,
        {
          shippingAddress: shippingAddress
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      console.log(data);
      if (data?.session?.url) {
        window.location.href = data.session.url;
      } else {
        toast.error("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Error during checkout:", error.response?.data || error.message);
      toast.error("An error occurred during checkout. Please try again later.");
    }
  }

  async function clearCart() {
    setIsLoading(true);
    try {
      const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });

      setCartDetails(null);
      toast.success("Cart cleared successfully");
    } catch (error) {

      toast.error("Failed to clear cart");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CounterContext.Provider
      value={{
        cartDetails,
        isLoading,
        numCartItems,
        getCart,
        AddProudect,
        deleteProduct,
        updateCart,
        Chickout,
        clearCart,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}