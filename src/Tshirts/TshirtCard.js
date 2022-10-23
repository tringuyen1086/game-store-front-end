//Reference: customer-data-service front-end on October 14, 2022
function TshirtRowCard({ tshirt, notify }) {

    function handleDelete() {
        fetch(`http://localhost:8080/tshirt/${tshirt.id}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", tshirt: tshirt }))
            .catch(error => notify({ action: "delete", error: error }));
    }

    return (
        <tr key={tshirt.id}>
            <td>{tshirt.size}</td>
            <td>{tshirt.color}</td>
            <td>{tshirt.description}</td>
            <td>{tshirt.price}</td>
            <td>{tshirt.quantity}</td>
            <td class="action_button">
                <button id="deleteButton" className="btn btn-warning mr-3" type="button" onClick={handleDelete}>Delete</button>
                <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "edit-form", tshirt: tshirt })}>Edit</button>
            </td>
        </tr>
     )
 }

export default TshirtRowCard;
