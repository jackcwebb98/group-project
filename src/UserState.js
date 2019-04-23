import React, { Component, createContext } from "react";
import {checkUser} from './' 

const { Provider, Consumer } = createContext();



class UserState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      name: '',
      bio: '',
      url: '',
    }
  }


  render() {
    console.log(this.state)
    return (
      <Provider
        value={{
          state: this.state,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { UserState }

export default Consumer
