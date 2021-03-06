import { Button, Checkbox, Form, Input } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './index.less'
let {
  actiontor: { setUserInfo, setLoginFlag },
} = require('@models/login')
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const Login = () => {
  const { userInfo } = useSelector((state) => {
    console.log(state)
    return state.login
  })
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    // console.log('123--useEffect', userInfo)
  })
  // const [values, setValues] = useState({
  //   username: '',
  //   password: '',
  //   remember: false,
  // })
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log('Success:', values)
    getSearchList(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onClickSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        getSearchList(values)
      })
      .catch((errorInfo) => {
        console.log('errorInfo', errorInfo)
      })
  }

  const getSearchList = async (values) => {
    setLoading(true)
    let { code, data } = await fetch(`/tenapi/bilibili/?uid=${values.username}`)
    if (code === 200) {
      dispatch(setUserInfo(data))
      dispatch(setLoginFlag(true))
      navigate('/userLayout/test')
    } else {
      dispatch(setUserInfo({}))
      dispatch(setLoginFlag(false))
    }
    setLoading(false)
  }

  return (
    <div className="login">
      <h4>login-name</h4>
      <Form
        {...layout}
        form={form}
        className="login-form"
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password autoComplete="true" />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            Form Submit
          </Button>
          <Button
            type="primary"
            // htmlType="submit"
            onClick={onClickSubmit}
            loading={loading}
          >
            Click Submit
          </Button>
        </Form.Item>
      </Form>
      <h5>?????????????????????{userInfo.name}</h5>
    </div>
  )
}
export default Login
