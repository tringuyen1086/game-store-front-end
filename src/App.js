import Consoles from './Consoles/Consoles.js';
import Games from './Games/Games.js';
import Tshirts from './Tshirts/Tshirts.js';
import Header from './Header';
import { useState} from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState("Consoles");

  // TODO: its rendering the pages
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


// function App() {
//   return (
//     <main className="container">
//       <Consoles />
//       <Games />
//       <Tshirts />
//       <Invoices />
//     </main>
//   );
// }

// export default App;