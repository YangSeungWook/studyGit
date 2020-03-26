export function ysw(){
    console.log('공통함수');    
}

export function historyControl(pageName){
    window.history.pushState({}, pageName, '/'+pageName);
}