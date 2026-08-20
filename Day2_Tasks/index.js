const sayHello = () => {
  console.log('Hello, World!');
};

sayHello();

const greetingUser = (greeting, name) => {
  console.log(`${greeting},Hope So You Are Fine ${name}!`);
};

greetingUser('Good Morning !', 'John');

const x = {
  name: 'Raja Attique',
  role: 'Software Engineer',
  location: 'Pakistan',
  skills: ['JavaScript', 'React', 'Node.js'],
  show: function () {
    console.log(
      `Name : ${this.name} , Role : ${this.role} , Location : ${this.location} , Skills : ${this.skills.join(', ')}`
    );
  },
};
x.show();

const fruits = ['Apple', 'Banana', 'Mango', 'Orange', 'Grapes'];
const vegetable = ['Carrot', 'Potato', 'Tomato', 'Onion', 'Cabbage'];

const combined = [...fruits, ...vegetable];
console.log(combined);
