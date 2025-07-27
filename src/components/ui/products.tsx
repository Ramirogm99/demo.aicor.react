export default function Products({
  data,
  onAddToCart,
}: {
  data: string[];
  onAddToCart: (product: string[]) => void;
}) {
  return (
    <div className="products grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 sm:grid-cols-6 gap-3 overflow-y-auto py-5 pl-5 w-full h-full">
      {data.map((product) => (
        <div
          key={product.id}
          className="product-card p-4 bg-white rounded-md shadow-md w-120 h-90 hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-55 object-cover rounded-md"
          />
          <p className="text-gray-600">${product.price}</p>
          <p className="text-lg font-semibold text-gray-800">{product.name}</p>
          <p
            className={`text-sm flex font-semibold ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? "En stock : " + product.stock : "Agotado"}
          </p>
          <button
            disabled={product.stock === 0}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors static bottom-0 mx-auto ${
              product.stock > 0 ? "" : "opacity-50"
            }`}
            onClick={() => onAddToCart([product])}
          >
            Añadir al carrito
          </button>
        </div>
      ))}
    </div>
  );
}
