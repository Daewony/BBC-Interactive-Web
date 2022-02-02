(() => {

    const actions = {
        birdFlies(key) {
            if(key) {
                document.querySelector('[data-index="2"] .brid').style.transform = `translateX(${window.innerWidth - 50}px)`; 
            } else{
                document.querySelector('[data-index="2"] .brid').style.transform = `translateX(-100%)`; 
            }            
        },
        birdFlies2(key){
            if(key) {
                document.querySelector('[data-index="5"].brid').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
            } else {
                document.querySelector('[data-index="5"].bird').style.transform = `translateX(-100%)`;
            }
        }

    }

    // 데이터 가져오기
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; // 현재 활성화된 visible 클래스가 붙은 .graphic-item을 지정
    let ioIndex;

    const io = new IntersectionObserver((entries,observer) =>{
        // console.log(entries);
        // console.log(entries[0].target.dataset.index);
        ioIndex = entries[0].target.dataset.index * 1; // 문자열 -> 숫자로 변경 (곱하기 이용)
        console.log(ioIndex);
    });

    // 지정 번호 설정하기
    for(let i = 0; i < stepElems.length; i++){
        io.observe(stepElems[i] );
        // stepElems[i].setAttribute('data-index',i);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    // 이미지 불투명도로 변화 시키는 함수
    function activate(action){
        currentItem.classList.add('visible');
        if(action) actions[action](true);
    }

    function inactivate(action){
        currentItem.classList.remove('visible');
        if(action) actions[action](false);
    }

    // 텍스트 기준으로 이미지 불투명도 조절 
    window.addEventListener('scroll',() =>{
        let step;
        let boundingRect;
        // let temp = 0;
        // for(let i = 0; i< stepElems.length; i++){
        for(let i =ioIndex-1;i < ioIndex+2;i++){
            step = stepElems[i];
            if(!step) continue;
            boundingRect = step.getBoundingClientRect();
            // console.log(boundingRect.top);

            // temp++;

            if(boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                // console.log(step.dataset.index);
  
                inactivate();
                // graphicElems[step.dataset.index].classList.add('visible');
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }

        // console.log(temp);
    });

    activate();

})();