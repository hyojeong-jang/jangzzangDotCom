const directories = {
  'Resume': 'https://chaekbonnal.s3.ap-northeast-2.amazonaws.com/%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%92%E1%85%AD%E1%84%8C%E1%85%A5%E1%86%BC_resume.pdf',
  'ChaekBonNal': 'https://github.com/hyozzang2/ChaekBonNal-client',
  'Battle-Underground': 'https://github.com/hyozzang2/battleUnderground-client'
};

const commandList = {
  'ls': 'Resume ChaekBonNal Battle-Underground',
  'cd': 'cd',
  'open .': 'open .'
};

const commandValidation = (input) => {
  for (const command in commandList) {
    if (command === input) {

      return { text: commandList[command] };
    } else if (directories[input]) {
      return { text: null, url: directories[input] };
    }
  }

  if (input.includes('cd')) {
    const dir = input.split(' ')[1];

    if (!directories[dir]) {
      return `no such file or directory: ${dir}`
    }

    return { text: null, dir };
  }
  return `command not found: ${input}`
};

export default commandValidation
