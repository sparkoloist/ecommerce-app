import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");

        // Group products by category
        const grouped = {};
        for (const product of res.data) {
          const catName = product.category?.name || "Uncategorized";
          if (!grouped[catName]) grouped[catName] = [];
          grouped[catName].push(product);
        }
        setGroupedProducts(grouped);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        🛍️ Explore Our Best Products
      </h1>

      {Object.keys(groupedProducts).length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        Object.entries(groupedProducts).map(([categoryName, products]) => (
          <div key={categoryName} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-1">
              {categoryName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image || "https://via.placeholder.com/150"}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <h2 className="text-lg font-semibold mb-1">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="text-gray-500 line-through text-sm">
                    ₹{product.price}
                  </p>
                  <p className="text-green-600 text-lg font-bold">
                    ₹{product.discountedPrice}
                  </p>
                  <button
                    onClick={() => {
                      console.log("Adding to cart:", product.name);
                      addToCart(product);
                      navigate("/cart");
                    }}
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
