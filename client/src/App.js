import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import PostsScreen from './screens/PostsScreen';
import PostDetail from './screens/PostDetail';
import AddNewPost from './screens/AddNewPost';
import EditPost from './screens/EditPost';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/posts' element={<PostsScreen />} />
        <Route path='/post-detail' element={<PostDetail />} />
        <Route path='/add-new' element={<AddNewPost />} />
        <Route path='/edit-post' element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
