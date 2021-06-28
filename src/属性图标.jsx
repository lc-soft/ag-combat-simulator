import classNames from 'classnames';
import './属性图标.scss';

export default function 属性图标({ 名称, className }) {
  const 图标映射 = {
    攻击: '攻',
    防御: '防',
    速度: '速',
    生命: '生',
    暴击: '暴',
    爆伤: '伤',
    状态抵抗: '抗',
    状态命中: '中',
  };
  const 实际名称 = 名称.replace('百分比', '');
  return (
    <span className={classNames('属性图标', 实际名称, className)}>
      {图标映射[实际名称]}
    </span>
  );
}
