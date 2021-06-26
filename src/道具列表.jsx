import { useMemo } from 'react';
import 道具 from './道具';
import './道具列表.css';

export default function 道具列表({ 列表, 按评分排序 }) {
  const 实际列表 = useMemo(
    () => 按评分排序 ? 列表.slice().sort((甲, 乙) => (乙.评分 - 甲.评分)) : 列表,
    [列表, 按评分排序]
  );
  return (
    <div className="道具列表">
      <div className="道具列表-内部">
        {实际列表.map((数据) => <道具 key={数据.唯一标识} 数据={数据} />)}
      </div>
    </div>
  );
}
