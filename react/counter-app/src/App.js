
import React from "react"
import {render} from "react-dom"

class App extends React.Component {
  
    constructor(props){
      super(props)
      this.state = {
        count: 0,
        intervalId: 0
      }
      // this.increaseCount = this.increaseCount.bind(this)  // to use arrow function is more sense 
    }
  
    increaseCount(){
      //this.setState( { count : this.state.count + 1} ) // run asynchronously
      if(this.state.intervalId === 0){
        this.setState(
          prevState => ( {
            count : prevState.count+1
          } )
        )
      }
    }

    decreaseCount(){
      //this.setState( { count : this.state.count - 1} )
      if(this.state.intervalId === 0){
        this.setState(
          prevState => ( {
            count : prevState.count-1
          } )
        )
      }
    }

    setTimer(){
      if(this.state.intervalId === 0){
        this.setState(
          {
            intervalId : setInterval( () => (
              this.setState(
                prevState => ( {
                  count : prevState.count + 1
                } )
              )
            ), 1000)
          }
        )
      }
      else{
        clearInterval(this.state.intervalId)
        this.setState(
          {
            intervalId : 0
          }
        )
      }

                
    }

    render() {
      return (
        <div>
          <button onClick={ () => this.increaseCount() } > Increase </button>
          <button onClick={ () => this.decreaseCount() } > Decrease </button>
          <button onClick={ () => this.setTimer() } > Timer Mode </button>
          <h1> {this.state.count} </h1>
        </div>
      )
    }
  
  }



export default App;
