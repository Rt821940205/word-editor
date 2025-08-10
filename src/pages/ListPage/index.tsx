// src/pages/ListPage/index.tsx
import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin } from 'antd';
import { fetchWords } from '../../api';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ListPage: React.FC = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState<Array<{ id: string; title: string; content: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getWords = async () => {
      try {
        const data = await fetchWords();
        setWords(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getWords();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: { id: string }) => (
        <a onClick={() => navigate(`/word-editor/${record.id}`)}>{text}</a>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Word List</Title>
      <Spin spinning={loading}>
        <Table dataSource={words} columns={columns} rowKey="id" pagination={false} />
      </Spin>
    </div>
  );
};

export default ListPage;