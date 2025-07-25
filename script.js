// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const heroLoginBtn = document.getElementById('heroLoginBtn');
const heroRegisterBtn = document.getElementById('heroRegisterBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeButtons = document.querySelectorAll('.close');
const showRegister = document.getElementById('showRegister');
const welcomeText = document.getElementById('welcomeText');
const manualEntryBtn = document.getElementById('manualEntryBtn');
const uploadBtn = document.getElementById('uploadBtn');
const fileUpload = document.getElementById('fileUpload');
const manualEntryForm = document.getElementById('manualEntryForm');
const marksForm = document.getElementById('marksForm');
const resultsDisplay = document.getElementById('resultsDisplay');
const overallGrade = document.getElementById('overallGrade');
const percentage = document.getElementById('percentage');
const statusElement = document.getElementById('status');
const subjectTable = document.querySelector('#subjectTable tbody');
const dashboardSection = document.getElementById('dashboard');
const homeContent = document.getElementById('homeContent');
const sidebar = document.getElementById('sidebar');
const dashboardNav = document.getElementById('dashboardNav');
const aboutNav = document.getElementById('aboutNav');
const footerDashboardNav = document.getElementById('footerDashboardNav');

// Sample user data (in a real app, this would be from a database)
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// Modal Event Listeners
function showLoginModal() {
    loginModal.style.display = 'block';
}

function showRegisterModal() {
    registerModal.style.display = 'block';
}

loginBtn.addEventListener('click', showLoginModal);
heroLoginBtn.addEventListener('click', showLoginModal);
registerBtn.addEventListener('click', showRegisterModal);
heroRegisterBtn.addEventListener('click', showRegisterModal);

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'block';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        loginModal.style.display = 'none';
        welcomeText.textContent = `Welcome back, ${user.name}! Ready to analyze your results?`;
        document.getElementById('loginBtn').textContent = 'Logout';
        document.getElementById('registerBtn').style.display = 'none';
        
        // Show dashboard and hide home content
        dashboardSection.style.display = 'block';
        homeContent.style.display = 'none';
        sidebar.style.display = 'block';
        dashboardNav.style.display = 'block';
        aboutNav.style.display = 'none';
        footerDashboardNav.style.display = 'block';
    } else {
        alert('Invalid admission number or password');
    }
});

// Registration Form Submission
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // Validate admission number (only alphanumeric)
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        alert('Admission number can only contain letters and numbers');
        return;
    }
    
    // Validate password strength
    if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
        alert('Password must be at least 6 characters long and contain alphabets, numbers and special characters');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (users.some(u => u.username === username)) {
        alert('Admission number already exists');
        return;
    }
    
    if (users.some(u => u.email === email)) {
        alert('Email already registered');
        return;
    }
    
    const newUser = {
        name,
        email,
        username,
        password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    registerModal.style.display = 'none';
    welcomeText.textContent = `Welcome, ${name}! Ready to analyze your results?`;
    document.getElementById('loginBtn').textContent = 'Logout';
    document.getElementById('registerBtn').style.display = 'none';
    
    // Show dashboard and hide home content
    dashboardSection.style.display = 'block';
    homeContent.style.display = 'none';
    sidebar.style.display = 'block';
    dashboardNav.style.display = 'block';
    aboutNav.style.display = 'none';
    footerDashboardNav.style.display = 'block';
    
    alert('Registration successful! You are now logged in.');
});

// Logout functionality
document.getElementById('loginBtn').addEventListener('click', function() {
    if (currentUser) {
        currentUser = null;
        this.textContent = 'Login';
        document.getElementById('registerBtn').style.display = 'inline-block';
        
        // Show home content and hide dashboard
        dashboardSection.style.display = 'none';
        homeContent.style.display = 'block';
        sidebar.style.display = 'none';
        dashboardNav.style.display = 'none';
        aboutNav.style.display = 'block';
        footerDashboardNav.style.display = 'none';
        resultsDisplay.style.display = 'none';
        manualEntryForm.style.display = 'none';
    }
});

// Result Options
manualEntryBtn.addEventListener('click', () => {
    if (!currentUser) {
        alert('Please login first');
        showLoginModal();
        return;
    }
    manualEntryForm.style.display = 'block';
    resultsDisplay.style.display = 'none';
});

uploadBtn.addEventListener('click', () => {
    if (!currentUser) {
        alert('Please login first');
        showLoginModal();
        return;
    }
    fileUpload.click();
});

fileUpload.addEventListener('change', handleFileUpload);

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
    }
    
    alert(`PDF file "${file.name}" uploaded successfully! Processing...`);
    
    // Simulate processing delay
    setTimeout(() => {
        // Generate random marks for demonstration
        const subjects = ['Math', 'Science', 'English', 'History', 'Art'];
        const marks = {};
        subjects.forEach(subject => {
            marks[subject] = Math.floor(Math.random() * 40) + 60; // Random marks between 60-100
        });
        
        analyzeResults(marks);
    }, 1500);
}

// Marks Form Submission
marksForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const marks = {
        'Subject 1': parseInt(document.getElementById('subject1').value),
        'Subject 2': parseInt(document.getElementById('subject2').value),
        'Subject 3': parseInt(document.getElementById('subject3').value),
        'Subject 4': parseInt(document.getElementById('subject4').value),
        'Subject 5': parseInt(document.getElementById('subject5').value)
    };
    
    analyzeResults(marks);
});

function analyzeResults(marks) {
    // Calculate average
    const values = Object.values(marks);
    const total = values.reduce((sum, mark) => sum + mark, 0);
    const avg = total / values.length;
    
    // Determine overall grade
    let grade, status;
    if (avg >= 90) {
        grade = 'A+';
        status = 'Excellent';
    } else if (avg >= 80) {
        grade = 'A';
        status = 'Very Good';
    } else if (avg >= 70) {
        grade = 'B';
        status = 'Good';
    } else if (avg >= 60) {
        grade = 'C';
        status = 'Average';
    } else if (avg >= 50) {
        grade = 'D';
        status = 'Below Average';
    } else {
        grade = 'F';
        status = 'Fail';
    }
    
    // Update UI
    overallGrade.textContent = grade;
    percentage.textContent = `${avg.toFixed(1)}%`;
    statusElement.textContent = status;
    
    // Update subject table
    subjectTable.innerHTML = '';
    for (const [subject, mark] of Object.entries(marks)) {
        const row = document.createElement('tr');
        
        let subjectGrade, remarks;
        if (mark >= 90) {
            subjectGrade = 'A+';
            remarks = 'Outstanding';
        } else if (mark >= 80) {
            subjectGrade = 'A';
            remarks = 'Excellent';
        } else if (mark >= 70) {
            subjectGrade = 'B';
            remarks = 'Good';
        } else if (mark >= 60) {
            subjectGrade = 'C';
            remarks = 'Average';
        } else if (mark >= 50) {
            subjectGrade = 'D';
            remarks = 'Needs Improvement';
        } else {
            subjectGrade = 'F';
            remarks = 'Fail';
        }
        
        row.innerHTML = `
            <td>${subject}</td>
            <td>${mark}</td>
            <td>${subjectGrade}</td>
            <td>${remarks}</td>
        `;
        subjectTable.appendChild(row);
    }
    
    // Show results and hide form
    manualEntryForm.style.display = 'none';
    resultsDisplay.style.display = 'block';
    
    // Create charts
    createCharts(marks);
}

function createCharts(marks) {
    // Destroy existing charts if they exist
    const marksChartCanvas = document.getElementById('marksChart');
    const pieChartCanvas = document.getElementById('pieChart');
    
    if (window.marksChart) {
        window.marksChart.destroy();
    }
    if (window.pieChart) {
        window.pieChart.destroy();
    }
    
    // Bar Chart (Marks by Subject)
    window.marksChart = new Chart(marksChartCanvas, {
        type: 'bar',
        data: {
            labels: Object.keys(marks),
            datasets: [{
                label: 'Marks',
                data: Object.values(marks),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    
    // Pie Chart (Grade Distribution)
    const gradeCounts = {
        'A+': 0,
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0,
        'F': 0
    };
    
    Object.values(marks).forEach(mark => {
        if (mark >= 90) gradeCounts['A+']++;
        else if (mark >= 80) gradeCounts['A']++;
        else if (mark >= 70) gradeCounts['B']++;
        else if (mark >= 60) gradeCounts['C']++;
        else if (mark >= 50) gradeCounts['D']++;
        else gradeCounts['F']++;
    });
    
    const gradeLabels = [];
    const gradeData = [];
    const backgroundColors = [];
    
    for (const [grade, count] of Object.entries(gradeCounts)) {
        if (count > 0) {
            gradeLabels.push(grade);
            gradeData.push(count);
            
            // Assign colors based on grade
            if (grade === 'A+') backgroundColors.push('rgba(40, 167, 69, 0.7)');
            else if (grade === 'A') backgroundColors.push('rgba(92, 184, 92, 0.7)');
            else if (grade === 'B') backgroundColors.push('rgba(240, 173, 78, 0.7)');
            else if (grade === 'C') backgroundColors.push('rgba(217, 83, 79, 0.7)');
            else if (grade === 'D') backgroundColors.push('rgba(91, 192, 222, 0.7)');
            else backgroundColors.push('rgba(152, 163, 174, 0.7)');
        }
    }
    
    window.pieChart = new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
            labels: gradeLabels,
            datasets: [{
                data: gradeData,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}
// Update your existing chart creation function with this enhanced version
function createCharts(marks) {
  // Destroy existing charts if they exist
  const marksChartCanvas = document.getElementById('marksChart');
  const pieChartCanvas = document.getElementById('pieChart');
  
  if (window.marksChart) {
    window.marksChart.destroy();
  }
  if (window.pieChart) {
    window.pieChart.destroy();
  }
  
  // Bar Chart (Marks by Subject) - Keep your existing bar chart code
  
  // Enhanced Pie Chart (Grade Distribution)
  const gradeCounts = {
    'A+': 0,
    'A': 0,
    'B': 0,
    'C': 0,
    'D': 0,
    'F': 0
  };
  
  // Calculate grade distribution
  Object.values(marks).forEach(mark => {
    if (mark >= 90) gradeCounts['A+']++;
    else if (mark >= 80) gradeCounts['A']++;
    else if (mark >= 70) gradeCounts['B']++;
    else if (mark >= 60) gradeCounts['C']++;
    else if (mark >= 50) gradeCounts['D']++;
    else gradeCounts['F']++;
  });
  
  const gradeLabels = [];
  const gradeData = [];
  const backgroundColors = [];
  const hoverColors = [];
  const borderColors = [];
  
  // Prepare data for the pie chart
  for (const [grade, count] of Object.entries(gradeCounts)) {
    if (count > 0) {
      gradeLabels.push(grade);
      gradeData.push(count);
      
      // Assign colors based on grade
      if (grade === 'A+') {
        backgroundColors.push('rgba(46, 204, 113, 0.8)');
        hoverColors.push('rgba(46, 204, 113, 1)');
        borderColors.push('rgba(39, 174, 96, 1)');
      } else if (grade === 'A') {
        backgroundColors.push('rgba(39, 174, 96, 0.8)');
        hoverColors.push('rgba(39, 174, 96, 1)');
        borderColors.push('rgba(33, 150, 83, 1)');
      } else if (grade === 'B') {
        backgroundColors.push('rgba(243, 156, 18, 0.8)');
        hoverColors.push('rgba(243, 156, 18, 1)');
        borderColors.push('rgba(230, 126, 34, 1)');
      } else if (grade === 'C') {
        backgroundColors.push('rgba(231, 76, 60, 0.8)');
        hoverColors.push('rgba(231, 76, 60, 1)');
        borderColors.push('rgba(192, 57, 43, 1)');
      } else if (grade === 'D') {
        backgroundColors.push('rgba(52, 152, 219, 0.8)');
        hoverColors.push('rgba(52, 152, 219, 1)');
        borderColors.push('rgba(41, 128, 185, 1)');
      } else {
        backgroundColors.push('rgba(149, 165, 166, 0.8)');
        hoverColors.push('rgba(149, 165, 166, 1)');
        borderColors.push('rgba(127, 140, 141, 1)');
      }
    }
  }
  
  // Create the enhanced pie chart
  window.pieChart = new Chart(pieChartCanvas, {
    type: 'pie',
    data: {
      labels: gradeLabels,
      datasets: [{
        data: gradeData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
        hoverBackgroundColor: hoverColors,
        hoverBorderColor: '#fff',
        hoverBorderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%', // Makes it a donut chart
      plugins: {
        legend: {
          position: 'right',
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} subject(s) (${percentage}%)`;
            }
          },
          bodyFont: {
            size: 14,
            weight: 'bold'
          },
          titleFont: {
            size: 16,
            weight: 'bold'
          },
          padding: 12,
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255,255,255,0.2)',
          borderWidth: 1,
          cornerRadius: 8
        },
        title: {
          display: true,
          text: 'Grade Distribution',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },
      elements: {
        arc: {
          borderWidth: 0
        }
      },
      onHover: (event, chartElement) => {
        if (chartElement.length > 0) {
          const chart = chartElement[0].chart;
          const ctx = chart.ctx;
          ctx.save();
          const activeElement = chartElement[0];
          
          // Add glow effect on hover
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.beginPath();
          ctx.arc(
            activeElement.x,
            activeElement.y,
            activeElement.outerRadius + 5,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = activeElement.options.backgroundColor;
          ctx.fill();
          ctx.restore();
        }
      }
    }
  });
  
  // Create custom legend
  createCustomLegend(gradeLabels, backgroundColors);
}

function createCustomLegend(labels, colors) {
  const legendContainer = document.createElement('div');
  legendContainer.className = 'chart-legend';
  
  labels.forEach((label, index) => {
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    
    const colorBox = document.createElement('div');
    colorBox.className = `legend-color grade-${label.replace('+', 'plus')}`;
    
    const labelText = document.createElement('span');
    labelText.textContent = label;
    
    legendItem.appendChild(colorBox);
    legendItem.appendChild(labelText);
    legendContainer.appendChild(legendItem);
  });
  
  // Add legend to the DOM
  const pieChartContainer = document.querySelector('.pie-chart-container');
  const existingLegend = pieChartContainer.querySelector('.chart-legend');
  if (existingLegend) {
    pieChartContainer.replaceChild(legendContainer, existingLegend);
  } else {
    pieChartContainer.appendChild(legendContainer);
  }
}

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';