//Reference: customer-data-service front-end on October 14, 2022
function ConsoleRowCard({ console, notify }) {

    function handleDelete() {
        fetch(`http://localhost:8080/console/${console.id}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", console: console }))
            .catch(error => notify({ action: "delete", error: error }));
    }

    return (
        <tr key={console.id}>
            <td>{console.model}</td>
            <td>{console.manufacturer}</td>
            <td>{console.memoryAmount}</td>
            <td>{console.processor}</td>
            <td>{console.price}</td>    
            <td>{console.quantity}</td>
            <td class="action_button">
                <button id="deleteButton" className="btn btn-warning mr-3 btn-sm" type="button" onClick={handleDelete}>Delete</button>
                <button className="btn btn-secondary btn-sm" type="button" onClick={() => notify({ action: "edit-form", console: console})}>Edit</button>
            </td>
        </tr>
     )
 }

export default ConsoleRowCard;
