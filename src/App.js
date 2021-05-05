//import logo from './logo.svg';
import './App.css';
import { HashRouter, Switch, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Home from './components/Home';
import AddPlaces from './components/AddPlaces';
import ShowPlaces from './components/ShowPlaces';
import NavigationBar from "./components/NavigationBar.js";
import {useState} from 'react';
import Login from './components/Login';

function App() {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    function onLoggedIn(email){
        localStorage.setItem('username', email);
        setUsername(email);
    }

  return (
    <HashRouter>
        <Container fluid>
        <NavigationBar username={username} />
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/addPlaces">
                    <AddPlaces username={username}/>
                </Route>
                <Route exact path="/showPlaces">
                    <ShowPlaces username={username}/>
                </Route>
                <Route path="/login" >
                        <Login onLoggedIn={onLoggedIn} />
                </Route>
            </Switch>
        </Container>
    </HashRouter>
);
}

export default App;