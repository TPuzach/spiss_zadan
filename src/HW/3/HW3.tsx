import React, { ChangeEvent, useState, KeyboardEvent } from 'react';

export const HW3 = () => {
  type TextType = {
    id: number;
    text: string;
    isCompleted: boolean;
  };

  const [currentText, setCurrentText] = useState('');
  const [texts, setTexts] = useState<TextType[]>([
    { id: 1, text: 'Przyjść do pracy', isCompleted: false },
  ]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const removeTask = (id: number) => {
    setTexts((prevTexts) => prevTexts.filter((el) => el.id !== id));
  };

  const doneTask = (id: number) => {
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, id]);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentText(event.currentTarget.value);
  };

  const handleSave = () => {
    if (currentText) {
      const newText: TextType = {
        id: texts.length + 1,
        text: currentText,
        isCompleted: false,
      };

      setTexts((prevTexts) => [...prevTexts, newText]);
      setCurrentText('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
      <div id={'hw03'}>
        {currentText ? (
            <h1 id={'hw03-text'}>{currentText}</h1>
        ) : (
            <h1 id={'hw03-default-text'}>{currentText}</h1>
        )}

        <input
            id={'hw03-input'}
            type="text"
            value={currentText}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
        />

        <button id={'hw03-button'} onClick={handleSave} className="save-button">
          Dodaj
        </button>
        <h1 style={{ marginTop: '50px' }}>Co muszę dzisiaj zrobić:</h1>

        <ol id={'hw03-tasks'}>
          {texts.map((el, index) => {
            const isCompleted = completedTasks.includes(el.id);
            return (
                <li key={index} id={`hw03-task-${index}`}>
              <span className={isCompleted ? 'completed-task' : 'uncompleted-task'}>
                {el.text}
              </span>
                  <button
                      onClick={() => doneTask(el.id)}
                      style={{ marginLeft: '10px' }}
                      className="done-button"
                  >
                    ✓
                  </button>
                  <button
                      onClick={() => removeTask(el.id)}
                      style={{ marginLeft: '10px' }}
                      className="delete-button"
                  >
                    X
                  </button>
                </li>
            );
          })}
        </ol>
      </div>
  );
};