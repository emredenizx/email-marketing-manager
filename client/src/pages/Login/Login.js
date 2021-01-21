import React, { useState, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Segment, Container } from 'semantic-ui-react';
import { Auth } from '../../context/auth';
import { toastSuccess, toastError } from "../../utils/toasts";

const Login = () => {

  const { currentUser, login } = useContext(Auth);
  let history = useHistory();

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser() {
    try {
      await login(email, password)
      toastSuccess('Login Successful')
      history.replace('/')
    } catch (error) {     
      toastError(error.response.data.signin_error)
    }
  }

  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <Container>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Email' value={email} onChange={event => setUsername(event.target.value)} />
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' value={password} onChange={event => setPassword(event.target.value)} />
              <Button fluid size='large' onClick={loginUser}> Login </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Login