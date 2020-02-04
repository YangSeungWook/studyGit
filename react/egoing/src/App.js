import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
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
  }
  render() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      var i = 0;
      while(i<this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i+1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode == 'create'){
      _article = <CreateContent title={_title} desc={_desc}></CreateContent>
    }


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
              this.setState({
                mode:_mode
              })
           }.bind(this)}></Control>
           {_article}
      </div>
    )
  }
}

export default App;