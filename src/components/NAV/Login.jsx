import React, { useState } from 'react';

import LoginForm from './LoginForm';
import RegisterationForm from './RegisterationForm';

// rename this to Login? embed LoginForm and RegisterForm components
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      <p>
        Don't have an account?
        <span
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          {' Register instead'}
        </span>
      </p>
      {isRegister ? (
        <RegisterationForm
          username={username}
          setUserName={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <LoginForm
          username={username}
          setUserName={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default Login;
