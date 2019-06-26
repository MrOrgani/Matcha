import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Form from "./form/FormContainer";
// import SignInInside from "./signinExample";
import HomeHeader from "./header/HomeHeader";

function App() {
  return (
    <div className="App">
      <HomeHeader />
    </div>
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
