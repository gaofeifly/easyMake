import React from 'react'
import ReactDOM from 'react-dom'
import WorkPanel from '../../components/work-panel/work-panel'
import '../../css/scroll-bar.scss'

class App extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <WorkPanel />
      </div>
    )
  }
}

ReactDOM.render(<App />,document.getElementById('root'))