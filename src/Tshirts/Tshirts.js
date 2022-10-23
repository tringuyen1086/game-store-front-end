//Reference:
//02-we-record-store-front-end on October 7, 2022 
//customer-data-service front-end on October 14, 2022
import { useState, useEffect } from 'react';
import TshirtCard from './TshirtCard.js';
import TshirtForm from './TshirtForm.js';

function Tshirts() {

    const [tshirts, setTshirts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedTshirt, setScopedTshirt] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/tshirt")
            .then(response => response.json())
            .then(result => setTshirts(result))
            .catch(console.log)
    }, []);

    function addClick() {
        setScopedTshirt({ id: 0, size:"", color:"", description:"", price: 0, quantity:0 });
        setShowForm(true);
    }

    function fetchBySize(evt) {
        if (evt.target.value === "") {
            setTshirts([]);
        } else {
            fetch("http://localhost:8080/tshirt/size/" + evt.target.value)
                .then(response => response.json())
                .then(result => setTshirts(result))
                .catch(console.log);
        }
    }

    function fetchByColor(evt) {
        if (evt.target.value === "") {
            setTshirts([]);
        } else {
            fetch("http://localhost:8080/tshirt/color/" + evt.target.value)
                .then(response => response.json())
                .then(result => setTshirts(result))
                .catch(console.log);
        }
    }



    function notify({ action, tshirt, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                setTshirts([...tshirts, tshirt]);
                break;
            case "edit":
                setTshirts(tshirts.map(e => {
                    if (e.id === tshirt.id) {
                        return tshirt;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedTshirt(tshirt);
                setShowForm(true);
                return;
            case "delete":
                setTshirts(tshirts.filter(e => e.id !== tshirt.id));
                break;
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <TshirtForm tshirt={scopedTshirt} notify={notify} />
    }

     return (
        <>
        {error && <div className="alert alert-danger">{error}</div>}
            <div class="top_button">
                <h1 id='tshirtTitle' class="title">Tshirts</h1>
                <button className="btn btn-success" type="button" onClick={addClick}>Add a Tshirt</button>
                
                <select name="size" className="btn btn-primary" onChange={fetchBySize}>
                    <option value="">Get Tshirts by Size</option>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value ="large">large</option>
                </select>
                <select name="color" className="btn btn-primary" onChange={fetchByColor}>
                    <option value="">Get Tshirts by Color</option>
                    <option value ="green">green</option>
                    <option value ="red">red</option>
                    <option value="blue">blue</option>
                </select>
            
                <table id='tshirts' class="table table-bordered">
                    <tr>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th> 
                    </tr>
                    <tbody>
                        {tshirts.map(r => <TshirtCard key={r.id} tshirt={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Tshirts;