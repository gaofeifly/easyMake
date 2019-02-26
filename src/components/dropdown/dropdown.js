import React from 'react'
import './dropdown.scss'

export default class MyDropdown extends React.Component{
  // 传入宽度可以为 10px 或 100% 形式 标题、dpStyle(0 or 1)
  constructor(props){
    super(props)
    this.state = {
      showFlag: false
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle(){
    var flag = !this.state.showFlag
    this.setState({
      showFlag: flag
    })
  }
  render(){
    var w = this.props.width || '100%'
    var dpStyle = this.props.dpStyle || 0
    return(
      <div className='my-dropdown-con' style={{
        width: w,
        height: this.state.showFlag ? 'auto' : '40px',
        borderRadius: dpStyle == 1 ? '' : '5px'
      }}>
        <div className='drop-item-title' onClick={this.toggle} style={{
          backgroundColor: dpStyle == 1 ? '' : '#ccc',
          color: dpStyle == 1 ? '#fff' : '#000'
        }}>
          {this.props.title || '默认标题'}
        </div>
        <img src={require(dpStyle == 1 ? '../../images/top-arrow-white.png' : '../../images/top-arrow.png')} className={this.state.showFlag ? 'img-show' : 'img-hide'}
          onClick={this.toggle} />
        <div className='slot'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
