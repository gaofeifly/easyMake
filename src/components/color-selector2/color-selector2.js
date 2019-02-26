import React from 'react'
import './color-selector2.scss'

export default class ColorSelector2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      color: '#ccffcc'
    }
  }
  sendData = (e) => {
    this.props.sendData(e.target.value)
  }
  render(){
    return(
      <div className='color-selector2-con'>
        <div style={{backgroundColor: this.state.color}}></div>
        <input type='text' placeholder='输入颜色' onChange={(e) => this.setState({color: e.target.value})} 
          onBlur={this.sendData} />
      </div>
    )
  }
}