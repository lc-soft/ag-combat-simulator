import './道具缩略图.css';

export default function 道具缩略图({ 数据 }) {
  let 图标 = '未知';
  let 星级 = null;
  const classNames = ['道具缩略图'];

  if (数据.类型 === '装备') {
    图标 = 数据.分类.substr(0, 2);
  }
  if (typeof 数据.品质 === 'number') {
    classNames.push(`品质-${数据.品质}`);
  }
  if (typeof 数据.星级 === 'number') {
    星级 = (
      <div className="道具星级">
        {new Array(Math.min(数据.星级, 5)).fill(0).map((_, 序号) => (
          <span key={序号} className={`星星 ${序号 < 数据.星级 - 5 ? '紫色' : '金色'}`} />
        ))}
      </div>
    );
  }
  return (
    <div className={classNames.join(' ')}>
      <div className="道具缩略图-背景" />
      <div className="道具缩略图-前景">
        {图标}
        {星级}
      </div>
    </div>
  );
}
