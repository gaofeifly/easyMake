import React from 'react'
import './echarts-bar-high.scss'
import Slider from '../slider/slider'
import ColorSelector from '../color-selector/color-selector'
import OnOffBtn from '../on-off-btn/on-off-btn'
import MyButton from '../mybutton/mybutton'
import {Row,Tab,FormGroup,FormControl,Nav,NavItem} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import TwoColumn from '../two-column/two-column'

export default class EchartsHighSetting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dataLabelShow: false,
      labelPosition: 'inside',
      labelDistance: 0,
      labelColor: 'rgba(0,0,0,1)',
      labelBackColor: '',
      labelRotate: 0,
      labelFontSize: 15,
      labelColorFlag: true,   // 标签颜色是否默认
      barColor: [],
      barColorFlag: true,   // 柱条颜色是否默认
      transverseFlag: false,  // 是否横向分布
      splitLineFlag: true,   // 是否显示分隔线
      yAxisFlag: true,     // 是否显示y轴
      stackFlag: false,   // 是否多个系列数值堆叠
      xAxisTickFlag: true,   // 是否显示x轴坐标刻度线
      lineSeriesFlag: false
    }
    this.submitData = this.submitData.bind(this)
  }
  submitData(){
    var data = this.state
    var labelSetting = {
      normal: {
        show: data.dataLabelShow,
        position: data.labelPosition,
        distance: data.labelDistance,
        color: data.labelColorFlag ? '' : data.labelColor,
        backgroundColor: data.labelColorFlag ? '' : data.labelBackColor,
        rotate: data.labelRotate,
        padding: 3,
        borderRadius: 2,
        fontSize: data.labelFontSize
      }
    }
    var submit = {
      labelSetting: labelSetting,
      barSetting: {barColor: data.barColorFlag ? [] : data.barColor},
      transverseFlag: data.transverseFlag,
      splitLineFlag: data.splitLineFlag,
      yAxisFlag: data.yAxisFlag,
      stackFlag: data.stackFlag,
      xAxisTickFlag: data.xAxisTickFlag,
      lineSeriesFlag: data.lineSeriesFlag
    }
    this.props.onSubmitData(submit)
  }
  render(){
    var posArr = ['inside','top','left','right','bottom','insideLeft','insideTop','insideRight','insideBottom']
    return(
      <Tab.Container id='bar-high-setting-con' defaultActiveKey='first'>
      <Row style={{margin: '10px 0 0 10px'}}>
        <Nav bsStyle='pills'>
          <NavItem eventKey='first'>标签</NavItem>
          <NavItem eventKey='second'>柱条</NavItem>
          <NavItem eventKey='third'>其他</NavItem>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey='first'>
            <div>
            <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
              <label>显示标签</label>
            } right={
              <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({dataLabelShow: flag})}} />
            } />
            {this.state.dataLabelShow && <div>
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>位置</label>
              } right={
                <FormControl componentClass="select" defaultValue='1' 
                  onChange={(e) => this.setState({labelPosition: e.target.value})} style={{width: '80%'}}>
                  {posArr.map((item) => { return <option key={item} value={item}>{item}</option>}) }
                </FormControl>
              } />
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>旋转角度</label>
              } right={
                <FormControl type='number' style={{width: '80%'}} default={0} 
                  onChange={(e) => {this.setState({labelRotate: e.target.value})}}></FormControl>
              } />
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>标签与图形元素的距离</label>
              } right={
                <Slider labelColor={this.props.esStyle == 1 ? '#ccc' : '#000'} stripColor='#ccc' blockColor='orange' min={-15} max={15} 
                  sendData={(data) => {this.setState({labelDistance: data})}} />
              } />
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>字体大小</label>
              } right={
                <Slider labelColor={this.props.esStyle == 1 ? '#ccc' : '#000'} stripColor='#ccc' blockColor='orange' min={0} max={30} 
                  sendData={(data) => {this.setState({labelFontSize: data})}} />
              } />
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>颜色默认</label>
              } right={
                <OnOffBtn isOn={true} color='#66f' sendData={(data) => {this.setState({labelColorFlag: data})}} />
              } />
            </div>}
            {!this.state.labelColorFlag && <div>
              <label>字体颜色</label>
              <ColorSelector redNum={240} greenNum={120} blueNum={120} opacityNum={1} sendData={(color) => {this.setState({labelColor: color})}}/>

              <label>背景颜色</label>
              <ColorSelector redNum={120} greenNum={120} blueNum={240} opacityNum={1} sendData={(color) => {this.setState({labelBackColor: color})}}/>
            </div>} 
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='second'>
            <div>
              <label>颜色默认</label>
              <OnOffBtn isOn={true} color='#66f' sendData={(flag) => {this.setState({barColorFlag: flag})}} />

              {!this.state.barColorFlag && this.props.seriesName.map((item,index) => {
                return <FormGroup key={index}>
                  <label>{item}</label>
                  <ColorSelector redNum={Math.round(Math.random()*255)} greenNum={Math.round(Math.random()*255)} 
                    blueNum={Math.round(Math.random()*255)} opacityNum={1} sendData={(color) => {
                      var barColor = this.state.barColor
                      barColor[index] = color
                      this.setState({barColor: barColor})
                  }}/>
                </FormGroup>
              })}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='third'>
            <div style={{width: '90%'}}>
              <div className='other-setting-item'>
                <label>横向分布</label>
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({transverseFlag: flag})}} />
              </div>
              <div className='other-setting-item'>
                <label>显示分隔线</label>
                <OnOffBtn isOn={true} color='#66f' sendData={(flag) => {this.setState({splitLineFlag: flag})}} />
              </div>
              <div className='other-setting-item'>
                <label>显示y轴</label>
                <OnOffBtn isOn={true} color='#66f' sendData={(flag) => {this.setState({yAxisFlag: flag})}} />
              </div>
              <div className='other-setting-item'>
                <label>多个系列数值堆叠</label>
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({stackFlag: flag})}} />
              </div>
              <div className='other-setting-item'>
                <label>显示x轴刻度线</label>
                <OnOffBtn isOn={true} color='#66f' sendData={(flag) => {this.setState({xAxisTickFlag: flag})}} />
              </div>
              <div className='other-setting-item'>
                <label>折线图辅助</label>
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({lineSeriesFlag: flag})}} />
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
        <div id='ok-btn' onClick={this.submitData}>
          <MyButton content='确定' />
        </div> 
      </Row>
      </Tab.Container>
    )
  }
}