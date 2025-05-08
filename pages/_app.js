// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/auth';
import '../styles/globals.css';
import '../styles/style.css';

function MyApp({ Component, pageProps }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setAuth(isAuthenticated());
      setAuthChecked(true);
    };
    checkAuth();
  }, []);

  if (!authChecked) return null; // or a loader/spinner

  return auth ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}

export default MyApp;
