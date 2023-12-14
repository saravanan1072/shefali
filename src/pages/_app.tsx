import React from 'react'
import { store } from '../redux/store';

import '../styles/global.css'
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
 
  return  <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp;