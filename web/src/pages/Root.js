import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PagesPromotionSearch from "./Promotion/Search/Search";
import PagesPromotionForm from "./Promotion/Form/Form";

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true} component={PagesPromotionSearch} />
                <Route path="/create" component={PagesPromotionForm} />
            </Switch>
        </Router>
    );
}

export default Root;