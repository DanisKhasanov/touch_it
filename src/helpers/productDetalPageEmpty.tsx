import { ArrowLeft } from "lucide-react";
import { ProductDetailPageEmptyProps } from "../props/ProductDetailPageEmptyProps";

export const ProductDetailPageEmpty = ({
  error,
  navigate,
}: ProductDetailPageEmptyProps) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      <p>{error || "Товар не найден"}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-2 flex items-center text-sm text-red-700 hover:underline"
      >
        <ArrowLeft size={16} className="mr-1" /> Вернуться назад
      </button>
    </div>
  );
};
