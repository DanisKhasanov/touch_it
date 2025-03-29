export const ProductLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="group bg-white rounded-lg shadow-md flex flex-col h-full mt-7 "
        >
          <div className="relative pt-[88%] bg-gray-200 animate-pulse" />
          <div className="p-4 flex flex-col flex-grow">
            <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="mt-auto flex justify-between">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
