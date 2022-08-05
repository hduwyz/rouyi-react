
import './App.css';

import { Routes, Route } from 'react-router-dom'
//routes是路由列表配置，将在下面展示
// import routes from './router/index'
import Home from "./views/home";
import Login from "./views/login";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
