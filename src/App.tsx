import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import ProductProvider from './context/ProductProvider';
import PageLayout from './pages/PageLayout';
import Market from './pages/market/Market';
import Detail from './pages/market/Detail';
import Write from './pages/market/Write';
import Board from './pages/board/Board';
import BoardDetail from './pages/board/BoardDetail';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import BoardWrite from './pages/board/BoardWrite';
import LikePage from './pages/LikePage';
import ChatList from './pages/chat/ChatList';
import Mypage from './pages/my/Mypage';
import Chatting from './pages/chat/Chatting';
import History from './pages/my/History';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <Routes>
              <Route element={<PageLayout />}>
                <Route path="/" element={<Market />} />
                <Route path="/products/:productId" element={<Detail />} />
                <Route path="/write" element={<Write />} />
                <Route path="/modify/:productId" element={<Write />} />
                <Route path="/boards" element={<Board />} />
                <Route path="/board/:boardId" element={<BoardDetail />} />
                <Route path="/board/write" element={<BoardWrite />} />
                <Route path="/board/modify/:boardId" element={<BoardWrite />} />
                <Route path="/likes" element={<LikePage />} />
                <Route path="/chat" element={<ChatList />} />
                <Route path="/chatting" element={<Chatting />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/history" element={<History />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
            </Routes>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
