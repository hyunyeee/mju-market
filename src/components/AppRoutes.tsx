import { Route, Routes } from 'react-router-dom';
import PageLayout from '../pages/PageLayout';
import Main from '../pages/Main';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';

const AppRoutes: React.FC = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </PageLayout>
  );
};

export default AppRoutes;
