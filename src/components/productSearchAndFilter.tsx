import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  fetchCategories,
  setCategory,
  setSearchQuery,
  setSortOrder,
  clearFilters,
} from "../store/filterSlice";
import { ArrowUpDown } from "lucide-react";

export const ProductsSearchAndFilter = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory, searchQuery, sortOrder, status } =
    useSelector((state: RootState) => state.filter);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories() as any);
    }
  }, [status, dispatch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSortToggle = () => {
    if (sortOrder === null) {
      dispatch(setSortOrder("asc"));
    } else if (sortOrder === "asc") {
      dispatch(setSortOrder("desc"));
    } else {
      dispatch(setSortOrder(null));
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск товаров"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 w-5 text-xl"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        <div className="w-full md:w-64">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent appearance-none bg-white"
          >
            <option value="">Все категории</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSortToggle}
          className={`flex items-center justify-center px-4 py-2 border rounded-lg transition-colors ${
            sortOrder
              ? "bg-purple-400 text-white border-brand-purple"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          title={
            sortOrder === "asc"
              ? "Сортировка по возрастанию цены"
              : sortOrder === "desc"
              ? "Сортировка по убыванию цены"
              : "Без сортировки"
          }
        >
          <ArrowUpDown size={20} />
          <span className="ml-2 hidden md:inline">
            {sortOrder === "asc"
              ? "По возрастанию"
              : sortOrder === "desc"
              ? "По убыванию"
              : "Сортировка"}
          </span>
        </button>

        <button
          onClick={handleClearFilters}
          className="px-4 py-2 text-gray-600 border
         border-gray-300 rounded-lg hover:bg-red-200 transition-colors"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  );
};
