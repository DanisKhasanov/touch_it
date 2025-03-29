import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useCustomSnackbar from "../hooks/useCustomSnackbar";
import { addToCart } from "../store/cartSlice";
import { RootState } from "../store";
import { Check } from "lucide-react";
import { ProductCardProps } from "../props/ProductCardProps";

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useCustomSnackbar();
  const { items } = useSelector((state: RootState) => state.cart);
  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isInCart) {
      dispatch(addToCart(product));
      showSnackbar("Товар добавлен в корзину", {
        variant: "success",
      });
    }
  };

  return (
    <Link
      key={product.id}
      to={`/product/${product.id}`}
      className="group bg-gray-50 rounded-lg shadow-xl hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
    >
      <div className="relative pt-[90%] overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-300 "
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">
          {product.title}
        </h3>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-bold text-purple-400">
            ${product.price?.toFixed(2) || "0.00"}
          </span>

          <button
            onClick={handleAddToCart}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center ${
              isInCart
                ? "bg-green-500 text-white cursor-default"
                : "bg-purple-400 hover:bg-purple-600 text-white"
            }`}
          >
            {isInCart ? (
              <>
                <Check size={18} className="mr-2" /> Добавлено
              </>
            ) : (
              "В корзину"
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};
