
import React, { Component } from 'react'
import { apodAPI , apodAPIByDate } from "./api/apodAPI";

export default class App extends Component {

  constructor()
  {
    super()
    this.state = {
      type : "image",
      url : "",
      title : "",
      explanation : ""
    }
  }

  componentDidMount()
  {
    apodAPI.then(res=>{
        this.setState({url : res.url , title : res.title , explanation : res.explanation , type : res.media_type})
      })
      .catch(err=>console.log(err))
  }

  onChange = (event)=>{
    apodAPIByDate(event.target.value).then(res=>
      {
        this.setState({url : res.url , title : res.title , explanation : res.explanation , type : res.media_type})
      }
    )
    .catch(err=>console.log("error",err))
  }

  render() {
    console.log("rendser",this.state)
    let todayDate = new Date()           
    todayDate = `${todayDate.getFullYear()}-${(todayDate.getMonth()+1)>9 ? (todayDate.getMonth()+1) : '0'+(todayDate.getMonth()+1).toString()}-${todayDate.getDate()>9 ? todayDate.getDate() : '0'+todayDate.getDate().toString()}`
    return (
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-9'>
            <h3><b>Title : </b>{this.state.title}</h3>
          </div>
          <div className='col-3'>
            <input type="date" name = "date" onChange={this.onChange} defaultValue={todayDate} max={todayDate} min = '1965-01-01' />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            {this.state.type == "image" ? <img src={this.state.url} width="100%" height = "100%" /> : 
            <div className="embed-responsive embed-responsive-16by9">
            <iframe width="100%" height='550px' className="embed-responsive-item" src={this.state.url}></iframe>
            </div>}
          </div>
          <div className='col-12 mt-2'><b>Explanation : </b>{this.state.explanation}</div>
        </div>
      </div>
      
    )
  }
}

