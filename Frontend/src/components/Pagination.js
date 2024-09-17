// src/components/Pagination.js
import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange, names }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination-container">
      <div className="page-buttons">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="name-list">
        {names.map((name, index) => (
          <div key={index} className="name-item">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
