import React, { Component } from 'react'
import TopNavigations from './TopNavigations'

export default class Support extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       score:0,
       wickets:0
    }
  }

  componentDidMount=()=>{
    console.log("onComponent load")
  }

  componentWillUnmount = ()=>{
    console.log("onComponent unload")
  }
  
  shouldComponentUpdate = () => {
    console.log("any component update")
    return true;
  }

  componentDidUpdate = ()=>{
    console.log("component updted")
  }

  render() {
    return (
      <div>
        <TopNavigations/>

        <button
        // onClick={() => {
        //   if (show == true) {
        //     // setShow(false);
        //   } else {
        //     // setShow(true);
        //   }
        // }}
      >
        load/unload Components
      </button>

      <h2>score:{this.state.score}/{this.state.wickets}</h2>

      <button
        type="button"
        onClick={() => {
          this.setState({score:this.state.score+1})
        }}
      >
        Score+
      </button>

      <button
        onClick={() => {
          this.setState({score:this.state.score-1})
        }}
      >
        score-
      </button>
      <hr></hr>

      <button
        type="button"
        onClick={() => {
         this.setState({wickets:this.state.wickets+1})
        }}
      >
        wickets+
      </button>

      <button
        onClick={() => {
          this.setState({wickets:this.state.wickets-1})
        }}
      >
        wickets-
      </button>
      </div>
    )
  }
}
