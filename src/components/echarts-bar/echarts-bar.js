import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import DataInputTable from '../data-input-table/data-input-table'
import EchartsSetting from '../echarts-setting/echarts-setting'
import {Grid,Row,Col,Tabs,Tab} from 'react-bootstrap'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import $ from 'jquery'
import { store } from '../../store/store'
import EchartsHighSetting from './echarts-bar-high'
import {generateOptionBar} from '../generate-option/generate-option'

export default class EchartsBar extends React.Component {
  constructor(props){
    super(props)
    this.onGetData = this.onGetData.bind(this)
    this.onGetSetting = this.onGetSetting.bind(this)
    this.onGetHighSetting = this.onGetHighSetting.bind(this)
    this.saveData = this.saveData.bind(this)
    this.generateOption = this.generateOption.bind(this)

    this.state = {
      data: {
        xData: [],
        yData: []
      },
      setting: {
        seriesName: ['系列1'],
        tdNum: 5,
        backColor: 'rgba(240,240,240,1)'
      },
      highSetting: {
        labelSetting: {},
        barSetting: {
          barColor: [],    // 如果采用默认则数组为空
        },
        transverseFlag: false,
        splitLineFlag: true,
        yAxisFlag: true,
        stackFlag: false,
        xAxisTickFlag: true,
      },
      settingToast: false,  // 是否显示 设置成功 提示
      echartsConHeight: 400,
      saveOK: false
    }
    this.option = {}
  }
  // 将制作的图表保存
  saveData(){
    var that = this
    $.ajax({
      url: "http://www.lgaofei.xyz:8081",
      data: {
        mes: 'saveChart',
        username: store.getState().name.username,
        option: JSON.stringify(that.option) 
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
  // 输入数据的组件传递过来数据
  onGetData(data){
    this.setState({
      data: data
    })
  }
  // 输入配置的组件传递过来数据
  onGetSetting(setting){
    this.setState({
      setting: setting,
      settingToast: true
    })
    setTimeout(() => {
      this.setState({
        settingToast: false
      })
    },1500)
  }
  // 输入高级配置的组件传递过来数据
  onGetHighSetting(highSetting){
    this.setState({
      settingToast: true,
      highSetting: highSetting
    })
    setTimeout(() => {
      this.setState({
        settingToast: false
      })
    },1500)
  }
  // 生成option
  generateOption(){
    var data = this.state.data
    var setting = this.state.setting
    var highSetting = this.state.highSetting
    return generateOptionBar(setting,data,highSetting)
  }
  render(){
    var themes = ['default','light','dark']
    var opt = this.generateOption()
    this.option = opt
    return(
      <Grid id='echarts-make-con'>
        <h2>柱图</h2>
        <Row className="show-grid">
          <Col xs={12} sm={12} md={6} lg={6}>
            <div id='echarts-div' style={{height: this.state.echartsConHeight + 'px'}}>
                <ReactEchartsCore echarts={echarts} option={opt.option} style={{height: '100%', width: '100%'}}
                  theme={opt.backColorFlag ? 'backColor' + opt.backColor : themes[opt.themeIndex]} />
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div id='data-setting-div'>
              <Tabs id='tabs' defaultActiveKey={1}>
                <Tab eventKey={2} title='配置' style={{paddingTop: '10px'}}>
                  <EchartsSetting onSubmitData={this.onGetSetting} onSaveData={this.saveData} />
                </Tab>
                <Tab eventKey={1} title='数据'>
                  <div id='data-div'>
                    <DataInputTable tdNum={this.state.setting.tdNum} seriesName={this.state.setting.seriesName} onUpdateData={this.onGetData}/>
                  </div>
                </Tab>
                <Tab eventKey={3} title='高级'>
                  <EchartsHighSetting seriesName={this.state.setting.seriesName} onSubmitData={this.onGetHighSetting}/>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
        { this.state.settingToast && <div className='setting-toast'>配置成功</div> }
        { this.state.saveOK && <div className='setting-toast'>保存成功</div> }
      </Grid>
    )
  }
}

