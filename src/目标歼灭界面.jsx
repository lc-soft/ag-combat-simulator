import classNames from "classnames";
import { Link } from "react-router-dom";
import 目标歼灭 from './基础库/目标歼灭';
import './目标歼灭界面.css';

export default function 目标歼灭界面() {
  return (
    <div className="界面 目标歼灭界面">
      <div className="目标列表">
        {目标歼灭.map((目标) => (
          <Link
            key={目标.名称}
            className={classNames('目标', 目标.名称)}
            to={`/作战/${目标.名称}`}
          >
            <div className="目标-图片" style={{ backgroundColor: 目标.颜色 }}></div>
            <div className="目标-名称 衬线字体">
              {目标.名称}
            </div>
            <div className="目标-套装">
              <div className="目标-套装-内部">
                {目标.套装组.map((套装) => <span key={套装}>{套装}</span>)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
