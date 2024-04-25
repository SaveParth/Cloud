document.addEventListener('DOMContentLoaded', function() {
  const addStudentBtn = document.getElementById('addStudentBtn');
  const markPresentBtn = document.getElementById('markPresentBtn');
  const markAbsentBtn = document.getElementById('markAbsentBtn');
  const studentsDropdown = document.getElementById('studentsDropdown');
  const attendanceList = document.getElementById('attendanceList');
  const totalStudentsSpan = document.getElementById('totalStudents');
  const presentCountSpan = document.getElementById('presentCount');
  const absentCountSpan = document.getElementById('absentCount');
  const attendancePercentageSpan = document.getElementById('attendancePercentage');
  const status = document.getElementById('status');
  
  let students = [];

  addStudentBtn.addEventListener('click', function() {
    const studentNameInput = document.getElementById('studentName');
    const studentName = studentNameInput.value.trim();

    if (studentName !== '') {
      students.push({
        name: studentName,
        present: 0,
        absent: 0
      });

      renderStudentsDropdown();
      studentNameInput.value = '';
      updateAttendanceStatistics();
      status.textContent = `${studentName} added successfully!`;
    } else {
      status.textContent = 'Please enter a valid student name!';
    }
  });

  markPresentBtn.addEventListener('click', function() {
    markAttendance('Present');
  });

  markAbsentBtn.addEventListener('click', function() {
    markAttendance('Absent');
  });

  function markAttendance(status) {
    const selectedStudentIndex = studentsDropdown.selectedIndex;
    const selectedStudent = students[selectedStudentIndex];

    if (selectedStudent) {
      const now = new Date();
      const date = now.toDateString();

      selectedStudent[status.toLowerCase()]++;
      
      const attendanceRecord = document.createElement('tr');
      attendanceRecord.innerHTML = `
        <td>${date}</td>
        <td>${selectedStudent.name}</td>
        <td>${status}</td>
      `;
      attendanceList.appendChild(attendanceRecord);

      updateAttendanceStatistics();
      renderStudentsDropdown();
      status.textContent = `Attendance marked for ${selectedStudent.name} (${status})`;
    } else {
      status.textContent = 'Please add students before marking attendance!';
    }
  }

  function renderStudentsDropdown() {
    studentsDropdown.innerHTML = '';
    students.forEach(student => {
      const option = document.createElement('option');
      option.textContent = student.name;
      studentsDropdown.appendChild(option);
    });
  }

  function updateAttendanceStatistics() {
    const totalStudents = students.length;
    totalStudentsSpan.textContent = totalStudents;

    let presentCount = 0;
    let absentCount = 0;
    students.forEach(student => {
      presentCount += student.present;
      absentCount += student.absent;
    });
    presentCountSpan.textContent = presentCount;
    absentCountSpan.textContent = absentCount;

    const totalAttendance = presentCount + absentCount;
    const attendancePercentage = totalStudents > 0 ? ((presentCount / totalAttendance) * 100).toFixed(2) : 0;
    attendancePercentageSpan.textContent = `${attendancePercentage}%`;
  }
});
