import React,{ Component } from 'react';

class ReadContent extends Component{
  render(){
    return(
      <div>
       <h1>{this.props.title}</h1>
       <h1>{this.props.desc}</h1>
      </div>
    )
  }

}

  export default ReadContent;
  