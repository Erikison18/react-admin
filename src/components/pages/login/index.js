import { Button, Checkbox, Form, Input } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
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
    await fetch(`/tenapi/bilibili/?uid=${values.username}`).then((res) => {
      console.log(res)
      navigate('/userLayout/test')
    })
    setLoading(false)
  }

  return (
    <div className="login">
      <h4>login</h4>
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
    </div>
  )
}
export default Login
