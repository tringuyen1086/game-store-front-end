//Reference: customer-data-service front-end on October 14, 2022
import { useState } from "react";

function TshirtForm({ tshirt: initialTshirt, notify }) {
  const [tshirt, setTshirt] = useState(initialTshirt);
  const isAdd = initialTshirt.id === 0;

  function handleChange(evt) {
    const clone = { ...tshirt };
    clone[evt.target.name] = evt.target.value;
    setTshirt(clone);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const url = `http://localhost:8080/tshirt`;
    const method = isAdd ? "POST" : "PUT";
    const expectedStatus = isAdd ? 201 : 204;

    const init = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(tshirt),
    };

    fetch(url, init)
      .then((response) => {
        if (response.status === expectedStatus) {
          if (isAdd) {
            return response.json();
          } else {
            return tshirt;
          }
        }
        return Promise.reject(
          `Didn't receive expected status: ${expectedStatus}`
        );
      })
      .then((result) =>
        notify({
          action: isAdd ? "add" : "edit",
          tshirt: result,
        })
      )
      .catch((error) => notify({ error: error }));
  }

  return (
    <>
      <h1>{isAdd ? "Add" : "Edit"} Tshirt</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="size">Size</label>
          <input
            type="text"
            id="size"
            name="size"
            className="form-control"
            value={tshirt.size}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            className="form-control"
            value={tshirt.color}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            value={tshirt.description}
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
            value={tshirt.price}
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
            value={tshirt.quantity}
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

export default TshirtForm;
