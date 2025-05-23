import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleLogin = () => {
    // Simulasi login berhasil
    navigate('/');
  };

  return (
    <div className="d-flex vh-100">
      {/* Left Side - Image */}
      <div className="w-50 d-none d-md-block">
        <img
          src="https://i.pinimg.com/736x/16/0b/6d/160b6df2480c985b3a3e8501f44ad7cd.jpg"
          alt="Villa"
          className="img-fluid h-200 w-1000 object-fit-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-100 w-md-50 d-flex align-items-center justify-content-center bg-white">
        <div style={{ maxWidth: 400, width: '100%' }}>
          <h3 className="mb-4 fw-bold text-center">LOGIN</h3>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>
          <div className="mb-2 position-relative">
            <label>Password</label>
            <div className="input-group">
              <input
                type={passwordShown ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setPasswordShown(!passwordShown)}
              >
                {passwordShown ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <div className="text-end mb-4">
            <a href="#" className="text-decoration-none">Forgot Password?</a>
          </div>
          <button className="btn btn-primary w-100 rounded" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
