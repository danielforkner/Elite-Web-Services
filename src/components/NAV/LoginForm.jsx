import React, { useEffect } from 'react';
import { loginUser } from '../../axios-services/';
import useAuth from '../hooks/useAuth';
import { Modal } from 'react-bootstrap';

const LoginForm = ({
  setIsLogin,
  username,
  setUsername,
  password,
  setPassword,
  setIsError,
  setErrorMessage,
}) => {
  const { user, setToken } = useAuth();

  useEffect(() => {
    setIsError(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      setIsError(false);
      console.log('LOGINUSER RESPONSE: ', response);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setIsLogin(false);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <header className="modal-header p-5 pb-4 border-bottom-0">
        <h2 className="fw-bold mb-0">Login</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setIsLogin(false)}
        ></button>
      </header>
      <div className="modal-body p-5 pt-0">
        <form>
          <div className="form-floating mb-3">
            <label htmlFor="username">Username: </label>
            <input
              className="form-control rounded-4"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-floating mb-3">
            <label htmlFor="password">Password: </label>
            <input
              className="form-control rounded-4"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
          <small className="text-muted">
            Don't have an account? Register instead.
          </small>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
