import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center p-10 text-gray-600">Loading...</div>;
  }

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    addToCart(product);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2 text-blue-700">
            {product.name}
          </h1>
          <p className="text-gray-500 line-through">₹{product.price}</p>
          <p className="text-green-600 text-2xl font-bold mb-4">
            ₹{product.discountedPrice}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                console.log("Adding to cart:", product.name);
                addToCart(product);
                navigate("/cart");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                handleAddToCart();
                navigate("/checkout");
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
