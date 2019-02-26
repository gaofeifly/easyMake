import React from 'react'

export default class ScalableContainer extends React.Component {
  // 在body设置margin为0的情况下使用
  // 传入一个独一为二的conid(必传)、当前是否为选中的状态、容器宽高
  constructor(props){
    super(props)
  }
  componentDidMount(){
    var props = this.props
    var div = this.refs.con
    div.style.width = (props.initWidth || 100) + 'px'
    div.style.height = (props.initHeight || 100) + 'px'
    div.style.top = (props.initTop || 0) + 'px'
    div.style.left = (props.initLeft || 0) + 'px'
  }
  render(){
    var props = this.props
    return(
      <div ref='con' id={props.conid} style={{
        boxSizing: 'border-box',
        padding: '10px',
        position: 'absolute',
        border: props.isTarget ? '1px solid red' : '1px solid transparent',
        display: props.isDisplay !== undefined ? 'none' : 'block'
      }}>
        {props.children}
      </div>
    )
  }
}