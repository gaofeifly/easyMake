import React from 'react'
import './register.scss'
import $ from 'jquery'
import { store } from '../../store/store'
import { Loading1 } from '../loading/loading'

export default class Register extends React.Component {
  constructor(props){
    super(props)
    // 已登录直接跳转到我的页面
    if(global.data.isLogin){
      this.props.history.push('/mine')
    }
    this.state = {
      usernameTextFlag: false,
      passwordTextFlag: false,
      usernameTextFlagRegister: false,
      passwordTextFlagRegister: false,
      passwordConfirmFlag : false,
      butFlag: false,
      circleTop: 0,
      circleLeft: 0,
      usernameLogin: '',
      passwordLogin: '',
      username: '',
      password: '',
      passwordConfirm: '',
      focusIndex: null,   // 当前是第几个文本框有光标
      loginOK: false,
      loadingDis: false
    }
  }

  usernameFocus = (e) => {
    e.stopPropagation()
    this.setState({
      usernameTextFlag: true,
      focusIndex: 0
    })
    if(this.state.passwordLogin == '')
      this.setState({passwordTextFlag: false})
  }
  passwordFocus = (e) => {
    e.stopPropagation()
    this.setState({
      focusIndex: 1,
      passwordTextFlag: true
    })
    if(this.state.usernameLogin == '')
      this.setState({usernameTextFlag: false})
  }
  usernameRegisterFocus = (e) => {
    e.stopPropagation()
    this.setState({
      focusIndex: 2,
      usernameTextFlagRegister: true
    })
    if(this.state.password == '')
      this.setState({passwordTextFlagRegister: false})
    if(this.state.passwordConfirm == '')
      this.setState({passwordConfirmFlag: false})
  }
  passwordRegisterFocus = (e) => {
    e.stopPropagation()
    this.setState({
      focusIndex: 3,
      passwordTextFlagRegister: true
    })
    if(this.state.username == '')
      this.setState({usernameTextFlagRegister: false})
    if(this.state.passwordConfirm == '')
      this.setState({passwordConfirmFlag: false})
  }
  passwordConfirmFocus = (e) => {
    e.stopPropagation()
    this.setState({
      focusIndex: 4,
      passwordConfirmFlag: true
    })
    if(this.state.password == '')
      this.setState({passwordTextFlagRegister: false})
    if(this.state.username == '')
      this.setState({usernameTextFlagRegister: false})
  }
  blur = () => {
    if(this.state.username == '')
      this.setState({usernameTextFlagRegister: false})
    if(this.state.password == '')
      this.setState({passwordTextFlagRegister: false})
    if(this.state.passwordConfirm == '')
      this.setState({passwordConfirmFlag: false})
    if(this.state.usernameLogin == '')
      this.setState({usernameTextFlag: false})
    if(this.state.passwordLogin == '')
      this.setState({passwordTextFlag: false})
    this.setState({
      focusIndex: null
    })
  }
  btnClick = (e) => {
    e.stopPropagation()
    if(this.state.usernameLogin.trim() == '' || this.state.passwordLogin.trim() == ''){
      alert('用户名和密码不能为空！')
      return
    }
    var target = e.nativeEvent.target
    while(target.id != 'btn'){
      target = target.parentNode
    }
    var offsetLeft = 0
    var offsetTop = 0
    while(target){
      offsetLeft += target.offsetLeft
      offsetTop += target.offsetTop
      target = target.offsetParent
    }
    this.setState({
      circleTop: e.clientY - offsetTop,
      circleLeft: e.clientX - offsetLeft,
      loadingDis: true
    })
    var that = this
    $.ajax({
      url: "https://www.lgaofei.xyz:8081",
      // url: 'https://localhost:8081',
      data: {
        mes: 'userLogin',
        username: that.state.usernameLogin,
        password: that.state.passwordLogin
      },
      dataType: 'jsonp',
      async: true,
      timeout: 10000,
      success: (data) => {
        // 登录成功
        if(data.mes == 'ok'){
          that.setState({
            butFlag: true,
            loadingDis: false
          })
          // 将登录状态缓存到cookie中，有效期一个小时
          global.setCookie(that.state.usernameLogin)
          store.dispatch({type: 'UPDATE_USERNAME',username: that.state.usernameLogin})
          setTimeout(() => {
            that.props.history.push('/mine')
          },1500)
        }else{
          alert('登录失败')
        }
      }
    })
  }
  // 注册账户请求数据库
  registerAccount = () => {
    if(this.state.username.trim() == ''){
      alert('用户名不能为空')
      return
    }
    var pattern = /^[0-9a-zA-Z]{1,}$/
    if(!pattern.test(this.state.username)){
      alert('账号输入有误，只能包含数字字母下划线')
      return
    }
    if(this.state.password.length < 6){
      alert('密码长度不能低于6位')
      return
    }
    if(this.state.password == this.state.passwordConfirm){
      this.setState({
        loadingDis: true
      })
      var that = this
      $.ajax({
        url: "https://www.lgaofei.xyz:8081",
        // url: 'https://localhost:8081',
        data: {
          mes: 'addAccount',
          username: that.state.username,
          password: that.state.password
        },
        dataType: "jsonp",
        async: true,
        timeout: 10000,
        success:function(data){
          if(data.mes == 'ok'){
            that.setState({
              loginOK: true,
              loadingDis: false
            })
            global.setCookie(that.state.username)
            store.dispatch({type: 'UPDATE_USERNAME',username: that.state.username})
            setTimeout(() => {
              that.props.history.push('/mine')
            }, 1000);
          }else if(data.mes == 'has username'){
            alert('用户名已存在，换一个试试吧~')
          }
        },
        error:function(err){
          console.log(`have a error is ${JSON.stringify(err)}`)
        }
      })
    }else{
      alert('两次输入的密码不一致')
    }
  }
  componentDidUpdate(){
    if(this.state.focusIndex != null){
      switch(this.state.focusIndex){
        case 0:
          document.getElementById('username-input').focus()
          break
        case 1:
          document.getElementById('password-input').focus()
          break
        case 2:
          document.getElementById('username-input-register').focus()
          break
        case 3:
          document.getElementById('password-input-register').focus()
          break
        case 4:
          document.getElementById('password-confirm-input').focus()
          break
      }
    } 
  }
  componentDidMount(){
    var flag = false
    $('#add-close').click(() => {
      if(!flag)
        show()
      else
        hide()
      flag = !flag
    })

    $("#back-circle").click(() => {
      if(!flag)
        show()
      flag = !flag
    })

    function show(){
      $('#front-two').css('height','100%')
      setTimeout(() => {
        $('#front-two').css('overflow','hidden')
      }, 500);

      setTimeout(() => {
        $('#register').css('display','flex')
      }, 800);

      $('#add-close').addClass('add-close-ani')
      $('#add-close').removeClass('add-close-ani-back')
      $('#back-circle').addClass('back-circle-ani')
      $('#back-circle').removeClass('back-circle-ani-back')

      $('#front').addClass('front-translate')
      $('#back').addClass('front-translate')
    }

    function hide(){
      $('#register').css('display','none')
      setTimeout(() => {
        $('#front-two').css('overflow','visible')
      }, 500);

      setTimeout(() => {
        $('#front-two').css('height','1%')
      }, 1000);
    
      $('#back-circle').addClass('back-circle-ani-back')
      $('#back-circle').removeClass('back-circle-ani')     
      $('#add-close').addClass('add-close-ani-back')
      $('#add-close').removeClass('add-close-ani')

      $('#front').removeClass('front-translate')
      $('#back').removeClass('front-translate')
    }
  }
  render(){
    return(
      <div id='register-page' onClick={this.blur}>
        
        <div id='register-con'>
          <div id='back'></div>
          <div id='front'>
            <div id='title-line'></div>
            <div id='title' className='front-item'>登录</div>
            <div id='username' className='front-item' onClick={this.usernameFocus} >
              <div className={this.state.usernameTextFlag ? 'focus' : 'blur'}>用户名</div>
              <input id='username-input' style={{display: this.state.usernameTextFlag ? 'block' : 'none'}} 
                onChange={(e) => {this.setState({usernameLogin: e.target.value})}} />
              <div className='bottom-line' style={{width: this.state.usernameTextFlag ? '100%' : '0'}}></div>
            </div>
            <div id='password' className='front-item' onClick={this.passwordFocus}>
              <div className={this.state.passwordTextFlag ? 'focus' : 'blur'}>密码</div>
              <input id='password-input' type='password' style={{display: this.state.passwordTextFlag ? 'block' : 'none'}} 
                onChange={(e) => {this.setState({passwordLogin: e.target.value})}}/>
              <div className='bottom-line' style={{width: this.state.passwordTextFlag ? '100%' : '0'}} ></div>
            </div>
            <div id='btn' className={this.state.butFlag ? 'btn-target' : 'btn-pri'} onClick={this.btnClick}>
              {this.state.loadingDis && <div><Loading1 color='#ff3366' /></div>}
              {this.state.butFlag && <div id='circle' style={{top: this.state.circleTop + 'px',left: this.state.circleLeft + 'px'}}></div>}
              {(!this.state.loadingDis && !this.state.butFlag) && <span>登录</span>}
              {this.state.butFlag && <img src={require('../../images/yes.png')} />}
            </div>
            <div id='forget' className='front-item' title='暂不支持找回密码'>忘记密码？</div>
            
          </div>

          <div id='front-two'>
            <div id='add-close'>+</div>
            <div id='back-circle'></div>

            <div id='register' style={{display: 'none'}}>
              <div id='title-line-register'></div>
              <div id='title-register' className='front-item'>注册</div>
              <div id='username-register' className='front-item' onClick={this.usernameRegisterFocus}>
                <div className={this.state.usernameTextFlagRegister ? 'focus' : 'blur'}>用户名</div>
                <input id='username-input-register' style={{display: this.state.usernameTextFlagRegister ? 'block' : 'none'}} 
                  onChange={(e) => {this.setState({username: e.target.value})}} />
                <div className='bottom-line' style={{width: this.state.usernameTextFlagRegister ? '100%' : '0'}}></div>
              </div>
              <div id='password-register' className='front-item' onClick={this.passwordRegisterFocus}>
                <div className={this.state.passwordTextFlagRegister ? 'focus' : 'blur'}>密码</div>
                <input id='password-input-register' type='password' style={{display: this.state.passwordTextFlagRegister ? 'block' : 'none'}} 
                  onChange={(e) => {this.setState({password: e.target.value})}} />
                <div className='bottom-line' style={{width: this.state.passwordTextFlagRegister ? '100%' : '0'}} ></div>
              </div>
              <div id='password-confirm' className='front-item' onClick={this.passwordConfirmFocus}>
                <div className={this.state.passwordConfirmFlag ? 'focus' : 'blur'}>确认密码</div>
                <input id='password-confirm-input' type='password' style={{display: this.state.passwordConfirmFlag ? 'block' : 'none'}} 
                  onChange={(e) => {this.setState({passwordConfirm: e.target.value})}} />
                <div className='bottom-line' style={{width: this.state.passwordConfirmFlag ? '100%' : '0'}} ></div>
              </div>
              <div id='btn-register' onClick={this.registerAccount}>
                {!this.state.loadingDis && <span>注册{this.state.loginOK && '成功:)'}</span>}
                {this.state.loadingDis && <div><Loading1 color='#ff3366' /></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}