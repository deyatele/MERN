import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import { getMe } from './redux/features/auth/authSlice';
import RoutesApp from './RoutesApp';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
   
  }, [dispatch]);

  return (
    <Layout>
      <RoutesApp />
      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
