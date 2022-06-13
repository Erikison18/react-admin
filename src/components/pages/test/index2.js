import { Component } from 'react'

class Index2 extends Component {
  componentDidMount() {
    console.log(this)
    fetch(`https://api.github.com/search/users?q=Erikson`)
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .catch((err) => {
        console.log(err)
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err, 88)
      })
  }

  render() {
    return <div className={`test-index2`}>test-index2</div>
  }
}

export default Index2
