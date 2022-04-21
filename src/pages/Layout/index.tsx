import './index.scss';

import {
  FileWordOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Popconfirm } from 'antd';

const { Header, Sider, Content } = Layout;

const GeekLayout = () => {
  return (
    <Layout className="geek-layout">
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark">
          <Menu.Item icon={<PieChartOutlined />} key="1">
            数据面板
          </Menu.Item>
          <Menu.Item icon={<SolutionOutlined />} key="2">
            内容管理
          </Menu.Item>
          <Menu.Item icon={<FileWordOutlined />} key="3">
            发布文章
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{'name'}</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认"
              cancelText="取消"
            >
              <Button type="link" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content>内容</Content>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
