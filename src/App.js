import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 目标歼灭界面 from './目标歼灭界面';
import 目标歼灭作战界面 from './目标歼灭作战界面';

import './App.css';

function 主界面() {
  return (
    <Router>
      <div className="容器">
        <Switch>
          <Route path="/作战/:target">
            <目标歼灭作战界面 />
          </Route>
          <Route path="/" exact>
            <目标歼灭界面 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default 主界面;
