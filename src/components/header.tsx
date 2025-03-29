import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const Header = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-400">
            Магазин Touch IT
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/cart"
              className="relative flex items-center text-gray-700 hover:text-purple-400 transition-colors"
              aria-label="Корзина"
            >
              <span className="hidden sm:inline m-1">Корзина</span>
              <ShoppingCart size={24} className="mr-2" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};