import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// useSelector is used to select from your global state
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/slices/usersApiSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // isLoading comes by default
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth)

  // if theres userinfo that means we're logged in, we want to check that using useeffect
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      // the code below is just spreading the response into that setcredentials function that saves the userinfo to the localstorage
      dispatch(setCredentials({...res}))
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
        <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3'
        >
          Sign In
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className='py-3'>
        <Col>
          New Customer? <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen