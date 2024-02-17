import { Route, Routes } from 'react-router-dom';
import PageLayout from '../pages/PageLayout';
import Market from '../pages/Market';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Market />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
