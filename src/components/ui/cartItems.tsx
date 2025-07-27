import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoTrashBin } from "react-icons/io5";

export default function CartItems({ cartItems }: { cartItems: any[] }) {
  const cartFinal = JSON.parse(Cookies.get("cart") || "[]");
  const [cart, setCart] = useState<string[]>(cartFinal);

  const [quantityArray, setQuantityArray] = useState<number[]>(
    cart.map((item) => item[0].quantity || 1)
  );
  const setQuantity = (index: number, value: number) => {
    setQuantityArray((prev) =>
      prev.map((qty, i) => (i === index ? value : qty))
    );
  };
  useEffect(() => {
    setQuantityArray(cart.map((item) => item[0].quantity || 1));
  }, [cart , cartItems , Cookies.get("cart")]);

  const deleteItemFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    const element = document.getElementById(`cart-item-${index}`);
    if (element) {
      element.remove();
    }
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
    setQuantityArray((prev) => prev.filter((_, i) => i !== index));
  };
  const addAmount = (position: number) => {
    cart[position][0].quantity = cart[position][0].quantity + 1;
    setQuantityArray((prev) =>
      prev.map((qty, index) => (index === position ? qty + 1 : qty))
    );
  };
  const lessQuantity = (position: number) => {
    if (cart[position][0].quantity <= 1) {
      cart.filter((_, index) => index !== position);
      setQuantityArray((prev) => prev.filter((_, index) => index !== position));
      setCart(cart);
      Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
    } else {
      cart[position][0].quantity = cart[position][0].quantity - 1;
      setQuantityArray((prev) =>
        prev.map((qty, index) => (index === position ? qty - 1 : qty))
      );
      setCart(cart);
      Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
    }
  };
  return (
    <div>
      {cart.map((item, index) => (
        <div
          key={index}
          id={`cart-item-${index}`}
          className="grid grid-cols-4 justify-between items-center mt-2 "
        >
          <span className="text-gray-900 mt-4 text-sm font-semibold col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
            {item[0].name}
          </span>
          <div className="flex items-center col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
            <button
              type="button"
              id="decrement-button"
              disabled={quantityArray[index] <= 1}
              onClick={() => lessQuantity(index)}
              className={
                "bg-gray-100 dark:hover:bg-gray-600 mr-3 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg h-9 w-9 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none " +
                (quantityArray[index] <= 1
                  ? "disabled opacity-50 cursor-not-allowed"
                  : "")
              }
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="quantity-input"
              value={quantityArray[index]}
              onChange={(e) =>
                setQuantity(index, parseInt(e.target.value) || 1)
              }
              aria-describedby="helper-text-explanation"
              className="border-x-0 border-gray-300 h-11 w-10 bg-gray-100 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block  py-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="999"
              required
            />
            <button
              type="button"
              id="increment-button"
              onClick={() => addAmount(index)}
              data-input-counter-increment="quantity-input"
              className=" ml-3 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 h-9 w-9 border border-gray-300 rounded-e-lg p-3 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>

          <div className="items-center max-w-[20rem] ml-15 my-auto  text-sm text-gray-500 col-span-1 m">
            {Math.round(item[0].price * quantityArray[index] * 100) / 100 || 0}{" "}
            €
          </div>
          <div className="col-span-1">
            <button
              type="button"
              id="increment-button"
              onClick={() => deleteItemFromCart(index)}
              data-input-counter-increment="quantity-input"
              className=" ml-5 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 h-9 w-14 border border-gray-300 rounded-e-lg focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none my-auto"
            >
              <IoTrashBin className="w-4 h-4 text-gray-900 dark:text-white" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
