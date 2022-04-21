import 'moment/locale/zh-cn.js';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Radio,
  Select,
  Space,
  Table,
} from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppDispatch, AppStore } from '@/store';
import { getChannels } from '@/store/actions';
import { ArticleStateI } from '@/store/reducers/article';

import styles from './index.module.scss';

const Article = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state: ArticleStateI = useSelector((state: AppStore) => state.article);
  // 表单验证
  const onFinish = (value: any) => {
    console.log(value);
  };
  useEffect(() => {
    // 获取频道
    dispatch(getChannels());
  }, []);
  // 列表配置
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: () => '自定义封面',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: () => '自定义状态',
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
      key: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
      key: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      key: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
      key: 'like_count',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} />
          <Button type="link" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];
  return (
    <div className={styles.root}>
      <Card
        title={
          // 面包屑
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form onFinish={onFinish}>
          <Form.Item label="状态：" name="status">
            <Radio.Group>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>已通过</Radio>
              <Radio value={3}>已拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道：" name="channel_id">
            <Select style={{ width: 288 }}>
              {state.channels.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期：" name="dateArr">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item>
            {/* antd4.0 Button 组件的 htmltype 值是 button 不是 submit,submit 才能触发 Form*/}
            <Button type="primary" htmlType={'submit'}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 筛选结果 */}
      <Card title={`根据筛选条件共查询到 100 条结果：`} style={{ marginTop: 24 }}>
        放置表格组件
        <Table columns={columns} dataSource={[]}></Table>
      </Card>
    </div>
  );
};

export default Article;
