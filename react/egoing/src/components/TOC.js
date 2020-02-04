import React,{ Component } from 'react';

class TOC extends Component{
    render(){
      
      var lists = [];
      var data = this.props.data;
      var i = 0;
      var title = 'ysw';
      while(i < data.length){
        lists.push(
          <li key={data[i].id}>
            <a
              href={"/content/"+data[i].id}
              data-id={data[i].id}
              onClick={function(id,e){
                e.preventDefault();
                //this.props.onChangePage(e.target.dataset.id); //데이타 속성 data-id를 이용한 방법
                this.props.onChangePage(id,title); // 아래 bind부분에서 두번째 인자를 이용해서 받는 방법
              }.bind(this,data[i].id)}
            >
              {data[i].title}
            </a>
          </li>
        )
        i = i + 1;
      }
      return (
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
  }

  export default TOC;
  