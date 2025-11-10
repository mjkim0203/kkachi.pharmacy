document.addEventListener('DOMContentLoaded', () => {
    
    // 알림 바 타이머를 위한 변수
    let notificationTimer; 

    // 1. 필요한 DOM 요소 선택
    const navButtons = document.querySelectorAll('.nav-btn');
    const modal = document.getElementById('modal-sidebar');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalContents = document.querySelectorAll('.modal-content');
    const logoLink = document.getElementById('logo-link');

    // ✅ NEW: 알림 바 및 카트 버튼 선택
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const notificationBar = document.getElementById('cart-notification-bar');

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
                // 콘텐츠가 바뀔 때마다 스크롤을 맨 위로
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

    // 5. ✅ NEW: 카트 담기 버튼 이벤트
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // 만약 이미 타이머가 실행 중이라면, 초기화
            if (notificationTimer) {
                clearTimeout(notificationTimer);
            }

            // 알림 바를 즉시 표시
            notificationBar.classList.add('show');

            // 3초 후에 알림 바를 다시 숨기는 타이머 설정
            notificationTimer = setTimeout(() => {
                notificationBar.classList.remove('show');
            }, 3000); // 3000ms = 3 seconds
        });
    });

});
