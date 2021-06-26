import 生成随机数 from 'lodash/random';
import 生成唯一标识 from 'lodash/uniqueId';
import { useMemo, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import 按钮 from './按钮';
import 道具列表 from './道具列表';
import 目标歼灭 from './lib/目标歼灭';
import { 创建未确认装备, 确认装备属性 } from "./lib/装备库";

import './目标歼灭作战界面.css';

function 作战任务展示({ 任务 }) {
  return (
    <div key={任务.标题} className="作战报酬组">
      <div className="作战报酬组-标题">
        {任务.标题}
        <span className="ml-1">({任务.报酬列表.length})</span>
      </div>
      <道具列表 列表={任务.报酬列表} 按评分排序 />
    </div>
  );
}

const 缓存的作战任务展示 = memo(
  作战任务展示,
  (prev, next) => prev.任务.标题 === next.任务.标题
);

function 作战结果界面({ 作战任务组, ...props }) {
  const 总数 = useMemo(
    () => 作战任务组.reduce((上个总数, 任务) => 上个总数 + 任务.报酬列表.length, 0),
    [作战任务组]
  );
  return (
    <div className="作战结果界面" {...props}>
      <h3>作战结果 <span className="ml-1">({总数})</span></h3>
      <Scrollbars className="作战报酬列表">
        {作战任务组.map((任务) => <缓存的作战任务展示 key={任务.唯一标识} 任务={任务} />)}
      </Scrollbars>
    </div>
  );
}

export default function 目标歼灭作战界面() {
  const { target: 目标名 } = useParams();
  const 数字 = '一二三四五六七八九';
  const 目标信息 = 目标歼灭.find((目标) => 目标.名称 === 目标名);
  const [总作战次数, 设置总作战次数] = useState(0);
  const [已选中序号, 设置已选中序号] = useState(8);
  const [作战任务组, 设置作战任务组] = useState([]);
  const 主要报酬 = useMemo(() => {
    const 装备组 = [];
    const { 分类组, 星级 } = 目标信息.阶段组[已选中序号];
    分类组.forEach((分类) => 目标信息.套装组.forEach(
      (套装) => 装备组.push(创建未确认装备(星级, 分类, 套装))
    ));
    return 装备组;
  }, [目标信息, 已选中序号]);

  const 添加作战任务 = (作战次数) => {
    const 报酬列表 = [];

    for (let 计数 = 0; 计数 < 作战次数; ++计数) {
      const 报酬数量 = 生成随机数(1, 3, false);
      报酬列表.push(...new Array(报酬数量).fill(0).map(
        () => 确认装备属性(主要报酬[生成随机数(0, 主要报酬.length - 1)])
      ));
    }
    设置总作战次数(总作战次数 + 作战次数);
    设置作战任务组((任务组) => [
      {
        唯一标识: 生成唯一标识('作战任务'),
        标题: `第 ${总作战次数 + 1} ${作战次数 > 1 ? `至 ${总作战次数 + 作战次数} ` : ''}次作战`,
        报酬列表
      },
      ...任务组
    ]);
  };

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
      <div className="目标展示区">
        <作战结果界面 作战任务组={作战任务组} style={总作战次数 < 1 ? { display: 'none' } : undefined }/>
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
          <按钮 onClick={() => 添加作战任务(1)}>作战 1 次</按钮>
          <按钮 onClick={() => 添加作战任务(30)}>作战 30 次</按钮>
        </div>
      </div>
    </div>
  );
}
