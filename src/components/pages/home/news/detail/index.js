import { useLocation, useParams } from 'react-router-dom'
import qs from 'qs'

const Detail = () => {
  const location = useLocation()
  const params = useParams()
  let query = qs.parse(location.search.slice(1))
  console.log(location, params, query)

  return (
    <div className="detail">
      <ul>
        <li>新闻编号：{query.id}</li>
        <li>新闻标题：{query.title}</li>
      </ul>
    </div>
  )
}

export default Detail
