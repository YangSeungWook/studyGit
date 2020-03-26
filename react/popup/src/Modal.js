import React, { useState, useEffect,useCallback } from 'react';

const Modal = (props) => {
    const { text, effect, close} = props;
    const [ end , setEnd ] = useState('');

    //모션종료
    useEffect(()=>{
        setEnd('end')
        console.log('팝업모션 종료')
    },[]) // 인자로 빈배열을 넘겨주면 재 랜더링 되지 않음

    return (
        <>
            <div className={`popArea ${effect} ${end}`}>
                <div className="in">
                    <div className="content">
                        <div className="tit01">전달 받은 텍스트</div>
                        <div className="tit02">{text}</div>
                        <br />
                        <a href="#;" onClick={close}>X</a>
                    </div>
                </div>
                <div className="bg" onClick={close}></div>
            </div>
        </>
    )
};


export default Modal;