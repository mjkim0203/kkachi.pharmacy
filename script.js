document.addEventListener('DOMContentLoaded', () => {
    
    let notificationTimer; 

    // 1. 필요한 DOM 요소 선택
    const navButtons = document.querySelectorAll('.nav-btn');
    const modal = document.getElementById('modal-sidebar');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalContents = document.querySelectorAll('.modal-content');
    const logoLink = document.getElementById('logo-link');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const notificationBar = document.getElementById('cart-notification-bar');

    // ✅ NEW: Lightbox elements
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('image-lightbox-img');
    const lightboxCloseBtn = document.querySelector('.lightbox-close-btn');
    const staffThumbnails = document.querySelectorAll('.staff-image-thumb'); 

    // 2. 모든 네비게이션 버튼에 클릭 이벤트 추가
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target; 

            // A. 모든 버튼의 'active' 클래스 제거
            navButtons.forEach(btn => btn.classList.remove('active'));
            // B. 클릭된 버튼에 'active' 클래스 추가
            button.classList.add('active');

            // C. 모든 모달 콘텐츠 숨기기
            modalContents.forEach(content => content.classList.remove('active'));
            
            // D. 타겟에 해당하는 모달 콘텐츠 보여주기
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.parentElement.scrollTop = 0; 
            }

            // E. 모달 열기
            modal.classList.add('open');
        });
    });

    // 3. 모달 닫기 버튼 이벤트 (X 버튼)
    closeModalBtn.addEventListener('click', () => {
        // A. 모달 닫기
        modal.classList.remove('open');
        
        // B. 모든 네비게이션 버튼의 'active' 클래스 제거
        navButtons.forEach(btn => btn.classList.remove('active'));
    });

    // 4. 로고 클릭 이벤트 (메인으로)
    logoLink.addEventListener('click', (e) => {
        e.preventDefault(); 

        // A. 모달 닫기
        modal.classList.remove('open');

        // B. 모든 네비게이션 버튼의 'active' 클래스 제거
        navButtons.forEach(btn => btn.classList.remove('active'));
    });

    // 5. 카트 담기 버튼 이벤트
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            if (notificationTimer) {
                clearTimeout(notificationTimer);
            }

            notificationBar.classList.add('show');

            notificationTimer = setTimeout(() => {
                notificationBar.classList.remove('show');
            }, 3000); // 3초
        });
    });

    // 6. ✅ NEW: Image Lightbox Logic
    staffThumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // 클릭된 썸네일의 이미지 경로(src)를 가져옴
            const imgSrc = thumb.getAttribute('src');
            // 라이트박스 <img>의 src로 설정
            lightboxImg.setAttribute('src', imgSrc);
            // 라이트박스 보이기
            lightbox.classList.add('show');
        });
    });

    // 라이트박스 닫기 함수
    const closeLightbox = () => {
        lightbox.classList.remove('show');
        // 닫을 때 이미지를 비워두면 다음 로딩 시 깔끔함
        lightboxImg.setAttribute('src', ""); 
    };

    // 'X' 버튼 클릭 시 닫기
    lightboxCloseBtn.addEventListener('click', closeLightbox);

    // 어두운 배경 클릭 시 닫기
    lightbox.addEventListener('click', (e) => {
        // 클릭된 대상이 정확히 어두운 배경(#image-lightbox)일 때만
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

});
