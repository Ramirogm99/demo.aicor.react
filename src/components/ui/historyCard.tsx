import Cookies from "js-cookie";
export default function HistoryCard({ order }: { order: any }) {
  const getOrderOnceAgain = async () => {
    Cookies.remove("cart");
    let cart = order.order_items.map((item: any) => ({
      id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      name: item.product.name,
      image: item.product.image,
      description: item.product.description,
      category: item.product.category,
      stock: item.product.stock,
    }));
    cart = cart.map((item) => [item]);
    const cartItems = JSON.parse(Cookies.get("cart") || "[]");
    const cartItemsNew = [...cartItems, ...cart];
    Cookies.set("cart", JSON.stringify(cartItemsNew), {
      expires: 7,
    });
    window.location.reload();
  };
  return (
    <div className="p-4 rounded-lg shadow-md mb-4 w-[44vw] h-[40vh] mt-4 mx-auto bg-white border-b-2 border-gray-200 col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <h2 className="text-lg font-semibold text-gray-800 vh-10 items-center justify-center col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 mt-4">
          Pedido {new Date(order.created_at).toLocaleDateString()}
        </h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 mt-2"
          onClick={getOrderOnceAgain}
        >
          Repetir Pedido
        </button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mt-4 border-b-2 border-gray-200 pb-2">
        <p className="text-gray-600 col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 font-semibold">
          Producto
        </p>
        <p className="text-gray-600 col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 font-semibold">
          Cantidad
        </p>
        <p className="text-gray-600 col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 font-semibold">
          Precio
        </p>
      </div>
      <div className="mt-4 overflow-y-auto h-[30vh]">
        {order.order_items.map((item: any) => (
          <div key={item.id} className="mt-2 h-[10vh]">
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
              <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                <p className="text-gray-600">
                  <span>{item.product.name}</span>
                </p>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                <p className="text-gray-600">
                  <span>{item.quantity}</span>
                </p>
              </div>
              <p className="text-gray-600">
                <span>${item.product.price}</span>
              </p>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <p className=" text-gray-600 col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
            Total:{" "}
          </p>
          <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"></div>
          <p className="text-gray-600 col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
            <span className="font-semibold">
              $
              {order.order_items.reduce(
                (total: number, item: any) =>
                  total + item.product.price * item.quantity,
                0
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
