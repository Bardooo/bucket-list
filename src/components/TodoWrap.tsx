import React from 'react';
import axios from 'axios';

import Todo from './Todo';

const TodoWrap = () => {
  const [job, setJob] = React.useState([]);

  React.useEffect(() => {
    async function fetchDeeds() {
      try {
        const { data } = await axios.get('https://6395e89b90ac47c680775c7d.mockapi.io/deeds');

        setJob(data);
      } catch (error) {
        alert('Ошибка при получении данных с сервера');
      }
    }

    fetchDeeds();
  }, []);

  if (!job) {
    return <>загрузка...</>;
  }

  const onClickRemove = async (deletedId: string) => {
    try {
      await axios.delete(`https://6395e89b90ac47c680775c7d.mockapi.io/deeds/${deletedId}`)
      setJob(prev => prev.filter(item => item.id !== deletedId))
    } catch (error) {
      alert('ошибка при удалении дела')
    }
  }
  

  return (
    <div className="list__main-block">
      <div className="list__main-block-title">Список дел:</div>
      <ul className="list__main-block-list">
        {job.map((obj: { id: string, title: string }) => (
          <li className="list__main-block-list-item" key={obj.id}>
            <Todo onClickRemove={onClickRemove} title={obj.title} id={obj.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoWrap;