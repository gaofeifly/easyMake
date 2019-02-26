import React from 'react'
import './color-selector.scss'

export default class ColorSelector extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      display: false,
      colorChooseWidth: 40,
      colorChooseHeight: 40,
      conWidth: 52,
      conHeight: 52,
      redNum: this.props.redNum,
      greenNum: this.props.greenNum,
      blueNum: this.props.blueNum,
      opacityNum: this.props.opacityNum,
      tagLeft: [this.props.redNum / 255 * 197,this.props.greenNum / 255 * 197,
        this.props.blueNum / 255 * 197,this.props.opacityNum * 197], // 条带长度是197
    }
    this.colorChooseClick = this.colorChooseClick.bind(this)
    this.stripClick = this.stripClick.bind(this)
  }
  // 选定的颜色块点击事件
  colorChooseClick(){
    var display = this.state.display
    var color = 'rgba(' + this.state.redNum + ',' + this.state.greenNum + ',' + this.state.blueNum + ',' + this.state.opacityNum + ')'
    if(display){
      this.props.sendData(color)
    }
    this.setState({
      display: !display,
      colorChooseWidth: !display ? 80 : 40,
      colorChooseHeight: !display ? 80 : 40,
      conWidth: !display ? 300 : 52,
      conHeight: !display ? 115 : 52
    })
  }
  // 颜色条带点击事件
  stripClick(e){
    e.preventDefault()
    if(e.target.className == 'color-tag')
      return
    var value = Math.round(e.nativeEvent.offsetX / e.target.clientWidth * 255)
    var tagLeft = this.state.tagLeft
    tagLeft[Number(e.target.dataset.index)] = Math.round(e.nativeEvent.offsetX)
    switch(Number(e.target.dataset.index)){
      case 0:
        this.setState({redNum: value,tagLeft: tagLeft})
        break
      case 1:
        this.setState({greenNum: value,tagLeft: tagLeft})
        break
      case 2:
        this.setState({blueNum: value,tagLeft: tagLeft})
        break
      case 3:
        this.setState({opacityNum: (e.nativeEvent.offsetX / e.target.clientWidth).toFixed(2),tagLeft: tagLeft})
        break
    }
  }
  render(){
    var color = 'rgba(' + this.state.redNum + ',' + this.state.greenNum + ',' + this.state.blueNum + ',' + this.state.opacityNum + ')'
    var colors = [{
      color1: 'rgba(' + this.state.redNum + ',' + this.state.greenNum + ',' + 0 + ',' + this.state.opacityNum + ')',
      color2: 'rgba(' + 0 + ',' + this.state.greenNum + ',' + this.state.blueNum + ',' + this.state.opacityNum + ')'
    },{
      color1: 'rgba(' + 0 + ',' + this.state.greenNum + ',' + this.state.blueNum + ',' + this.state.opacityNum + ')',
      color2: 'rgba(' + this.state.redNum + ',' + 0 + ',' + this.state.blueNum + ',' + this.state.opacityNum + ')'
    },{
      color1: 'rgba(' + this.state.redNum + ',' + 0 + ',' + this.state.blueNum + ',' + this.state.opacityNum + ')',
      color2: 'rgba(' + this.state.redNum + ',' + this.state.greenNum + ',' + 0 + ',' + this.state.opacityNum + ')'
    }]
    return(
      <div className='color-selector-con' style={{width: this.state.conWidth + 'px',height: this.state.conHeight + 'px'}}>
        <div className='color-sec-con'>
          {/* 左侧选定的颜色 */}
          <div className='color-choose' onClick={this.colorChooseClick} 
            style={{backgroundColor: color,width: this.state.colorChooseWidth + 'px',height: this.state.colorChooseHeight + 'px'}}></div>
          {/* 右侧四条颜色带 */}
          <div className='color-strips' style={{opacity: this.state.display ? 1 : 0}}>
            {colors.map((item,index) => {
              return <div key={index} style={{background: 'linear-gradient(left,'+ color + ',' + item +')',
                background: '-webkit-linear-gradient(left,'+ item.color1 + ',' + item.color2 +')'}} data-index={index} onClick={this.stripClick}>
                  <div className='color-tag' style={{left: this.state.tagLeft[index]}}></div>
                </div>
            })}
            <div className='opacity-back'>
              <div className='opacity-div' style={{background: 'linear-gradient(left,rgba(255,255,255,0),' + color + ')',
                background: '-webkit-linear-gradient(left,rgba(255,255,255,0),' + color + ')'}}
                data-index={3} onClick={this.stripClick}>
                <div className='color-tag' style={{left: this.state.tagLeft[3]}}></div>  
              </div>
            </div>
          </div>
        </div>
        {/* 下方标签 */}
        {this.state.display && <div className='color-label'>{color}</div>}
      </div>
    )
  }
}