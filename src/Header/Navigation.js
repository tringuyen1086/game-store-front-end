/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Navigation({ currentPage, handlePageChange }) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          href="#"
          onClick={(e) => handlePageChange(e, "Consoles")}
          className={currentPage === "Consoles" ? "nav-link active" : "nav-link"}
        >
          Consoles
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#"
          onClick={(e) => handlePageChange(e, "Games")}
          className={currentPage === "Games" ? "nav-link active" : "nav-link"}
        >
          Games
        </a>
      </li>

      <li className="nav-item">
        <a
          href="#"
          onClick={(e) => handlePageChange(e, "Tshirts")}
          className={currentPage === "Tshirts" ? "nav-link active" : "nav-link"}
        >
          Tshirts
        </a>
      </li>

    </ul>
  );
}

export default Navigation;
