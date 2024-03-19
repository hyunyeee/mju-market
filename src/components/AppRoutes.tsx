import { Route, Routes } from 'react-router-dom';
import PageLayout from '../pages/PageLayout';
import Market from '../pages/Market';
import Detail from '../pages/Detail';
import Write from '../pages/Write';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import ProductProvider from '../ProductProvider';

const AppRoutes: React.FC = () => {
  return (
    <ProductProvider>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Market />} />
          <Route path="/products/:productId" element={<Detail />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </ProductProvider>
  );
};

export default AppRoutes;
