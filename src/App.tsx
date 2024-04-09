import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductProvider from './ProductProvider';
import PageLayout from './pages/PageLayout';
import Market from './pages/Market';
import Detail from './pages/Detail';
import Write from './pages/Write';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
