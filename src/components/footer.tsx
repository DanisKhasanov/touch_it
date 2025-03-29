import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react"; // Добавляем этот импорт

export const Footer = () => {
  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-100 py-2">
      <div className="container mx-auto px-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-purple-600">
              Touch IT
            </Link>
          </div>

          <div className="flex items-center justify-center md:justify-start md:space-x-2">
            <button
              onClick={handleToTop}
              className="text-purple-600 mb-2 md:mb-0 flex items-center md:hidden"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-1 pt-3 border-t border-gray-200 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} Интернет-магазин Touch IT. Все права
            защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
