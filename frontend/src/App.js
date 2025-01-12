// // 
// // import './App.css';
// // import TaskManager from './TaskManager';
// // import { Route, Routes, Navigate } from "react-router-dom"
// // import Main from './components/Main';
// // import Login from './components/Login';
// // import Signup from './components/Signup';
// // 
// // 
// // 
// // function App() {
// //   const user = localStorage.getItem("token");
// //   return (
// //     <div className="App">
// //       <Routes>
// //         {user && <Route path="/" exact element={<Main />} />}
// //         <Route path="/signup" exact element={<Signup />} />
// //         <Route path="/" exact element={<Login />} />
// //         <Route path="/tasks" exact element={<TaskManager />} />
// // 
// //       </Routes>
// //       {/* <TaskManager /> */}
// //     </div>
// //   );
// // }
// // 
// // export default App;
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
// import Main from './components/Main';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import TaskManager from './TaskManager';
// 
// function App() {
//   const [user, setUser] = useState(false); // Tracks if a user is logged in
// 
//   return (
// 
//     <Routes>
//       {/* Show Main with TaskManager if logged in */}
//       {user && <Route path="/" element={<Main />} />}
// 
// 
//       {/* Login Route */}
//       <Route path="/login" element={<Login setUser={setUser} />} />:
// 
// 
// 
//       {/* Signup Route */}
//       <Route path="/signup" element={<Signup setUser={setUser} />} />
// 
//       {/* Redirect to Login if user is not logged in */}
//       <Route path="/" element={<Login setUser={setUser} />} />
// 
// 
//     </Routes>
// 
//   );
// }
// 
// export default App;
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;