import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import api from '../communication/api';

export default function Login(props) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onLoginSubmitted(){
        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        props.onLoggedIn(email);
        history.push('/');
        
        let username = email.split("@")[0];
        api.addCustomers(username, email, password)
        .then(() => console.log("Customers was added successfully"))
        .catch(e => console.log(e));

    }

    function onEmailChanged(event){
        setEmail(event.target.value);
    }

    function onPasswordChanged(event){
        setPassword(event.target.value);
    }

    return (
        <Form onSubmit={onLoginSubmitted}>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={onEmailChanged} />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={onPasswordChanged} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
      </Button>
        </Form>



    );
}