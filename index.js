
/*Add Javascript here */
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
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
