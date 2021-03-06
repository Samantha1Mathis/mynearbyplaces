import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
//import placeList from "./places";
//import reviewList from "./reviews";
import api from "../communication/api";

function Home(props) {
  const [searchResult, setSearchResult] = useState([]);

 const search = (e) => {
   //searchKeyWord = e.target.name.value + e.target.street.value + e.target.city.value + e.target.state.value + e.target.zip.value;
    api.search(e.target.name.value, e.target.street.value, e.target.city.value, e.target.state.value, e.target.zip.value)
    .then(x => {setSearchResult(x); console.log("the search was successfully");})
    .catch(e => console.log(e));
    //let x = placeList.filter(place => place.address.includes(searchKeyWord));
    //setSearchResult(x);
    e.target.name.value ="";
    e.target.street.value="";
    e.target.city.value="";
    e.target.state.value="";
    e.target.zip.value="";

   
  };


    return (
        <div>

            <h2 style={{ textAlign: "center" }}>Home Page</h2>
            <form onSubmit={search}>
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="street" name="street" />
                <input type="text" placeholder="city" name="city" />
                <input type="text" placeholder="state" name="state" />
                <input type="text" placeholder="zip" name="zip" />
                <input type="Submit" value="Search"/>
            </form>
            {searchResult.map(place => 
              <Card id={place.id} style={{ width: '750px' }}>
              <Card.Header as="h5">
                {place.placename}
              </Card.Header>
              <Card.Body>
              Address: {place.address}
                <Card.Title>Reviews</Card.Title>
              {place.reviews.map((review) => (
                  <div key={review.reviewid}>
                  <div>{review.comment}</div>
                  </div>
                ))}
                </Card.Body>
              </Card>
              )}
           </div>
    )

}

export default Home;