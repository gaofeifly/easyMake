import React from 'react'
import './work-panel.scss'
import ColorSelector2 from '../color-selector2/color-selector2'
import MyDropdown from '../dropdown/dropdown'
import MyButton from '../mybutton/mybutton'
import 'bootstrap/dist/css/bootstrap.css' 
import ScalableContainer from '../scalable-container/scalable-container'
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import EchartsSetting from '../echarts-setting/echarts-setting'
import DataInputTable from '../data-input-table/data-input-table'
import DataInputTablePie from '../echarts-pie/pie-data'
import EchartsHighSettingBar from '../echarts-bar/echarts-bar-high'
import EchartsHighSettingLine from '../echarts-line/echarts-line-high'
import EchartsHighSettingPie from '../echarts-pie/echarts-pie-high'
import {generateOptionBar,generateOptionLine,generateOptionPie} from '../generate-option/generate-option'
import html2canvas from 'html2canvas'
import '../../global.js'

export default class WorkPanel extends React.Component {
  constructor(props){
    super(props)

    this.flag2 = false
    this.flag1 = false
    this.flag1Right = false
    this.flag1Left = false
    this.flag1Top = false
    this.flag1Bottom = false
    this.flag1LeftTop = false
    this.flag1LeftBottom = false
    this.flag1RightTop = false
    this.flag1RightBottom = false

    this.startX = 0
    this.startY = 0
    this.lastWidth = 0
    this.lastHeight = 0
    this.lastTop = 0
    this.lastLeft = 0
    this.minWidth = 30
    this.minHeight = 30
    this.distance = 4
    this.edge = ''
    this.con = null
    this.div = null

    this.getPosition = this.getPosition.bind(this)
    this.mousedown = this.mousedown.bind(this)
    this.mousemove = this.mousemove.bind(this)
    this.mouseup = this.mouseup.bind(this)
    this.setCursor = this.setCursor.bind(this)
    this.setLeft = this.setLeft.bind(this)
    this.setRight = this.setRight.bind(this)
    this.setTop = this.setTop.bind(this)
    this.setBottom = this.setBottom.bind(this)
    this.addListener = this.addListener.bind(this)
    this.removeListener = this.removeListener.bind(this)

    this.state = {
      picWidth: 600,
      picHeight: 400,
      picBorderDis: false,
      leftIndex: 0,
      currentConIndex: null,
      conArray : [],
      echartsSetting: [],
      echartsData: [],
      echartsHighSetting: [],
      deleteIndexs: [],  // 记录不需要显示的容器下标
      toolFlag: false,
      backColorFlag: false,
      backColor: '#EEE9BF',  // 护眼 #EEE9BF
      fullFlag: false,
      helpFlag: false,
      username : null,
      saveOK: false,
      saveFlag: false,
      saveTitle: ''
    }
    this.leftTags = [{name: '柱形',num: 0},{name: '折线',num: 0},{name: '饼状',num: 0}]
    this.options = []
    this.lastArray = []
    this.deleteFlag = false   // 当执行删除图层操作时willUpdate函数中不必记录last各项值
    this.indexForConid = 0
    this.isLogin = false
  }
  // 设置图片宽度
  setPicWidth = (e) => {
    var v = Number(e.target.value)
    if(v < 20)
      v = 20
    else if(v > 1200)
      v = 1200
    this.setState({
      picWidth: v
    })
  }
  // 设置图片高度
  setPicHeight = (e) => {
    var v = Number(e.target.value)
    if(v < 20)
      v = 20
    else if(v > 800)
      v = 800
    this.setState({
      picHeight: v
    })
  }
  // 添加一个图表
  addAChart = () => {
    var arr = this.state.conArray
    arr.push({
      conid: 'sc' + (this.indexForConid + 1),
      leftIndex: this.state.leftIndex,
      name: this.leftTags[this.state.leftIndex].name + '图' + ++this.leftTags[this.state.leftIndex].num,
      type: 'echarts',
      initWidth: 400,
      initHeight: 300
    })
    this.indexForConid++
    this.lastArray.push({
      lastTop: 0,
      lastLeft : 0,
      lastWidth: 400,
      lastHeight: 300
    })
    var high = {}
    switch(this.state.leftIndex){
      case 0:
        high = {
          labelSetting: {},
          barSetting: {
            barColor: [],  
          },
          transverseFlag: false,
          splitLineFlag: true,
          yAxisFlag: true,
          stackFlag: false,
          xAxisTickFlag: true,
        }
        break
      case 1: 
        high = {
          labelSetting: {},
          lineColor: [],    // 如果采用默认则数组为空
          splitLineFlag: true,
          xAxisTickFlag: true,
          stackFlag: false,  
          lineAreaFlag: false,  
          lineSmoothFlag: false, 
          mostLeastFlag: false,  
          symbol: 'emptyCircle',
          symbolSize: 10,
          lineType: 'solid'
        }
        break
      case 2:
        high = {
          dataLabelShow: true,
          labelFontSize: 12,
          labelPosition: 'outside',
          richFlag: false,
          richs: [],
          sector: {
            rotateDeg: 90,
            roseType: false,
            ring: false,
            areaScale: 1,
            textureFlag: false,
            texture: [{seriesIndex: 0,img: ''}]
          },
          legendSetting: {
            legendX: 0,
            legendY: 0,
            legendDir: 0
          },
        }
        break
    }
    this.setState(prevState => ({
      conArray: arr,
      currentConIndex: arr.length - 1,
      echartsSetting: prevState.echartsSetting.concat({seriesName: ['系列1'],tdNum: 5,backColor: 'rgba(240,240,240,1)'}),
      echartsData: prevState.echartsData.concat({xData: [],yData: []}),
      echartsHighSetting: prevState.echartsHighSetting.concat(high)
    }))
    var option = {}
    switch(Number(this.state.leftIndex)){
      case 0:
        option = {
          xAxis: {
            type: 'category',
            data: ['a', 'b', 'c', 'd', 'e']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [1, 3, 4, 2, 5],
              type: 'bar'
          }]
        }
        break
      case 1:
        option = {
          xAxis: {
            type: 'category',
            data: ['a', 'b', 'c', 'd', 'e']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [1, 3, 4, 2, 5],
            type: 'line'
          }]
        }
        break
      case 2:
        option = {
          series: [{
            data: [{name: 'a',value: 1},{name: 'b',value: 3},{name: 'c',value: 4},
              {name: 'd',value: 2},{name: 'e',value: 5}],
            type: 'pie'
          }]
        }
        break
    }
    this.options.push({
      option: option,
      backColorFlag: false,
      backColor: '',
      themeIndex: 0
    })
  }
  // 设置配置选项
  setEchartsSetting = (echartsSetting) => {
    var arr = this.state.echartsSetting
    var index = this.state.currentConIndex
    arr[index] = echartsSetting
    this.setState({
      echartsSetting: arr
    })
    var s = this.state
    var option = {}
    switch(s.leftIndex){
      case 0:
        option = generateOptionBar(echartsSetting,s.echartsData[index],s.echartsHighSetting[index])
        break
      case 1:
        option = generateOptionLine(echartsSetting,s.echartsData[index],s.echartsHighSetting[index])
        break
      case 2:
        option = generateOptionPie(echartsSetting,s.echartsData[index],s.echartsHighSetting[index])
        break
    }
    if(s.currentConIndex !== null){
      this.options[s.currentConIndex] = option
    }
  }
  // 设置数据选项
  setEchartsData = (echartsData) => {
    var arr = this.state.echartsData
    var index = this.state.currentConIndex
    arr[index] = echartsData
    this.setState({
      echartsData: arr
    })
    var s = this.state
    var option = {}
    switch(s.leftIndex){
      case 0:
        option = generateOptionBar(s.echartsSetting[index],echartsData,s.echartsHighSetting[index])
        break
      case 1:
        option = generateOptionLine(s.echartsSetting[index],echartsData,s.echartsHighSetting[index])
        break
      case 2:
        option = generateOptionPie(s.echartsSetting[index],echartsData,s.echartsHighSetting[index])
        break
    }
    if(s.currentConIndex !== null){
      this.options[s.currentConIndex] = option
    }
  }
  // 设置高级选项
  setEchartsHighSetting = (echartsHighSetting) => {
    var arr = this.state.echartsHighSetting
    var index = this.state.currentConIndex
    arr[index] = echartsHighSetting
    this.setState({
      echartsHighSetting: arr
    })
    var s = this.state
    var option = {}
    switch(s.leftIndex){
      case 0:
        option = generateOptionBar(s.echartsSetting[index],s.echartsData[index],echartsHighSetting)
        break
      case 1:
        option = generateOptionLine(s.echartsSetting[index],s.echartsData[index],echartsHighSetting)
        break
      case 2:
        option = generateOptionPie(s.echartsSetting[index],s.echartsData[index],echartsHighSetting)
        break
    }
    if(s.currentConIndex !== null){
      this.options[s.currentConIndex] = option
    }
  }
  // 删除当前选中的容器
  deleteSC = () => {
    var index = this.state.currentConIndex
    var arr = this.state.deleteIndexs
    if(index !== null){
      // this.options.splice(index,1)
      // this.lastArray.splice(index,1)
      this.deleteFlag = true
      arr.push(index)
      this.setState({
        currentConIndex: null,
        deleteIndexs: arr
      })
      // 这个地方有一个灾难性的bug，无法解决。当将conArray非最后一个元素给删掉时，
      // 也即删掉了一个div，那么后面的div会顺势向前移动，导致被删除掉的div的样式作用于它后方紧相邻的那个div
      // 我实在是搞不清楚到底为什么会是这样，明明是id不同的div，样式却可以从一个div标签内跳到另一个里面，真tm见鬼，
      // 不知道这是react里dom底层什么原因导致的，应该不是自己逻辑的问题，最终只能采取‘删而不减’的策略，记录下被删除的元素的下标，
      // 渲染时设置它display为none，这样子可以不显示。有史以来最无奈的一次，日！！！
    }else{
      alert('请先选择一个图层')
    }
  }
  // 点击左侧的标签
  leftTagClick = (index) => {
    this.setState({
      leftIndex: index,
      currentConIndex: null
    })
  }
  // 通过类型获取到dom元素
  getItemByType = (type,options) => {
    var themes = ['default','light','dark']
    switch(type){
      case 'echarts':
        return <ReactEchartsCore echarts={echarts} option={options.option} style={{height: '100%', width: '100%'}}
          theme={options.backColorFlag ? 'backColor' + options.backColor : themes[options.themeIndex]} />
        break
    }
  }
  // 设置当前的容器下标
  setCurrentConIndex = (index,leftIndex) => {
    if(index === this.state.currentConIndex){
      this.setState({
        currentConIndex: null
      })
    }else{
      this.setState({
        currentConIndex: index,
        leftIndex: leftIndex
      })
    }
  }
  // 下载图片
  downloadPic = () => {
    html2canvas(document.getElementById('pic-con'),{
      scale: 2,
      dpi: 192,
      logging: false
    }).then(canvas => {
      canvas.getContext('2d').scale(0.5,0.5)
      downLoad(canvas.toDataURL("image/png"))
    })
    function downLoad(url){
      var oA = document.createElement("a")
      oA.download = '可视化图表'
      oA.href = url
      document.body.appendChild(oA)
      oA.click()
      oA.remove()
    }
  }
  // 设置背景颜色
  setBackColor = (color) => {
    this.setState({
      backColor: color,
      backColorFlag: false
    })
  }
  // 新建
  openNew = () => {
    window.open('https://www.lgaofei.xyz/workPanel')
  }
  // 保存
  save = () => {
    if(!this.isLogin){
      alert('请先登录')
    }else if(this.state.saveTitle.trim() == ''){
      alert('图表名不能为空')
    }else{
      var that = this
      var d = new Date()
      $.ajax({
        // url: "https://www.lgaofei.xyz:8081",
        url: 'https://localhost:8081',
        data: {
          mes: 'saveWorkPanel',
          username: this.state.username,
          data: JSON.stringify({
            conArray: that.state.conArray,
            options: that.options,
            lastArray: that.lastArray,
            deleteIndexs: that.state.deleteIndexs,
            backColor: that.state.backColor,
            date: d.getFullYear + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
            title: that.state.saveTitle
          }) 
        },
        dataType: "jsonp",
        async: true,
        timeout: 10000,
        success:function(data){
          if(data.mes == 'ok'){
            that.setState({
              saveOK: true
            })
            setTimeout(() => {
              that.setState({
                saveOK: false
              })
            },1500)
          }else{
            alert('保存失败')
          }
        },
        error:function(err){
          console.log(`have a error is ${JSON.stringify(err)}`)
          alert('保存失败')
        }
      })
      
    }
  }
  // 跳转至登录页面或我的页面
  moveToLogin = () => {
    window.open('https://www.lgaofei.xyz/easyMake')
  }


  getPosition(obj) {
    var scrollLeft = document.getElementById('center-con').scrollLeft
    var scrollTop = document.getElementById('center-con').scrollTop
    var l=0
    var t=0
    while(obj){
        l+=obj.offsetLeft
        t+=obj.offsetTop
        obj=obj.offsetParent
    }
    return {left:l - scrollLeft, top:t - scrollTop}
  }
  mousedown(e){
    var div = this.div
    var distance = this.distance
    this.flag1 = true
    var that = this
    function getPosition(obj){
      return that.getPosition(obj)
    }
    if(this.flag1LeftTop || this.flag1RightTop || this.flag1LeftBottom || this.flag1RightBottom)
      return 
    if(Math.abs(e.pageX - getPosition(div).left) < distance && Math.abs(e.pageY - getPosition(div).top) < distance){
      this.flag1LeftTop = true
    }else if(Math.abs(e.pageX - getPosition(div).left) < distance && Math.abs(e.pageY - getPosition(div).top - div.clientHeight) < distance){
      this.flag1LeftBottom = true
    }else if(Math.abs(e.pageX - getPosition(div).left - div.clientWidth) < distance && Math.abs(e.pageY - getPosition(div).top) < distance){
      this.flag1RightTop = true
    }else if(Math.abs(e.pageX - getPosition(div).left - div.clientWidth) < distance && Math.abs(e.pageY - getPosition(div).top - div.clientHeight) < distance){
      this.flag1RightBottom = true
    }else if(Math.abs(e.pageX - getPosition(div).left - div.clientWidth) < distance){
      this.flag1Right = true
    }else if(Math.abs(e.pageX - getPosition(div).left) < distance){
      this.flag1Left = true
    }else if(Math.abs(e.pageY - getPosition(div).top) < distance){
      this.flag1Top = true
    }else if(Math.abs(e.pageY - getPosition(div).top - div.clientHeight) < distance){
      this.flag1Bottom = true
    }else if(e.pageX > getPosition(div).left && e.pageX < getPosition(div).left + div.clientWidth &&
      e.pageY > getPosition(div).top && e.pageY < getPosition(div).top + div.clientHeight){
      this.flag2 = true
    }
    this.startX = e.pageX
    this.startY = e.pageY
  }
  mousemove(e){
    var distance = this.distance
    var div = this.div
    var edge = this.edge
    var setCursor = this.setCursor
    var setTop = this.setTop
    var setLeft = this.setLeft
    var setRight = this.setRight
    var setBottom = this.setBottom

    var that = this
    function getPosition(obj){
      return that.getPosition(obj)
    }
    
    if(!(this.flag1 && (edge == 'leftTop' || edge == 'leftBottom' || edge == 'rightTop' || edge == 'rightBottom'))){
      if(Math.abs(e.pageX - getPosition(div).left) < distance && Math.abs(e.pageY - getPosition(div).top) < distance){
        // 左上角
        setCursor('se-resize')
        edge = 'leftTop'
      }else if(Math.abs(e.pageX - getPosition(div).left) < distance && Math.abs(e.pageY - getPosition(div).top - div.clientHeight) < distance){
        // 左下角
        setCursor('ne-resize')
        edge = 'leftBottom'
      }else if(Math.abs(e.pageX - getPosition(div).left - div.clientWidth) < distance && Math.abs(e.pageY - getPosition(div).top) < distance){
        // 右上角
        setCursor('ne-resize')
        edge = 'rightTop'
      }else if(Math.abs(e.pageX - getPosition(div).left - div.clientWidth) < distance && Math.abs(e.pageY - getPosition(div).top - div.clientHeight) < distance){
        // 右下角
        setCursor('se-resize')
        edge = 'rightBottom'
      }else if(Math.abs(e.pageX - getPosition(div).left - div.clientWidth) < distance && e.pageY - getPosition(div).top > 0 && e.pageY - getPosition(div).top - div.clientHeight < 0){
        // 右边
        setCursor('e-resize')
        edge = 'right'
      }else if(Math.abs(e.pageX - getPosition(div).left) < distance && e.pageY - getPosition(div).top > 0 && e.pageY - getPosition(div).top - div.clientHeight < 0){
        // 左边
        setCursor('e-resize')
        edge = 'left'
      }else if(Math.abs(e.pageY - getPosition(div).top) < distance && e.pageX - getPosition(div).left > 0 && e.pageX - getPosition(div).left - div.clientWidth < 0){
        // 上边
        setCursor('n-resize')
        edge = 'top'
      }else if(Math.abs(e.pageY - getPosition(div).top - div.clientHeight) < distance && e.pageX - getPosition(div).left > 0 && e.pageX - getPosition(div).left - div.clientWidth < 0){
        // 下边
        setCursor('n-resize')
        edge = 'bottom'
      }else{
        setCursor('default')
      }
    }

    if(this.flag1LeftTop && edge == 'leftTop'){
      setTop(e.pageY)
      setLeft(e.pageX)
    }else if(this.flag1LeftBottom && edge == 'leftBottom'){
      setBottom(e.pageY)
      setLeft(e.pageX)
    }else if(this.flag1RightTop && edge == 'rightTop'){
      setRight(e.pageX)
      setTop(e.pageY)
    }else if(this.flag1RightBottom && edge == 'rightBottom'){
      setRight(e.pageX)
      setBottom(e.pageY)
    }else if(this.flag1Right && edge == 'right'){
      setRight(e.pageX)
    }else if(this.flag1Left && edge == 'left'){
      setLeft(e.pageX)
    }else if(this.flag1Top && edge == 'top'){
      setTop(e.pageY)
    }else if(this.flag1Bottom && edge == 'bottom'){
      setBottom(e.pageY)
    }
    if(this.flag2){
      div.style.top = this.lastTop + e.pageY - this.startY + 'px'
      div.style.left = this.lastLeft + e.pageX - this.startX + 'px'
    }
    this.edge = edge
  }
  mouseup(){
    this.flag1Right = false
    this.flag1Left = false
    this.flag1Top = false
    this.flag1Bottom = false
    this.flag2 = false
    this.flag1 = false
    this.flag1LeftTop = false
    this.flag1LeftBottom = false
    this.flag1RightTop = false
    this.flag1RightBottom = false
    this.lastWidth = this.div.clientWidth
    this.lastHeight = this.div.clientHeight
    this.lastTop = this.div.offsetTop
    this.lastLeft = this.div.offsetLeft
    this.edge = ''
  }
  setCursor(cursor){
    this.div.style.cursor = cursor
    this.con.style.cursor = cursor
  }
  setLeft(pageX){
    this.div.style.width = this.lastWidth + this.startX - pageX + 'px'
    if(this.div.clientWidth < this.minWidth)
      this.div.style.width = this.minWidth + 'px'
    else
      this.div.style.left = this.lastLeft + pageX - this.startX + 'px'
  }
  setRight(pageX){
    this.div.style.width = this.lastWidth + pageX - this.startX + 'px'
    if(this.div.clientWidth < this.minWidth)
      this.div.style.width = this.minWidth + 'px'
  }
  setTop(pageY){
    this.div.style.height = this.lastHeight + this.startY - pageY + 'px'
    if(this.div.clientHeight < this.minHeight)
      this.div.style.height = this.minHeight + 'px'
    else
      this.div.style.top = this.lastTop + pageY - this.startY + 'px'
  }
  setBottom(pageY){
    this.div.style.height = this.lastHeight + pageY - this.startY + 'px'
    if(this.div.clientHeight < this.minHeight)
      this.div.style.height = this.minHeight + 'px'
  }
  addListener(){
    var foo = document.getElementById('center-con')
    foo.addEventListener('mousedown',this.mousedown)
    foo.addEventListener('mousemove',this.mousemove)
    foo.addEventListener('mouseup',this.mouseup)
  }
  removeListener(){
    var foo = document.getElementById('center-con')
    foo.removeEventListener('mousedown',this.mousedown)
    foo.removeEventListener('mousemove',this.mousemove)
    foo.removeEventListener('mouseup',this.mouseup)
  }
  moveAndScale(){
    var index = this.state.currentConIndex
    var idTarget = this.state.conArray[index]
    var currentTarget = this.lastArray[index]  
    this.lastWidth = currentTarget.lastWidth
    this.lastHeight = currentTarget.lastHeight
    this.lastTop = currentTarget.lastTop
    this.lastLeft = currentTarget.lastLeft
    this.con = document.getElementById('pic-con')
    this.div = document.getElementById(idTarget.conid)
  }
  componentDidMount(){
    var that = this
    function checkLogin(){
      if(document.cookie.indexOf('Invalid Date') == -1 && document.cookie.indexOf('username=') > -1){
        // console.log('用户登录了')
        var index = document.cookie.indexOf('username=') > -1
        that.isLogin = true
        that.setState({
          username : document.cookie.substring(index + 'username='.length).split(',')[0]
        })
      }else{
        that.isLogin = false
        that.setState({
          username: null
        })
      }
    }
    
    checkLogin()
    document.addEventListener("visibilitychange", function(){
      // 检测是否已经登录
      if(!document.hidden){
        checkLogin()
      }
    })
  }
  componentWillUpdate(){
    if(this.deleteFlag){
      this.deleteFlag = false
    }else if(this.state.currentConIndex != null){
      var arr = this.lastArray
      var index = this.state.currentConIndex
      arr[index].lastWidth = this.lastWidth
      arr[index].lastHeight = this.lastHeight
      arr[index].lastTop = this.lastTop
      arr[index].lastLeft = this.lastLeft
      this.lastArray = arr
    }
  }
  componentDidUpdate(){
    this.removeListener()
    if(this.state.currentConIndex === null){
      return
    }else{
      this.moveAndScale()
      this.addListener()
    }
  }
  render(){
    var s = this.state
    var setting = {seriesName: ['系列1'],tdNum: 5,backColor: 'rgba(240,240,240,1)'}
    var echartsSetting = s.currentConIndex !== null ? s.echartsSetting[s.currentConIndex] : setting

    return(
      <div id='work-panel-con'>
        <div id='top-con'>
          <div id='left'>
            <div onClick={this.openNew}>新建</div>
            <div onClick={() => {this.setState({saveFlag: !s.saveFlag})}}>保存</div>
            <div>
              图片长宽px&nbsp;&nbsp;
              <input type='number' defaultValue={600} min={20} max={1200} onChange={this.setPicWidth} />
              &nbsp;&nbsp;x&nbsp;&nbsp;
              <input type='number' defaultValue={400} min={20} max={800} onChange={this.setPicHeight} />
            </div>
            <div onClick={() => this.setState({picBorderDis: !s.picBorderDis})}>
              {s.picBorderDis ? '隐藏' : '显示'}图片边缘
            </div>
            <div onClick={() => this.setState({helpFlag: !s.helpFlag,backColorFlag: false})}>使用帮助</div>
            <div onClick={() => this.setState({backColorFlag: !s.backColorFlag,helpFlag: false})}>背景颜色</div>
            <div onClick={() => this.setState({fullFlag: true,backColorFlag: false,helpFlag: false})}>全屏</div>
          </div>
          <div id='right'>
            <div onClick={this.downloadPic}>下载图片</div>
            <div onClick={this.moveToLogin}>{s.username !== null ? s.username : '未登录'}</div>
          </div>
        </div>
        <div id='main-con'>
          <div id='left-con'>
            <div id='left-column'>
              {this.leftTags.map((item,index) => {
                return <div key={index} onClick={this.leftTagClick.bind(this,index)}
                style={{color: s.leftIndex == index ? '#fff' : '#aaa',fontSize: s.leftIndex == index ? '16px' : '12px'}}>
                {item.name}</div>
              })}
            </div>
            <div id='right-content'>
              <div id='but-con'>
                <div onClick={this.addAChart}><MyButton content='添加' /></div>
                <div onClick={this.deleteSC}><MyButton content='删除当前图层' backColor='#ff6666' /></div>
              </div>
              <div id='setting-con'>
                <MyDropdown dpStyle={1} title='配置'>
                  {s.conArray.map((item,index) => {
                    return <div key={index} style={{display: index == s.currentConIndex ? 'block' : 'none'}}>
                      <EchartsSetting esStyle={1} fontColor='#ccc' onSubmitData={this.setEchartsSetting} saveHide={true} />
                    </div>
                  })}
                </MyDropdown>
              </div>
              <div id='data-input-con'>
                <MyDropdown dpStyle={1} title='数据'>
                  {s.conArray.map((item,index) => {
                    switch(Number(item.leftIndex)){
                      case 0:
                      case 1:
                        return <div key={index} style={{display: index == s.currentConIndex ? 'block' : 'none'}}>
                          <DataInputTable tdNum={echartsSetting.tdNum} seriesName={echartsSetting.seriesName} 
                            onUpdateData={this.setEchartsData} />
                          </div>
                      case 2:
                        return <div key={index} style={{display: index == s.currentConIndex ? 'block' : 'none'}}>
                          <DataInputTablePie tdNum={echartsSetting.tdNum} seriesName={echartsSetting.seriesName} 
                            onUpdateData={this.setEchartsData} />
                          </div>
                    }
                  })}
                </MyDropdown>
              </div>
              <div id='high-setting-con'>
                <MyDropdown dpStyle={1} title='高级'>
                  {s.conArray.map((item,index) => {
                    switch(Number(item.leftIndex)){
                      case 0:
                        return <div key={index} style={{display: index == s.currentConIndex ? 'block' : 'none'}}>
                          <EchartsHighSettingBar esStyle={1} seriesName={echartsSetting.seriesName} tdNum={echartsSetting.tdNum}
                          onSubmitData={this.setEchartsHighSetting}/>
                        </div>
                      case 1:
                        return <div key={index} style={{display: index == s.currentConIndex ? 'block' : 'none'}}>
                          <EchartsHighSettingLine esStyle={1} seriesName={echartsSetting.seriesName} tdNum={echartsSetting.tdNum}
                          onSubmitData={this.setEchartsHighSetting}/>
                        </div>
                      case 2:
                        return <div key={index} style={{display: index == s.currentConIndex ? 'block' : 'none'}}>
                          <EchartsHighSettingPie esStyle={1} seriesName={echartsSetting.seriesName} tdNum={echartsSetting.tdNum}
                          onSubmitData={this.setEchartsHighSetting}/>
                        </div>
                    }
                  })}
                </MyDropdown>
              </div>
            </div>
          </div>
          {/* 背景颜色 */}
          {s.backColorFlag && <div id='back-color-con'>
            <ColorSelector2 sendData={this.setBackColor} />
          </div>}
          {/* 使用帮助 */}
          {s.helpFlag && <div id='use-help'>
            <ul>
              <li>当要修改某个图表时请先在组件栏里将其选中</li>
              <li>下载图片时只会包含图片边缘(红线)区域内的内容</li>
              <li>通过<b>配置</b>设置各种图表通用的内容</li>
              <li>通过<b>数据</b>填写图表的数据</li>
              <li>通过<b>高级</b>可以使图表更加多样化</li>
              <li>若要保存图表请先登录</li>
            </ul>
          </div>}
          {/* 保存 */}
          {s.saveFlag && <div id='save-title-input'>
            <input type='text' placeholder='输入图表名称' onChange={(e) => this.setState({saveTitle: e.target.value})} />
            <div onClick={this.save}><MyButton content='确定' /></div>
          </div>}
          <div id='center-con' style={{backgroundColor: s.backColor}}>
            <div id='pic-con' style={{
              backgroundColor: s.backColor,
              width: s.picWidth + 'px',
              height: s.picHeight + 'px',
              border: s.picBorderDis ? '1px dashed red' : '1px dashed transparent'
            }}>
              {s.conArray.map((item,index) => {
                return <ScalableContainer key={index} isDisplay={s.deleteIndexs.find(e => e == index)} 
                  isTarget={index == s.currentConIndex} 
                  conid={item.conid} initWidth={item.initWidth} initHeight={item.initHeight}>
                  {this.getItemByType(item.type,this.options[index])}
                </ScalableContainer>
              })}
            </div>

          </div>
          <div id='layer-con'>
            <MyDropdown dpStyle={1} title='图层'>
              {s.conArray.map((item,index) => {
                return <div className='layer-item' key={index} 
                  style={{display: s.deleteIndexs.find(e => e == index) !== undefined ? 'none' : 'flex'}} 
                  onClick={this.setCurrentConIndex.bind(this,index,item.leftIndex)}>
                  <span>{item.name}</span>
                  {s.currentConIndex == index && <img src={require('../../images/duigou.png')} />}
                </div>
              })}
            </MyDropdown>
          </div>
          <div id='tool-con' style={{height: s.toolFlag ? '100px' : '30px'}}>
            <img src={require('../../images/top-arrow-white.png')} 
              style={{transform: s.toolFlag ? 'rotate(180deg)' : 'rotate(0)'}}
              onClick={() => this.setState({toolFlag: !s.toolFlag})} />
            <div>图片</div>
            <div>文字</div>
            <div>表格</div>
          </div>
        </div>
        {/* 全屏显示 */}
        {s.fullFlag && <div id='full-screen-con' style={{backgroundColor: s.backColor}}>
          <div id='close-screen' onClick={() => this.setState({fullFlag: false})}>+</div>
          <div style={{position: 'relative'}}>
            {s.conArray.map((item,index) => {
              return <ScalableContainer key={index} isDisplay={s.deleteIndexs.find(e => e == index)} 
                isTarget={false} conid={'full' + item.conid} initWidth={this.lastArray[index].lastWidth}
                initHeight={this.lastArray[index].lastHeight} initTop={this.lastArray[index].lastTop}
                initLeft={this.lastArray[index].lastLeft}>
                {this.getItemByType(item.type,this.options[index])}
              </ScalableContainer>
            })}
          </div>
        </div>}
        {/* 保存成功 */}
        {s.saveOK && <div id='save-ok'>保存成功</div>}
      </div>
    )
  }
}