import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import 按钮 from './按钮';
import 道具列表 from './道具列表';
import 目标歼灭 from './lib/目标歼灭';
import { 创建未确认装备 } from "./lib/装备库";

import './目标歼灭作战界面.css';

export default function 目标歼灭作战界面() {
  const { target: 目标名 } = useParams();
  const 数字 = '一二三四五六七八九';
  const 目标信息 = 目标歼灭.find((目标) => 目标.名称 === 目标名);
  const [已选中序号, 设置已选中序号] = useState(8);
  const 主要报酬 = useMemo(() => {
    const 装备组 = [];
    const { 分类组, 星级 } = 目标信息.阶段组[已选中序号];
    分类组.forEach((分类) => 目标信息.套装组.forEach(
      (套装) => 装备组.push(创建未确认装备(星级, 分类, 套装))
    ));
    return 装备组;
  }, [目标信息, 已选中序号]);

  return (
    <div className="界面 目标歼灭作战界面">
      <div className="目标阶段-列表">
        {目标信息.阶段组.map((_阶段信息, 序号) => (
          <button
            key={序号}
            type="button"
            className={`目标阶段-选项${已选中序号 === 序号 ? ' 已选中' : ''}`}
            onClick={() => 设置已选中序号(序号)}
          >
            第{数字[序号]}阶段
            <div className="目标阶段-选项箭头" />
          </button>
        ))}
      </div>
      <div className="目标展示区" style={{ color: 目标信息.颜色 }}>
        {目标名}
      </div>
      <div className="目标信息面板">
        <h2 className="目标信息面板-标题 衬线字体">
          第{数字[已选中序号]}阶段
        </h2>
        <div className="目标信息面板-描述">
          {目标信息.描述}
        </div>
        <div className="目标信息面板-报酬">
          <div className="目标信息面板-小标题">
            主要报酬
          </div>
          <Scrollbars className="目标信息面板-报酬列表">
            <道具列表 列表={主要报酬} />
          </Scrollbars>
        </div>
        <div className="目标信息面板-操作">
          <按钮>作战 1 次</按钮>
          <按钮>作战 30 次</按钮>
        </div>
      </div>
    </div>
  );
}
