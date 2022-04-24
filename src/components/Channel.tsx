import { Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppStore } from '@/store';
import { getChannels } from '@/store/actions';
import { ArticleStateI } from '@/store/reducers/article';

export default function Channel({ width, value, onChange }: any) {
  const state: ArticleStateI = useSelector((state: AppStore) => state.article);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // 获取频道
    dispatch(getChannels());
  }, []);
  return (
    <Select
      style={{ width }}
      placeholder={'请选择所属频道'}
      value={value}
      onChange={(e) => onChange(e)}
    >
      {state.channels.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
}
