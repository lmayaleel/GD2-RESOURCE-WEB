const navItems = document.querySelectorAll('.nav-item');
const fragments = document.querySelectorAll('.fragment');

// 1. 제목에 마우스 올렸을 때 효과
navItems.forEach(item => {
    const targetClass = item.getAttribute('data-target');
    const targetImg = document.querySelector(`.${targetClass}`);

    item.addEventListener('mouseenter', () => {
        item.classList.add('highlight');
        if (targetImg) targetImg.classList.add('active');
    });

    item.addEventListener('mouseleave', () => {
        item.classList.remove('highlight');
        if (targetImg) targetImg.classList.remove('active');
    });
});

// 2. [추가] 사진에 마우스 올렸을 때 제목도 같이 변하게 함
fragments.forEach(img => {
    // 이미지의 클래스 목록 중 'frag-'로 시작하는 이름을 찾음
    const imgClass = Array.from(img.classList).find(cls => cls.startsWith('frag-'));
    // 해당 클래스를 data-target으로 가진 제목을 찾음
    const targetTitle = document.querySelector(`[data-target="${imgClass}"]`);

    img.addEventListener('mouseenter', () => {
        img.classList.add('active');
        if (targetTitle) targetTitle.classList.add('highlight');
    });

    img.addEventListener('mouseleave', () => {
        img.classList.remove('active');
        if (targetTitle) targetTitle.classList.remove('highlight');
    });
});

function scrollToImage(selector, descId) {
    const targetImage = document.querySelector(selector);
    
    // [1] 부드러운 스크롤 기능 (한 번에 고정된 위치로 이동)
    if (targetImage) {
        // 이미지가 전체 문서에서 위로부터 몇 픽셀 위치에 있는지 계산
        const targetPosition = targetImage.getBoundingClientRect().top + window.pageYOffset;
        
        // 보정값 (100이면 화면 상단에서 100px 정도 여유를 두고 멈춤)
        // 화면이 너무 위를 보여준다 싶으면 이 숫자를 150, 200으로 키워봐!
        const offset = 80; 

        window.scrollTo({
            top: targetPosition - offset, 
            behavior: 'smooth'
        });
    }

    // [2] 카테고리 설명창 토글 기능
    // 일단 모든 설명창(.category-description)을 닫음
    const allDescs = document.querySelectorAll('.category-description');
    allDescs.forEach(desc => {
        desc.classList.remove('active');
    });

    // 클릭한 심볼에 해당하는 ID의 박스만 켜기
    const targetDesc = document.getElementById(descId);
    if (targetDesc) {
        targetDesc.classList.add('active');
    }
    

    
}



// data.js (예시)
const movieData = {
    "possessiveness": {
        title: "Possessiveness",
        text: "Lorem ipsum dolor sit amet...",
        image: "source/films/collector_detail.jpg",
        next: "Metamorphosis"
    },
    "silence": {
        title: "The Silence of the Lambs",
        text: "Clarice Starling, a young FBI trainee...",
        image: "source/films/silence_detail.jpg",
        next: "Papillon"
    }
};

function toggleDetail(num) {
    // 해당 id를 가진 요소를 찾아서
    const node = document.getElementById('node-' + num);
    // 'active'라는 클래스를 넣었다 뺏다(토글) 한다!
    node.classList.toggle('active');
}


function nextSlide(nodeId) {
    const wrapper = document.getElementById(`wrapper-${nodeId}`);
    // 왼쪽으로 500px 밀기 (마이너스 방향)
    wrapper.style.transform = 'translateX(-500px)';
}

// 기존에 썼던 toggleDetail 함수는 그대로 유지하되, 
// 열릴 때 위치를 초기화해주는 코드를 넣으면 더 좋아!
function toggleDetail(id) {
    const node = document.getElementById(`node-${id}`);
    node.classList.toggle('active');
    
    // 닫았다가 다시 열 때 첫 슬라이드로 초기화
    if(!node.classList.contains('active')) {
        const wrapper = document.getElementById(`wrapper-${id}`);
        wrapper.style.transform = 'translateX(0)';
    }
}


let currentFrame = 0;

function showNextFrame(nodeId) {
    currentFrame++;
    const container = document.getElementById(`frame-container-${nodeId}`);
    const frames = container.getElementsByClassName('text-frame');
    
    // 500px(너비) + 100px(간격) 만큼 왼쪽으로 딱 이동
    const moveDistance = currentFrame * 600; 
    container.style.left = `-${moveDistance}px`;

    // 클래스 교체해서 투명도 조절
    for (let i = 0; i < frames.length; i++) {
        frames[i].classList.remove('main-frame');
    }
    if(frames[currentFrame]) {
        frames[currentFrame].classList.add('main-frame');
    }
}
function toggleDetail(character) {
    // 1. 클릭한 버튼의 부모인 keyword-node를 찾음
    const node = document.getElementById('node-' + character);
    
    if (!node) return;

    // 2. 현재 열려있는지 확인
    const isActive = node.classList.contains('active');

    // 3. (선택) 다른 것들은 닫고 싶다면 아래 3줄 주석 해제!
    /*
    document.querySelectorAll('.keyword-node').forEach(item => {
        item.classList.remove('active');
    });
    */

    // 4. 클릭한 대상만 열거나 닫기
    if (isActive) {
        node.classList.remove('active');
    } else {
        node.classList.add('active');
    }
}

function toggleRemoteDesc(id) {
    const desc = document.getElementById(id);
    if (desc) {
        desc.classList.toggle('active'); // 클래스를 넣었다 뺐다 해주는 마법
    }
}


function toggleDetail(nodeNum) {
    const node = document.getElementById(`node-${nodeNum}`);
    node.classList.toggle('active');
}

function nextSentence(nodeNum, event) {
    event.stopPropagation(); // 제목 클릭 이벤트 방지
    
    const node = document.getElementById(`node-${nodeNum}`);
    const descriptions = node.querySelectorAll('.description');
    let activeIndex = -1;

    // 현재 보이고 있는 문장의 인덱스 찾기
    descriptions.forEach((desc, index) => {
        if (desc.classList.contains('active')) {
            activeIndex = index;
        }
    });

    // 현재 문장 숨기기
    descriptions[activeIndex].classList.remove('active');

    // 다음 문장 보여주기 (마지막 문장이면 다시 첫 번째로)
    const nextIndex = (activeIndex + 1) % descriptions.length;
    descriptions[nextIndex].classList.add('active');
}

function nextSentence(nodeNum, event) {
    event.stopPropagation();
    const node = document.getElementById(`node-${nodeNum}`);
    const descriptions = node.querySelectorAll('.description');
    let activeIndex = Array.from(descriptions).findIndex(desc => desc.classList.contains('active'));

    // 마지막 문장이 아니라면 다음으로 이동
    if (activeIndex < descriptions.length - 1) {
        descriptions[activeIndex].classList.remove('active');
        descriptions[activeIndex + 1].classList.add('active');
        
        // 상태 업데이트
        updateArrowState(node, activeIndex + 1, descriptions.length);
    }
}

function prevSentence(nodeNum, event) {
    event.stopPropagation();
    const node = document.getElementById(`node-${nodeNum}`);
    const descriptions = node.querySelectorAll('.description');
    let activeIndex = Array.from(descriptions).findIndex(desc => desc.classList.contains('active'));

    // 첫 번째 문장이 아니라면 이전으로 이동
    if (activeIndex > 0) {
        descriptions[activeIndex].classList.remove('active');
        descriptions[activeIndex - 1].classList.add('active');
        
        // 상태 업데이트
        updateArrowState(node, activeIndex - 1, descriptions.length);
    }
}

// 화살표 보이기/숨기기를 관리하는 핵심 함수
function updateArrowState(node, currentIndex, totalCount) {
    const nextBtn = node.querySelector('.arrow-btn');
    const prevBtn = node.querySelector('.arrow-btn-prev');

    // 1. 왼쪽 화살표: 첫 번째 문장이 아닐 때만 보임
    prevBtn.style.display = (currentIndex > 0) ? 'block' : 'none';

    // 2. 오른쪽 화살표: 마지막 문장이 아닐 때만 보임
    nextBtn.style.display = (currentIndex < totalCount - 1) ? 'block' : 'none';
}

// 화면 어디든 클릭했을 때 실행되는 이벤트
document.addEventListener('click', function(e) {
    // 1. 클릭한 요소(e.target)가 '카테고리 심볼'인지 확인
    const isSymbol = e.target.classList.contains('group-symbol');
    
    // 2. 클릭한 요소가 '설명 박스' 안쪽인지 확인
    const isInsideDesc = e.target.closest('.category-description');

    // 3. 심볼을 누른 것도 아니고, 설명창 안을 누른 것도 아니라면? (즉, 빈 곳 클릭)
    if (!isSymbol && !isInsideDesc) {
        // 모든 설명창에서 active 클래스를 제거해서 숨김 처리
        const allDescs = document.querySelectorAll('.category-description');
        allDescs.forEach(desc => {
            desc.classList.remove('active');
        });
    }

window.addEventListener('load', function() {
    document.querySelectorAll('.img-word').forEach(word => {
        const imgPath = word.getAttribute('data-img');
        if (imgPath) {
            word.style.setProperty('--img-url', `url('${imgPath}')`);
        }
    });
});
    
});

document.addEventListener("DOMContentLoaded", function() {
    const trigger = document.querySelector('.trigger-text'); // 클릭할 문장
    const sideImage = document.querySelector('#clarice-sub-desc'); // 튀어나올 이미지 박스

    if (trigger && sideImage) {
        trigger.addEventListener('click', function() {
            // 클릭할 때마다 visible 클래스를 넣었다 뺐다(토글) 합니다.
            sideImage.classList.toggle('visible');
            
            // 만약 한 번 나타나면 계속 유지하고 싶다면 아래 코드를 쓰세요.
            // sideImage.classList.add('visible');
        });
    }
});