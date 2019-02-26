import React from 'react'
import './tree-data.scss'
import {FormControl,ControlLabel,Radio,Button} from 'react-bootstrap'
import ColorSelector from '../color-selector/color-selector'
import OnOffBtn from '../on-off-btn/on-off-btn'
import MyDropdown from '../dropdown/dropdown'
import TwoColumn from '../two-column/two-column'
import MyButton from '../mybutton/mybutton'
import '../../global'

export default class TreeData extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rootName: '',
      nodeData: [[],[],[],[],[]],     // 数据采用二维存储
      nodeArrForRender: [],
      treeDepth: 1,
    }
    this.nodeName = ''
    this.nodeValue =  ''
    this.nodePos = [1]
    this.firstNodeNum = 0   // 记录第一层结点的个数
  }
  addANode = () => {
    if(this.nodeName.trim() == '' || this.nodeValue.trim() == ''){
      alert('结点名称和结点值不能为空')
      return
    }
    var arr = this.state.nodeArrForRender
    if(this.nodePos.length == 1){
      arr.push({
        pos: '1,' + ++this.firstNodeNum,
        name: this.nodeName,
        value: this.nodeValue
      })
      this.setState({
        nodeArrForRender: arr,
        treeDepth: 2
      })
    }else{
      for(var i=0;i<this.nodePos.length;i++){
        if(this.nodePos[i] == 0){
          
        }
      }
    }
    
  }
  setNodeName = (pos,value) => {

  }
  setNodeValue = (pos,value) => {

  }
  render(){
    var s = this.state
    return(
      <div id='tree-data-con'>
        <div className='three-column'>
          <div><label>结点位置</label></div>
          <div><label>结点名称</label></div>
          <div><label>结点值</label></div>
        </div>
        <div className='three-column'>
          <div><label>根结点</label></div>
          <div><FormControl type='text' style={{width: '90%'}} onChange={(e) => this.setState({rootName: e.target.value})} /></div>
          <div><FormControl type='text' style={{width: '90%'}} disabled={true} /></div>
        </div>
        {s.nodeArrForRender.map((item,index) => {
          return <div key={index} className='three-column'>
            <div>{item.pos}</div>
            <div><FormControl type='text' style={{width: '90%'}} placeholder={item.name} 
            onChange={e => this.setNodeName(item.pos,e.target.value)} /></div>
            <div><FormControl type='text' style={{width: '90%'}} placeholder={item.value} 
            onChange={e => this.setNodeValue(item.pos,e.target.value)} /></div>
          </div>
        })}
        
        <div id='add-con'>
          <TwoColumn leftFlex={1} rightFlex={1} width='100%' left={
            <FormControl type='text' placeholder="结点名称" style={{width: '90%'}}
            onChange={e => this.nodeName = e.target.value} />  
          } right={
            <FormControl type='text' placeholder="结点值" style={{width: '90%'}}
            onChange={e => this.nodeValue = e.target.value} />    
          } />
          <label>第二层(含)往后结点位置
            {[1,2,3,4].map(item => {
              return <select disabled={!(s.treeDepth > item)} key={item} onChange={e => this.nodePos[item] = e.target.value}>
                {global.createArrayFromOneToNum(10).map(item => {
                  return <option key={item} value={item-1}>{item-1}</option>
                })}
              </select>
            })}
          </label>
          <div id='add-btn' onClick={this.addANode} style={{width: '100px'}}>
            <MyButton content='添加结点' />
          </div>
        </div>
      </div>
    )
  }
}