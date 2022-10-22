import React from "react";
import Navigation from "./Navigation";

export default function Header({ currentPage, handlePageChange }) {

  return (
    <header className="">
      <h1 className="text-center" class="app_title"> Game Store App</h1>
      <Navigation
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </header>
  );
}