import React from "react";
import {BrowserRouter ,Routes, Route} from "react-router-dom";
import {createStore} from "redux";
import { Provider } from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./reducers";

import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";


const store = createStore(rootReducer, composeWithDevTools());

function App() {
  // const get=async()=>{
  //   try{
  //     const res = await fetch('http://localhost:8000')
  //   }
  //   catch{
  //     alert("problem");
  //   }
  // }

  // get();
  return <div>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login></Login>} exact></Route>
        <Route path='/profile' element={<Profile></Profile>} exact></Route>
        <Route path='/' element={<Home></Home>} exact></Route>
      </Routes>
      </BrowserRouter>
    </Provider>
  </div>
}

export default App;
