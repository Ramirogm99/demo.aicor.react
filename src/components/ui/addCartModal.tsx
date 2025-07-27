import Cookies from "js-cookie";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
export default function AddCartModal({
  product,
  show,
  onClose,
}: {
  product: string[];
  show: boolean;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const addQuantity = (increment: number) => {
    if (quantity < 1) {
      console.error("Quantity cannot be less than 1.");
      return;
    }
    setQuantity((prev) => Math.max(1, prev + increment));
  };
  const lessQuantity = (decrement: number) => {
    if (quantity <= 1) {
      console.error("Quantity cannot be less than 1.");
      return;
    }
    setQuantity((prev) => Math.max(1, prev - decrement));
  };
  const handleAddToCart = () => {
    if (!product || product.length === 0) {
      console.error("No product selected for adding to cart.");
      return;
    }

    const cartItems = JSON.parse(Cookies.get("cart") || "[]");
    if (quantity < 1) {
      console.error("Invalid quantity.");
      return;
    }
    product[0].quantity = quantity; 
    console.log("Product to be added:", product);
    const cartItemsNew = [...cartItems, [product[0]]];
    console.log("Cart items to be added:", cartItemsNew);
    Cookies.remove("cart");
    Cookies.set("cart", JSON.stringify(cartItemsNew), {
      expires: 7,
    });
    setQuantity(1);
    onClose();
  };
  const handleClose = () => {
    setQuantity(1);
    onClose();
  };
  return (
    <div>
      <Dialog open={show} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-0 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Confirmar Añadir al Carrito -{" "}
                      {JSON.stringify(product[0]?.name)}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        ¿Cuánto deseas añadir?
                      </p>

                      <div className="relative flex items-center max-w-[20rem] mx-auto mt-4">
                        <button
                          type="button"
                          id="decrement-button"
                          onClick={() => lessQuantity(1)}
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          aria-describedby="helper-text-explanation"
                          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="999"
                          required
                        />
                        <button
                          type="button"
                          id="increment-button"
                          onClick={() => addQuantity(1)}
                          data-input-counter-increment="quantity-input"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
                        <div className="text-sm text-gray-500 mt-2 mx-2 w-full">
                          Precio: {product[0]?.price * quantity || 0} €
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => handleAddToCart()}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Añadir al carrito
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => handleClose()}
                  className="mt-3 text-white inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
