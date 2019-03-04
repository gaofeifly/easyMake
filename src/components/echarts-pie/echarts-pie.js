import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import DataInputTable from './pie-data'
import EchartsSetting from '../echarts-setting/echarts-setting'
// import ReactEcharts from 'echarts-for-react'
import {Grid,Row,Col,Tabs,Tab} from 'react-bootstrap'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox'
import $ from 'jquery'
import { store } from '../../store/store'
import EchartsHighSettings from './echarts-pie-high'
import {generateOptionPie} from '../generate-option/generate-option'

export default class EchartsPie extends React.Component {
  constructor(props){
    super(props)
    this.onGetData = this.onGetData.bind(this)
    this.onGetSetting = this.onGetSetting.bind(this)
    this.onGetHighSetting = this.onGetHighSetting.bind(this)
    this.saveData = this.saveData.bind(this)

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
      },
      saveOK: false,
      settingToast: false,  // 是否显示 设置成功 提示
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
      highSetting: highSetting
    })
  }
  searchRich(data){
    var richs = this.state.highSetting.richs
    for(var m=0;m<richs.length;m++){
      var rich = richs[m]
      if(rich.richSeriesIndex == data.i && rich.richSeriesTdNum == data.j+1){
        return rich
      }
    }
    return false
  }
  generateOption(){
    var data = this.state.data
    var setting = this.state.setting
    var highSetting = this.state.highSetting
    return generateOptionPie(setting,data,highSetting)
  }
  render(){
    var themes = ['default','light','dark']
    var opt = this.generateOption()
    this.option = opt
    return(
      <Grid id='echarts-make-con'>
        <h2>饼图</h2>
        <Row className="show-grid">
          <Col xs={12} sm={12} md={6} lg={6}>
            <div id='echarts-div'>
              <ReactEchartsCore echarts={echarts} option={opt.option} style={{height: '100%', width: '100%'}}
                theme={opt.backColorFlag ? 'backColor' + opt.backColor : themes[opt.themeIndex]} />
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div id='data-setting-div'>
              <Tabs id='tabs' defaultActiveKey={2}>
                <Tab eventKey={2} title='配置' style={{paddingTop: '10px'}}>
                  <EchartsSetting onSubmitData={this.onGetSetting} onSaveData={this.saveData} />
                </Tab>
                <Tab eventKey={1} title='数据'>
                  <div id='data-div'>
                    <DataInputTable tdNum={this.state.setting.tdNum} seriesName={this.state.setting.seriesName} onUpdateData={this.onGetData}/>
                  </div>
                </Tab>
                <Tab eventKey={3} title='高级'>
                  <EchartsHighSettings tdNum={this.state.setting.tdNum} seriesName={this.state.setting.seriesName} onSubmitData={this.onGetHighSetting}/>
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



