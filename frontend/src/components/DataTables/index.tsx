/* eslint-disable react/jsx-key */
import { useState } from "react";
import { Row, useTable } from "react-table";
import Pagination from "../Pagination";
import { paginationDataHandler } from "./helpers";

type CellProps<T extends Record<string, any>> = {
  row: Row<T>;
};

type ColumnsData<T extends Record<string, any>> = {
  Header: string;
  accessor: string;
  centerHeader: boolean;
  Cell?: (props: CellProps<T>) => JSX.Element;
};

type DataTableProps<T extends Record<string, any>> = {
  rowsData: T[];
  columnsData: ColumnsData<T>[];
  itemsPerPage: number;
};

const DataTable = <T extends Record<string, any> = Record<string, any>>({
  rowsData,
  columnsData,
  itemsPerPage,
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = paginationDataHandler(
    rowsData,
    itemsPerPage,
    currentPage
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columnsData, data: paginationData.currentItems });

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="hidden md:table-header-group">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className={`px-3 py-6 text-sm md:text-base font-medium ${
                          (column as any)?.centerHeader === false
                            ? "text-left"
                            : "text-center"
                        }`}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);

                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="xl:px-6 py-4 whitespace-normal text-xs lg:text-sm text-gray-500 text-center md:break-all"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="w-full flex justify-center mt-8">
              <Pagination
                totalPages={paginationData.totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
