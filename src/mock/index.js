// src/mock/index.ts
import Mock from 'mockjs';

Mock.setup({
  timeout: '200-600', // 设置请求响应时间范围
});

Mock.mock('/users/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body);
  if (username === 'user' && password === 'password') {
    return {
      role: 'viewer',
    };
  } else if (username === 'admin' && password === 'password') {
    return {
      role: 'admin',
    };
  } else {
    return Mock.mock({
      code: 401,
      message: 'Invalid credentials',
    });
  }
});

Mock.mock('/words', 'get', () => {
  return Mock.mock({
    data: [
      {
        id: '1',
        title: '@ctitle(5, 10)',
        content: '<p>This is the first word document.</p>',
      },
      {
        id: '2',
        title: '@ctitle(5, 10)',
        content: '<p>This is the second word document.</p>',
      },
      {
        id: '3',
        title: '@ctitle(5, 10)',
        content: '<p>This is the third word document.</p>',
      },
      {
        id: '4',
        title: '@ctitle(5, 10)',
        content: '<p>This is the fourth word document.</p>',
      },
      {
        id: '5',
        title: '@ctitle(5, 10)',
        content: '<p>This is the fifth word document.</p>',
      },
    ],
  });
});

Mock.mock(/\/words\/(\w+)/, 'get', (options) => {
  const id = options.url.split('/').pop();
  console.log(id)
  const words = [
    {
      id: '1',
      title: 'First Word Document',
      content: '<p>This is the first word document.</p>',
    },
    {
      id: '2',
      title: 'Second Word Document',
      content: '<p>This is the second word document.</p>',
    },
    {
      id: '3',
      title: 'Third Word Document',
      content: '<p>This is the third word document.</p>',
    },
    {
      id: '4',
      title: 'Fourth Word Document',
      content: '<p>This is the fourth word document.</p>',
    },
    {
      id: '5',
      title: 'Fifth Word Document',
      content: '<p>This is the fifth word document.</p>',
    },
  ];
  const word = words.find(w => w.id === id);
  if (word) {
    return word;
  } else {
    return Mock.mock({
      code: 404,
      message: 'Word not found',
    });
  }
});