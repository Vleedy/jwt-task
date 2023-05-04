import React from 'react';
import { testService } from '../services/testService';

const TestPage = () => {
  const [post, setPost] = React.useState<string>();
  const getPosts = async () => {
    const response = await testService.test();
    console.log(response);
    setPost(response.data.title);
  };
  return (
    <div>
      <h2>{post || 'Пока данных нет'}</h2>
      <button onClick={getPosts}>Получить данные</button>
    </div>
  );
};

export default TestPage;
