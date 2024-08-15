import { FC } from "react";

const createPageNumbers = (totalPages: number, page: number) => {
  const pages = [];
  const startPage = Math.max(1, page - 5);
  const endPage = Math.min(totalPages, page + 5);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

interface PaginationBlockProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PaginationBlock: FC<PaginationBlockProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  const visiblePages = createPageNumbers(totalPages, page);

  return (
    <div className="flex justify-center mt-5 space-x-2">
      {page > 1 && !visiblePages.includes(1) && (
        <>
        <button
          onClick={() => setPage(1)}
          className="text-white bg-blue-800 rounded-sm px-4 py-1"
        >
          1
        </button>
        <span> . . . </span>
        </>
      )}
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`text-white ${
            pageNumber === page ? "bg-blue-500" : "bg-blue-800"
          } rounded-sm px-4 py-1`}
        >
          {pageNumber}
        </button>
      ))}
      {page < totalPages && !visiblePages.includes(totalPages) && (
        <>
        <span> . . . </span>
        <button
          onClick={() => setPage(totalPages)}
          className="text-white bg-blue-800 rounded-sm px-4 py-1"
        >
          {totalPages}
        </button>
        </>
      )}
    </div>
  );
};

export default PaginationBlock;