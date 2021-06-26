import { useContext, useRef } from 'react';
import 道具缩略图 from './道具缩略图';
import { 道具选中方法上下文 } from './道具提示框上下文';
import './道具.scss';

export default function 道具({ 数据 }) {
  let 额外信息;
  const 元素引用 = useRef();
  const 设置选中道具 = useContext(道具选中方法上下文);

  if (数据.类型 === '装备' && Array.isArray(数据.副属性组)) {
    额外信息 = (
      <div className="装备副属性缩略图">
        {数据.副属性组.map(({ 图标, 评分 }, 序号) => (
          <span key={序号} className={`品质-${评分}`}>{图标}</span>
        ))}
      </div>
    );
  }
  return (
    <div
      ref={元素引用}
      className="道具"
      onClick={(e) => {
        设置选中道具(数据, 元素引用);
        e.stopPropagation();
      }}
    >
      <道具缩略图 数据={数据} />
      {额外信息}
    </div>
  );
}
