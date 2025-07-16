interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Paginate({currentPage, totalPages, onPageChange}: Props) {
    const pageNumbers = [];

    for (let index = 1; index <= totalPages; index++) {
        pageNumbers.push(index);
    }
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
      
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 rounded ${currentPage === num ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {num}
          </button>
        ))}
      
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}