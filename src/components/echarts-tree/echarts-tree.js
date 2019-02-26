import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import TreeData from './tree-data'
import TreeSetting from './tree-setting'
import '../../css/chart-make-layout.scss'
import {Grid,Row,Col,Tabs,Tab} from 'react-bootstrap'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/tree'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import $ from 'jquery'
import { store } from '../../store/store'
import {generateOptionBar} from '../generate-option/generate-option'

export default class EchartsLine extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      setting: {

      },
      data: {

      }
    }
  }
  onGetSetting = () => {

  }
  onGetData = () => {

  }
  saveData = () => {

  }
  generateOption = () => {
    return {
      option: {},
      backColorFlag: false,
      backColor: 'rgba(0,0,0,0)',
      themeIndex: 0
    }
  }

  render(){
    var themes = ['default','light','dark']
    var opt = this.generateOption()
    return(
      <Grid id='echarts-make-con'>
        <h2>树图</h2>
        <Row className="show-grid">
          <Col xs={12} sm={12} md={6} lg={6}>
            <div id='echarts-div'>
              <ReactEchartsCore echarts={echarts} option={opt.option} style={{height: '100%', width: '100%'}}
                theme={opt.backColorFlag ? 'backColor' + opt.backColor : themes[opt.themeIndex]} />
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div id='data-setting-div'>
              <Tabs id='tabs' defaultActiveKey={1}>
                <Tab eventKey={2} title='配置' style={{paddingTop: '10px'}}>
                  {/* <TreeSetting onSubmitData={this.onGetSetting} onSaveData={this.saveData} /> */}
                </Tab>
                <Tab eventKey={1} title='数据'>
                  <div id='data-div'>
                    <TreeData tdNum={this.state.setting.tdNum} seriesName={this.state.setting.seriesName} onUpdateData={this.onGetData}/>
                  </div>
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