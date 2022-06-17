import { Component } from 'react'
import Count from './count'
import PersonList from './personList'
import './index.less'

class About extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <div className="about">
        <h3>about</h3>
        <hr></hr>
        <Count></Count>
        <hr></hr>
        <PersonList></PersonList>
      </div>
    )
  }
}

export default About
