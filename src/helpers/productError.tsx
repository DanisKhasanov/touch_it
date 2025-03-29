import { ProductErrorProps } from "../props/ProductErrorProps";

export const ProductError = ({ error, onRetry }: ProductErrorProps) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      <p>Ошибка: {error}</p>
      <button onClick={onRetry} className="mt-2 text-sm underline">
        Попробовать снова
      </button>
    </div>
  );
};
