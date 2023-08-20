import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  HomeScreen,
  PostsScreen,
  PostDetail,
  AddNewPost,
  EditPost,
  LoginScreen
} from './screens';
import UserDetail from './components/UserDetail';
import { Spin } from 'antd';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getToken();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const getToken = async () => {
    const token = await localStorage.getItem('accessToken');

    if (token) {
      setIsLogin(true)
    }
  }

  return isLoading ? <Spin /> : !isLogin ? (
    <>
      <LoginScreen />
    </>
  ) : (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/posts' element={<PostsScreen />} />
        <Route path='/post-detail' element={<PostDetail />} />
        <Route path='/add-new' element={<AddNewPost />} />
        <Route path='/edit-post' element={<EditPost />} />
        <Route path='/users-detail' element={<UserDetail />} />
      </Routes>
    </div>
  );
}

export default App;
