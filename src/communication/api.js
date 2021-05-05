//let apiHost = "https://samantha1mathis-mynearbyplaces.herokuapp.com"
let apiHost = "http://localhost:4002"
let getPlaces = () => {
    return fetch(apiHost + '/places')
    .then(response => response.json());
}

let addReview = (place, name, comment, rating) =>{
    return fetch(apiHost + '/review/' + place, {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:name, comment:comment, rating:rating}),
    })
}

let search = (name, street, city, state, zip) => {
    console.log("hereee")
    
    return fetch(apiHost +'/search/' + name + '/' + street +'/' +city+'/'+state+'/'+zip)
    .then(response => response.json());
}

let addPlace = (place, street, city, state, zip) => {
    return fetch(apiHost + '/place', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: place, street:street, city:city, state:state, postalcode:zip})
    });
}

let deletePlace = (place, street, city, state, zip) => {
    return fetch(apiHost + '/deletePlace', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({placeName:place, street:street, city:city, state:state, zip:zip})
    });
}

let deleteReview = (review, rating, username) => {
    return fetch(apiHost + '/deleteReview', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({reviewName:review, rating:rating, username:username})
    });
}

let addCustomers = (username, email, password) =>{
    return fetch(apiHost + "/customer", {
        method: 'post',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({name: username, email: email, password: password})
    });

}

let updatePlace = (oldAdd, newAdd) =>{
    return fetch(apiHost + "/updatePlace", {
        method: 'post',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({oldAdd:oldAdd, newAdd:newAdd})
    });

}


let api = {
    getPlaces: getPlaces,
    addPlace: addPlace,
    addReview: addReview,
    search: search,
    deletePlace: deletePlace, 
    addCustomers: addCustomers,
    deleteReview:deleteReview, 
    updatePlace: updatePlace
};

export default api;