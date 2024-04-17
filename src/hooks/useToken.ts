import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const useToken = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || null;

    if (!storedToken) {
      alert('로그인 정보가 유효하지 않습니다.');
      navigate('/login');
    }

    if (!token && storedToken) {
      setToken(storedToken);
    }
  }, [token, setToken]);

  return token;
};

export default useToken;
