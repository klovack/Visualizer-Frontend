import { ColorModeProvider, CSSReset, DefaultTheme, theme, ThemeProvider } from '@chakra-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

import './styles/styles.scss';

const visualizerTheme: DefaultTheme = {
  ...theme,
  colors: {
    ...theme.colors,
      
  },
}


ReactDOM.render(
  <ThemeProvider theme={visualizerTheme}>
    <CSSReset />
    <ColorModeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ColorModeProvider>
  </ThemeProvider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
