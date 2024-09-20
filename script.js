document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is running');
    const courseList = document.getElementById('courseList');
    const courseSelect = document.getElementById('courseSelect');
    const scheduleList = document.getElementById('scheduleList');

    // Sample courses
    const sampleCourses = [
        {
            name: "Introduction to Computer Science",
            description: "Learn the basics of computer science, including algorithms, data structures, and programming languages.",
            subjectArea: "Computer Science",
            credits: 3,
            teacher: "Prof. Mark Smith"
        },
        {
            name: "Calculus I",
            description: "An introduction to calculus.",
            subjectArea: "Mathematics",
            credits: 4,
            teacher: "Prof. Jane Smith"
        },
        {
            name: "English 101",
            description: "Study the basics of English and proper techniques of writing skills .",
            subjectArea: "English",
            credits: 3,
            teacher: "Dr. Emily Brown"
        },
        {
            name: "Chemistry I",
            description: "Explore the principles of chemistry and chemical reactions.",
            subjectArea: "Chemistry",
            credits: 4,
            teacher: "Prof. Sam Brown"
        },
        {
            name: "Ancient History",
            description: "Explore the ancient civilizations of the past .",
            subjectArea: "History",
            credits: 3,
            teacher: "Prof. Joe Morris"
        }
    ];

    console.log('Sample courses:', sampleCourses);

    // Populate dropdown with sample courses
    sampleCourses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.name.toLowerCase().replace(/\s+/g, '-');
        option.textContent = `${course.name} - ${course.teacher}`;
        courseSelect.appendChild(option);
    });

    console.log('Dropdown populated with courses');

    // Add to Schedule
    document.getElementById('addToSchedule').addEventListener('click', function() {
        const selectedOptions = Array.from(courseSelect.selectedOptions);
        selectedOptions.forEach(option => {
            const courseName = option.textContent.split(' - ')[0];
            const course = sampleCourses.find(c => c.name === courseName);

            // Check if course is already in the schedule
            const existingItems = Array.from(scheduleList.children);
            const alreadyInSchedule = existingItems.some(item => item.textContent.includes(courseName));
            if (!alreadyInSchedule) {
                const scheduleItem = document.createElement('li');
                scheduleItem.className = 'list-group-item';
                scheduleItem.innerHTML = `
                    <strong>${course.name}</strong>
                    <p>${course.description}</p>
                    <p>Subject Area: ${course.subjectArea}</p>
                    <p>Credits: ${course.credits}</p>
                    <p>Teacher: ${course.teacher}</p>
                `;
                scheduleList.appendChild(scheduleItem);
            }
        });
    });
});

    // Remove from Schedule
    scheduleList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-course')) {
            const courseItem = event.target.parentElement;
            scheduleList.removeChild(courseItem);
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Check if user is already logged in
        const userName = localStorage.getItem('userName');
        if (userName) {
            displayWelcomeMessage(userName);
        }

        // Handle login form submission
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const userName = document.getElementById('user-mail').value;
            localStorage.setItem('userName', userName);
            displayWelcomeMessage(userName);
        });

        // Handle signup form submission
        document.getElementById('signupForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const userName = document.getElementById('username').value;
            localStorage.setItem('userName', userName);
            displayWelcomeMessage(userName);
        });

        function displayWelcomeMessage(userName) {
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('signupBtn').style.display = 'none';
            const welcomeMessage = document.createElement('li');
            welcomeMessage.className = 'nav-item';
            welcomeMessage.innerHTML = `<a href="#" class="nav-link active">Welcome, ${userName}</a>`;
            document.querySelector('.navbar-nav').appendChild(welcomeMessage);
        }
    });
    
    // Password match validation
    document.getElementById('signupForm').addEventListener('submit', function (event) {
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
      
        if (password !== confirmPassword) {
          event.preventDefault();
          event.stopPropagation();
          alert('Passwords do not match!');
        }
    });