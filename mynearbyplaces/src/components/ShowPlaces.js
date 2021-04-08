import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import placeList from "./places";
import reviewList from "./reviews";
import { useState } from 'react';

function ShowPlaces(props){
    const [reviews, setReviews] = useState([]);
    const [places, setplaces] = useState([]);
    const [placeEditing, setplaceEditing] = useState("");

    function addReview(e, placeId){
        e.preventDefault();
        const newReview = {
          id: Math.random().toString(36).substr(2, 9),
          text: e.target.review.value,
          placeId: placeId,
        };
        setReviews([...reviews, newReview]);
        reviewList.push(newReview);
        e.target.review.value = "";
      }
      const deleteplace = (idToDelete) => {
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
    };

    function deleteReview(idToDelete){
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
    };
    const submitEdits = (event, idToEdit) => {
        event.preventDefault();
        const updatedplaces = placeList.map((place) => {
          if (place.id === idToEdit) {
            return {
              id: place.id,
              text: event.target.place.value,
              address: event.target.address.value,
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
      };
      return (
        <div>

    {placeList.map((place) => (
        <div key={place.id}>
          {place.id !== placeEditing ? (
    <Card id={place.id} style={{ width: '750px' }}>
    <Card.Header as="h5">{place.text} 
    <button onClick={() => deleteplace(place.id)}>delete</button>
    <button onClick={() => setplaceEditing(place.id)}>edit</button>
    </Card.Header>

    <Card.Body>
    Address: {place.address}
    <Card.Title>Reviews</Card.Title>
    <form onSubmit={(e) => addReview(e, place.id)}>
                <input type="text" name="review" />
                <input type="Submit" />
        </form>
    {reviewList.filter(review => review.placeId === place.id).map((review) => (
        
    <div key={review.id}>
  <div>{review.text}</div>
    <button onClick={() => deleteReview(review.id)}>delete</button>
    </div>
))}
    </Card.Body>
    </Card>
  ) : (
  <form onSubmit={(e) => submitEdits(e, place.id)}>
    Restaurant Name:
    <input type="text" name="place" defaultValue={place.text}></input>
    <br></br>
    Address:
    <input type="text" name="address" defaultValue={place.address}></input>
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