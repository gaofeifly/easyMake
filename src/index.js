import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import EchartsBar from './components/echarts-bar/echarts-bar'
import EchartsLine from './components/echarts-line/echarts-line'
import EchartsPie from './components/echarts-pie/echarts-pie'
import EchartsScatter from './components/echarts-scatter/echarts-scatter'
import IndexComponent from './components/index-component/index-component'
import Mine from './components/mine/mine'
import Register from './components/register/register'
import 'bootstrap/dist/css/bootstrap.css'
import {Navbar,Nav,NavItem,NavDropdown} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
// import {Router,Route} from 'react-router'
import './index.scss'
import './css/chart-make-layout.scss'
import './global.js'
import { Provider  } from 'react-redux'
import { store } from './store/store'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: global.getCookie()
    }
    const unsubscribe = store.subscribe(() => {
      this.setState({
        username: store.getState().name.username,
      })
    })
  }
  render(){
    var username = this.state.username
    return(
      <Router>
      <div id='index-con'>
        <Navbar inverse id='navbar'>
          <Navbar.Header>
            <Navbar.Brand>
              <div id='logo-and-name'>
                <a onClick={() => this.setState({currentPage: '/'})}>
                  <img src={require('./images/logo-blue.png')} className='logo-img' /></a>
                <a onClick={() => this.setState({currentPage: '/'})}>简单制作</a>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown title='制作图表' id='nav-drop'>
                <div><Link to="/line">折线图</Link></div>
                <div><Link to="/bar">柱形图</Link></div>
                <div><Link to="/pie">饼图</Link></div>
                <div><Link to="/scatter">散点图</Link></div>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={2} onClick={() => this.setState({currentPage: username != null ? '/mine' : '/register'})}>
                <img id='mine-img' src={require('./images/mine.png')} />
                <span id='username-span'>{username != null ? username : '未登录'}</span>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      
        
          <div id='router-con'>
            <Route exact path="/" component={IndexComponent} />
            <Route exact path="/bar" component={EchartsBar}/>
            <Route exact path="/line" component={EchartsLine}/>
            <Route exact path="/pie" component={EchartsPie}/>
            <Route exact path="/scatter" component={EchartsScatter}/>
            <Route exact path="/mine" component={Mine}/>
            <Route exact path="/register" component={Register}/>
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
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();