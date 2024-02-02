import { Route, Routes } from 'react-router-dom';
import PageLayout from '../pages/PageLayout';
import Main from '../pages/Main';
import LogIn from '../pages/LogIn';

const AppRoutes: React.FC = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </PageLayout>
  );
};

export default AppRoutes;
