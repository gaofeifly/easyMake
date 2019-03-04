import React from 'react'
import './tree-data.scss'
import {FormControl,ControlLabel} from 'react-bootstrap'
import MyButton from '../mybutton/mybutton'
import '../../global'
import 'animate.css'

/*
  这个组件还残存bug
  1.点击对号修改name后state内保存的那么并没有变化
  2.删除时pos数组存在问题 导致用于渲染的数组设置出现错误
*/

export default class TreeData extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      nodeData: {
        name: 'root',
        value: '',
        pos: null,
        children: []
      },     // 数据采用json存储 
      firstArr: [],
      secondArr: [],
      thirdArr: [],
      fourthArr: [],
      currentNodePos: null,
      inputBoxDis: false,
      colorIndex: -1,
      deleteDis: false,
      deleteTop: 0,
      deleteLeft: 0
    }
    this.deletePos = []
    this.nodeName = 'root'
    this.nodeValue =  ''
  }
  addANode = () => {
    // 添加节点时先检查名称是否和同级其他节点一样  同级不允许有重复名称的节点
    if(this.nodeName == ''){
      alert('节点名称不能为空')
      return
    }
    var data = this.state.nodeData
    if(this.state.currentNodePos == null){
      // 在根节点处添加子节点
      for(let i=0;i<data.children.length;i++){
        if(data.children[i].name == this.nodeName){
          alert('同级不允许有重复名称的节点')
          return
        }
      }
      data.children.push({
        name: this.nodeName,
        value: this.nodeValue,
        pos: [this.nodeName],
        children: []
      })
      this.setRenderArr(1,data.children)
    }else{
      if(this.state.currentNodePos.length == 4){
        alert('最多只能设置5层')
        return
      }
      // 给子节点继续添加子节点
      var temp = data
      var pos = this.state.currentNodePos
      temp = this.findCurrentNode(pos,temp)
      for(let i=0;i<temp.children.length;i++){
        if(temp.children[i].name == this.nodeName){
          alert('同级不允许有重复名称的节点')
          return
        }
      }
      temp.children.push({
        name: this.nodeName,
        value: this.nodeValue,
        pos: pos.concat([this.nodeName]),
        children: []
      })
      this.setRenderArr(pos.length+1,temp.children)
    }
    // console.log(data)
    this.setState({
      nodeData: data
    })
  }
  // 找到当前操作的节点
  findCurrentNode = (pos,data) => {
    for(let i=0;i<pos.length;i++){
      for(let j=0;j<data.children.length;j++){
        if(data.children[j].name == pos[i]){
          data = data.children[j]
        }
      }
    }
    return data
  }
  setNodeNameAndValue = () => {
    var data = this.state.nodeData
    var pos = this.state.currentNodePos
    if(pos == null){
      // 根节点
      data.name = this.nodeName
      data.value = this.nodeValue
    }else{
      var temp = data
      temp = this.findCurrentNode(pos,temp)
      temp.name = this.nodeName
      temp.value = this.nodeValue
    }
    // console.log(data)
    this.setState({
      nodeData: data,
      inputBoxDis: false
    })
  }
  setCurrentNode = (pos,colorIndex) => {
    var data = this.state.nodeData
    if(pos != null){
      // 不是根节点
      data = this.findCurrentNode(pos,data)
      this.setRenderArr(pos.length+1,data.children)
      for(let i=pos.length+2;i<=4;i++)
        this.setRenderArr(i,[])
    }else{
      this.setRenderArr(1,data.children)
      for(let i=2;i<=4;i++)
        this.setRenderArr(i,[])
    }
    
    this.nodeName = data.name
    this.nodeValue = data.value
    this.setState({
      currentNodePos: pos,
      colorIndex: colorIndex
    })
  }
  setRenderArr = (index,arr) => {
    switch(index){
      case 1:
        this.setState({
          firstArr: arr
        })
        break
      case 2:
        this.setState({
          secondArr: arr
        })
        break
      case 3:
        this.setState({
          thirdArr: arr
        })
        break
      case 4:
        this.setState({
          fourthArr: arr
        })
        break
    }
  }
  deleteNode = (e) => {
    e.preventDefault()
    let pos = this.deletePos
    let data = this.state.nodeData
    if(pos == null){
      // 删除全部节点
      let res = confirm('确定删除全部节点吗？')
      if(res){
        data.children = []
        for(let i=1;i<=4;i++)
          this.setRenderArr(i,[])
      }else{
        return
      }
    }else{
      // 找到当前节点的父节点，将其从父节点children中移除
      let targetNode = this.findCurrentNode(pos,data)
      let fooNode = data
      for(let i=0;i<pos.length-1;i++){
        for(let j=0;j<fooNode.children.length;j++){
          if(fooNode.children[j].name == pos[i]){
            fooNode = fooNode.children[j]
          }
        }
      }
      for(let i=0;i<fooNode.children.length;i++){
        if(fooNode.children[i].name == targetNode.name){
          fooNode.children.splice(i,1)
        }
      }
      if(this.state.currentNodePos == pos){
        // 如果当前选中节点和要删除的节点是同一个，则将后方子节点全部隐藏
        this.setState({
          colorIndex: -1
        })
        for(let i=pos.length+1;i<=4;i++)
          this.setRenderArr(i,[])
      }
      this.setRenderArr(pos.length,fooNode.children)
    }
    this.setState({
      nodeData: data,
      deleteDis: false,
      inputBoxDis: false
    })
  }
  componentDidMount(){
    var tree = this.refs.tree
    var that = this
    tree.addEventListener('click',(e) => {
      if(e.target.id == 'delete')
        return
      that.setState({
        deleteDis: false
      })
    },false)
    // 使用react的onContextMenu事件绑定不起作用
    tree.oncontextmenu = (e) => {
      e.preventDefault()
      // console.log(e)
      this.deletePos = e.target.dataset.pos
      // for(let i=0;i<this.deletePos.length;i++){
      //   console.log(this.deletePos[i])
      // }
      
      // 显示删除菜单并记录当前的节点
      this.setState({
        deleteDis: true,
        deleteTop: e.clientY,
        deleteLeft: e.clientX
      })
      return false
    }
  }
  render(){
    var s = this.state
    return(
      <div id='tree-data-con' ref='tree'>
        <div className='node-line'>
          <div className='node-item'style={{
              width: '65px',
              height: '65px',
              backgroundColor: s.colorIndex == -1 ? 'orange' : '#66f',
              margin: '0 auto'
            }} title={s.nodeData.value}
            onClick={this.setCurrentNode.bind(this,null,-1)} >
            {s.nodeData.name}
          </div>
        </div>

        {[s.firstArr,s.secondArr,s.thirdArr,s.fourthArr].map((item,index) => {
          return <div className='node-line' key={index}>
            {item.map((item2,index2) => {
              return <div className='animated fadeIn node-item' key={index2} style={{
                  width: 250 / item.length + 'px',
                  height: 250 / item.length + 'px',
                  backgroundColor: (s.currentNodePos == null && index == 0) || 
                  (s.currentNodePos != null && s.currentNodePos.length == index) || 
                  (s.colorIndex == index*100+index2) ? 'orange' : '#66f'
                }} title={item2.value} data-pos={item2.pos}
                onClick={this.setCurrentNode.bind(this,item2.pos,index*100+index2)}>
                {item2.name}
              </div>
            })}
          </div>
        })}

        <div id='btn-con'>
          <div onClick={() => this.setState({inputBoxDis: true})}>
            <MyButton backColor='#ff3366' fontColor='#fff' content='编辑' type={1} />
          </div>
          <div onClick={() => this.props.onUpdateData(s.nodeData)}>
            <MyButton backColor='#66f' fontColor='#fff' content='确定' type={1} />
          </div>
        </div>

        {s.inputBoxDis && <div id='input-box'>
          <div>
            <ControlLabel>name</ControlLabel>
            <FormControl type='text' style={{width: '80px',height: '30px'}} placeholder={this.nodeName} 
              onChange={e => this.nodeName = e.target.value.trim()} />
          </div>
          <div>
            <ControlLabel>value</ControlLabel>
            <FormControl type='text' style={{width: '80px',height: '30px'}} placeholder={this.nodeValue} 
              onChange={e => this.nodeValue = e.target.value.trim()} />
          </div>
          <div>
            <div onClick={this.addANode.bind(this)}>
              <MyButton backColor='#66f' fontColor='#fff' content='添加节点' type={1} />
            </div>
            <img src={require('../../images/duigou.png')} onClick={this.setNodeNameAndValue.bind(this)} />
            <img src={require('../../images/chahao.png')} onClick={() => this.setState({inputBoxDis: false})} />
          </div>
        </div>}

        {s.deleteDis && <div id='delete' style={{
          left: s.deleteLeft + 'px',
          top: s.deleteTop + 'px'
        }} onClick={this.deleteNode.bind(this)}>
          删除
        </div>}
      </div>
    )
  }
}