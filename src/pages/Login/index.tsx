import './index.scss';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import logo from '@/assets/logo.png';
import { AppDispatch, AppStore } from '@/store';
import { login } from '@/store/actions';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const store = useSelector((state: AppStore) => state.user);
  const onFinish = async (values: {
    mobile: string;
    code: string;
    remember: boolean;
  }) => {
    // 获取传入的值
    console.log('Success:', values);
    const { mobile, code } = values;
    try {
      await dispatch(login(mobile, code));
      history.replace('/home');
    } catch (e) {
      message.error('登录失败');
    }
    console.log(store);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login">
      <div className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          name="basic"
          initialValues={{ mobile: '13911111111', code: '246810', remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateTrigger={['onBlur', 'onChange']} // 表单验证触发事件
          autoComplete="off"
          size={'large'}
        >
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
              {
                len: 6,
                message: '密码长度不能小于6位',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => {
                  if (value === true) return Promise.resolve();
                  else return Promise.reject(new Error('请勾选我已阅读并同意'));
                },
              },
            ]}
          >
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
