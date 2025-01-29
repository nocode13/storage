const dashify = require('dashify');

// описание в README.md

module.exports = {
  plugins: [
    [
      'transform-imports',
      {
        'entities/user': {
          transform: (importName) => importTransformer(importName, 'user'),
        },
      },
    ],
  ],
};

function importTransformer(importName, entity) {
  const isLib = importName.includes('Lib');
  const isModel = importName.includes('Model');
  const isConfig = importName.includes('Config');

  if (isLib) return `entities/${entity}/lib`;

  if (isModel) return `entities/${entity}/model`;

  if (isConfig) return `entities/${entity}/config`;

  const componentName = entity.slice(0, 1).toUpperCase() + entity.slice(1);

  const removedEntityName = importName.replace(componentName, '');

  return `entities/${entity}/ui/${dashify(removedEntityName)}`;
}
