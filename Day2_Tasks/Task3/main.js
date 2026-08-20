// main.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Using let and const
  const taskGroup = 'Day 2 Tasks';
  let currentTask = 'Task 3';

  // 2. Destructuring a sample configuration/data object
  const taskDetails = {
    moduleName: 'ES6+ Features',
    features: [
      'let/const',
      'Template Literals',
      'Arrow Functions',
      'Destructuring',
    ],
  };
  const { moduleName, features } = taskDetails;

  // 3. Using Arrow Functions & Rest operator
  const formatTaskHeading = (group, task, ...subTags) => {
    return `${group}: ${task} [${subTags.join(', ')}]`;
  };

  // 4. Using Template Literals (replacing string concatenation)
  const headingText = formatTaskHeading(
    taskGroup,
    currentTask,
    moduleName,
    features[0]
  );

  // 5. DOM Update with Optional Chaining check
  const headingElement = document.querySelector('#heading');
  if (headingElement) {
    headingElement.textContent = headingText;
  }

  console.log(
    'Task 3 initialized successfully with modern JavaScript features!'
  );
});
