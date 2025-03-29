import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchProducts, setFilteredItems } from "../store/productsSlice";
import { ProductsSearchAndFilter } from "../components/productSearchAndFilter";
import { Product } from "../types/product";
import { ProductCard } from "../components/productCard";
import Pagination from "../components/pagination";
import { ProductLoading } from "../helpers/productLoading";
import { ProductError } from "../helpers/productError";
import { ProductEmpty } from "../helpers/productEmpty";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, filteredItems, status, error, currentPage, itemsPerPage } =
    useSelector((state: RootState) => state.products);
  const { selectedCategory, searchQuery, sortOrder } = useSelector(
    (state: RootState) => state.filter
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts() as any);
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (!items.length) return;

    let filtered = [...items];

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    if (sortOrder) {
      filtered.sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    dispatch(setFilteredItems(filtered));
  }, [items, selectedCategory, searchQuery, sortOrder, dispatch]);

  const getCurrentPageItems = (): Product[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  };

  const currentItems = getCurrentPageItems();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Наши товары</h1>
      <ProductsSearchAndFilter />

      {status === "loading" ? (
        <ProductLoading />
      ) : status === "failed" ? (
        <ProductError
          error={error || "Произошла ошибка при загрузке товаров"}
          onRetry={() => dispatch(fetchProducts() as any)}
        />
      ) : filteredItems.length === 0 ? (
        <ProductEmpty />
      ) : (
        <>
          <p className="text-gray-600 mb-4">
            Найдено {filteredItems.length} товаров
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
