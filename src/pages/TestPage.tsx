import React from 'react';

const TestPage = () => {
  const [post, setPost] = React.useState<string>();

  return (
    <div>
      <h2>{post || 'Пока данных нет'}</h2>
      <button>Получить данные</button>
    </div>
  );
};

export default TestPage;
