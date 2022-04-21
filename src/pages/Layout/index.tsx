import {
  FileWordOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Popconfirm } from 'antd';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import Article from '@/pages/Article';
import Dashboard from '@/pages/Dashboard';
import NotFond from '@/pages/NotFond';
import Publish from '@/pages/Publish';

import styles from './index.module.scss';

const { Header, Sider, Content } = Layout;

const GeekLayout = () => {
  return (
    <Layout className={styles.root}>
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark">
          <Menu.Item icon={<PieChartOutlined />} key="1">
            <Link to="/dashboard">数据面板</Link>
          </Menu.Item>
          <Menu.Item icon={<SolutionOutlined />} key="2">
            <Link to="/article">内容管理</Link>
          </Menu.Item>
          <Menu.Item icon={<FileWordOutlined />} key="3">
            <Link to="/publish">发布文章</Link>
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
        <Content>
          {/*嵌套路由渲染*/}
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/dashboard" />}></Route>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/article" component={Article} />
            <Route path="/publish/:id?" component={Publish} />
            {/* 404 页面*/}
            <Route>
              <NotFond />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
