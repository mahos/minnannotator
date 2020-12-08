import React from 'react';
import { Switch } from 'react-router-dom';

import Route from "./Route";

import HomeContent from '../homeContent/homeContent';
import ExpertsDirectory from '../expertsDirectory/expertsDirectory';
import ExpertDetail from '../expertDetail/expertDetail';
import UserDashboard from '../utilities/dashboard';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinks = this.handleLinks.bind(this);
  }
    handleLinks(showDir) {
      console.log('route link handling ran', showDir)
      this.props.onShowDir(showDir)
    }
    render () {
        return (
            <Switch>
              <Route path="/" exact component={HomeContent} />
              {/* <Route path="/directory" component={ExpertsDirectory} /> */}
              <Route path="/directory" render={(props)=>(<ExpertsDirectory {...props} nowShowing={this.handleLinks}/>) } />
              <Route path="/detail/:id" component={ExpertDetail} />
              <Route path="/dashboard" component={UserDashboard} isPrivate />
              {/* redirect user to landing page if route does not exist and user is not logged in */}
              <Route component={HomeContent} />
            </Switch>
          );
    }
}

export default Routes