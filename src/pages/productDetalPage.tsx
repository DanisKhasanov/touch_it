import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { ArrowLeft, Check } from "lucide-react";
import { Product } from "../types/product";
import { getProduct } from "../api";
import useCustomSnackbar from "../hooks/useCustomSnackbar";
import { RootState } from "../store";
import { ProductDetailPageLoading } from "../helpers/productDetalPageLoading";
import { ProductDetailPageEmpty } from "../helpers/productDetalPageEmpty";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { items } = useSelector((state: RootState) => state.cart);
  const isInCart = product
    ? items.some((item) => item.id === product.id)
    : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProduct(id || "");
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить товар. Попробуйте позже.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      showSnackbar("Товар добавлен в корзину", {
        variant: "success",
      });
    }
  };

  if (loading) return <ProductDetailPageLoading />;

  if (error || !product)
    return <ProductDetailPageEmpty error={error} navigate={navigate} />;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-purple-600 mb-6 transition-colors"
      >
        <ArrowLeft size={18} className="mr-1" /> Назад к товарам
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="flex justify-center items-center bg-white rounded-lg p-4">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[400px] object-contain"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>

            <div className="flex items-center mb-4">
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </span>
              <div className="flex items-center ml-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.round(product.rating.rate)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-1 text-sm text-gray-500">
                  ({product.rating.count} отзывов)
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-6 flex-grow">
              {product.description}
            </p>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-brand-purple">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart}
                  className={`px-6 py-3 rounded-lg transition-colors flex items-center ${
                    isInCart
                      ? "bg-green-500 text-white cursor-default"
                      : "bg-purple-400 hover:bg-purple-600 text-white"
                  }`}
                >
                  {isInCart ? (
                    <>
                      <Check size={18} className="mr-2" /> Добавлено в корзину
                    </>
                  ) : (
                    "Добавить в корзину"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
