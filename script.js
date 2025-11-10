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

    // Lightbox elements
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('image-lightbox-img');
    const lightboxCloseBtn = document.querySelector('.lightbox-close-btn');
    const staffThumbnails = document.querySelectorAll('.staff-image-thumb'); 

    // ✅ NEW: Main Page Image elements
    const mainPageImage = document.getElementById('main-page-image');
    // ✅ NEW: 메인 페이지에 보여줄 이미지 목록 (images 폴더 내에 있어야 함)
    const mainPageImages = [
        'images/image01.png', // Image 1
        'images/image02.png',   // Image 2
        'images/image03.png'       // Image 3
    ];

    // ✅ NEW: 메인 페이지 이미지 랜덤으로 설정 및 라이트박스 연결
    const setRandomMainImage = () => {
        const randomIndex = Math.floor(Math.random() * mainPageImages.length);
        const selectedImage = mainPageImages[randomIndex];
        mainPageImage.src = selectedImage;
        mainPageImage.alt = "KKACHI PHARMACY Main Image"; // 대체 텍스트 업데이트
    };

    // 페이지 로드 시 랜덤 이미지 설정
    setRandomMainImage();

    // 메인 페이지 이미지 클릭 시 라이트박스 열기
    mainPageImage.addEventListener('click', () => {
        lightboxImg.src = mainPageImage.src; // 현재 메인 이미지로 라이트박스 이미지 설정
        lightbox.classList.add('show');
    });

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

        // ✅ NEW: 로고 클릭 시 메인 페이지 이미지도 새로고침
        setRandomMainImage(); 
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

    // 6. Image Lightbox Logic (Staff Thumbnail & Main Image)
    staffThumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('show');
        });
    });

    // 라이트박스 닫기 함수
    const closeLightbox = () => {
        lightbox.classList.remove('show');
        lightboxImg.setAttribute('src', ""); 
    };

    // 'X' 버튼 클릭 시 닫기
    lightboxCloseBtn.addEventListener('click', closeLightbox);

    // 어두운 배경 클릭 시 닫기
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

});
