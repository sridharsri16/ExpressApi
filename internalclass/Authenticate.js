module.exports = class Authenticate
{
    constructor(username,password,userid){
        this.username=username
        this.password =password
        this.userid =userid
    } 
};

// class Person {
//     constructor({firstName, lastName, job}) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.job = job;
//         this.skills = [];
//         Person._amount = Person._amount || 0;
//         Person._amount++;
//     }

//     static get amount() {
//         return Person._amount;
//     }
    
//     get fullName() {
//         return `${this.firstName} ${this.lastName}`;
//     }

//     set fullName(fN) {
//         if (/[A-Za-z]\s[A-Za-z]/.test(fN)) {
//             [this.firstName, this.lastName] = fN.split(' ');
//         } else {
//             throw Error('Bad fullname');
//         }
//     }

//     learn(skill) {
//         this.skills.push(skill);
//     }
// }

// class Job {
//     constructor(company, position, salary) {
//         this.company = company;
//         this.position = position;
//         this.salary = salary;
//     }
// }

// const john = new Person({
//     firstName: 'John',
//     lastName: 'Doe',
//     job: new Job('Youtube', 'developer', 200000)
// });

// const roger = new Person({
//     firstName: 'Roger',
//     lastName: 'Federer',
//     job: new Job('ATP', 'tennis', 1000000)
// });

// john.fullName = 'Mike Smith';
// john.learn('es6');
// roger.learn('programming');
// john.learn('es7');