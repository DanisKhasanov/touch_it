import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { Trash, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import useCustomSnackbar from "../hooks/useCustomSnackbar";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { showSnackbar } = useCustomSnackbar();

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    showSnackbar("Товар удален из корзины", {
      variant: "success",
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;

    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);

    setTimeout(() => {
      dispatch(clearCart());
      setIsCheckingOut(false);
      showSnackbar("Заказ успешно оформлен", {
        variant: "success",
      });
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-6">
          <ShoppingCart size={64} className="text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Ваша корзина пуста
        </h1>
        <p className="text-gray-600 mb-8">
          Добавьте товары, чтобы оформить заказ
        </p>
        <Link
          to="/"
          className="inline-flex items-center bg-purple-400 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors"
        >
          Перейти к покупкам <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-gray-600">
              <div className="col-span-6">Товар</div>
              <div className="col-span-2 text-center">Цена</div>
              <div className="col-span-2 text-center">Количество</div>
              <div className="col-span-2 text-center">Сумма</div>
            </div>

            {items.map((item) => (
              <div key={item.id}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                  <div className="col-span-1 md:col-span-6">
                    <div className="flex items-center">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <Link
                          to={`/product/${item.id}`}
                          className="text-gray-800 font-medium hover:text-purple-400 transition-colors line-clamp-2"
                        >
                          {item.title}
                        </Link>

                        <div className="md:hidden mt-2 flex justify-between items-center">
                          <span className="text-purple-400 font-bold">
                            ${item.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Удалить товар"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex md:col-span-2 items-center justify-center">
                    <span className="font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Уменьшить количество"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Увеличить количество"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                    <span className="font-bold md:font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="hidden md:block text-gray-400 hover:text-red-500 transition-colors ml-4"
                      aria-label="Удалить товар"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Сумма заказа
            </h2>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-lg ">
                  Итого товаров ({items.length}):
                </span>
                <span className="text-lg font-bold text-purple-400">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full bg-purple-500 text-white py-3 px-4 rounded-lg transition-colors ${
                isCheckingOut
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-purple-600"
              }`}
            >
              {isCheckingOut ? "Оформление..." : "Оформить заказ"}
            </button>

            <Link
              to="/"
              className="w-full block text-center text-gray-600 hover:text-purple-400 mt-4"
            >
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
