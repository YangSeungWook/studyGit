import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control'



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:"welcome",
      ysw:"변하나요?",
      selected_content_id:2,
      subject : {title:'WEB',sub:'World wide Web!'},
      welcome:{title:"welcome",desc:"Hello,React!!"},
      contents : [
        {id:1, title:'HTML', desc:'HTML is Hyper1'},
        {id:2, title:'CSS', desc:'HTML is Hyper2'},
        {id:3, title:'Javascript', desc:'HTML is Hyper3'},
      ]
    }    
    this.max_content_id = this.state.contents.length;

  }
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }

  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode == 'create'){
      _article = <CreateContent onSubmit={function(_title,_desc){
        this.max_content_id = this.max_content_id + 1;

        //푸쉬는 오리지널 데이터를 바꾸게 되므로 concat으로 새로운 변수에 리턴 받아서 사용하자
        //원본을 변경해버리면 리엑트에서 감지가 되지 않아 shouldComponentUpdate(newProps,newState)에서 체크를 할수가 없다!
        // this.state.contents.push(   
        //   {id:this.max_content_id,title:_title,desc:_desc}
        // )

        //Concatrate 를 이용한 배열 조합
        var _contents = this.state.contents.concat(   //concat으로 배열의 값을 추가하자 ( 추후에 성능 및 사용시 훨씬더 용이함 )
          {id:this.max_content_id,title:_title,desc:_desc}
        )
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        })

        //객체를 변경하고 싶다면???
        var a = {name:'egoing'};
        var b = Object.assign({left:1,right:2},a);
        //console.log(a,b,a===b);

        //배열에서만 사용 가능한 Array.from으로 복제후 푸쉬 ( Array.from으로 복제할경우 원본과 복제된 안에 내용이 같아도 비교를 하면 다른값이 되어서
        //shouldeComponentUpdate()에서 다른걸로 체크가 가능함!
        // var newContnets = Array.from(this.state.contents);
        // newContnets.push(   
        //   {id:this.max_content_id,title:_title,desc:_desc}
        // )
        // this.setState({
        //   contents:newContnets
        // })

      }.bind(this)}></CreateContent>
    } else if(this.state.mode == 'update'){

      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        
        function(_id,_title,_desc){

          var _contents = Array.from(this.state.contents); // 배열복제 ( 원본 불변하고 성능 개선됨 )

          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id == _id){
              _contents[i] = {id:_id,title:_title,desc:_desc}
              break;
            }
            i = i + 1;
          }

          this.setState({
            contents:_contents,
            mode:'read'
          })


      }.bind(this)}></UpdateContent>
    }
    return _article;
  }


  render() {


    return (
       <div className = "App" >
          {this.state.ysw}<br />
          <Subject
            title={this.state.subject.title}
            sub={this.state.subject.sub}
            onChangePage={function(){
              this.setState({
                mode : 'welcome'
              })
            }.bind(this)}
            >
           </Subject>

          <TOC
           onChangePage={function(id,title){
             console.log(title);
              this.setState({
              ysw:title, // 자식에게 인자를 전달 받아 app의 state 변경함
              mode:'read',
              selected_content_id : Number(id)
            })
           }.bind(this)}
           data={this.state.contents}>
           </TOC>
           <Control onChangeMode={function(_mode){
              if(_mode === 'delete'){
                if(window.confirm('really?')){
                  var _contents = Array.from(this.state.contents);
                  var i = 0;
                  while(i < _contents.length){
                    if(_contents[i].id === this.state.selected_content_id){
                      _contents.splice(i,1);
                      break;
                    }
                    i = i + 1;
                  }
                  this.setState({
                    mode:'welcome',
                    contents:_contents
                  })
                }
              }else{
                this.setState({
                  mode:_mode
                })
              }
              
           }.bind(this)}></Control>
           {this.getContent()}


      </div>
    )
  }
}

export default App;