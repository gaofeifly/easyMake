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
      width: 180,
      height: 180,
      borderRadius: 0,
      borderWidth: 0,
      borderColor: '#000',
      borderStyle: 'solid',
      src: null
    }
  }
  setImgSrc = e => {
    var that = this
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = e => {
      that.setState({
        src: e.target.result
      })
    }
  }
  setImg = () => {
    this.props.onSubmitData(this.state)
  }
  render(){
    return(
      <div id='img-setting-con'>
        <div id='upload-img-con'>
          <input type='file' accept=".jpg,.png" onChange={this.setImgSrc} />
          <img src={this.state.src} />
        </div>
        <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
          <label>图片宽度</label>
        } right={
          <FormControl placeholder={180} type='number' min={10} max={600} default={180}
            onChange={(e) => {this.setState({width: e.target.value})}} />
        } />
        <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
          <label>图片高度</label>
        } right={
          <FormControl placeholder={180} type='number' min={10} max={600} default={180}
            onChange={(e) => {this.setState({height: e.target.value})}} />
        } />
        <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
          <label>圆角%</label>
        } right={
          <FormControl placeholder={0} type='number' min={0} max={100} 
            onChange={(e) => {this.setState({borderRadius: e.target.value})}} />
        } />
        <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
          <label>边框宽度</label>
        } right={
          <FormControl placeholder={0} type='number' min={0} max={20} 
            onChange={(e) => {this.setState({borderWidth: e.target.value})}} />
        } />
        <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
          <label>边框颜色</label>
        } right={
          <ColorSelector redNum={0} greenNum={0} blueNum={0} opacityNum={1} 
            sendData={(color) => {this.setState({borderColor: color})}} />
        } />
        <TwoColumn leftFlex={2} rightFlex={3} width='100%' left={
          <label>边框宽度</label>
        } right={
          <FormControl componentClass="select" defaultValue='1' 
            onChange={e => this.setState({borderStyle: e.target.value})}>
            {['solid','dashed','dotted'].map((item) => { return <option key={item} value={item}>{item}</option>}) }
          </FormControl>
        } />
        <div style={{overflow: 'hidden',marginTop: '10px'}}>
          <div style={{float: 'right'}} onClick={this.setImg}><MyButton content='确定' type={1} /></div>
        </div>
      </div>
    )
  }
}