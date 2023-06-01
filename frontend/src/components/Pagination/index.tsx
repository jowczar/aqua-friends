import Image from "next/image";

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="text-center">
      <div className="inline-flex rounded-xl border border-[#e4e4e4] bg-white p-4">
        <ul className="-mx-[6px] flex items-center">
          <li className="px-[6px]">
            <div
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className={`hover:bg-primary hover:border-primary flex h-9 w-9 items-center justify-center rounded-md border border-[#EDEFF1] text-base text-[#838995] hover:text-white ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span>
                <Image
                  src={"left-arrow.svg"}
                  alt="Left arrow"
                  height={18}
                  width={18}
                />
              </span>
            </div>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className="px-[6px]">
              <div
                onClick={() => setCurrentPage(number)}
                className={`flex h-9 w-9 items-center justify-center rounded-md border border-[#EDEFF1] text-base ${
                  currentPage === number
                    ? "bg-primary text-white"
                    : "text-[#838995] hover:bg-primary hover:border-primary hover:text-white"
                }`}
              >
                {number}
              </div>
            </li>
          ))}

          <li className="px-[6px]">
            <div
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              className={`hover:bg-primary hover:border-primary flex h-9 w-9 items-center justify-center rounded-md border border-[#EDEFF1] text-base text-[#838995] hover:text-white ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <span>
                <Image
                  src={"right-arrow.svg"}
                  alt="Right arrow"
                  height={18}
                  width={18}
                />
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
