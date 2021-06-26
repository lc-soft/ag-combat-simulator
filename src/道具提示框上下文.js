import { createContext } from 'react';

export const 道具选中方法上下文 = createContext(() => {});
export const 道具数据上下文 = createContext({
  道具: null,
  元素引用: null
});
