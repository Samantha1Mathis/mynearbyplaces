import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
//import placeList from "./places";
//import reviewList from "./reviews";
import { useState, useEffect} from 'react';
import api from "../communication/api";

function ShowPlaces(props){
    const [reviews, setReviews] = useState([]);
    const [places, setplaces] = useState([]);
    const [placeEditing, setplaceEditing] = useState("");
    let username = props.username.split("@")[0];

    useEffect(() => {
      if(places.length === 0) {
          api.getPlaces()
          .then(x => setplaces(x))
          .catch(e => console.log(e));
      }
  });

    function addReview(e, placeId, placeName){
        e.preventDefault();
        const newReview = {
          id: Math.random().toString(36).substr(2, 9),
          text: e.target.review.value,
          rating: e.target.rating.value,
          placeId: placeId,
        };
        
        //reviewList.push(newReview);
        api.addReview(placeName, username, newReview.text, newReview.rating)
        .then(() => {setReviews([...reviews, newReview]); console.log("the review was added successfully");})
        .catch(e => console.log(e));
        e.target.review.value = "";
        e.target.rating.value = "";
      }
      const deleteplace = (idToDelete, placeName, street, city, state, zip) => {
        const filteredplaces = places.filter((place) => place.id !== idToDelete);

        api.deletePlace(placeName, street, city, state, zip)
        .then(() => { setplaces(filteredplaces); console.log("The place was deleted successfully");})
        .catch(e => console.log(e));
      }

    function deleteReview(idToDelete, reviewText, rating){
        const filteredReviews = reviews.filter((review) => review.id !== idToDelete);

        api.deleteReview(reviewText, rating, username)
        .then(() => {setReviews(filteredReviews); console.log("the review was deleted successfully");})
        .catch(e => console.log(e));
    };
    const submitEdits = (event, idToEdit, placeName, street, city, state, zip) => {
        event.preventDefault();
        const updatedplaces = places.map((place) => {
          if (place.id === idToEdit) {
            return {
              id: place.id,
              placename: event.target.place.value,
              street: event.target.street.value,
              city: event.target.city.value,
              state: event.target.state.value,
              zip: event.target.zip.value,
              reviews: place.reviews
            };
          } else {
            return place;
          }
        });
        /*for (let i = 0; i < updatedplaces.length;i++){
            places[i] = updatedplaces[i];
        }*/
        //setplaces(updatedplaces);
        setplaceEditing("");
        let oldAdd = {placeName:placeName, street:street, city:city, state:state, zip:parseInt(zip)};
        let newAdd = {placeName:event.target.place.value, street:event.target.street.value, city:event.target.city.value, state:event.target.state.value, zip:parseInt(event.target.zip.value)};
        api.updatePlace(oldAdd, newAdd)
        .then(() => {setplaces(updatedplaces); console.log("the place was updated successfully");})
        .catch(e => console.log(e));
      };
      return (
        <div>

    {places.map((place) => (
        <div key={place.id}>
          {place.id !== placeEditing ? (
    <Card id={place.id} style={{ width: '750px' }}>
    <Card.Header as="h5">{place.placename} 
    <button onClick={() => deleteplace(place.id, place.placename, place.street, place.city, place.state, place.zip)}>delete</button>
    <button onClick={() => setplaceEditing(place.id)}>edit</button>
    </Card.Header>

    <Card.Body>
    Address: {place.street} {place.city} {place.state} {place.zip}
    <Card.Title>Reviews</Card.Title>
    <form onSubmit={(e) => addReview(e, place.id, place.placename)}>
                <input type="text" name="review" />
                <input type="text" name="rating" />
                <input type="Submit" />
        </form>
    {place.reviews.filter(x => x.comment !== null).map((review) => (
        
    <div key={review.reviewid}>
  <div>{review.comment}</div>
    <button onClick={() => deleteReview(review.reviewid, review.comment, review.rating)}>delete</button>
    </div>
))}
    </Card.Body>
    </Card>
  ) : (
  <form onSubmit={(e) => submitEdits(e, place.id, place.placename, place.street, place.city, place.state, place.zip)}>
    Restaurant Name:
    <input type="text" name="place" defaultValue={place.placename}></input>
    <br></br>
    Address: 
    <input type="text" name="street" defaultValue={place.street}></input>
    <input type="text" name="city" defaultValue={place.city}></input>
    <input type="text" name="state" defaultValue={place.state}></input>
    <input type="text" name="zip" defaultValue={place.zip}></input>
    <br></br>
    <button type="Submit"> Submit Edits</button>
  </form>
)}

</div>
))}
    </div>


  )
}
export default ShowPlaces;