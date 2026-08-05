import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import API from "../api/axios";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
const CATEGORIES = ["All", "Men", "Women", "Unisex"];

const Shop = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get("/products");
        setProducts(res.data);
        setError(null);
      } catch (err) {
        setError("Couldn't load products. Check that your backend is running on port 5001.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-brass font-sans font-medium mb-2">
          Full Collection
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-brand-black">
          Shop Watches
        </h1>
      </div>

      {/* Category filter */}
      <div className="flex justify-center gap-6 mb-10 border-b border-gray-200 pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm uppercase tracking-widest font-sans pb-1 border-b-2 transition-colors ${
              activeCategory === cat
                ? "border-brand-black text-brand-black"
                : "border-transparent text-brand-gray hover:text-brand-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* States */}
      {loading && (
        <p className="text-center text-brand-gray font-sans py-16">Loading watches...</p>
      )}

      {error && (
        <p className="text-center text-red-600 font-sans py-16">{error}</p>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-center text-brand-gray font-sans py-16">
          No watches found in this category yet.
        </p>
      )}

      {/* Product grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product._id} className="group">
              <Link to={`/product/${product._id}`} className="block aspect-square bg-gray-50 border border-gray-200 mb-4 overflow-hidden flex items-center justify-center">
  <img
  src={product.imageUrl}
  alt={product.name}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
/>
</Link>
              <div className="flex items-start justify-between">
                <div>
                  <Link to={`/product/${product._id}`}>
  <h3 className="font-display text-xl text-brand-black hover:text-brand-brass transition-colors">{product.name}</h3>
</Link>
                  <p className="text-sm text-brand-gray font-sans mt-1">
                    ₹{product.price?.toLocaleString("en-IN")}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-1 p-2 border border-brand-black hover:bg-brand-black hover:text-white transition-colors"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingBag className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;