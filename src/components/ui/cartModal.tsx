import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { getUserDetails, SentCartToPayment } from "../../axios/api";
import { AppContext } from "../../context";
import CartItems from "./cartItems";
export default function CartModal({
  product,
  show,
  onClose,
}: {
  product: string[];
  show: boolean;
  onClose: () => void;
}) {
  const token = useContext(AppContext);
  const [userDetails, setUserDetails] = useState({});
  const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];
  const userDetail = () => {
    getUserDetails(token.accessToken).then((data) => {
      setUserDetails(data);
      console.log(userDetails);
    });
  };

  const handleClose = () => {
    onClose();
  };
  const sendToPay = () => {
    if (product.length > 0) {
      SentCartToPayment(userDetails)
        .then((data) => {
          Cookies.remove("cart");
          onClose();
        })
        .catch((error) => {
          console.error("Error during payment:", error);
        });
    } else {
      console.log("Carrito vacío");
    }
  };
  useEffect(() => {
    userDetail();
  }, []);

  return (
    <div>
      <Dialog open={show} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
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
                      Carrito
                    </DialogTitle>
                    <div className="mt-2 w-full">
                        <CartItems cartItems={cart} />;
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => sendToPay()}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  {product.length > 0 ? "Pagar" : "Carrito vacío"}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => handleClose()}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm text-white font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cerrar
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
