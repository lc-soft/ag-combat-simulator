import 道具 from './道具';
import './道具列表.css';

export default function 道具列表({ 列表 }) {
  return (
    <div className="道具列表">
      <div className="道具列表-内部">
        {列表.map((数据) => <道具 key={数据.唯一标识} 数据={数据} />)}
      </div>
    </div>
  );
}
