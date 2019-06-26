import React from "react";
// import Form from "./form/FormContainer";
// import SignInInside from "./signinExample";
import Home from "./Scenes/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Scenes/Login/login";
import Register from "./Scenes/Register/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

// class App extends React.Component {
//   constructor() {
//     super();
//   }
//   //   this.state = {
//   //     apiResponse: ""
//   //   };
//   // }

//   // // callAPI() {
//   // //   fetch("http://localhost:9000/testAPI")
//   // //     // .then(res => console.log(res))
//   // //     .then(res => res.text())
//   // //     .then(res => this.setState({ apiResponse: res }))
//   // //     .then(err => err);
//   // // }

//   // // componentDidMount() {
//   // //   this.callAPI();
//   // // }

//   render() {
// ;
//   }
// }

export default App;
