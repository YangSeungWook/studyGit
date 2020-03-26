import React, { Component, createRef } from 'react';
import logo from './logo.svg';
import homerun from './homerun.png';
import styles from './yagoo.scss';


function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}



class App extends Component {

  state = {
    value: '',
    answer: getNumbers(),
    tries: [],
    resultShow : '',
    resultOut : '',
    out : ''
  };

  onChangeInput = (e) =>{
    this.setState({
      value:e.target.value
    })
  }

  reStart = (e) =>{
    this.setState({
      value:'',
      answer:getNumbers(),
      tries:[],
      resultShow : '',
      resultOut : '',
      out : ''
    })
    this.inputRef.current.focus();
  }

  onSubmitForm = (e) => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if(value === answer.join('')){
      this.setState((prevState) => {
        return {
          tries : [...prevState.tries, {try:value,result:'홈런!'}],
          resultShow : 'active'
        }
      });

      
    }else{
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(tries.length >= 9){

        this.setState((prevState) => {
          return {
            tries : [...prevState.tries, {try:value,result:`${strike}스트라이크, ${ball}볼입니다.`}],
            value:'',
            out:`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`,
            resultOut:'active',
          }
        });


      }else{
        console.log(tries.length)
        for(let i =0; i<4; i+=1){
          if(answerArray[i] === answer[i]){
            strike += 1;
          }else if (answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries : [...prevState.tries, {try:value,result:`${strike}스트라이크, ${ball}볼입니다.`}],
            value:'',
          }
        });
        this.inputRef.current.focus();
      }
    }
  }

  inputRef = createRef();

  render() {

    const { result, value, tries , resultShow , resultOut, out } = this.state;

    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /> <h1>숫자 야구 게임!</h1>
        </header>

        <section className="formSection">
          <form onSubmit={this.onSubmitForm}>
            <input 
              type="text"
              ref={this.inputRef}
              maxLength={4}
              value={value}
              onChange={this.onChangeInput}
              placeholder=""
            />
            <button>배팅</button>
          </form>
          
          <div className="count">시도횟수 : {tries.length}</div>

          <ul className="list">
            {tries.map((v, i) => (
              <li key={i}>
                <div>입력한 숫자 : {v.try}</div>
                <div>결과 : {v.result}</div>
              </li>
              // <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
            ))}
          </ul>

          <p className={`${resultOut} out`}>{out}<br /><span className="re" onClick={this.reStart}>재시작하기</span> </p>

          <div className={`${resultShow} resultBox`}>
            <div><img src={homerun} alt="homerun"/></div>
            <p>{result}</p>
            <p><span className="re" onClick={this.reStart}>재시작하기</span></p>
          </div>

        </section>

      </div >
    );
  }
}

export default App;
