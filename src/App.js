import React, { useState, useCallback } from 'react';
import styles from './style/css/App.module.css';
import Typist from 'react-typist';

import commandValidation from './utils/commandValidation'
import houseIcon from './style/image/houseIcon.png';
import fileIcon from './style/image/fileIcon.png';
import { commandHead } from './constant/index';
import UsageModal from './UsageModal';

function App () {
  const [ isTypingDone, setIsTypingDone ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ commandList, setCommandList ] = useState([]);
  const [ currentDirectory, setCurrentDirectory ] = useState(null);
  const [ directoryHistory, setDirectoryHistory ] = useState(['~']);

  const onFolderClick = useCallback(() => {
    setIsModalOpen(true);
  });

  const onTypingDone = useCallback(() => {
    setTimeout(() => {
      setIsTypingDone(true);
    }, 500)
  });

  const onEnterKeyUp = useCallback((e) => {
    if (window.event.keyCode === 13) {
      if (e.target.value === 'open .') {
        const output = commandValidation(currentDirectory);
        const command = {
          input: e.target.value,
          output: output.text,
          directory: currentDirectory
        };

        setDirectoryHistory([ ...directoryHistory, '~' ]);
        setCommandList([ ...commandList, command ]);
        e.target.value = '';
        return window.open(output.url);
      }

      if (e.target.value === 'cd ..') {
        setCurrentDirectory('~');
        setDirectoryHistory([ ...directoryHistory, '~' ]);
      }

      const output = commandValidation(e.target.value);

      if (output.text) {
        const command = {
          input: e.target.value,
          output: output.text
        };

        setDirectoryHistory([ ...directoryHistory, '~' ]);
        setCommandList([ ...commandList, command ]);
      } else {
        const command = {
          input: e.target.value,
          output: null,
          directory: currentDirectory
        };

        setCommandList([ ...commandList, command ]);
        setCurrentDirectory(output.dir);
        setDirectoryHistory([ ...directoryHistory, output.dir ]);
      }

      e.target.value = '';
    }
  });

  const options = {
    show: true,
    blink: false,
    element: '|',
    hideWhenDone: true,
    hideWhenDoneDelay: 0
  };

  return (
    <div className={styles.outter}>
      <div
        onClick={onFolderClick}
        className={styles.fileContainer}
      >
        <img src={fileIcon} className={styles.fileIcon} />
      </div>
      <p className={styles.fileName}>README.md</p>
      {
        isModalOpen
        && <UsageModal onClose={setIsModalOpen} />
      }
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.button1}></div>
          <div className={styles.button2}></div>
          <div className={styles.button3}></div>
          <div className={styles.headerContainer}>
            <div className={styles.iconContainer}>
              <img src={houseIcon} className={styles.houseIcon} />
            </div>
            <p className={styles.headerText}>jangzzang - bash</p>
          </div>
        </div>
        <div className={styles.consoleContainer}>
          <Typist
            cursor={options}
            onTypingDone={onTypingDone}
          >
            <span>{`Please check the README.md and enter the command ^^`}</span>
            <Typist.Backspace count={2} delay={200} />
            <span>{` ^o^`}</span>
          </Typist>
          {
            commandList.map((command, idx) => {
              return <div key={idx}>
                {
                  command.output !== undefined
                  && <p>{`${commandHead.replace('~', directoryHistory[idx])} ${command.input}`}<br/>{`${command.output ? command.output : ''}`}</p>
                }
              </div>
            })
          }
          {
            isTypingDone
            && <div>
              {`${currentDirectory ? commandHead.replace('~', currentDirectory) : commandHead} `}
              <input
                type='text'
                onKeyUp={onEnterKeyUp}
                className={styles.command}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
