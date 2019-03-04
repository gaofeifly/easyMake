import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {FormControl} from 'react-bootstrap'
import ColorSelector from '../color-selector/color-selector'
import TwoColumn from '../two-column/two-column'
import MyButton from '../mybutton/mybutton'
import './setting.scss'

export default class ImgSetting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fontSize: 20,
      fontColor: '#000',
      fontStyle: 'normal',
      textContent: '文字ABC'
    }
  }
  setText = () => {
    this.props.onSubmitData(this.state)
  }
  render(){
    return(
      <div id='text-setting-con'>
        <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
          <label>文本内容</label>
        } right={
          <FormControl placeholder='文字ABC' type='text' 
            onChange={(e) => {this.setState({textContent: e.target.value})}} />
        } />
        <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
          <label>文字大小</label>
        } right={
          <FormControl placeholder={20} type='number' min={5} max={50} default={20}
            onChange={(e) => {this.setState({fontSize: e.target.value})}} />
        } />
        <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
          <label>文字颜色</label>
        } right={
          <ColorSelector redNum={0} greenNum={0} blueNum={0} opacityNum={1} 
            sendData={color => {this.setState({fontColor: color})}} />
        } />
        <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
          <label>文字样式</label>
        } right={
          <FormControl componentClass="select" defaultValue='1' 
            onChange={e => this.setState({fontStyle: e.target.value})}>
            {['normal','italic','oblique'].map((item) => { return <option key={item} value={item}>{item}</option>}) }
          </FormControl>
        } />
        <div style={{overflow: 'hidden',marginTop: '10px'}}>
          <div style={{float: 'right'}} onClick={this.setText}><MyButton content='确定' type={1} /></div>
        </div>
      </div>
    )
  }
}