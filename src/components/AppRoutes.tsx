import { Route, Routes } from 'react-router-dom';
import PageLayout from '../pages/PageLayout';
import Main from '../pages/Main';

const AppRoutes: React.FC = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </PageLayout>
  );
};

export default AppRoutes;
