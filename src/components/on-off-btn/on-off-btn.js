import React from 'react'
import './on-off-btn.scss'

export default class OnOffBtn extends React.Component{
  // 传入颜色、宽度、开关状态
  constructor(props){
    super(props)
    this.state = {
      btnFlag: this.props.isOn ? this.props.isOn : false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.props.sendData(!this.state.btnFlag)
    this.setState({
      btnFlag: !this.state.btnFlag
    })
  }
  render(){
    var p = this.props
    var w = p.width ? p.width : 60
    var h = p.width ? (p.width / 2) : 30
    return(
      <div className='on-off-btn-con' onClick={this.handleClick}>
        <div className='out-div' 
          style={{
            backgroundColor: this.state.btnFlag ? (p.color ? p.color : '#66f') : '#ddd',
            width: w + 'px',
            height: h + 'px',
            borderRadius: p.width ? (p.width / 4) + 'px' : '20px',
          }}></div>
        <div className='in-div' 
          style={{
            left: this.state.btnFlag ? (h + 5) + 'px' : '5px',
            top: '5px',
            width: (h - 10) + 'px',
            height: (h - 10) + 'px'
          }}></div>
      </div>
    )
  }
}