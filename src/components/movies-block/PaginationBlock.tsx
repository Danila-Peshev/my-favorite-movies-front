import { FC } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const createPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, page - 5);
    const endPage = Math.min(totalPages, page + 5);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-5 space-x-2">
      {page > 1 && (
        <button
          onClick={() => setPage(1)}
          className="text-white bg-blue-800 rounded-sm px-4 py-1"
        >
          {t("firstPage")}
        </button>
      )}
      {createPageNumbers().map((pageNumber) => (
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
      {page < totalPages && (
        <button
          onClick={() => setPage(totalPages)}
          className="text-white bg-blue-800 rounded-sm px-4 py-1"
        >
          {t("lastPage")}
        </button>
      )}
    </div>
  );
};

export default PaginationBlock;
