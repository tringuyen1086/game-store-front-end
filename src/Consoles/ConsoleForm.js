//Reference: 
//customer-data-service front-end on October 14, 2022
//02-we-record-store-front-end on October 7, 2022
import { useState } from "react";

function ConsoleForm({ console: initialConsole, notify }) {
  const [console, setConsole] = useState(initialConsole);
  const isAdd = initialConsole.id === 0;

  function handleChange(evt) {
    const clone = { ...console };
    clone[evt.target.name] = evt.target.value;
    setConsole(clone);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const url = isAdd ? "http://localhost:8080/console" : `http://localhost:8080/console/${console.id}`;
    const method = isAdd ? "POST" : "PUT";
    const expectedStatus = isAdd ? 201 : 204;

    const init = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(console),
    };

    fetch(url, init)
      .then((response) => {
        if (response.status === expectedStatus) {
          if (isAdd) {
            return response.json();
          } else {
            return console;
          }
        }
        return Promise.reject(
          `Didn't receive expected status: ${expectedStatus}`
        );
      })
      .then((result) =>
        notify({
          action: isAdd ? "add" : "edit",
          console: result,
        })
      )
      .catch((error) => notify({ error: error }));
  }

  return (
    <>
      <h1>{isAdd ? "Add" : "Edit"} Console</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            className="form-control"
            value={console.model}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="manufacture">Manufacturer</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            className="form-control"
            value={console.manufacturer}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="memoryAmount">Memory Amount</label>
          <input
            type="text"
            id="memoryAmount"
            name="memoryAmount"
            className="form-control"
            value={console.memoryAmount}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="processor">Processor</label>
          <input
            type="text"
            id="processor"
            name="processor"
            className="form-control"
            value={console.processor}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            className="form-control"
            value={console.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            className="form-control"
            value={console.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3" class="action_button">
          <button
            id="saveButton"
            className="btn btn-success mr-3"
            type="submit"
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => notify({ action: "cancel" })}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default ConsoleForm;
