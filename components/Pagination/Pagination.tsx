"use client";

import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePage: (nextPage: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  handlePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => handlePage(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css["pagination"]}
      activeClassName={css["active"]}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
