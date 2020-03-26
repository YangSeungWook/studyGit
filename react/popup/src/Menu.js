import React, { useState, useEffect,useCallback } from 'react';
import * as common from "./common.js";

const Menu = (props) => {
    const [ visible , setVisible ] = useState('');

    const showMenu = () => {
        setVisible('active');
        common.historyControl('Menu')
    }

    const hideMenu = () => {
        window.history.back();
    }

    window.onpopstate =  function(e) {
        if(window.location.href.split('/').pop().indexOf('Menu')===-1){ 
            setVisible(''); // 메뉴 닫기
        }
    }

    return (
        <>
            <button className="btnMenu" onClick={showMenu}>메뉴열기</button>

            <div className={`popMenu ${visible}`}>
                <div className="in">
                    <div className="content">
                        <div className="tit01">난 메뉴</div>
                        <br />
                        <a href="#;" onClick={hideMenu}>X</a>
                    </div>
                </div>
                <div className="bg" onClick={hideMenu}>메뉴닫기</div>
            </div>
        </>
    )
};


export default Menu;