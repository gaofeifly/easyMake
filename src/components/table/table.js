import React from 'react'

class ProductTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchText: '',
            isFilter: false
        }
        this.data = [{name: 'lgf',price: 199,category: 'a',stock: 9},
                    {name: 'sdf',price: 199,category: 'a',stock: 9},
                    {name: 'lgsadfasff',price: 199,category: 'a',stock: 0},
                    {name: 'wervb',price: 199,category: 'b',stock: 9},
                    {name: '456fg',price: 199,category: 'b',stock: 0},]
        this.changeFilter = this.changeFilter.bind(this)
        this.changeSearchText = this.changeSearchText.bind(this)
    }
    changeSearchText(text){
        this.setState({
            searchText: text
        })
    }
    changeFilter(checked){
        this.setState({
            isFilter: checked
        })
    }
    render(){
        var data = []
        if(this.state.searchText != ""){
            if(this.state.isFilter){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].name.indexOf(this.state.searchText) > -1 && this.data[i].stock > 0)
                        data.push(this.data[i])
                }
            }else{
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].name.indexOf(this.state.searchText) > -1)
                        data.push(this.data[i])
                }
            }   
        }else{
            data = this.data
        }
        return(
            <div>
                <Search isFilter={this.state.isFilter} handleInput={this.changeSearchText} handleCheckbox={this.changeFilter}/>
                <Result data={data}/>
            </div>
        )
    }
}

class Search extends React.Component {
    constructor(props){
        super(props)
        this.handleInput = this.handleInput.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
    }
    handleInput(e){
        this.props.handleInput(e.target.value)
    }
    handleCheck(e){
        this.props.handleCheckbox(e.target.checked)
    }
    render(){
        return(
            <div>
                <input placeholder='search..' onChange={this.handleInput}></input>
                <label>
                    <input type='checkbox' checked={this.props.isFilter} onChange={this.handleCheck}></input>
                    有库存
                </label>
            </div>
        )
    }
}

class Result extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        var data = this.props.data
        var res = {}
        for(var i=0;i<data.length;i++){
            if(!res[data[i].category])
                res[data[i].category] = []
            res[data[i].category].push(data[i])
        }
        var content = []
        Object.keys(res).map((c) => {
            content.push({category: c,data: res[c]})
        })
        var ContentItems = content.map((c,index) => <ContentItem data={c} key={index} />) 
        return(
            <div>
                <p className='ppp'>Name    Price</p>
                {ContentItems}
            </div>
        )
    }
}

class ContentItem extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        var data = this.props.data
        var NamePrices = data.data.map((d,index) => <NamePrice name={d.name} price={d.price} key={index}/>)
        return(
            <div>
                <Category category={data.category}/>
                {NamePrices}
            </div>
        )
    }
}

class Category extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return <h3>{this.props.category}</h3>
    }
}

class NamePrice extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return <p>{this.props.name}  ${this.props.price}</p>
    }
}

export default ProductTable