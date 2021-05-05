import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from 'react';
import api from "../communication/api";
import Card from 'react-bootstrap/Card';
import placeList from "./places";
import reviewList from "./reviews";

function AddPlaces(props){

    /*useEffect(() => {
      if (places.length === 0) {
        api.getPlaces()
        .then(x => setplaces(x))
        .catch(e => console.log(e));
      }
    })*/
    let username = props.username.split("@")[0];
    const [places, setplaces] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      if(places.length === 0) {
          api.getPlaces()
          .then(x => setplaces(x))
          .catch(e => console.log(e));
      }
  });

    const addplace = (e) => {
        e.preventDefault();
        const newplace = {
          id: Math.random().toString(36).substr(2, 9),
          text: e.target.place.value,
          street: e.target.street.value,
          city: e.target.city.value,
          state: e.target.state.value,
          zip: e.target.zip.value,
          //address: e.target.address.value,
        };
        setplaces([...places, newplace]);
        placeList.push(newplace);
        api.addPlace(newplace.text, newplace.street, newplace.city, newplace.state, newplace.zip)
        .then(() => console.log("the restaurant was added successfully"))
        .catch(e => console.log(e));
        e.target.place.value = "";
        e.target.street.value = "";
        e.target.city.value = "";
        e.target.state.value = "";
        e.target.zip.value = "";
      }

    function addReview(e, placeId, placeName){
        e.preventDefault();
        const newReview = {
          id: Math.random().toString(36).substr(2, 9),
          text: e.target.review.value,
          rating: e.target.rating.value,
          placeId: placeId,

        };

        api.addReview(placeName, username, newReview.text, newReview.rating)
        .then(() => console.log("the review was added successfully"))
        .catch(e => console.log(e));
        setReviews([...reviews, newReview]);
        reviewList.push(newReview);
        e.target.review.value = "";
        e.target.rating.value = "";
      }

      return (
          <div>
            <form onSubmit={addplace}>
                <input type="text" placeholder="restaurant" name="place" />
                <input type="text" placeholder="Street" name="street" />
                <input type="text" placeholder="city" name="city" />
                <input type="text" placeholder="state" name="state" />
                <input type="text" placeholder="zip" name="zip" />
                <input type="Submit" value="Add Restaurant"/>
            </form>

        {places.map((place) => (
            <div key={place.id}>
        <Card id={place.id} style={{ width: '750px' }}>
        <Card.Header as="h5">{place.text}
        </Card.Header>

        <Card.Body>
        Address: {place.street} {place.city} {place.state} {place.zip}
        <Card.Title>Reviews</Card.Title>
        
        <form onSubmit={(e) => addReview(e, place.id, place.text)}>
                <input type="text" name="review" />
                <input type="text" name="rating" />
                <input type="Submit" />
        </form>
        {reviews.filter(review => review.placeId === place.id).map((review) => (
            
        <div key={review.id}>
      <div>{review.text}</div>
        </div>
    ))}
        </Card.Body>
        </Card>
  </div>
))}
       </div>


     )
      }

export default AddPlaces;