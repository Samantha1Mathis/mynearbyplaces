import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'

function NavigationBar(props){
    return (
        <Navbar bg= "dark" expand="lg" variant="dark">
            <Navbar.Brand hred="#Home">My Near By Places</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link className="link" to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link className="link" to="/addPlaces">Add the Place</Link></Nav.Link>
                    <Nav.Link><Link className="link" to="/showPlaces">Display Places</Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

}
export default NavigationBar;