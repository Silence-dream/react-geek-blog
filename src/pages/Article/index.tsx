import 'moment/locale/zh-cn.js';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Image,
  message,
  Modal,
  Radio,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import defaultImg from '@/assets/error.png';
import { AppDispatch, AppStore } from '@/store';
import { delArticle, getArticles, getChannels } from '@/store/actions';
import { ArticleStateI } from '@/store/reducers/article';

import styles from './index.module.scss';
// 状态常量数据
const statusLabel = [
  { label: '草稿', color: 'default' },
  { label: '待审核', color: 'blue' },
  { label: '已通过', color: 'green' },
  { label: '已拒绝', color: 'red' },
];
const Article = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state: ArticleStateI = useSelector((state: AppStore) => state.article);

  // 请求参数
  // 使用 Ref 来保存数据可以避免页面的重复渲染
  const params = useRef({
    status: undefined,
    channel_id: undefined,
    begin_pubdate: undefined,
    end_pubdate: undefined,
    page: 1,
    per_page: 20,
  });
  // 表单验证
  const onFinish = (value: any) => {
    // 请求参数对象
    params.current.status = value.status;
    params.current.channel_id = value.channel_id;
    if (value.dateArr) {
      // 日期数据默认是moment对象
      params.current.begin_pubdate = value.dateArr[0].format('YYYY-MM-DD HH:mm:ss');
      params.current.end_pubdate = value.dateArr[1].format('YYYY-MM-DD HH:mm:ss');
    } else {
      params.current.begin_pubdate = undefined;
      params.current.end_pubdate = undefined;
    }
    params.current.page = 1;
    dispatch(getArticles(params.current));
    console.log(params);
  };
  useEffect(() => {
    // 获取频道
    dispatch(getChannels());
    // 获取文章
    dispatch(getArticles());
  }, []);
  const editArticleFn = (recordId: string) => {
    console.log(recordId);
    // 确认框
    Modal.confirm({
      title: '您确认删除该篇文章吗？',
      onOk: async () => {
        // 删除
        await dispatch(delArticle(recordId));
        // 更新列表数据
        await dispatch(getArticles(params.current));
        // 提示
        message.success('删除成功');
      },
    });
  };
  // 列表配置
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (cover: any) => {
        return (
          <Image
            width={200}
            height={150}
            style={{ objectFit: 'cover' }}
            src={cover?.images?.[0] || defaultImg}
          />
        );
      },
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
      render: (status: 0 | 1 | 2 | 3) => {
        const info = statusLabel[status];
        return <Tag color={info.color}>{info.label}</Tag>;
      },
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
      render: (record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => editArticleFn(record.id)}
          />
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
      <Card
        title={`根据筛选条件共查询到 ${state.articleList.total_count} 条结果：`}
        style={{ marginTop: 24 }}
      >
        放置表格组件
        <Table
          rowKey="id"
          columns={columns}
          dataSource={state.articleList.results}
          pagination={{
            current: state.articleList.page,
            pageSize: state.articleList.per_page,
            total: state.articleList.total_count,
            onChange: async (page: number, pageSizeOptions) => {
              params.current.page = page;
              params.current.per_page = pageSizeOptions;
              await dispatch(getArticles(params.current));
            },
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default Article;
