import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { GlobalFont } from './styles/GlobalFont';
import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalFont />
    </ThemeProvider>
  );
};

export default App;
