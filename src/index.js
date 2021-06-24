import 生成装备 from './生成装备';

function 主界面() {
  window.jsBtnGenerate.onclick = () => {
    console.log(生成装备(['瞄准元件', '增幅元件']));
  }
}

主界面();
