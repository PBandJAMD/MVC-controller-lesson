const monsterData = require('../data/monsterData');

const getMonsterNames = () => {
  return monsterData.monsters.map(monster => monster.name);
};

const getMonsterInfo = name => {
  return monsterData.monsters.filter(monster => {
    return monster.name === name;
  })[0];
};

module.exports = {
  getMonsterNames: getMonsterNames,
  getMonsterInfo: getMonsterInfo
};
