import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { SnackbarProvider } from "notistack";
import { Main } from "./pages/main";
import NotFound from "./pages/notFoundPage";
import ProductsPage from "./pages/productsPage";
import CartPage from "./pages/cartPage";
import ProductDetailPage from "./pages/productDetalPage";
import { closeSnackbar } from "notistack";
import { X } from "lucide-react";

export function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={5}
        action={(snackbarId) => (
          <button
            onClick={() => closeSnackbar(snackbarId)}
            className="text-white hover:text-gray-200 transition-colors "
            aria-label="Закрыть уведомление"
          >
            <X size={16} />
          </button>
        )}
      >
        <BrowserRouter basename="/touch_it">
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
}
