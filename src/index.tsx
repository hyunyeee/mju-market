import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { GlobalFont } from './styles/GlobalFont';
import 'react-image-gallery/styles/css/image-gallery.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <GlobalStyle />
      <GlobalFont />
      <App />
    </React.StrictMode>
  </ThemeProvider>,
);
