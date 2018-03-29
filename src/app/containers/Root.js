import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Header} from './Header';
import '../styles/Root.css';
import {CreateList} from './routes/CreateList';
import {DisplayList} from './routes/DisplayList';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={CreateList}/>
          <Route exact path="/create" component={CreateList}/>
          <Route exact path="/list/:type/:hash" component={DisplayList}/>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

Root.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
