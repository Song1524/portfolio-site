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

// 모달 바깥 영역 클릭 시 닫기
modal.addEventListener('click', function (e) { // 이벤트 발생 시 이벤트 객체가 전달됨
  // console.log(e.target);  // 현재 이벤트가 발생한 대상(사용자가 실제 클릭한 가장 안쪽 요소)
  // console.log(e.currentTarget); // 이벤트가 바인딩된 요소(모달)
  
  // if (e.target === modal) {  // 하드 코딩
  if (e.target === e.currentTarget) {
    modal.style.display = 'none';
  }
});
imageModal.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    imageModal.style.display = 'none';
  }
});

// ESC를 누르면 모달 닫기(키보드 이벤트)
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    modal.style.display = 'none';
    imageModal.style.display = 'none';
  }
});

// 현재 연도 표시
// 날짜 정보를 가진 JS의 Date 객체를 활용
console.log(new Date().getFullYear());
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();

// 페이지 최상단으로 이동
const toTopEl = document.querySelector('#toTop');
//Quiz: visual 섹션 애니메이션 넣고 빼기
const visualSpanEls = document.querySelectorAll('.visual h1 span');

// 페이지에 스크롤 이벤트 감지를 추가
// 브라우저는 문서 전체의 스크롤을 window 기분으로 처리 
// document에 붙이면 일부 브라우저에서는 동작 안 함
// window: 브라우저 창 객체

window.addEventListener('scroll', function () {
  const goTop = document.querySelector('#toTop');

  if (window.scrollY > 500) {
    goTop.style.opacity = 1;
    goTop.style.transform = 'translateX(0)';

    // 애니메이션 빼기
    visualSpanEls.forEach(function (visualSpan) {
      visualSpan.classList.remove('animate-flash');
    });

  } else {
    goTop.style.opacity = 0;
    goTop.style.transform = 'translateX(100px)';

    // 애니메이션 넣기
    visualSpanEls.forEach(function (visualSpan) {
      visualSpan.classList.add('animate-flash');
    });
  }
});

