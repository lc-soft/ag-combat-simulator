
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 目标歼灭界面 from './目标歼灭界面';
import 目标歼灭作战界面 from './目标歼灭作战界面';
import 道具提示框上下文提供者 from './道具提示框上下文提供者';

import './主界面.scss';

function 主界面() {
  return (
    <道具提示框上下文提供者>
      {(设置选中道具) => (
        <div className="主界面" onClick={() => 设置选中道具(null)}>
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
        </div>
      )}
    </道具提示框上下文提供者>
  );
}

export default 主界面;
