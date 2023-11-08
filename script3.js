const roles = {
    admin: "https://www.flaticon.com/svg/static/icons/svg/1424/1424453.svg",
    student: "https://www.flaticon.com/svg/static/icons/svg/1424/1424424.svg",
    lector: "https://www.flaticon.com/svg/static/icons/svg/1424/1424450.svg"
};

const gradation = {
    20: "satisfactory",
    55: "good",
    85: "very-good",
    100: "excellent"
};

const users = [
    {
        name: "Jack Smith",
        age: 23,
        img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922522.svg",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 20
            },
            {
                "title": "Java Enterprise",
                "mark": 100
            }
        ]
    },
    {
        name: "Amal Smith",
        age: 20,
        img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922656.svg",
        role: "student"
    },
    {
        name: "Noah Smith",
        age: 43,
        img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922616.svg",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 50
            }
        ]
    },
    {
        name: "Charlie Smith",
        age: 18,
        img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922688.svg",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 75
            },
            {
                "title": "Java Enterprise",
                "mark": 23
            }]
    },
    {
        name: "Emily Smith",
        age: 30,
        img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922565.svg",
        role: "admin",
        courses: [
            {
                "title": "Front-end Pro",
                "score": 10,
                "lector": "Leo Smith"
            },
            {
                "title": "Java Enterprise",
                "score": 50,
                "lector": "David Smith"
            },
            {
                "title": "QA",
                "score": 75,
                "lector": "Emilie Smith"
            }]
    },
    {
        name: "Leo Smith",
        age: 253,
        img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922719.svg",
        role: "lector",
        courses: [
            {
                "title": "Front-end Pro",
                "score": 78,
                "studentsScore": 79
            },
            {
                "title": "Java Enterprise",
                "score": 85,
                "studentsScore": 85
            }
        ]
    }
]

// The corresponding project code is located in the archive code.zip.
//
// 	The file script.js contains the following data:
//
// 	users - an array of system users.
// 	roles - an object representing user roles.
// 	gradation - an object with a range of grades.
// 	What needs to be done is to render a corresponding block for each user from the users array.
//
// 	For each user in the block, we display:
//
// 	User image - the img property.
// 	User name - the name property.
// 	User age - the age property.
// 	User role - the role property.
// 	If the user has the courses property, we display a list of completed courses.
//
// 	Create a main class called User, which will have the methods render and renderCourses.
//
// 	For each role, create a separate class: Student, Lector, and Admin, which inherit from the User class.
//
// In the Lector and Admin classes, override the renderCourses method to display the list of courses in the desired format.
//
// 	You can modify the provided HTML markup and CSS classes for each block as you wish. The main goal is to visually display it as shown in the image.
//
//
// 	render courses


class User {
    constructor(name, age, img, role, courses) {
        this.name = name;
        this.age = age;
        this.img = img;
        this.role = role;
        this.courses = courses || [];
    }

    render() {
        const userDiv  = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
        <div class="user__info">
            <div class="user__info--data">
                <img src="${this.img}" alt="${this.name}" height="50">
                <div class="user__naming">
                    <p>Name: <b>${this.name}</b></p>
                    <p>Age: <b>${this.age}</b></p>
                </div>
            </div>
            <div class="user__info--role ${this.role}">
                <img src="${roles[this.role]}" alt="${this.role}" height="25">
                <p>${this.role}</p>
            </div>
        </div>
        `;

        if (this.courses.length > 0) {
            const coursesDiv = document.createElement("div");

            if (this.role === 'student') {
                coursesDiv.classList.add("user__courses");
            }

            if (this.role === 'lector' || this.role === 'admin') {
                coursesDiv.classList.add("user__courses", "admin--info");
            }


            this.renderCourses(coursesDiv);

            userDiv.appendChild(coursesDiv);
        }

        return userDiv;
    }

    pickGradation(mark) {
        let result = '';
        for (const key in gradation) {
            if (mark <= key) {
                result = gradation[key];
                break;
            }
        }
        return result;
    }

    renderCourses(coursesDiv) {
    }
}
// STUDENT===================================================================================
class Student extends User {
    renderCourses(coursesDiv) {
        for (const course of this.courses) {
            const courseDiv = document.createElement("p");
            courseDiv.classList.add("user__courses--course", "student");
            courseDiv.innerHTML = `${course.title} <span class="${this.pickGradation(course.mark)}">${this.pickGradation(course.mark)}</span>`;
            coursesDiv.appendChild(courseDiv);
        }
    }
}

// ADMIN===================================================================================
class Admin extends User {
    renderCourses(coursesDiv) {
        for (const course of this.courses) {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("user__courses--course", "admin");
            courseDiv.innerHTML = `
        <p>Title: <b>${course.title}</b></p>
        <p>Admin's score: <span class="${this.pickGradation(course.score)}">${this.pickGradation(course.score)}</span></p>
        <p>Lector: <b>${course.lector}</b></p>
      `;
            coursesDiv.appendChild(courseDiv);
        }
    }
}

// LECTOR===================================================================================
class Lector extends User {
    renderCourses(coursesDiv) {
        for (const course of this.courses) {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("user__courses--course", "lector");
            courseDiv.innerHTML = `
        <p>Title: <b>${course.title}</b></p>
        <p>Lector's score: <span class="${this.pickGradation(course.score)}">${this.pickGradation(course.score)}</span></p>
        <p>Average student's score: <span class="${this.pickGradation(course.studentsScore)}">${this.pickGradation(course.studentsScore)}</span></p>
      `;
            coursesDiv.appendChild(courseDiv);
        }
    }
}

const roleToClass = {
    student: Student,
    admin: Admin,
    lector: Lector,
};

const userRenderers = users.map((user) => {
    const UserClass = roleToClass[user.role];
    return new UserClass(user.name, user.age, user.img, user.role, user.courses);
});

const usersContainer = document.querySelector('.users');

userRenderers.forEach((userRenderer) => {
    usersContainer.appendChild(userRenderer.render());
});