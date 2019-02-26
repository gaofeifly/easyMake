import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import DataScatter from './data-scatter'
import EchartsSetting from '../echarts-setting/echarts-setting'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/line'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import {Grid,Row,Col,Tabs,Tab} from 'react-bootstrap'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/markArea'
import 'echarts/lib/component/markLine'
import $ from 'jquery'
import { store } from '../../store/store'
import EchartsHighSettings from './echarts-scatter-high'
import {generateOptionScatter} from '../generate-option/generate-option'

export default class EchartsScatter extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      data: {
        xData: [],
        yData: [],
        seriesData: []
      },
      setting: {
        seriesName: ['系列1'],
        tdNum: 5,
        backColor: 'rgba(240,240,240,1)'
      },
      highSetting: {

      },
      settingToast: false,  // 是否显示 设置成功 提示
      saveOK: false,
    }
    this.option = {}
  }
  // 将制作的图表保存
  saveData = () => {
    var that = this
    $.ajax({
      url: "https://www.lgaofei.xyz:8081",
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
  onGetData = (data) => {
    this.setState({
      data: data
    })
  }
  // 输入配置的组件传递过来数据
  onGetSetting = (setting) => {
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
  onGetHighSetting = (highSetting) => {
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
  generateOption(){
    var data = this.state.data
    var setting = this.state.setting
    var highSetting = this.state.highSetting
    return generateOptionScatter(setting,data,highSetting)
  }

  render(){
    var setting = this.state.setting
    var opt = this.generateOption()
    var themes = ['default','light','dark']
    return(
      <Grid id='echarts-make-con'>
        <h2>散点图</h2>
        <Row className="show-grid">
          <Col xs={12} sm={12} md={6} lg={6}>
            <div id='echarts-div'>
              <ReactEchartsCore notMerge={true} echarts={echarts} option={opt.option} style={{height: '100%', width: '100%'}}
                theme={setting.backColorFlag ? 'backColor' + setting.backColor : themes[setting.themeIndex]} />
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div id='data-setting-div'>
              <Tabs id='tabs' defaultActiveKey={3}>
                <Tab eventKey={2} title='配置' style={{paddingTop: '10px'}}>
                  <EchartsSetting onSubmitData={this.onGetSetting} onSaveData={this.saveData} />
                </Tab>
                <Tab eventKey={1} title='数据'>
                  <div id='data-div'>
                    <DataScatter tdNum={setting.tdNum} seriesName={setting.seriesName} onUpdateData={this.onGetData}/>
                  </div>
                </Tab>
                <Tab eventKey={3} title='高级'>
                  <EchartsHighSettings tdNum={setting.tdNum} seriesName={setting.seriesName} onSubmitData={this.onGetHighSetting} />
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

