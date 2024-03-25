import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductProvider from './ProductProvider';
import PageLayout from './pages/PageLayout';
import Market from './pages/Market';
import Detail from './pages/Detail';
import Write from './pages/Write';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
