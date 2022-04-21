import {
  FileWordOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Popconfirm } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import Article from '@/pages/Article';
import Dashboard from '@/pages/Dashboard';
import NotFond from '@/pages/NotFond';
import Publish from '@/pages/Publish';
import { AppDispatch, AppStore } from '@/store';
import { getUserInfo, logout } from '@/store/actions';

import styles from './index.module.scss';

const { Header, Sider, Content } = Layout;

const GeekLayout = () => {
  let location = useLocation();
  let history = useHistory();
  let dispatch = useDispatch<AppDispatch>();
  let state = useSelector((state: AppStore) => state.user);
  // 菜单高亮
  let selectedKey = location.pathname;
  // 页面加载获取用户信息
  useEffect(() => {
    try {
      dispatch(getUserInfo());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  // confirm 退出登录
  const confirm = async () => {
    await dispatch(logout());
    history.push('/login');
  };
  return (
    <Layout className={styles.root}>
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu
          defaultSelectedKeys={['/dashboard']}
          selectedKeys={[selectedKey]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item icon={<PieChartOutlined />} key="/dashboard">
            <Link to="/dashboard">数据面板</Link>
          </Menu.Item>
          <Menu.Item icon={<SolutionOutlined />} key="/article">
            <Link to="/article">内容管理</Link>
          </Menu.Item>
          <Menu.Item icon={<FileWordOutlined />} key="/publish">
            <Link to="/publish">发布文章</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{state.useInfo?.name}</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={confirm}
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
