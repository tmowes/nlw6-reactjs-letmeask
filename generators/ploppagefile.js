// eslint-disable-next-line func-names
module.exports = function (plop) {
  plop.setGenerator('page', {
    description: 'application page logic',
    // inquirer prompts
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'page name?',
      },
    ],

    // actions to perform
    actions: [
      {
        type: 'add',
        path: '../src/pages/{{kebabCase name}}.tsx',
        templateFile: 'templates/pages/index.tsx.hbs',
      },
    ],
  })
}
