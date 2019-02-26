import React from 'react'
import ReactDOM from 'react-dom'
// import * as serviceWorker from './serviceWorker'
import EchartsBar from '../../components/echarts-bar/echarts-bar'
import EchartsLine from '../../components/echarts-line/echarts-line'
import EchartsPie from '../../components/echarts-pie/echarts-pie'
import EchartsScatter from '../../components/echarts-scatter/echarts-scatter'
import EchartsTree from '../../components/echarts-tree/echarts-tree'
import IndexComponent from '../../components/index-component/index-component'
import Mine from '../../components/mine/mine'
import Register from '../../components/register/register'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import './index.scss'
import '../../css/chart-make-layout.scss'
import '../../global.js'
import { Provider  } from 'react-redux'
import { store } from '../../store/store'
import '../../css/scroll-bar.scss'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: global.getCookie(),
      dropdownDis: false,

    }
    const unsubscribe = store.subscribe(() => {
      this.setState({
        username: store.getState().name.username,
      })
    })
  }
  render(){
    var s = this.state
    return(
      // 修改或打包时记得看一下package.json里的配置是否一致
      <Router basename='/easyMake'>
        <div id='index-con'>
          <div id='my-navbar'>
            <div id='logo-and-name'>
              <Link to='/'><img src={require('../../images/logo-blue.png')} className='logo-img' /></Link>
              <Link to='/'>简单制作</Link>
            </div>
            
            <div id='chart-dropdown-title' onClick={() => this.setState({dropdownDis: !s.dropdownDis})}>制作图表</div>
            {s.dropdownDis && <div id='chart-dropdown'>
              {[{name: '柱形图',link: '/bar'},
              {name: '折线图',link: '/line'},
              {name: '饼图',link: '/pie'},
              {name: '散点图',link: '/scatter'},
              {name: '树图',link: '/tree'}].map((item,index) => {
                return <div key={index} onClick={() => this.setState({dropdownDis: false})}>
                  <Link to={item.link}>{item.name}</Link>
                </div>
              })}
            </div>}
            
            <div id='work-panel-title'>
              <a href='/workPanel'>工作台</a>
            </div>

            <div id='username-and-img'>
              <img id='mine-img' src={require('../../images/mine.png')} />
              <Link to={s.username != null ? '/mine' : '/register'}>{s.username != null ? s.username : '未登录'}</Link>
            </div>
          </div>

          <div id='router-con'>
            <Route exact path="/" component={IndexComponent} />
            <Route exact path="/bar" component={EchartsBar}/>
            <Route exact path="/line" component={EchartsLine}/>
            <Route exact path="/pie" component={EchartsPie}/>
            <Route exact path="/scatter" component={EchartsScatter}/>
            <Route exact path="/tree" component={EchartsTree}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/mine" component={Mine}/>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
// serviceWorker.unregister();