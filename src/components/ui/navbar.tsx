import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import CartModal from "./cartModal";
import { FaPowerOff } from "react-icons/fa";

export default function NavBar({ user }: { user: { name: string } }) {
  const [cart, setCart] = useState<string[]>(
    Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : []
  );
  const cookieCart = Cookies.get("cart");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const openCartModal = () => {
    setIsCartModalOpen(true);
  };
  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("cart");
    window.location.href = "/";
  };
  useEffect(() => {
    const cartItems = Cookies.get("cart");
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }
  }, [cookieCart]);
  return (
    <>
      <nav className="navbar text-white p-4 flex justify-between items-center w-full static top-0 bg-gray-800 max-h-16">
        <div className="flex items-center">
          <img
            src="/../src/assets/logo.png"
            alt="Logo"
            className="rounded-full mr-3 h-17 w-17"
          />
        </div>
        <div className="flex space-x-4">
          <a href="/dashboard" className="text-white hover:text-gray-300">
            Inicio
          </a>
          <a href="/last-purchases" className="text-white hover:text-gray-300">
            Ultima Compras
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="w-full text-white py-2 rounded-md hover:bg-blue-600 cart-button"
            onClick={() => openCartModal()}
          >
            <CiShoppingCart className="inline-block mr-1 h-10 w-7" />
            <p className="inline-block">{cart.length}</p>
          </button>
        </div>
        <div className="flex items-center">
          <img
            src={user?.picture || "default-avatar.png"}
            alt="User Avatar"
            className="rounded-full mr-3 h-8 w-8"
          />
          <span className="">{user.name}</span>
        </div>
        <button onClick={logout} className="text-white hover:text-gray-300">
          <FaPowerOff />
        </button>
      </nav>
      <CartModal
        product={cart}
        show={isCartModalOpen}
        onClose={closeCartModal}
      />
    </>
  );
}
