//import logo from './logo.svg';
import './App.css';
import { HashRouter, Switch, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Home from './components/Home';
import AddPlaces from './components/AddPlaces';
import ShowPlaces from './components/ShowPlaces';
import NavigationBar from "./components/NavigationBar.js";


function App() {
  

  return (
    <HashRouter>
        <Container fluid>
            <NavigationBar />
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/addPlaces">
                    <AddPlaces/>
                </Route>
                <Route exact path="/showPlaces">
                    <ShowPlaces/>
                </Route>
            </Switch>
        </Container>
    </HashRouter>
);
}

export default App;