import React, { useRef, useState, useEffect, useContext, createContext, useMemo, useCallback } from 'react';
import Modal from './Modal';
import Menu from './Menu';
import './App.css';
import * as common from "./common.js";
import axios from 'axios';


/* useContext */
const TestContext = createContext();
const theme = 'blue';

const Box = () => {
  const text = 'gg'
  return (
    <div>
      난 박스야 테마는 {theme}<br /><br /><br />
      <TestContext.Provider value={text}>
        <List theme={theme} />
      </TestContext.Provider>
    </div>
  )
}

const Button = () => {
  return (
    <div>
      <button>난 버튼</button>
    </div>
  )
}

const List = () => {
  return (
    <div>
      <ul>
        <li>
          <Button />
        </li>
      </ul>
    </div>
  )
}




const App = () => {
  const kkk = ['치킨','순대','족발'];

  const king = (e) => {
    console.log(e)
    if(e){
      console.log('난 파워야');
    }else{
      console.log('난 킹이야');
    }
    let result = ['후후'];

    return result;
  }

  const [wow, setWow ] = useState(false);
  const [sok, setSok] = useMemo(()=>king(wow),[]);
  //const [sok, setSok] = useState(king(wow));
  const [aha, setAha] = useState(sok);

  
  let counter = 0;
  setInterval(function(){
    counter = counter + 1;
    if(counter > 3){
     //setWow(true);
    }
    console.log(counter);
  },1000)




  


  const [popModal, setPopModal] = useState('')
  const [popMenu, setPopMenu] = useState('')
  const [good, setGood] = useState('')


  //팝업호출 함수
  const alertOpen = (content, effect) => {
    setPopModal(<Modal text={content} effect={effect} close={alertClose} />)
    common.ysw();
  }

  //팝업제거 함수
  const alertClose = () => {
    setPopModal('');
  }


  useEffect(() => {

  }, [])

  const axiosGo = () => {
    axios({
      method: 'get',
      url: './ysw.json',
      //params: { id: 1 }
    })
      .then(function (response) {
        console.log(response);
        setGood(response.data.ysw)
      })
      .catch(function (error) {
      });
  }


  const [string, setString] = useState('');
  const [stringList, setStringList] = useState([]);

  const change = useCallback((e) => {
    setString(e.target.value);
  }, []);

  const insert = useCallback(() => {
    const newList = stringList.slice();
    newList.push(string);
    setStringList(newList);
  }, [string, stringList]);

  const sum = useCallback((list) => {
    console.log('문자들을 합치는 중입니다...');
    let stringSum = '';
    for(let value of list) {
      stringSum += value + ' ';
    }
    return stringSum;
  }, []);

  const result = useMemo(() => sum(stringList), [stringList, sum]);

  //유즈 메모전!
  // const result = sum(stringList)



  return (
    <div className="App">

      <div>
      <input type='text' onChange={change}/>
      <button onClick={insert}>문자열 추가</button>
      {result}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Box />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h1>팝업리스트</h1>

      <div className="popupList">
        <ul>
          <li>
            <button onClick={() => alertOpen('난 FadeUp 팝업!', 'fadeUp')}>fadeUp 팝업</button>
          </li>
          <li>
            <button onClick={() => alertOpen('난 FadeRight 팝업!', 'fadeRight')}>fadeRight 팝업</button>
          </li>
          <li>
            <button onClick={() => alertOpen('난 Opaicty 팝업!', 'opaicty')}>Opaicty 팝업</button>
          </li>
        </ul>
      </div>

      <button className="axiosBtn" onClick={() => { axiosGo() }}>호출!</button>
      {good}

      {popModal}


      <Menu />

    </div>
  );
}





export default App;
