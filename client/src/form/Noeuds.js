import React from "react";

class Noeuds extends React.Component {
  constructor() {
    super();
    this.state = {
      allNodes: []
    };
  }

  callNoeuds() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(res => {
        let NoeudsComponents = res.map(item => (
          <li key={item.id}>{item.name}</li>
        ));
        this.setState({ allNodes: NoeudsComponents });
      })
      .then(err => err);
  }

  componentDidMount() {
    this.callNoeuds();
  }

  render() {
    return (
      <div>
        <ul>{this.state.allNodes}</ul>
      </div>
    );
  }
}

export default Noeuds;
