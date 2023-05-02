import React from 'react';
import AuthService from './services/AuthService';

const TestPage = () => {
  const [post, setPost] = React.useState();
  const getPosts = async () => {
    const response = await AuthService.test();
    console.log(response);
    setPost(response.data.title);
  };
  return (
    <div>
      <h2>{post || 'Пока постов нет'}</h2>
      <button onClick={getPosts}>Получить посты</button>
    </div>
  );
};

export default TestPage;
