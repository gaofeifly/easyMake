import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import ThemeRect from '../theme-rect/theme-rect'
import {FormControl,ControlLabel,Radio,Button} from 'react-bootstrap'
import './echarts-setting.scss'
import ColorSelector from '../color-selector/color-selector'
import OnOffBtn from '../on-off-btn/on-off-btn'
import MyDropdown from '../dropdown/dropdown'
import TwoColumn from '../two-column/two-column'
import { store } from '../../store/store'
import MyButton from '../mybutton/mybutton'

export default class EchartsSetting extends React.Component {
  // 传入参数 onSubmitData(必传) onSaveData saveHide(默认false) 文字颜色(默认#000) esStyle(0 or 1)
  constructor(props){
    super(props)
    this.state = {
      title: '',
      subTitle: '',
      titleLink: '',
      titleX: 0,
      titleY: 0,
      titleColor: '#fff', 
      legendFlag: false,
      legendX: 0,
      legendY: 0,
      legendDir: 0, // 0表示横向 1表示纵向
      seriesName: ['系列1'],
      xName: '',
      yName: '',
      tdNum: 5,
      themeIndex: 0,
      backColorFlag: false,  // 是否自定义图表颜色
      backColor: 'rgba(240,240,240,1)'
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
    this.handleSubmitData = this.handleSubmitData.bind(this)
    this.handleSeriesChange = this.handleSeriesChange.bind(this)
    this.handleSaveData = this.handleSaveData.bind(this)
  }
  // 向父组件传递配置
  handleSubmitData(){
    this.props.onSubmitData(this.state)
  }
  // 处理选定序列个数
  handleSeriesChange(e){
    var seriesName = this.state.seriesName
    seriesName[e.target.dataset.index] = e.target.value || ''
    this.setState({
      seriesName: seriesName
    })
  }
  // 将制作的图表保存
  handleSaveData(){
    if(store.getState().name.username != null){
      // 已登录
      this.props.onSaveData()
    }else{
      // 未登录先提示用户登录
      alert('请先登录')
    }
  }
  setSeries = (e) => {
    var num = Number(e.target.value)
    var l = this.state.seriesName.length
    var seriesName = this.state.seriesName
    if(num > l){
      for(var i=0;i<num - l;i++){
        seriesName.push('')
      }
    }else{
      for(var i=0;i<l - num;i++){
        seriesName.pop()
      }
    }
    this.setState({
      seriesName: seriesName
    })
  }
  render(){
    var seriesLeft = []
    var seriesRight = []
    var saveHide = this.props.saveHide === undefined ? false : this.props.saveHide 
    for(var i=0;i<this.state.seriesName.length;i++){
      seriesLeft.push(
        <div key={i}>
          <label>系列{i+1}名称</label>
        </div>
      )
      seriesRight.push(
        <div key={i}>
          <FormControl type='text' data-index={i} onChange={this.handleSeriesChange} className='text'/>
        </div>
      )
    }
    return(
      <div id='echarts-setting-con' style={{color: this.props.fontColor || '#000'}}>
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
        <div style={{marginBottom: '10px'}}>
        <MyDropdown dpStyle={this.props.esStyle || 0} title='图例' width='96%'>
          <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
            <label>显示</label>
          } right={
            <Button id='legend-btn' bsStyle={this.state.legendFlag ? 'success' : 'warning'} 
              onClick={(e) => this.setState({legendFlag: !this.state.legendFlag})}>
              {this.state.legendFlag ? '开' : '关'}
            </Button>
          } />
          <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
            <label>位置x%</label>
          } right={
            <FormControl placeholder={0} type='number' min={0} max={100} 
              onChange={(e) => {this.setState({legendX: e.target.value})}} />
          } />
          <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
            <label>位置y%</label>
          } right={
            <FormControl placeholder={0} type='number' min={0} max={100} 
              onChange={(e) => {this.setState({legendY: e.target.value})}} />
          } />
          <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
            <label>方向</label>
          } right={
            <div><label><input type='radio' name='legend-direction' value={0} 
              onChange={(e) => this.setState({legendDir: e.target.value})} />横向</label>
            <label><input type='radio' name='legend-direction' value={1} 
              onChange={(e) => this.setState({legendDir: e.target.value})} />纵向</label></div>
          } />
        </MyDropdown>
        </div>
        <div className='column-con'>
          <div className='left-column'>
            {['x轴名称','y轴名称','数据项数','系列个数'].map((item,index) => {
              return <div key={index}>
                <label>{item}</label>
              </div>
            })}

            {seriesLeft}
            
          </div>
          <div className='right-column'>
            <div>
              <FormControl type='text' onChange={(e) => this.setState({xName: e.target.value})} className='text'/>
            </div>
            <div>
              <FormControl type='text' onChange={(e) => this.setState({yName: e.target.value})} className='text'/>
            </div>
            <div>
              <FormControl type='number' onChange={(e) => this.setState({tdNum: e.target.value})} className='text'/>
            </div>
            <div>
              <FormControl componentClass="select" defaultValue='1' 
                onChange={this.setSeries}>
                {[1,2,3,4,5].map((item) => { return <option key={item} value={item}>{item}</option>}) }
              </FormControl>
            </div>

            {seriesRight}

          </div>
        </div>
          
        <TwoColumn width='100%' leftFlex={2} rightFlex={3} left={
          <ControlLabel>主题</ControlLabel>
        } right={
          this.colors.map((item,index) => {
            return(
              <div className={this.state.themeIndex == index ? 'theme-choose' : 'theme-item'} key={index}
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
        {this.state.backColorFlag && <div style={{marginBottom: '10px'}}>
          <ColorSelector redNum={240} greenNum={240} blueNum={240} opacityNum={1} 
            sendData={(color) => {this.setState({backColor: color})}} /></div>}
        
        <div id='btn-con'>
          <div id='ok-btn' onClick={this.handleSubmitData}>
            <MyButton content='确定' />
          </div>
          {!saveHide && <div id='save-btn' onClick={this.handleSaveData}>
            <MyButton content='保存' />
          </div>}
        </div>
      </div>
    )
  }
}