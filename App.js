import PropTypes from "prop-types";
import React from "react";

import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import { setupAxios, setAxiosToken, setAxiosCompanyId } from "./api/requester";
// Import scss
import "./assets/scss/theme.scss";

import "antd/dist/antd.css";
import "toastr/build/toastr.min.css";
import "./app.scss";

import { useUser } from "./hooks";

const App = (props) => {
  setupAxios();
  const [branchId, token] = useUser();
  setAxiosToken(token);
  setAxiosCompanyId(branchId);

  function getLayout() {
    let layoutCls = VerticalLayout;

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout();
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              {...route}
              layout={NonAuthLayout}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              {...route}
              layout={Layout}
              key={idx}
              isAuthProtected={true}
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.layout,
  };
};

export default connect(mapStateToProps, null)(App);
