import { Outlet, NavLink } from 'react-router-dom'
import './index.less'
const newsList = [
  { id: '001', title: '新闻001' },
  { id: '002', title: '新闻002' },
  { id: '003', title: '新闻003' },
]

const News = () => {
  return (
    <div className="news">
      <h4>news</h4>
      <ul>
        {newsList.map((item) => {
          return (
            <li key={item.id}>
              <NavLink
                to={`/userLayout/home/news/detail?id=${item.id}&title=${item.title}`}
              >
                {item.title}
              </NavLink>
            </li>
          )
        })}
      </ul>
      <hr></hr>
      <Outlet></Outlet>
    </div>
  )
}

export default News
