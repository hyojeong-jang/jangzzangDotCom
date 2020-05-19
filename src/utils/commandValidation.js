const directories = {
  'Resume': 'https://www.google.com/search?q=resume&rlz=1C5CHFA_enKR894KR894&oq=resume&aqs=chrome..69i57j69i59j0l3j69i61j69i60l2.2193j0j7&sourceid=chrome&ie=UTF-8',
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
