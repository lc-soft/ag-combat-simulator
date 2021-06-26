import 道具缩略图 from './道具缩略图';
import './道具.css';

export default function 道具({ 数据 }) {
  let 额外信息;

  if (数据.类型 === '装备' && Array.isArray(数据.副属性组)) {
    额外信息 = (
      <div className="装备副属性缩略图">
        {数据.副属性组.map(({ 图标, 评分 }) => (
          <span className={`品质-${评分}`}>{图标}</span>
        ))}
      </div>
    );
  }
  return (
    <div className="道具">
      <道具缩略图 数据={数据} />
      {额外信息}
    </div>
  );
}
