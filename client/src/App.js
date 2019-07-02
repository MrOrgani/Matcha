import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Form from "./form/FormContainer";
// import SignInInside from "./signinExample";
import Home from "./Scenes/Home/Home";
import SignIn from "./Scenes/SignIn/SignIn";
import Search from "./Scenes/Search";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/Search" component={Search} />
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
