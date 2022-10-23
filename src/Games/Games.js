//Reference: 
//customer-data-service front-end on October 14, 2022
//02-we-record-store-front-end on October 7, 2022
import { useState, useEffect } from "react";
import GameCard from "./GameCard.js";
import GameForm from "./GameForm.js";

function Games() {
  const [games, setGames] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedGame, setScopedGame] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/game")
        .then(response => response.json())
        .then(result => setGames(result))
        .catch(console.log)
}, []);

  function fetchByEsrbRating(evt) {
    if (evt.target.value === "") {
      setGames([]);
    } else {
      fetch("http://localhost:8080/game/esrbRating/" + evt.target.value)
        .then((response) => response.json())
        .then((result) => setGames(result))
        .catch(console.log);
    }
  }

  function fetchByStudio(evt) {
    if (evt.target.value === "") {
      setGames([]);
    } else {
      fetch("http://localhost:8080/game/studio/" + evt.target.value)
        .then((response) => response.json())
        .then((result) => setGames(result))
        .catch(console.log);
    }
  }

  function fetchByTitle(evt) {
    if (evt.target.value === "") {
      setGames([]);
    } else {
      fetch("http://localhost:8080/game/title/" + evt.target.value)
        .then((response) => response.json())
        .then((result) => setGames(result))
        .catch(console.log);
    }
  }

  function addClick() {
    setScopedGame({
      id: 0,
      title: "",
      esrbRating: "",
      description: "",
      price: 0,
      studio: "",
      quantity: 0,
    });
    setShowForm(true);
  }

  function notify({ action, game, error }) {
    if (error) {
      setError(error);
      setShowForm(false);
      return;
    }

    switch (action) {
      case "add":
        setGames([...games, game]);
        break;
      case "edit":
        setGames(
          games.map((e) => {
            if (e.id === game.id) {
              return game;
            }
            return e;
          })
        );
        break;
      case "edit-form":
        setScopedGame(game);
        setShowForm(true);
        return;
      case "delete":
        setGames(games.filter((e) => e.id !== game.id));
        break;

        default: 
        console.log("Invalid Action");
    }

    setError("");
    setShowForm(false);
  }

  if (showForm) {
    return <GameForm game={scopedGame} notify={notify} />;
  }

  return (
    <>
    {error && <div className="alert alert-danger">{error}</div>}
    <div class="top_button">
        <h1 id="gameTitle" class="title">Games</h1>
        <button className="btn btn-success" type="button" onClick={addClick}>
          Add a Game
        </button>

        <select name="esrbRating" className="btn btn-primary" onChange={fetchByEsrbRating}>
          <option value="">Get Games by Esrb Rating</option>
          <option value="AO (Adults Only 18+)"> AO (Adults Only 18+)</option>
          <option value="E (Everyone)"> E (Everyone)</option>
          <option value="E 10+ (Everyone 10+)"> E 10+ (Everyone 10+)</option>
          <option value="M (Mature 17+)"> M (Mature 17+)</option>
          <option value="T (Teen)"> T (Teen)</option>
          <option value="RP (Rating Pending)">RP (Rating Pending)</option>
          <option value="RP (RP Likely Mature 17+">
            RP (RP Likely Mature 17+)
          </option>
        </select>
        <select name="studio" className="btn btn-primary" onChange={fetchByStudio}>
          <option value="">Get Games by Studio</option>
          <option value="Asobo Studio">Asobo Studio</option>
          <option value="Blizzard Entertainment">Blizzard Entertainment</option>
          <option value="Red Martyr Entertainment">
            Red Martyr Entertainment
          </option>
        </select>
        <select name="title" className="btn btn-primary" onChange={fetchByTitle}>
          <option value="">Get Games by Title</option>
          <option value="Saint Kotar">Saint Kotar</option>
          <option value="Overwatch 2">Overwatch 2</option>
          <option value="A Plague Tale: Requiem">A Plague Tale: Requiem</option>
        </select>     
      
        <table id="games" class="table table-striped">
          <tr>
            <th>Title</th>
            <th>Esrb Rating</th>
            <th>Description</th>
            <th>Price</th>
            <th>Studio</th>
            <th>Quantity</th>
          </tr>
          <tbody>
            {games.map((r) => (
              <GameCard key={r.id} game={r} notify={notify} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Games;
