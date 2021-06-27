import classNames from 'classnames';

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
  }
  return <span className={classNames('图标', className)}>{图标映射[名称.replace('百分比', '')]}</span>
}
