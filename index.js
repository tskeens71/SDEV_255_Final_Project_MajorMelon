
// Handle login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Login (replace with actual authentication logic)
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('token', 'your_jwt_token'); // Simulate storing a token
        document.getElementById('login').style.display = 'none';
        document.getElementById('courseManagement').style.display = 'block';
    } else {
        alert('Invalid credentials');
    }
});

// Handle course form submission
document.getElementById('courseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const courseData = {
        courseName: document.getElementById('courseName').value,
        description: document.getElementById('description').value,
        subjectArea: document.getElementById('subjectArea').value,
        credits: document.getElementById('credits').value
    };

    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    fetch('http://localhost:3000/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token // Include the token in the request headers
        },
        body: JSON.stringify(courseData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Course submitted successfully!');
        console.log(data);
        loadCourses(); // Refresh the course list
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Load existing courses
function loadCourses() {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    fetch('http://localhost:3000/courses', {
        method: 'GET',
        headers: {
            'Authorization': token // Include the token in the request headers
        }
    })
    .then(response => response.json())
    .then(data => {
        const courseList = document.getElementById('courseList');
        courseList.innerHTML = ''; // Clear the list
        data.forEach(course => {
            const li = document.createElement('li');
            li.textContent = `${course.courseName} - ${course.description}`;
            courseList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Load courses on page if already logged in
if (localStorage.getItem('token')) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('courseManagement').style.display = 'block';
    loadCourses();
}
