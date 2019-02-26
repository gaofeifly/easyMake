import React from 'react'
import './echarts-line-high.scss'
import {Row,Tab,FormGroup,ControlLabel,FormControl,Nav,NavItem} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Slider from '../slider/slider'
import ColorSelector from '../color-selector/color-selector'
import OnOffBtn from '../on-off-btn/on-off-btn'
import MyButton from '../mybutton/mybutton'
import TwoColumn from '../two-column/two-column'

export default class EchartsHighSetting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dataLabelShow: false,
      labelPosition: 'top',
      labelDistance: 0,
      labelColor: 'rgba(0,0,0,1)',
      labelBackColor: '',
      labelRotate: 0,
      labelFontSize: 15,
      labelColorFlag: true,   // 标签颜色是否默认
      lineColor: [],
      lineColorFlag: true,   // 线条颜色是否默认
      splitLineFlag: true,   // 显示分隔线
      stackFlag: false,   // 多个系列数值堆叠
      xAxisTickFlag: true,   // x轴坐标刻度线
      lineAreaFlag: false,  //  覆盖区域
      lineSmoothFlag: false,  // 线条平滑
      mostLeastFlag: false,   // 最值
      symbol: 'emptyCircle',    // 标记图形
      symbolSize: 10,
      lineType: 'solid',    // 线条类型
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
      lineColor: data.lineColorFlag ? [] : data.lineColor,
      splitLineFlag: data.splitLineFlag,
      xAxisTickFlag: data.xAxisTickFlag,
      stackFlag: data.stackFlag, 
      lineAreaFlag: data.lineAreaFlag,  
      lineSmoothFlag: data.lineSmoothFlag,  
      mostLeastFlag: data.mostLeastFlag,  
      symbol: data.symbol,
      symbolSize: data.symbolSize,
      lineType: data.lineType
    }
    this.props.onSubmitData(submit)
  }
  render(){
    var posArr = ['top','inside','left','right','bottom','insideLeft','insideTop','insideRight','insideBottom']
    var symbols = ['emptyCircle','circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none']
    var lineTypes = ['solid','dashed','dotted']
    return(
      <Tab.Container id='line-high-setting-con' defaultActiveKey='first'>
      <Row style={{margin: '10px 0 0 10px'}}>
        <Nav bsStyle='pills'>
          <NavItem eventKey='first'>标签</NavItem>
          <NavItem eventKey='second'>线条</NavItem>
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
                  <FormControl componentClass="select" defaultValue='1' style={{width: '80%'}}
                    onChange={(e) => this.setState({labelPosition: e.target.value})}>
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
                    sendData={(data) => {this.setState({labelDistance: data})}}></Slider>
                } />
                <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                  <label>字体大小</label>
                } right={
                  <Slider labelColor={this.props.esStyle == 1 ? '#ccc' : '#000'} stripColor='#ccc' blockColor='orange' min={0} max={30} 
                  sendData={(data) => {this.setState({labelFontSize: data})}}></Slider>
                } />
                <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                  <label>颜色默认</label>
                } right={
                  <OnOffBtn isOn={true} color='#66f' sendData={(data) => {this.setState({labelColorFlag: data})}} />
                } />
                {!this.state.labelColorFlag && <div>
                  <label>字体颜色</label>
                  <ColorSelector redNum={240} greenNum={120} blueNum={120} opacityNum={1} sendData={(color) => {this.setState({labelColor: color})}}/>

                  <label>背景颜色</label>
                  <ColorSelector redNum={120} greenNum={120} blueNum={240} opacityNum={1} sendData={(color) => {this.setState({labelBackColor: color})}}/>
                </div>}
              </div>}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='second'>
            <div>
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>线条平滑</label>
              } right={
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({lineSmoothFlag: flag})}} />
              } />
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>标记图形类型</label>
              } right={
                <FormControl componentClass="select" defaultValue='1' 
                onChange={(e) => this.setState({symbol: e.target.value})} style={{width: '80%'}}>
                  {symbols.map((item) => { return <option key={item} value={item}>{item}</option>}) }
                </FormControl>
              } />
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>标记图形大小</label>
              } right={
                <Slider labelColor={this.props.esStyle == 1 ? '#ccc' : '#000'} stripColor='#ccc' blockColor='orange' min={0} max={20} 
                sendData={(data) => {this.setState({symbolSize: data})}}></Slider>
              } />
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>线条类型</label>
              } right={
                <FormControl componentClass="select" defaultValue='1' onChange={(e) => this.setState({lineType: e.target.value})} style={{width: '80%'}}>
                  {lineTypes.map((item) => { return <option key={item} value={item}>{item}</option>}) }
                </FormControl>
              } />
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>颜色默认</label>
              } right={
                <OnOffBtn isOn={true} color='#66f' sendData={(flag) => {this.setState({lineColorFlag: flag})}} />
              } />

              {!this.state.lineColorFlag && this.props.seriesName.map((item,index) => {
                return <FormGroup key={index}>
                  <label>{item}</label>
                  <ColorSelector redNum={Math.round(Math.random()*255)} greenNum={Math.round(Math.random()*255)} 
                    blueNum={Math.round(Math.random()*255)} opacityNum={1} sendData={(color) => {
                      var lineColor = this.state.lineColor
                      lineColor[index] = color
                      this.setState({lineColor: lineColor})
                  }}/>
                </FormGroup>
              })}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='third'>
            <div style={{width: '80%'}}>
              <div className='other-setting-item'>
                <label>显示覆盖区域</label>
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({lineAreaFlag: flag})}} />
              </div>
              <div className='other-setting-item'>
                <label>显示分隔线</label>
                <OnOffBtn isOn={true} color='#66f' sendData={(flag) => {this.setState({splitLineFlag: flag})}} />
              </div>
              <div className='other-setting-item'>
                <label>显示最值</label>
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({mostLeastFlag: flag})}} />
              </div>
              <div className='other-setting-item'>
                <label>多个系列数值堆叠</label>
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({stackFlag: flag})}} />
              </div>
              <div className='other-setting-item'>
                <label>显示x轴刻度线</label>
                <OnOffBtn isOn={true} color='#66f' sendData={(flag) => {this.setState({xAxisTickFlag: flag})}} />
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

