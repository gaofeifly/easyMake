import React from 'react'
import './echarts-scatter-high.scss'
import MyButton from '../mybutton/mybutton'
import TwoColumn from '../two-column/two-column'
import Slider from '../slider/slider'
import OnOffBtn from '../on-off-btn/on-off-btn'
import ColorSelector from '../color-selector/color-selector'
import {Row,Tab,FormControl,Nav,NavItem} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

export default class EchartsHighSettings extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dataLabelShow: true,
      labelFontSize: 15,
      itemColor: [],
      itemColorFlag: false,
      symbolSize: 1,
      symbol: 'circle',
      symbolImgFlag: false,
      symbolImg: [],
      visualMapFlag: false,
      visualMaX: 0,
      visualMin: 1,
      visualColor1: '',
      visualColor2: '',
      visualTitle: '',
      regressionFlag: false,
      splitLineFlag: true,
      minMaxFlag: false,
      markLineFlag: false,
      markLineType: 'solid',
      markLineNumFlag: false,
      markLineNum: [],
      markAreaFlag: false,
      markAreaNum: {x1: null,x2: null,y1: null,y2: null},
      markAreaColor: '',
      regressionType: 'linear'
    }
    this.submitData = this.submitData.bind(this)
  }
  submitData(){
    this.props.onSubmitData(this.state)
  }
  setItemColor = (index,color) => {
    var arr = this.state.itemColor
    arr[index] = color
    this.setState({
      itemColor: arr
    })
  }
  setSymbolImg = (index,img) => {
    var arr = this.state.symbolImg
    var that = this
    var reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onloadend = (e) => {
      arr[index] = e.target.result
      that.setState({
        symbolImg: arr
      })
    }
  }
  setMarkLineNum = (index,type,value) => {
    var arr = this.state.markLineNum
    if(arr[index] === undefined)
      arr[index] = {x: null,y:null}
    if(type == 0){
      arr[index].x = value 
    }else{
      arr[index].y = value
    }
  }
  setMarkAreaNum = (type,value) => {
    var obj = this.state.markAreaNum
    switch(Number(type)){
      case 0:
        obj.x1 = value
        break
      case 1:
        obj.x2 = value
        break
      case 2:
        obj.y1 = value
        break
      case 3:
        obj.y2 = value
        break
    }
    this.setState({
      markAreaNum: obj
    })
  }
  render(){
    var s = this.state
    var symbols = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow']
    var regressionArr = [{name: '线性',value: 'linear'},{name: '对数',value: 'logarithmic'},
                        {name: '指数',value: 'exponential'},{name: '多项式',value: 'polynomial'}]
    return(
      <Tab.Container id='scatter-high-setting-con' defaultActiveKey='first'>
        <Row style={{margin: '10px 0 0 10px'}}>
          <Nav bsStyle='pills'>
            <NavItem eventKey='first'>图形</NavItem>
            <NavItem eventKey='second'>其他</NavItem>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey='first'>
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>大小</label>
              } right={
                <Slider labelColor={this.props.esStyle == 1 ? '#ccc' : '#000'} stripColor='#ccc' blockColor='orange'
                  min={0.1} max={5} initValue={1} accuracy={1} sendData={(data) => {this.setState({symbolSize: data})}} />
              } />

              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>类型</label>
              } right={
                <FormControl componentClass="select" defaultValue='1' 
                  onChange={(e) => this.setState({symbol: e.target.value})} style={{width: '80%'}}>
                  {symbols.map((item,index) => { return <option key={index} value={item}>{item}</option>}) }
                </FormControl>
              } />

              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>自定义图片</label>
              } right={
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({symbolImgFlag: flag})}} />
              } />

              {s.symbolImgFlag && this.props.seriesName.map((item,index) => {
                return <div key={index} className='upload-img-con'>
                  <label>{item}</label>
                  <input type='file' accept=".jpg,.png" onChange={(e) => this.setSymbolImg(index,e.target.files[0])} />
                  <img src={s.symbolImg[index]} />
                </div>
              })}

              {!s.symbolImgFlag && <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>自定义颜色</label>
              } right={
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({itemColorFlag: flag})}} />
              } />}

              {s.itemColorFlag && this.props.seriesName.map((item,index) => {
                return <div key={index}>
                  <label>{item}</label><br/>
                  <ColorSelector redNum={Math.round(Math.random()*255)} greenNum={Math.round(Math.random()*255)} 
                    blueNum={Math.round(Math.random()*255)} opacityNum={1}
                    sendData={color => this.setItemColor(index,color)} />
                </div>
              })}

              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>使用visualMap</label>
              } right={
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({visualMapFlag: flag})}} />
              } />

              {s.visualMapFlag && <div>
                <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                  <label>标题</label>
                } right={
                  <FormControl componentClass="input" type='text'
                    onChange={(e) => this.setState({visualTitle: e.target.value})} style={{width: '80%'}}>
                  </FormControl>
                } />

                <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                  <label>最小值</label>
                } right={
                  <FormControl componentClass="input" defaultValue='0' type='number'
                    onChange={(e) => this.setState({visualMin: e.target.value})} style={{width: '80%'}}>
                  </FormControl>
                } />

                <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                  <label>最大值</label>
                } right={
                  <FormControl componentClass="input" defaultValue='100' type='number'
                    onChange={(e) => this.setState({visualMax: e.target.value})} style={{width: '80%'}}>
                  </FormControl>
                } />

                <label>颜色1</label>
                <ColorSelector redNum={Math.round(Math.random()*255)} greenNum={Math.round(Math.random()*255)} 
                  blueNum={Math.round(Math.random()*255)} opacityNum={1}
                  sendData={color => this.setState({visualColor1: color})} />

                <label>颜色2</label>
                <ColorSelector redNum={Math.round(Math.random()*255)} greenNum={Math.round(Math.random()*255)} 
                  blueNum={Math.round(Math.random()*255)} opacityNum={1}
                  sendData={color => this.setState({visualColor2: color})} />

              </div>}
            </Tab.Pane>
            <Tab.Pane eventKey='second'>
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>使用回归</label>
              } right={
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({regressionFlag: flag})}} />
              } />

              {s.regressionFlag && <div>
                <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                  <label>回归方式</label>
                } right={
                  <FormControl componentClass="select" defaultValue='1' 
                    onChange={(e) => this.setState({regressionType: e.target.value})} style={{width: '80%'}}>
                    {regressionArr.map((item,index) => { return <option key={index} value={item.value}>{item.name}</option>}) }
                  </FormControl>
                } />
              </div>}

              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>显示网格线</label>
              } right={
                <OnOffBtn isOn={true} color='#66f' sendData={(flag) => {this.setState({splitLineFlag: flag})}} />
              } />

              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>显示最值</label>
              } right={
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({minMaxFlag: flag})}} />
              } />

              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>设置标记线</label>
              } right={
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({markLineFlag: flag})}} />
              } />

              {s.markLineFlag && <div>
                <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                  <label>线的类型</label>
                } right={
                  <FormControl componentClass="select" defaultValue='1' 
                    onChange={(e) => this.setState({markLineType: e.target.value})} style={{width: '80%'}}>
                    {['solid','dashed','dotted'].map((item,index) => { return <option key={index} value={item}>{item}</option>}) }
                  </FormControl>
                } />

                <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                  <label>自定义数值(默认平均值)</label>
                } right={
                  <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({markLineNumFlag: flag})}} />
                } />

                {s.markLineNumFlag && this.props.seriesName.map((item,index) => {
                  return <div key={index}>
                    <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                      <label>{item + 'x轴'}</label>
                    } right={
                      <FormControl componentClass="input" type='number'
                        onChange={(e) => this.setMarkLineNum(index,0,e.target.value)} style={{width: '80%'}}>
                      </FormControl>
                    } />

                    <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                      <label>{item + 'y轴'}</label>
                    } right={
                      <FormControl componentClass="input" type='number'  
                        onChange={(e) => this.setMarkLineNum(index,1,e.target.value)} style={{width: '80%'}}>
                      </FormControl>
                    } />
                  </div>
                })}
              </div>}

              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>设置标记区域</label>
              } right={
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({markAreaFlag: flag})}} />
              } />

              {s.markAreaFlag && ['x1','x2','y1','y2'].map((item,index) => {
                return <div key={index}>
                  <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                    <label>{item}</label>
                  } right={
                    <FormControl componentClass="input" type='number'  
                      onChange={(e) => this.setMarkAreaNum(index,e.target.value)} style={{width: '80%'}}>
                    </FormControl>
                  } />
                </div>
              })}

              {s.markAreaFlag && <div>
                <label>颜色</label>
                <ColorSelector redNum={Math.round(Math.random()*255)} greenNum={Math.round(Math.random()*255)} 
                blueNum={Math.round(Math.random()*255)} opacityNum={1}
                sendData={color => this.setState({markAreaColor: color})} />
              </div>}
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