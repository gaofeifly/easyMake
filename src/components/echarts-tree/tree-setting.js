import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import ThemeRect from '../theme-rect/theme-rect'
import {FormControl,ControlLabel} from 'react-bootstrap'
import './tree-setting.scss'
import ColorSelector from '../color-selector/color-selector'
import OnOffBtn from '../on-off-btn/on-off-btn'
import Slider from '../slider/slider'
import MyDropdown from '../dropdown/dropdown'
import TwoColumn from '../two-column/two-column'
import { store } from '../../store/store'
import MyButton from '../mybutton/mybutton'

export default class EchartsSetting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      subTitle: '',
      titleLink: '',
      titleX: 0,
      titleY: 0,
      titleColor: '#fff',
      themeIndex: 0,
      backColor: 'rgba(240,240,240,1)',
      backColorFlag: false,
      layout: 'orthogonal',    // 布局 正交或径向
      orient: 'LR',
      symbolSize: 7,
      symbol: 'circle',
      lineColor: '#ccc',
      textColor: '#000'
    }
    this.colors = [{
      color1: '#c23531',
      color2: '#2f4554',
      opacity: 1
    },{
      color1: '#6699ff',
      color2: '#ffff66',
      opacity: 1
    },{
      color1: '#c23531',
      color2: '#2f4554',
      opacity: 0.6
    }]
  }
  handleSubmitData = () => {
    this.props.onSubmitData(this.state)
  }
  handleSaveData(){
    if(store.getState().name.username != null){
      // 已登录
      this.props.onSaveData()
    }else{
      // 未登录先提示用户登录
      alert('请先登录')
    }
  }
  render(){
    var saveHide = this.props.saveHide === undefined ? false : this.props.saveHide 
    var s = this.state
    var symbols = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow']
    var orients = [{name: '从左到右',value: 'LR'},{name: '从右到左',value: 'RL'},{name: '从上到下',value: 'TB'},{name: '从下到上',value: 'BT'}]
    return(
      <div id='tree-setting-con' style={{color: this.props.fontColor || '#000'}}>
        <div style={{marginBottom: '10px'}}>
        <MyDropdown dpStyle={this.props.esStyle || 0} title='标题' width='96%'>
          <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
            <label>标题名称</label>
          } right={
            <FormControl type='text' onChange={(e) => this.setState({title: e.target.value})} />
          } />
          <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
            <label>子标题名称</label>
          } right={
            <FormControl type='text' onChange={(e) => this.setState({subTitle: e.target.value})} />
          } />
          <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
            <label>子标题链接</label>
          } right={
            <FormControl type='text' onChange={(e) => this.setState({titleLink: e.target.value})} />
          } />
          <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
            <label>位置x%</label>
          } right={
            <FormControl placeholder={0} type='number' min={0} max={100} 
              onChange={(e) => {this.setState({titleX: e.target.value})}} />
          } />
          <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
            <label>位置y%</label>
          } right={
            <FormControl placeholder={0} type='number' min={0} max={100} 
              onChange={(e) => {this.setState({titleY: e.target.value})}} />
          } />
          <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
            <label>颜色</label>
          } right={
            <ColorSelector redNum={255} greenNum={255} blueNum={255} opacityNum={1} 
              sendData={(color) => {this.setState({titleColor: color})}} />
          } />
        </MyDropdown>
        </div>

        <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
          <label>图形大小</label>
        } right={
          <Slider labelColor={this.props.esStyle == 1 ? '#ccc' : '#000'} stripColor='#ccc' blockColor='orange'
            min={4} max={15} initValue={7} sendData={(data) => {this.setState({symbolSize: data})}} />
        } />

        <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
          <label>图形类型</label>
        } right={
          <FormControl componentClass="select" defaultValue='1' 
            onChange={(e) => this.setState({symbol: e.target.value})} style={{width: '80%'}}>
            {symbols.map((item,index) => { return <option key={index} value={item}>{item}</option>}) }
          </FormControl>
        } />

        <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
          <label>布局</label>
        } right={
          <FormControl componentClass="select" defaultValue='1' 
            onChange={(e) => this.setState({layout: e.target.value})} style={{width: '80%'}}>
            {['orthogonal','radial'].map((item,index) => { return <option key={index} value={item}>{item}</option>}) }
          </FormControl>
        } />

        {s.layout == 'orthogonal' && <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
          <label>方向</label>
        } right={
          <FormControl componentClass="select" defaultValue='1' 
            onChange={(e) => this.setState({orient: e.target.value})} style={{width: '80%'}}>
            {orients.map((item,index) => { return <option key={index} value={item.value}>{item.name}</option>}) }
          </FormControl>
        } />}

        <TwoColumn width='100%' leftFlex={2} rightFlex={3} left={
          <label>线条颜色</label>
        } right={
          <ColorSelector redNum={240} greenNum={240} blueNum={240} opacityNum={1} 
            sendData={(color) => {this.setState({lineColor: color})}} />
        } />

        <TwoColumn width='100%' leftFlex={2} rightFlex={3} left={
          <label>文字颜色</label>
        } right={
          <ColorSelector redNum={0} greenNum={0} blueNum={0} opacityNum={1} 
            sendData={(color) => {this.setState({textColor: color})}} />
        } />

        <TwoColumn width='100%' leftFlex={2} rightFlex={3} left={
          <ControlLabel>主题</ControlLabel>
        } right={
          this.colors.map((item,index) => {
            return(
              <div className={s.themeIndex == index ? 'theme-choose' : 'theme-item'} key={index}
                onClick={(e) => {this.setState({themeIndex: index})}}>
                <ThemeRect color1={item.color1} color2={item.color2} opacity={item.opacity} />
              </div>
            )
          })
        } />
        
        <TwoColumn width='100%' leftFlex={2} rightFlex={3} left={
          <label>自定义背景颜色</label>
        } right={
          <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({backColorFlag: flag})}} />
        } />
        {s.backColorFlag && <div style={{marginBottom: '10px'}}>
          <ColorSelector redNum={240} greenNum={240} blueNum={240} opacityNum={1} 
            sendData={(color) => {this.setState({backColor: color})}} /></div>}
        
        <div id='btn-con'>
          <div id='ok-btn' onClick={this.handleSubmitData.bind(this)}>
            <MyButton content='确定' />
          </div>
          {!saveHide && <div id='save-btn' onClick={this.handleSaveData.bind(this)}>
            <MyButton content='保存' />
          </div> }
        </div>
      </div>
    )
  }
}