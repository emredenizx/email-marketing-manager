import React, { useState, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Segment, Container, Message } from 'semantic-ui-react';
import { Auth } from '../../context/auth';
import { signup } from "../../api/auth.api";
import { checkValidation, checkMaxLength, checkRequired, checkEmail, checkPasswordMatch } from "../../utils/validation";
import { toastSuccess, toastError } from "../../utils/toasts";

const init = {
    firstname: { label: 'First name', value: '' },
    lastname: { label: 'Last name', value: '' },
    email: { label: 'Email', value: '' },
    password: { label: 'Password', value: '' },
    password2: { label: 'Re-entering Password', value: '' }
}

const Register = () => {

    const { currentUser } = useContext(Auth);
    let history = useHistory();

    const [fields, setField] = useState(init)
    const [validationErrors, setValidationErrors] = useState([])

    const {
        firstname: { value: firstname },
        lastname: { value: lastname },
        email: { value: email },
        password: { value: password },
        password2: { value: password2 }
    } = fields;

    const onChange = (event) => {

        const { name, value } = event.target

        setField(state => (
            {
                ...state,
                [name]: {
                    ...state[name],
                    value
                }
            }
        ))
    }

    async function registerUser() {

        let errors = [];

        const valuesValidation = Object.keys(fields).reduce((acc, field) => {
            return acc = [...acc, ...checkValidation(fields[field].value, fields[field].label, checkRequired, checkMaxLength)]
        }, [])

        const emailValidation = checkValidation(email, fields.email.label, checkEmail)
        const passwordsValidation = checkValidation([password, password2], '', checkPasswordMatch)

        errors = [...valuesValidation, ...emailValidation, ...passwordsValidation]

        if (errors.length > 0) {
            setValidationErrors(errors)
            return;
        } else {
            try {
                const user = {
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                    password: password
                }
                const response = await signup(user)
                setValidationErrors([])
                toastSuccess(response.data)
                history.replace('/login')
            } catch (error) {
                toastError(error.response.data.signup_error)               
            }
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
                            <Form.Input
                                fluid
                                placeholder={fields.firstname.label}
                                name='firstname'
                                value={firstname}
                                onChange={onChange} />
                            <Form.Input
                                fluid
                                placeholder={fields.lastname.label}
                                name='lastname'
                                value={lastname}
                                onChange={onChange} />
                            <Form.Input
                                fluid
                                placeholder={fields.email.label}
                                name='email'
                                value={email}
                                onChange={onChange} />
                            <Form.Input
                                fluid
                                placeholder={fields.password.label}
                                name='password'
                                type='password'
                                value={password}
                                onChange={onChange} />
                            <Form.Input
                                fluid
                                placeholder='Enter Password Again'
                                name='password2'
                                type='password'
                                value={password2}
                                onChange={onChange} />
                            {validationErrors.length > 0 &&
                                <Message negative>
                                    <Message.Header>Errors</Message.Header>
                                    <Message.List className='errorMessages'>
                                        {validationErrors.map((error, index) =>
                                            <Message.Item key={index}>{error}</Message.Item>
                                        )}
                                    </Message.List>
                                </Message>
                            }
                            <Button
                                fluid
                                size='large'
                                onClick={registerUser}
                            > Register </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default Register;