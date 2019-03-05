global.data = {
  isLogin: false
}
global.setCookie = (username) => {
  var time = 60 * 60 * 1000
  var exp = new Date()
  exp.setTime(exp.getTime() + time)
  document.cookie = 'username=' + username + '; expires=' + exp.toString() + '; path=/; domain=www.lgaofei.xyz'
}
global.getCookie = () => {
  global.data.isLogin = false
  if(document.cookie.indexOf('Invalid Date') > -1)
    return null
  var index = document.cookie.indexOf('username=')
  if(index > -1){
    global.data.isLogin = true
    return document.cookie.substring(index + 'username='.length).split(';')[0]
  }else{
    return null
  }
}
global.deleteCookie = () => {
  var exp = new Date()
  exp.setDate(exp.getTime() - 1)
  var username = global.getCookie()
  if(username != null){
    document.cookie = 'username=' + username + '; expires=' + exp.toString()
  }
  global.data.isLogin = false
}

global.createArrayFromOneToNum = (num) => {
  var arr = []
  for(var i=1;i<=num;i++){
    arr.push(i)
  }
  return arr
}
