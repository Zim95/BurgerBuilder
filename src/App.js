import React, { Component } from 'react';

//import the layout
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;
