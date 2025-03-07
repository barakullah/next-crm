const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-10 w-full rounded-md mb-4"></div>
      <div className="bg-gray-300 h-10 w-full rounded-md mb-4"></div>
      <div className="bg-gray-300 h-10 w-1/2 rounded-md mb-4"></div>
      <div className="bg-gray-300 h-10 w-full rounded-md mb-4"></div>
      <div className="bg-gray-300 h-10 w-32 rounded-md"></div>
    </div>
  );
};

export default SkeletonLoader;
