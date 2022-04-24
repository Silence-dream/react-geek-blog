import 'react-quill/dist/quill.snow.css';

import { PlusOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  message,
  Radio,
  Space,
  Upload,
} from 'antd';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import Channel from '@/components/Channel';
import { AppDispatch } from '@/store';
import { addArticle, editArticle, getArticle, getChannels } from '@/store/actions';

import styles from './index.module.scss';
const Publish = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  useEffect(() => {
    dispatch(getChannels());
  }, []);

  // 图片类型选择
  const [type, setType] = useState(1);
  const onTypeChange = (e: any) => {
    setType(e.target.value);
  };

  // 上传图片
  const [fileList, setFileList] = useState([]);
  const onUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  // form 表单
  const onFinish = async (
    values: {
      channel_id: number;
      content: string;
      title: string;
    },
    draft = false,
  ) => {
    if (type !== fileList.length) {
      return message.warning('请按照选择的封面类型上传图片');
    }
    console.log(fileList);
    // 发布文章数据结构
    let data: any = {
      ...values,
      cover: {
        type,
        images: fileList.map((item: any) => item?.response?.data?.url || item.url),
      },
    };
    if (params.id) {
      // 修改提交
      data.id = params.id;
      await dispatch(editArticle(data, draft));
    } else {
      // 添加提交
      await dispatch(addArticle(data, draft));
    }
    message.success('保存成功');
    history.push('/article');
  };
  // 回显数据
  const [form] = Form.useForm();
  // 获取页面参数
  const params = useParams<{ id: string }>();
  useEffect(() => {
    const initialFormValues = async () => {
      if (params.id) {
        // 回显数据
        const { title, channel_id, content, cover }: any = await dispatch(
          getArticle(params.id),
        );
        console.log(channel_id);
        form.setFieldsValue({ title, channel_id, content });
        setType(cover.type);
        // fileList [{},...] 对象中有url就可以显示图片
        setFileList(cover.images.map((item: any) => ({ url: item })));
      } else {
        // 编辑状态====>发布状态
        // 重置数据
        form.resetFields();
        setType(1);
        setFileList([]);
      }
    };
    initialFormValues();
  }, [form, params]);
  // 存入草稿
  const saveDarft = async () => {
    try {
      const values = await form.validateFields();
      onFinish(values, true);
    } catch (e) {
      console.log(e);
    }
  };
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
        <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
          <Form.Item
            label="文章标题："
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="所属频道："
            name="channel_id"
            rules={[{ required: true, message: '请选择所属频道' }]}
          >
            <Channel width={400}></Channel>
          </Form.Item>
          <Form.Item label="文章封面：">
            {/* 单选框组 如果以后加上name属性就OK，只能有一个子元素*/}
            <Form.Item style={{ marginBottom: 0 }}>
              <Radio.Group value={type} onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 上传组件 */}
            {type > 0 && (
              <div style={{ marginTop: 16 }}>
                <Upload
                  action="http://geek.itheima.net/v1_0/upload"
                  listType="picture-card"
                  name="image"
                  fileList={fileList}
                  onPreview={() => {}}
                  onChange={onUploadChange}
                >
                  {fileList.length >= type ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>上传图片</div>
                    </div>
                  )}
                </Upload>
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="文章内容："
            name="content"
            initialValue=""
            wrapperCol={{ span: 16 }}
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill placeholder="请输入文章内容" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType={'submit'}>
                {params.id ? '修改' : '发布'}文章
              </Button>
              <Button onClick={saveDarft}>存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Publish;
