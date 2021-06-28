import { useContext, useRef } from 'react';
import 属性图标 from './属性图标';
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
        {数据.副属性组.map(({ 名称, 品质 }) => (
          <属性图标 key={名称} className={`品质-${品质} 透明`} 名称={名称} />
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
