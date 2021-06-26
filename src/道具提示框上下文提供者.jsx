import { useMemo, useState, useRef, useCallback } from 'react';
import { 道具选中方法上下文, 道具数据上下文 } from './道具提示框上下文';
import 道具提示框 from './道具提示框';

export default function 道具提示框上下文提供者({ children }) {
  const 元素引用 = useRef();
  const [道具, 设置道具] = useState();
  const 设置选中道具 = useCallback((选中的道具, { current } = {}) => {
    设置道具(选中的道具);
    元素引用.current = current;
  }, []);
  const 数据 = useMemo(() => ({
    道具,
    元素引用
  }), [道具]);

  return (
    <道具选中方法上下文.Provider value={设置选中道具}>
      <道具数据上下文.Provider value={数据}>
        {typeof children === 'function' ? children(设置选中道具) : children}
        <道具提示框 />
      </道具数据上下文.Provider>
    </道具选中方法上下文.Provider>
  );
}
