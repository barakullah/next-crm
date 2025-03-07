const SkeletonLoader = () => {
  const array = new Array(15).fill(null);
  const newarray = new Array(7).fill(null);
  return (
    <tbody>
      {array.map(() => (
        <tr className="animate-pulse w-full">
          {newarray.map(() => (
            <td>
              <div className="bg-gray-300 h-3 w-full rounded-md mb-2"></div>
            </td>
          ))}

          {/* <td>{data?.last_name}</td> */}
        </tr>
      ))}
    </tbody>
  );
};

export default SkeletonLoader;
