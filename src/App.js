import Consoles from './Consoles/Consoles.js';
import Games from './Games/Games.js';
import Tshirts from './Tshirts/Tshirts.js';
import Header from './Header';
import { useState} from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState("Consoles");

  const renderPage = () => {
    if (currentPage === "Consoles") {
      return <Consoles />;
    }
    if (currentPage === "Games") {
      return <Games />;
    }
    if (currentPage === "Tshirts") {
 
      return <Tshirts />;
    }

    return Header;
 
  };

  const handlePageChange = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  }

  return (
    <>
    <Header currentPage={currentPage} handlePageChange={handlePageChange} />
    {renderPage()}
 
  </>
  );
}

export default App;
