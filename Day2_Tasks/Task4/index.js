const internshipTasks = [
  {
    id: 1,
    title: 'Setup Repository',
    category: 'Git',
    hours: 2,
    completed: true,
    priority: 'High',
  },
  {
    id: 2,
    title: 'Design Frontend Grid',
    category: 'CSS',
    hours: 4,
    completed: true,
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Implement ES6 Modules',
    category: 'JavaScript',
    hours: 3,
    completed: false,
    priority: 'High',
  },
  {
    id: 4,
    title: 'Configure ESLint & Prettier',
    category: 'Tooling',
    hours: 1,
    completed: false,
    priority: 'Low',
  },
  {
    id: 5,
    title: 'Build REST API Controller',
    category: 'Spring Boot',
    hours: 6,
    completed: false,
    priority: 'High',
  },
];

// use map method to create new array of task titles
const taskTitles = internshipTasks.map(
  (task) =>
    `${task.title} (${task.category}) - ${task.completed ? 'Completed' : 'Pending'}`
);
console.log('Task Titles:', taskTitles);

//use filter method to create array that take those data that is not yet completed
const pendingTasks = internshipTasks.filter((task) => !task.completed);
console.log('Pending Tasks:', pendingTasks);

// Use of find menthod to find a specific task by its ID
const taskIdToFind = 3;
const foundTask = internshipTasks.find((task) => task.id === 3);
console.log('Found Task:', foundTask);

// use of some method to check if any task has high priority
const hasHighPriority = internshipTasks.some(
  (task) => task.priority === 'High'
);
console.log('Any High Priority Task:', hasHighPriority);

// use of every method to check if all tasks are completed
const allTaskCompleted = internshipTasks.every((task) => task.completed);
console.log('All Tasks Completed:', allTaskCompleted);

// use of sort method to sort tasks by hours in ascending order
const sortedTaskByHours = internshipTasks.sort((a, b) => a.hours - b.hours);
console.log('Tasks Sorted by Hours:', sortedTaskByHours);

// use of sort method to sort tasks by hours in descending order
const sortedTaskByHoursDesc = internshipTasks.sort((a, b) => b.hours - a.hours);
console.log('Tasks Sorted by Hours Descending:', sortedTaskByHoursDesc);
