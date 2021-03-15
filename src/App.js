import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Auth } from 'aws-amplify';

const styles = {
  input: {
    height: 35,
    margin: 5,
  }
}

function SignupForm({ onChange, onSignup }) {
  return (
    <div>
      <input placeholder="username" onChange={onChange} name="username" style={styles.input} />
      <input placeholder="password" onChange={onChange} name="password" type="password" style={styles.input} />
      <input placeholder="email" onChange={onChange} name="email" style={styles.input} />
      <input placeholder="phone number" onChange={onChange} name="phone_number" style={styles.input} />
      <button onClick={onSignup}>
        Sign up
      </button>
    </div>
  );
}

function ConfirmSignupForm({ onChange, onConfirmSignup }) {
  return (
    <div>
      <input placeholder="username" onChange={onChange} name="username" style={styles.input} />
      <input placeholder="authentication code" onChange={onChange} name="authenticationCode" style={styles.input} />
      <button onClick={onConfirmSignup}>
        Confirm signup
      </button>
    </div>
  )
}

function App() {
  const [signupStep, setSignupStep] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authenticationCode, setAuthenticationCode] = useState('');

  const signup = async () => {
    try {
      await Auth.signUp({ username, password, attributes: { email, phone_number: phoneNumber } });
      setSignupStep(1);
      console.log('successfully signed up!');
    } catch (err) {
      console.log(`error signing up: `, err);
    }
  };

  const confirmSignup = async () => {
    try {
      await Auth.confirmSignUp(username, authenticationCode);
      console.log('user successfully confirmed signup!');
    } catch (err) {
      console.log(`error confirming signup: ${err}`)
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    const stateHandlers = {
      authenticationCode: setAuthenticationCode,
      email: setEmail,
      password: setPassword,
      phone_number: setPhoneNumber,
      username: setUsername,
    }

    stateHandlers[name](value);
  };

  return (
    <div className="App">
      {signupStep === 0 ? (
        <SignupForm
          onChange={handleChange}
          onSignup={signup}
        />
      ) : (
        <ConfirmSignupForm
          onChange={handleChange}
          onConfirmSignup={confirmSignup}
        />
      )}
    </div>
  );
}

export default App;
