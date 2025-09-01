// Scrollmagic
// 그 외 scrollreveal
const spyEls = document.querySelectorAll('section.scroll-spy')

const controller = new ScrollMagic.Controller();

spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({ // 감시할 장면 추가 및 옵션 지정
    triggerElement: spyEl,// 보여짐 여부를 감시할 요소를 지정
    triggerHool: 0.5  // 화면의 50% 지점에서 보여짐 여부 감시(0~1 사이 지정)
  })
  .setClassToggle(spyEl, 'show')  // 요소가 화면에 보이면 show 클래스 추가
  .addTo(controller); // 컨트롤러에 장면을 할당(필수!)
});

const swiper = new Swiper('.project .swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  // autoplay: { // 자동재생 
  //   delay: 1000
  // },

  // If we need pagination
  pagination: {
    el: '.project .swiper-pagination',
    clickable: true // 사용자의 페이지네이션 요소 제거 가능 여부
  },

  // Navigation arrows
  navigation: {
    nextEl: '.project .swiper-button-next',
    prevEl: '.project.swiper-button-prev',
  }
});

// 모달창 띄우기
const modal = document.querySelector('#modal');
const modalBtnList = document.querySelectorAll('.project .btn-modal');
const closeBtn = document.querySelector('#modal .btn-close');

modalBtnList.forEach(function (modalBtn) {
  modalBtn.addEventListener('click', function () {
  modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });
});

const imageModal = document.querySelector('#imageModal');
const imageModalBtnList = document.querySelectorAll('.project .btn-modal-image');
const imageCloseBtn = document.querySelector('#imageModal .btn-close');
const imageEl = document.querySelector('#imageModal img');

imageModalBtnList.forEach(function (imageModalBtn) {
  imageModalBtn.addEventListener('click', function () {
    imageEl.src = imageModalBtn.dataset.imageSrc;
    imageModal.style.display = 'flex';
  });
});
imageCloseBtn.addEventListener('click', function () {
  imageModal.style.display = 'none';
});
