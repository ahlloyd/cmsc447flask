/**
 * @author Alex Lloyd <alloyd2@umbc.edu>
 */
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Menu from './Menu';
import './App.css';

/* Old Geeks for Geeks tutorial */

// function App() {
//     const [data, setdata] = useState({
//         name: "",
//         age: 0,
//         date: "",
//         programming: "",
//     });

//     // Using useEffect for single rendering
//     useEffect(() => {
//         // Using fetch to fetch the api from 
//         // flask server it will be redirected to proxy
//         fetch("/data").then((res) =>
//             res.json().then((data) => {
//                 // Setting a data from api
//                 setdata({
//                     name: data.Name,
//                     age: data.Age,
//                     date: data.Date,
//                     programming: data.programming,
//                 });
//             })
//         );
//     }, []);

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>React and flask</h1>
//                 {/* Calling a data from setdata for showing */}
//                 <p>{data.name}</p>
//                 <p>{data.age}</p>
//                 <p>{data.date}</p>
//                 <p>{data.programming}</p>
//             </header>
//         </div>
//     );
// }

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route name="curdmenu" exact path="/menu">
              <Menu />
            </Route>
            <Redirect exact from="/" to="/menu" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;