//Reference:
//02-we-record-store-front-end on October 7, 2022 
//customer-data-service front-end on October 14, 2022
function GameRowCard({ game, notify }) {
  function handleDelete() {
    fetch(`http://localhost:8080/game/${game.id}`, { method: "DELETE" })
      .then(() => notify({ action: "delete", game: game }))
      .catch((error) => notify({ action: "delete", error: error }));
  }

  return (
    <tr key={game.id}>
      <td>{game.title}</td>
      <td>{game.esrbRating}</td>
      <td>{game.description}</td>
      <td>{game.price}</td>
      <td>{game.studio}</td>
      <td>{game.quantity}</td>
      <td class="action_button">
        <button
          id="deleteButton"
          className="btn btn-warning mr-3 btn-sm"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="btn btn-secondary btn-sm"
          type="button"
          onClick={() => notify({ action: "edit-form", game: game })}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default GameRowCard;
