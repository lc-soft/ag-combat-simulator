import 生成随机数 from 'lodash/random';
import 生成唯一标识 from 'lodash/uniqueId';
import 选取不同 from 'lodash/difference';
import * as Romanice from 'romanice';
import 树突科技装备清单 from './树突科技';
import 先锋粒子装备清单 from './先锋粒子';
import 月卫防务装备清单 from './月卫防务';
import 纳诺克斯装备清单 from './纳诺克斯';
import 重锤工业装备清单 from './重锤工业';
import 武神锻钢厂装备清单 from './武神锻钢厂';
import 李道尔财团装备清单 from './李道尔财团';

const 装备库 = [
  ...树突科技装备清单.map((装备) => ({ ...装备, 厂商: '树突科技' })),
  ...先锋粒子装备清单.map((装备) => ({ ...装备, 厂商: '先锋粒子' })),
  ...月卫防务装备清单.map((装备) => ({ ...装备, 厂商: '月卫防务' })),
  ...纳诺克斯装备清单.map((装备) => ({ ...装备, 厂商: '纳诺克斯' })),
  ...重锤工业装备清单.map((装备) => ({ ...装备, 厂商: '重锤工业' })),
  ...武神锻钢厂装备清单.map((装备) => ({ ...装备, 厂商: '武神锻钢厂' })),
  ...李道尔财团装备清单.map((装备) => ({ ...装备, 厂商: '李道尔财团' })),
];

const 套装表 = {
  状态抵抗: {
    名称: '状态抵抗套装',
    效果: '状态抵抗提升 20%'
  },
  状态命中: {
    名称: '状态命中套装',
    效果: '状态命中提升 20%'
  },
  速度: {
    名称: '速度套装',
    效果: '速度提升 25%'
  },
  攻击: {
    名称: '攻击套装',
    效果: '攻击提升 35%'
  },
  免疫: {
    名称: '免疫套装',
    效果: '开始战斗时，获得 1 回合免疫状态'
  },
  防御: {
    名称: '防御套装',
    效果: '防御提升 15%'
  },
  生命: {
    名称: '生命套装',
    效果: '生命提升 15%'
  },
  暴击: {
    名称: '暴击套装',
    效果: '暴击提升 12%'
  },
}

// FIXME: 这里是直接用六星装备的数值，不适用于生成低星装备数据
const 装备属性表 = {
  攻击: {
    初始值: 125,
    最大值: 255,
  },
  攻击百分比: {
    初始值: 10,
    最大值: 25,
    单位: '%',
  },
  生命: {
    初始值: 611,
    最大值: 1000,
  },
  生命百分比: {
    初始值: 10,
    最大值: 25,
    单位: '%',
  },
  防御: {
    初始值: 70,
    最大值: 255,
  },
  防御百分比: {
    初始值: 10,
    最大值: 25,
    单位: '%',
  },
  速度: {
    初始值: 7,
    最大值: 15,
  },
  状态命中: {
    初始值: 10,
    最大值: 25,
    单位: '%',
  },
  状态抵抗: {
    初始值: 10,
    最大值: 25,
    单位: '%',
  },
  暴击: {
    初始值: 9,
    最大值: 15,
    单位: '%',
  },
  爆伤: {
    初始值: 11,
    最大值: 25,
    单位: '%',
  },
};

const 装备属性名称组 = Object.keys(装备属性表);

const 装备随机主属性组 = [
  '攻击',
  '攻击百分比',
  '生命',
  '生命百分比',
  '防御',
  '防御百分比'
];

const 装备规格表 = {
  武器系统: {
    主属性: ['攻击'],
  },
  能源系统: {
    主属性: ['生命'],
  },
  防护系统: {
    主属性: ['防御'],
  },
  推进系统: {
    主属性: [
      '速度',
      ...装备随机主属性组
    ],
  },
  瞄准元件: {
    主属性: [
      '暴击',
      '爆伤',
      ...装备随机主属性组
    ],
  },
  增幅元件: {
    主属性: [
      '状态命中',
      '状态抵抗',
      ...装备随机主属性组
    ],
  }
};

function 随机选择(选项组) {
  return 选项组[生成随机数(0, 选项组.length - 1, false)];
}

function 计算属性品质(名称, 值) {
  return Math.ceil(值 / (装备属性表[名称].最大值 / 4)) - 1;
}

function 转罗马数字(数字) {
  const { romanice } = Romanice;
  return romanice().toRoman(数字);
}

export function 创建未确认装备(星级, 分类, 套装) {
  const 装备 = 装备库.find((目标) => 目标.分类 === 分类 && 目标.套装 === 套装);
  if (!装备) {
    return {
      名称: '未知道具',
      类型: '未知',
      唯一标识: `未知道具.${生成唯一标识()}`,
      描述: `${星级}-${分类}-${套装}`
    };
  }
  const { 主属性 } = 装备规格表[分类];
  return {
    ...装备,
    已确认: false,
    唯一标识: 生成唯一标识('装备'),
    名称: `${装备.名称}MK.${转罗马数字(星级)}`,
    类型: '装备',
    品质: 星级 - 3,
    主属性: 主属性.length === 1
      ? { 名称: 主属性[0], 值: 装备属性表[主属性[0]] }
      : null,
    规格: {
      主属性,
      副属性数量范围: [
        星级 > 4 ? 2 : 1,
        星级 > 4 ? 4 : 3
      ],
    },
    星级,
  }
}

export function 确认装备属性(未确认装备) {
  const { 规格, 星级 } = 未确认装备;
  const 主属性名称 = 随机选择(规格.主属性);
  const 主属性 = 装备属性表[主属性名称] || { 名称: 主属性名称, 初始值: '?', 最大值: 10 };
  const 副属性数量 = 生成随机数(...规格.副属性数量范围, false);
  const 副属性组 = [];
  const 已有属性名称组 = [主属性名称];
  let 评分 = 星级 * 10;

  for (let 计数 = 0; 计数 < 副属性数量; ++计数) {
    const 可用属性名称组 = 选取不同(装备属性名称组, 已有属性名称组);
    const 副属性名称 = 随机选择(可用属性名称组);
    const { 最大值, 单位, 图标 } = 装备属性表[副属性名称];
    const 最小值 = Math.ceil(星级 > 5 ? 最大值 / 4 : 最大值 / 8);
    const 副属性值 = 生成随机数(最小值, 最大值, false);
    const 副属性品质 = 计算属性品质(副属性名称, 副属性值);

    已有属性名称组.push(副属性名称);
    副属性组.push({
      名称: 副属性名称,
      值: 副属性值,
      图标,
      单位,
      品质: 副属性品质
    });
    评分 += 副属性品质;
  }
  return {
    ...未确认装备,
    已确认: true,
    唯一标识: 生成唯一标识('装备'),
    品质: 副属性数量 - 1,
    评分,
    主属性: {
      名称: 主属性名称,
      值: 主属性.初始值,
      图标: 主属性.图标,
      单位: 主属性.单位,
    },
    副属性组,
    套装: 套装表[未确认装备.套装]
  };
}
