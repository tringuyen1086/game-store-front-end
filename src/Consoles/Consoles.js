//Reference: 
//customer-data-service front-end on October 14, 2022
//02-we-record-store-front-end on October 7, 2022
import { useState, useEffect } from "react";
import ConsoleCard from "./ConsoleCard.js";
import ConsoleForm from "./ConsoleForm.js";

function Consoles() {
  const [consoles, setConsoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedConsole, setScopedConsole] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/console")
        .then(response => response.json())
        .then(result => setConsoles(result))
        .catch(console.log)
}, []);

  function fetchByManufacturer(evt) {
    if (evt.target.value === "") {
      setConsoles([]);
    } else {
      fetch("http://localhost:8080/console/manufacturer/" + evt.target.value)
        .then((response) => response.json())
        .then((result) => setConsoles(result))
        .catch(console.log);
    }
  }

  function addClick() {
    setScopedConsole({
      id: 0,
      model: "",
      manufacturer: "",
      memoryAmount: "",
      processor: "",
      price: 0,
      quantity: 0,
    });
    setShowForm(true);
  }

  function notify({ action, console, error }) {
    if (error) {
      setError(error);
      setShowForm(false);
      return;
    }

    switch (action) {
      case "add":
        setConsoles([...consoles, console]);
        break;
      case "edit":
        setConsoles(
          consoles.map((e) => {
            if (e.id === console.id) {
              return console;
            }
            return e;
          })
        );
        break;
      case "edit-form":
        setScopedConsole(console);
        setShowForm(true);
        return;
      case "delete":
        setConsoles(consoles.filter((e) => e.id !== console.id));
        break;
    }

    setError("");
    setShowForm(false);
  }

  if (showForm) {
    return <ConsoleForm console={scopedConsole} notify={notify} />;
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div class="top_button">
        <h1 id="consoleTitle" class="title">Consoles</h1>
        <button className="btn btn-success" type="button" onClick={addClick}>
          Add a Console
        </button>
  
        <select
          name="manufacturer"
          className="btn btn-primary"
          onChange={fetchByManufacturer}
        >
          <option value="">Get Consolers by Manufacturer</option>
          <option value="Nintendo">Nintendo</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Sony">Sony</option>
        </select>

        <table id="consoles" class="table table-striped">
          <tr>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Memory Amount</th>
            <th>Processor</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          <tbody>
            {consoles.map((r) => (
              <ConsoleCard key={r.consoleId} console={r} notify={notify} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Consoles;
