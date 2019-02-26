import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MyDropDown from '../dropdown/dropdown'
import TwoColumn from '../two-column/two-column'
import MyButton from '../mybutton/mybutton'
import Slider from '../slider/slider'
import OnOffBtn from '../on-off-btn/on-off-btn'
import './echarts-pie-high.scss'
import {Row,Tab,ControlLabel,FormControl,Nav,NavItem} from 'react-bootstrap'

export default class EchartsHighSettings extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dataLabelShow: true,
      labelFontSize: 15,
      labelPosition: 'outside',
      // 富文本
      richFlag: false,
      richTarget: [{
        richTdNum: 2,
        richDataTrNum: 1,
        richTdTitles: [],
        richSeriesIndex: 0,
        richSeriesTdNum: 1,
        richSeriesValue: [[]]
      }], 
      // 扇形
      rotateDeg: 90,
      roseType: false,
      ring: false,
      areaScale: 1,
      textureFlag: false,
      texture: [{seriesIndex: 0,img: ''}]
    }
  }
  // 将数据提交给父组件
  submitData = () => {
    // 富文本检查
    if(this.state.richFlag){
      for(var m=0;m<this.state.richTarget.length;m++){
        var rich = this.state.richTarget[m]
        if(rich.richTdTitles.length < 2){
          alert('如果要设置富文本，则富文本每列的名称不能为空')
          return
        }
        if(rich.richSeriesValue.length == 0){
          alert('富文本中有图片或文本内容未填写')
          return 
        }
        if(rich.richSeriesValue[0].length < 2){
          alert('富文本中有图片或文本内容未填写')
          return 
        }
        for(var i=0;i<rich.richSeriesValue.length;i++){
          for(var j=0;j<rich.richSeriesValue[i].length;j++){
            if(rich.richSeriesValue[i][j] === undefined || rich.richSeriesValue[i][j] === ''){
              alert('富文本中有图片或文本内容未填写')
              return 
            }
          }
        }
      }
    }
    // 纹理设置检查
    if(this.state.textureFlag){
      var set = new Set()
      for(var i=0;i<this.state.texture.length;i++){
        if(this.state.texture[i].img == ''){
          alert('有纹理图片未上传')
          return
        }
        set.add(this.state.texture[i].seriesIndex)
      }
      if(set.size != this.state.texture.length){
        alert('纹理设置有重复')
        return
      }
    }
    var data = this.state
    var richs = []
    if(data.richFlag){
      richs = data.richTarget.map(item => {
        return this.generateARich(item)
      })
    }
    var submit = {
      // 标签
      dataLabelShow: data.dataLabelShow,
      labelFontSize: data.labelFontSize,
      labelPosition: data.labelPosition,
      // 富文本
      richFlag: data.richFlag,
      richs: richs,
      // 扇形
      sector: {
        rotateDeg: data.rotateDeg,
        roseType: data.roseType,
        ring: data.ring,
        areaScale: data.areaScale,
        textureFlag: data.textureFlag,
        texture: data.texture
      }
    }
    this.props.onSubmitData(submit)
  }
  generateARich = (data) => {
    var formatterStr = ''
    for(var i=0;i<data.richTdNum;i++){
      formatterStr += '{head|' + data.richTdTitles[i].name + '}'
    }
    var formatterArr = []
    for(var i=0;i<data.richSeriesValue.length;i++){
      var str = ''
      for(var j=0;j<data.richSeriesValue[i].length;j++){
        str += data.richTdTitles[j].isImg ? '{img' + i + j + '|}' : '{value|' + data.richSeriesValue[i][j] + '}'
      }
      formatterArr.push(str)
    }
    var richObj = {
      title: {
        color: '#eee',
        align: 'center'
      },
      abg: {
        backgroundColor: '#333',
        width: '100%',
        align: 'right',
        height: 25,
        borderRadius: [4, 4, 0, 0]
      },
      head: {
        color: '#333',
        height: 25,
        width: 50,
        align: 'center'
      },
      hr: {
        borderColor: '#777',
        width: '100%',
        borderWidth: 0.5,
        height: 0
      },
      value: {
        height: 50,
        width: 50,
        align: 'center'
      }
    }
    for(var i=0;i<data.richSeriesValue.length;i++){
      for(var j=0;j<data.richSeriesValue[i].length;j++){
        if(data.richSeriesValue[i][j].length > 50){
          richObj['img' + i + j] = {
            width: 50,
            height: 45,
            align: 'center',
            backgroundColor: {
              image: data.richSeriesValue[i][j]
            }
          }
        }
      }
    }
    return {
      labelFormatter: [
        '{title|{b}}{abg|}',
        formatterStr,
        '{hr|}'
      ].concat(formatterArr).join('\n'),
      richSeriesIndex: data.richSeriesIndex,
      richSeriesTdNum: data.richSeriesTdNum,
      richObj: richObj
    }
  }
  // 设置列数
  setRichTdNum = (e) => {
    var index = e.target.dataset.m
    var arr = this.state.richTarget
    arr[index].richTdNum = e.target.value
    arr[index].richTdTitles = arr[index].richTdTitles.slice(0,e.target.value)
    this.setState({
      richTarget: arr
    })
  }
  // 设置富文本每列的标题
  setRichTdName = (e) => {
    var m = e.target.dataset.m
    var index = e.target.dataset.index
    var arr = this.state.richTarget
    var rt = arr[m].richTdTitles
    if(rt[index] == undefined)
      rt[index] = {name: e.target.value,isImg: false}
    else
      rt[index].name = e.target.value
    this.setState({
      richTarget: arr
    })
  }
  // 设置富文本每列是否显示图片
  setRichTdImg = (e) => {
    var m = e.target.dataset.m
    var index = e.target.dataset.index
    var arr = this.state.richTarget
    var rt = arr[m].richTdTitles
    if(rt[index] == undefined)
      rt[index] = {name: '未命名',isImg: e.target.checked}
    else
      rt[index].isImg = e.target.checked
    this.setState({
      richTarget: arr
    })
  }
  // 设置第几个系列的第几项数据添加富文本
  setRichSeriesIndex = (e) => {
    var index = e.target.dataset.m
    var arr = this.state.richTarget
    arr[index].richSeriesIndex = e.target.value
    this.setState({
      richTarget: arr
    })
  }
  setRichSeriesTdNum = (e) => {
    var index = e.target.dataset.m
    var arr = this.state.richTarget
    arr[index].richSeriesTdNum = e.target.value
    this.setState({
      richTarget: arr
    })
  }
  // 设置富文本的图片数据
  setImgSrc = (e) => {
    var index = e.target.dataset.m
    var target = this.state.richTarget
    var arr = target[index].richSeriesValue
    var that = this
    var i = e.target.dataset.i
    var j = e.target.dataset.j
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = (e) => {
      if(arr[i] == undefined)
        arr[i] = []
      arr[i][j] = e.target.result
      that.setState({
        richTarget: target
      })
    }
  }
  // 设置富文本的文字数据
  setRichSeriesValue = (e) => {
    var index = e.target.dataset.m
    var target = this.state.richTarget
    var arr = target[index].richSeriesValue
    var i = e.target.dataset.i
    var j = e.target.dataset.j
    if(arr[i] == undefined)
      arr[i] = []
    arr[i][j] = e.target.value
    this.setState({
      richTarget: target
    })
  }
  // 添加富文本的一行
  addRichTr = (e) => {
    var index = e.target.dataset.m
    var arr = this.state.richTarget
    arr[index].richDataTrNum += 1
    this.setState({
      richTarget: arr
    })
  }
  // 删除富文本的一行
  removeRichTr = (e) => {
    var index = e.target.dataset.m
    var arr = this.state.richTarget
    arr[index].richDataTrNum -= 1
    arr[index].richSeriesValue.pop()
    this.setState({
      richTarget: arr
    })
  }
  // 添加一个富文本输入框
  addARich = () => {
    var arr = this.state.richTarget
    arr.push({
      richTdNum: 2,
      richDataTrNum: 1,
      richTdTitles: [],
      richSeriesIndex: 0,
      richSeriesTdNum: 1,
      richSeriesValue: []
    })
    this.setState({
      richTarget: arr
    })
  }
  // 删除最后一个富文本输入框
  removeLastRich = () => {
    var arr = this.state.richTarget
    if(arr.length < 2)
      return
    arr.pop()
    this.setState({
      richTarget: arr
    })
  }
  // 设置指定图表的纹理图片
  setTextureImgs = (e) => {
    var that = this
    var index = e.target.dataset.index
    var arr = this.state.texture
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = (e) => {
      arr[index].img = e.target.result
      that.setState({
        texture: arr
      })
    }
  }
  // 设置纹理对应的图表的index
  setTextureIndex = (e) => {
    var index = e.target.dataset.index
    var arr = this.state.texture
    arr[index].seriesIndex = e.target.value
    this.setState({
      texture: arr
    })
  }
  // 删除最后一个图表的纹理选项
  deleteTexture = () => {
    var arr = this.state.texture
    arr.pop()
    this.setState({
      texture: arr
    })
  }
  // 添加一个图表的纹理选项
  addTexture = () => {
    var arr = this.state.texture
    arr.push({seriesIndex: 0,img: ''})
    this.setState({
      texture: arr
    })
  }
  
  render(){
    var posArr = [{title: "扇区外部",value: 'outside'},{title: "扇区内部",value: 'inside'},{title: "圆环中心",value: 'center'}]
    var richTds = []
    var richTrs = []
    for(var m=0;m<this.state.richTarget.length;m++){
      richTds[m] = []
      richTrs[m] = []
      var target = this.state.richTarget[m]
      for(var i=0;i<target.richTdNum;i++){
        richTds[m].push(
          <div key={i} className='rich-td'>
            <FormControl style={{width: '50%'}} type='text' placeholder={'列'+(i+1)+'名称'} data-m={m} data-index={i} onInput={this.setRichTdName} />
            <label><input type='checkbox' data-m={m} data-index={i} onChange={this.setRichTdImg} />此列显示图片</label>
          </div>
        )
      }
      for(var i=0;i<target.richDataTrNum;i++){
        richTrs[m].push(
          <div key={i} className='rich-tr'>
            {target.richTdTitles.map((item,j) => {
              return <div className='container' key={j}>
                {item.isImg && <div>
                  <div><label>{item.name}</label></div>
                  <input type='file' accept=".jpg,.png" onChange={this.setImgSrc} data-m={m} data-i={i} data-j={j} />
                  <img src={target.richSeriesValue[i] ? target.richSeriesValue[i][j] : ''}/></div>}
                {!item.isImg && <div className='label-input-div'>
                  <label>{item.name}</label>
                  <FormControl style={{width: '60%'}} data-m={m} data-i={i} data-j={j} type='text' onChange={this.setRichSeriesValue} /></div>}
              </div>
            })}
          </div>
        )
      }
    }
    return(
      <Tab.Container id='pie-high-setting-con' defaultActiveKey='first'>
      <Row style={{margin: '10px 0 0 10px'}}>
        <Nav bsStyle='pills'>
          <NavItem eventKey='first'>标签</NavItem>
          <NavItem eventKey='second'>扇形</NavItem>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey='first'>
            <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
              <label>显示标签</label>
            } right={
              <OnOffBtn isOn={true} color='#66f' sendData={(flag) => {this.setState({dataLabelShow: flag})}} />
            } />

            {this.state.dataLabelShow && <div>
              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>位置</label>
              } right={
                <FormControl componentClass="select" defaultValue='1' onChange={(e) => this.setState({labelPosition: e.target.value})} 
                  style={{width: '80%'}}>
                  {posArr.map((item,index) => { return <option key={index} value={item.value}>{item.title}</option>}) }
                </FormControl>
              } />

              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>字体大小</label>
              } right={
                <Slider labelColor={this.props.esStyle == 1 ? '#ccc' : '#000'} stripColor='#ccc' blockColor='orange' min={0} max={30} initValue={12} 
                  sendData={(data) => {this.setState({labelFontSize: data})}} />
              } />

              <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
                <label>使用富文本</label>
              } right={
                <OnOffBtn isOn={false} color='#66f' sendData={(flag) => {this.setState({richFlag: flag})}} />
              } />
            </div>}
            
            {this.state.richFlag && <div>
              {this.state.richTarget.map((item,index) => {
                return <div key={index} style={{marginBottom: '10px'}}>
                  <MyDropDown dpStyle={1} width='96%' title={'富文本' + (index+1)}>
                    <ControlLabel>富文本列数</ControlLabel>
                    <FormControl componentClass="select" defaultValue='1' data-m={index} 
                      onChange={this.setRichTdNum} style={{width: '80%'}}>
                      {[2,3,4].map((item,index) => {return <option key={index} value={item}>{item}</option>}) }
                    </FormControl>
      
                    {richTds[index]}
      
                    <ControlLabel>富文本数据</ControlLabel>
                    <div className='rich-tr-con'>
      
                      {richTrs[index]}
      
                      <div className='add-remove-data'>
                        {item.richDataTrNum > 1 && <div className='remove-data-btn' data-m={index} onClick={this.removeRichTr}>-</div>}
                        {item.richDataTrNum < 5 && <div className='add-data-btn' data-m={index} onClick={this.addRichTr}>+</div>}
                      </div>
                    </div>
      
                    <ControlLabel>
                      将这个富文本应用到
                      <select className='rich-series-select' data-m={index} onChange={this.setRichSeriesIndex}>
                        {this.props.seriesName.map((item,index) => {
                          return <option key={index} value={index}>{item}</option>
                        })}
                      </select>系列，第
                      <select className='rich-series-select' data-m={index} onChange={this.setRichSeriesTdNum} >
                        {global.createArrayFromOneToNum(this.props.tdNum).map((item) => {
                          return <option key={item} value={item}>{item}</option>
                        })}
                      </select>个数据项上
                    </ControlLabel>
                  </MyDropDown>
                </div>
              })}
            
            <div className='add-remove-btn-con'>
              <div onClick={this.addARich}><MyButton content='添加一条' /></div>
              {this.state.richTarget.length > 1 &&
                <div onClick={this.removeLastRich}><MyButton content='删除一条' backColor='#ff6666' /></div>}
            </div>
            
            </div>}
          </Tab.Pane>
          <Tab.Pane eventKey='second'>
            <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
              <label>旋转角度</label>
            } right={
              <FormControl type='number' min={0} max={360} onChange={(e) => {this.setState({rotateDeg: e.target.value})}} />
            } />

            <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
              <label>展示成南丁格尔图</label>
            } right={
              <OnOffBtn isOn={false} sendData={(flag) => {this.setState({roseType: flag})}} />
            } />

            <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
              <label>展示成圆环图</label>
            } right={
              <OnOffBtn isOn={false} sendData={(flag) => {this.setState({ring: flag})}} />
            } />

            <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
              <label>大小缩放</label>
            } right={
              <Slider stripColor='#ccc' blockColor='#66f' min={0.5} max={2} initValue={1} accuracy={1}
                sendData={(data) => {this.setState({areaScale: data})}} />
            } />

            <TwoColumn leftFlex={2} rightFlex={3} width='96%' left={
              <label>添加纹理</label>
            } right={
              <OnOffBtn isOn={false} sendData={(flag) => {this.setState({textureFlag: flag})}} />
            } />

            {this.state.textureFlag && <div className='texture-con'>
              {global.createArrayFromOneToNum(this.state.texture.length).map((item) => {
                return <div key={item} className='texture-tr'>
                  <div className='container'>
                    <label>给
                      <select onChange={this.setTextureIndex} data-index={item-1}>
                        {this.props.seriesName.map((item,index) => {
                          return <option key={index} value={index}>{item}</option>
                        })}
                      </select>
                    图表设置纹理</label>
                    <input type='file' accept='.jpg,.png' data-index={item-1} onChange={this.setTextureImgs} />
                    <img src={this.state.texture[item-1].img} />
                  </div>
                </div>
              })}
              <div className='add-remove-data'>
                {this.state.texture.length > 1 && <div className='remove-data-btn' onClick={this.deleteTexture}>-</div>}
                {this.state.texture.length < this.props.seriesName.length && 
                  <div className='add-data-btn' onClick={this.addTexture}>+</div>}
              </div>
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