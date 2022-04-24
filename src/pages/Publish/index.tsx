import { Breadcrumb, Button, Card, Form, Input, Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Channel from '@/components/Channel';
import { AppDispatch } from '@/store';
import { getChannels } from '@/store/actions';

import styles from './index.module.scss';
const Publish = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/article">内容管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form labelCol={{ span: 4 }}>
          <Form.Item label="文章标题：" name="title">
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="所属频道：" name="channel_id">
            <Channel width={400}></Channel>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary">发表文章</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Publish;
