window.addEventListener('DOMContentLoaded', () => {
  // 【タブメニュー】
  document.querySelectorAll('.js-tab').forEach((tab) => {
    const tabMenuItems = tab.querySelectorAll('.js-tab-menu-item');
    const tabBodyDetails = tab.querySelectorAll('.js-tab-body-detail');
    tabMenuItems[0].classList.add('is-active');
    tabBodyDetails[0].classList.add('is-show');
    tabMenuItems.forEach((element, index) => {
      element.addEventListener('click', () => {
        tabMenuItems.forEach((element) => {
          element.classList.remove('is-active');
        });
        tabBodyDetails.forEach((element) => {
          element.classList.remove('is-show');
        });
        tabMenuItems[index].classList.add('is-active');
        tabBodyDetails[index].classList.add('is-show');
      });
    });
  });
  // 【アコーディオン】
  document.querySelectorAll('.js-accordion').forEach((accordion) => {
    const accordionTriggers = accordion.querySelectorAll('.js-accordion-trigger');
    const accordionTargets = accordion.querySelectorAll('.js-accordion-target');
    accordionTargets.forEach((target) => {
      target.style.height = target.clientHeight + 'px';
      target.classList.add('is-close');
    });
    accordionTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.target.nextElementSibling.classList.toggle('is-close');
      });
    });
  });
  // 【モーダル】
  const modal = document.getElementById('js-modal');// モーダル本体
  const modalTrigger = document.getElementById('js-modal-trigger');// モーダル発火用のボタン
  // モーダルを開く
  modalTrigger.addEventListener('click', () => {
    modal.classList.add('is-show');
  });
  // モーダルを閉じる
  document.getElementById('js-modal-close').addEventListener('click', () => {
    modal.classList.remove('is-show');
  });
  // 【ドロワー】
  const drawer = document.getElementById('js-drawer');// ドロワー全体
  const drawerInner = document.getElementById('js-drawer-inner');
  const drawerTrigger = document.getElementById('js-drawer-trigger');// ドロワー発火用のボタン
  // ドロワーを開く
  drawerTrigger.addEventListener('click', () => {
    drawer.classList.add('is-open');
    drawerInner.classList.add('is-open');
  });
  // ドロワーを閉じる
  document.getElementById('js-drawer-close').addEventListener('click', () => {
    drawer.classList.remove('is-open');
    drawerInner.classList.remove('is-open');
  });

  // 【スライダー】
  const slideWidth = document.querySelector('.js-slider-item').clientWidth;  // スライド1枚分の幅
  const slideNum = document.querySelectorAll('.js-slider-item').length;  // スライドの枚数
  const slideList = document.getElementById('js-slide-list');
  let currentSlide = 0;// 現在のスライドナンバー

  const slide = () => {
    if (currentSlide < 0 || currentSlide >= slideNum) {
      currentSlide = 0;
    };
    slideList.style.left = -slideWidth*currentSlide + 'px';
  };

  document.getElementById('js-slider-prev').addEventListener('click', () => {
    currentSlide--;
    slide();
  });

  document.getElementById('js-slider-next').addEventListener('click', () => {
    currentSlide++;
    slide();
  });

  // 【スライダー（ループver）】
  const slideItems = document.querySelectorAll('.js-loop-slide-item');
  const slideItemWidth = document.querySelector('.js-loop-slide-item').clientWidth; // スライド1枚分の幅
  const slideItemNum = slideItems.length; // スライドの数
  const loopSlideList = document.getElementById('js-loop-slide-list');

  // 初期表示 最初と最後のスライドをコピーして、それぞれ最後尾と先頭に配置
  const firstSlideItem = loopSlideList.firstElementChild.cloneNode(true);
  const lastSlideItem = loopSlideList.lastElementChild.cloneNode(true);
  loopSlideList.appendChild(firstSlideItem);
  loopSlideList.insertBefore(lastSlideItem, loopSlideList.firstElementChild);
  loopSlideList.style.left = -slideItemWidth + 'px';
  let currentIndex = 1; // 現在のスライドナンバー

  const move = (next) => {
    if (next > currentIndex) {
      currentIndex++;
    } else {
      currentIndex--;
    }
    loopSlideList.classList.add('-animation');
    loopSlideList.style.left = -slideItemWidth * currentIndex + 'px';
    // アニメーション終了後の処理
    loopSlideList.addEventListener('transitionend', () => {
      // スライドが最後尾に来た時
      if (currentIndex === slideItemNum + 1) {
        loopSlideList.classList.remove('-animation');
        loopSlideList.style.left = -slideItemWidth + 'px';
        currentIndex = 1;
      // スライドが先頭に来た時
      } else if (currentIndex === 0) {
        loopSlideList.classList.remove('-animation');
        loopSlideList.style.left = -slideItemWidth * slideItemNum + 'px';
        currentIndex = slideItemNum;
      }
      clickFlug = true;
    });
  }

  let clickFlug = true;
  // フラグを立て、アニメーション終了までのclickを無効にする
  const slideImage = (next) => {
    if (clickFlug) {
      clickFlug = false;
      move(next);
    } else {
      return false;
    }
  };

  // 前へボタン押下
  document.getElementById('js-loop-slide-prev').addEventListener('click', () => {
    slideImage(currentIndex - 1);
  });
  // 次へボタン押下
  document.getElementById('js-loop-slide-next').addEventListener('click', () => {
    slideImage(currentIndex + 1);
  });
});