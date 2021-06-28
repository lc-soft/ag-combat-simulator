import { useState, useContext } from 'react';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import { 道具数据上下文 } from './道具提示框上下文';
import 道具缩略图 from './道具缩略图';
import 属性图标 from './属性图标';
import './道具提示框.scss';

function 属性词条({ 属性, className = '' }) {
  console.log(属性);
  return (
    <div
      key={属性.名称}
      className={classNames(
        '装备信息-词条',
        className,
        typeof 属性.品质 === 'number' && `品质-${属性.品质}`
      )}
    >
      <属性图标 名称={属性.名称} />
      <span className="名称">
        {属性.名称.replace('百分比', '')}
      </span>
      <span className="值">
        {属性.值}
        {属性.单位}
      </span>
    </div>
  );
}

function 道具信息界面({ 道具 }) {
  let 主属性信息;
  let 副属性信息;
  let 套装信息;

  if (!道具) {
    return null;
  }
  if (道具.类型 !== '装备') {
    return '未知类型的道具';
  }
  if (道具.主属性) {
    主属性信息 = <属性词条 className="主属性" 属性={道具.主属性} />;
  } else {
    主属性信息 = (
      <div className="装备信息-词条">
        随机获取主要属性
      </div>
    );
  }
  if (Array.isArray(道具.副属性组)) {
    副属性信息 = 道具.副属性组.map((属性) => (
      <属性词条 key={属性.名称} className="副属性" 属性={属性} />
    ));
  } else {
    副属性信息 = (
      <div className="装备信息-描述">
        随机获取 {道具.规格.副属性数量范围.join(' - ')} 个附加属性
      </div>
    );
  }
  if (道具.已确认) {
    套装信息 = (
      <div className={`装备信息-套装 ${道具.套装.名称}`}>
        <div className="图标" />
        <div>
          <div>{道具.套装.名称}</div>
          <div>{道具.套装.效果}</div>
        </div>
      </div>
    );
  } else {
    套装信息 = (<>
      <hr />
      <p>可获取套装类型</p>
      <div className="装备信息-词条">
        {道具.套装}套装
      </div>
    </>);
  }
  return (
    <div className={`装备信息 品质-${道具.品质}`}>
      <div className="装备信息-头部">
        <div className="装备信息-名称">
          {道具.名称}
        </div>
        <div className="装备信息-分类">{道具.分类}</div>
        <div className="装备信息-厂商">{道具.厂商}</div>
        <道具缩略图 数据={道具} />
      </div>
      <div className="装备信息-主体">
        <div className="装备信息-描述">
          {道具.描述 || '暂无描述。'}
        </div>
        {主属性信息}
        {副属性信息}
        {套装信息}
      </div>
    </div>
  );
}

export default function 道具提示框() {
  const [提示框元素, 设置提示框元素] = useState(null);
  const { 道具, 元素引用 } = useContext(道具数据上下文);
  const { styles, attributes } = usePopper(元素引用.current, 提示框元素);

  return (
    <div
      ref={设置提示框元素}
      className="道具提示框"
      style={{ ...styles.popper, ...(!道具 ? { display: 'none' } : {}) }}
      onClick={(e) => e.stopPropagation()}
      {...attributes.popper}
    >
      <道具信息界面 道具={道具} />
    </div>
  );
}
