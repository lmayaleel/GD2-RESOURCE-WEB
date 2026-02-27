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

function scrollToImage(className) {
    const targetImage = document.querySelector(className);
    
    if (targetImage) {
        // 이미지가 위치한 절대 좌표(Y축)를 계산해
        const targetPosition = targetImage.getBoundingClientRect().top + window.pageYOffset;
        
        // 화면 중앙에 오게 하고 싶으면 약간의 보정값을 뺄 수 있어 (예: -200)
        window.scrollTo({
            top: targetPosition - 100, 
            behavior: 'smooth'
        });
    } else {
        console.log("이미지를 찾을 수 없어:", className);
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