import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import placeList from "./places";
import reviewList from "./reviews";
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
        setReviews([...reviews, newReview]);
        reviewList.push(newReview);
        api.addReview(placeName, username, newReview.text, newReview.rating)
        .then(() => console.log("the review was added successfully"))
        .catch(e => console.log(e));
        e.target.review.value = "";
        e.target.rating.value = "";
      }
      const deleteplace = (idToDelete, placeName, street, city, state, zip) => {
        const filteredplaces = placeList.filter((place) => place.id !== idToDelete);
        setplaces(filteredplaces);
        let count = 0;
        for (let i = 0; i < filteredplaces.length;i++){
            placeList[count] = filteredplaces[i];
            count++;
        }
        for (let j = count; count < placeList.length;j++){
            placeList.splice(j, 1);
        }
        api.deletePlace(placeName, street, city, state, zip)
        .then(() => console.log("The place was deleted successfully"))
        .catch(e => console.log(e));
      }

    function deleteReview(idToDelete, reviewText, rating){
        const filteredReviews = reviewList.filter((review) => review.id !== idToDelete);
        setReviews(filteredReviews);
        let count = 0;
        for (let i = 0; i < filteredReviews.length;i++){
            reviewList[count] = filteredReviews[i];
            count++;
        }
        for (let j = count; count < reviewList.length;j++){
            reviewList.splice(j, 1);
        }
        api.deleteReview(reviewText, rating, username)
        .then(() => console.log("the review was deleted successfully"))
        .catch(e => console.log(e));
    };
    const submitEdits = (event, idToEdit, placeName, street, city, state, zip) => {
        event.preventDefault();
        const updatedplaces = placeList.map((place) => {
          if (place.id === idToEdit) {
            return {
              id: place.id,
              text: event.target.place.value,
              street: event.target.street.value,
              city: event.target.city.value,
              state: event.target.state.value,
              zip: event.target.zip.value,
            };
          } else {
            return place;
          }
        });
        for (let i = 0; i < updatedplaces.length;i++){
            placeList[i] = updatedplaces[i];
        }
        setplaces(updatedplaces);
        setplaceEditing("");
        let oldAdd = {placeName:placeName, street:street, city:city, state:state, zip:parseInt(zip)};
        let newAdd = {placeName:event.target.place.value, street:event.target.street.value, city:event.target.city.value, state:event.target.state.value, zip:parseInt(event.target.zip.value)};
        api.updatePlace(oldAdd, newAdd)
        .then(() => console.log("the place was updated successfully"))
        .catch(e => console.log(e));
      };
      return (
        <div>

    {placeList.map((place) => (
        <div key={place.id}>
          {place.id !== placeEditing ? (
    <Card id={place.id} style={{ width: '750px' }}>
    <Card.Header as="h5">{place.text} 
    <button onClick={() => deleteplace(place.id, place.text, place.street, place.city, place.state, place.zip)}>delete</button>
    <button onClick={() => setplaceEditing(place.id)}>edit</button>
    </Card.Header>

    <Card.Body>
    Address: {place.address}
    <Card.Title>Reviews</Card.Title>
    <form onSubmit={(e) => addReview(e, place.id, place.text)}>
                <input type="text" name="review" />
                <input type="text" name="rating" />
                <input type="Submit" />
        </form>
    {reviewList.filter(review => review.placeId === place.id).map((review) => (
        
    <div key={review.id}>
  <div>{review.text}</div>
    <button onClick={() => deleteReview(review.id, review.text, review.rating)}>delete</button>
    </div>
))}
    </Card.Body>
    </Card>
  ) : (
  <form onSubmit={(e) => submitEdits(e, place.id, place.text, place.street, place.city, place.state, place.zip)}>
    Restaurant Name:
    <input type="text" name="place" defaultValue={place.text}></input>
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