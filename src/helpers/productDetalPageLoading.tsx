export const ProductDetailPageLoading = () => {
  return (
    <div className="space-y-6">
      <div className="h-6 w-24 bg-gray-200 rounded-full"></div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4 h-[400px] animate-pulse">
            <div className="w-full h-full bg-gray-200 rounded"></div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>

            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="flex items-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 bg-gray-200 rounded-full"
                    ></div>
                  ))}
                </div>
                <div className="h-3 w-12 bg-gray-200 rounded ml-1"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            <div className="mt-auto pt-8">
              <div className="flex items-center justify-between">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-12 bg-gray-200 rounded-lg w-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
