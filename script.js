let app = document.getElementById("app");

 

let isLogin = true;

let role = "student"; // student or teacher

 

let exams = [

  { id: 1, title: "Math Test" },

  { id: 2, title: "Science Test" }

];

 

let questions = [

  {

    q: "2 + 2 = ?",

    options: ["3", "4", "5", "6"],

    answer: 1

  },

  {

    q: "Capital of France?",

    options: ["Berlin", "Madrid", "Paris", "Rome"],

    answer: 2

  }

];

 

let currentQuestion = 0;

let userAnswers = [];

let timeLeft = 60;

let timer;

 

 

// ---------------- LOGIN ----------------

 

function showLogin() {

  app.innerHTML = `

    <div class="card small-card">

      <h2>${isLogin ? "Login" : "Register"}</h2>

 

      <select id="role">

        <option value="student">Student</option>

        <option value="teacher">Teacher</option>

      </select>

 

      <input type="email" id="email" placeholder="Email">

      <input type="password" id="password" placeholder="Password">

 

      <button onclick="handleAuth()">

        ${isLogin ? "Login" : "Register"}

      </button>

 

      <p class="link" onclick="toggleAuth()">

        ${isLogin ? "Create account" : "Already have account?"}

      </p>

    </div>

  `;

}

 

function toggleAuth() {

  isLogin = !isLogin;

  showLogin();

}

 

function handleAuth() {

  let email = document.getElementById("email").value;

  let password = document.getElementById("password").value;

  role = document.getElementById("role").value;

 

  if (!email || !password) {

    alert("Fill all fields");

    return;

  }

 

  if (role === "teacher") {

    showTeacherDashboard();

  } else {

    showStudentDashboard();

  }

}

 

 

// ---------------- STUDENT DASHBOARD ----------------

 

function showStudentDashboard() {

  let html = `

    <div class="card">

      <h2>Student Dashboard</h2>

      <div class="exam-grid">

  `;

 

  exams.forEach(e => {

    html += `

      <div class="exam-card">

        <h3>${e.title}</h3>

        <button onclick="startExam()">Start Exam</button>

      </div>

    `;

  });

 

  html += `

      </div>

      <br>

      <button onclick="logout()">Logout</button>

    </div>

  `;

 

  app.innerHTML = html;

}

 

 

// ---------------- TEACHER DASHBOARD ----------------

 

function showTeacherDashboard() {

  app.innerHTML = `

    <div class="card small-card">

      <h2>Teacher Panel</h2>

 

      <input id="examTitle" placeholder="Exam Title">

      <button onclick="createExam()">Create Exam</button>

 

      <h3>Add Question</h3>

      <input id="qText" placeholder="Question">

 

      <input id="opt1" placeholder="Option 1">

      <input id="opt2" placeholder="Option 2">

      <input id="opt3" placeholder="Option 3">

      <input id="opt4" placeholder="Option 4">

 

      <select id="correct">

        <option value="0">Option 1</option>

        <option value="1">Option 2</option>

        <option value="2">Option 3</option>

        <option value="3">Option 4</option>

      </select>

 

      <button onclick="addQuestion()">Add Question</button>

 

      <button class="secondary" onclick="logout()">Logout</button>

    </div>

  `;

}

 

 

// ---------------- EXAM ----------------

 

function startExam() {

  currentQuestion = 0;

  userAnswers = [];

  timeLeft = 60;

 

  startTimer();

  showQuestion();

}

 

function startTimer() {

  clearInterval(timer);

 

  timer = setInterval(() => {

    timeLeft--;

 

    let t = document.getElementById("timer");

    if (t) t.innerText = timeLeft;

 

    if (timeLeft <= 0) {

      clearInterval(timer);

      submitExam();

    }

  }, 1000);

}

 

function showQuestion() {

  let q = questions[currentQuestion];

 

  let optionsHtml = "";

 

  q.options.forEach((opt, i) => {

    let selected = userAnswers[currentQuestion] === i ? "selected" : "";

 

    optionsHtml += `

      <div class="option ${selected}" onclick="selectOption(${i})">

        ${opt}

      </div>

    `;

  });

 

  app.innerHTML = `

    <div class="card">

      <div class="top-bar">

        <span>Question ${currentQuestion + 1}/${questions.length}</span>

        <span>Time: <span id="timer">${timeLeft}</span></span>

      </div>

 

      <h3>${q.q}</h3>

 

      ${optionsHtml}

 

      <div class="nav">

        <button onclick="prevQuestion()">Previous</button>

        <button onclick="nextQuestion()">Next</button>

      </div>

 

      <br>

      <button onclick="submitExam()">Submit</button>

    </div>

  `;

}

 

function selectOption(i) {

  userAnswers[currentQuestion] = i;

  showQuestion();

}

 

function nextQuestion() {

  if (currentQuestion < questions.length - 1) {

    currentQuestion++;

    showQuestion();

  }

}

 

function prevQuestion() {

  if (currentQuestion > 0) {

    currentQuestion--;

    showQuestion();

  }

}

 

 

// ---------------- RESULT ----------------

 

function submitExam() {

  clearInterval(timer);

 

  let score = 0;

 

  questions.forEach((q, i) => {

    if (userAnswers[i] === q.answer) {

      score++;

    }

  });

 

  app.innerHTML = `

    <div class="card small-card">

      <h2>Result</h2>

      <p>Score: ${score}/${questions.length}</p>

      <p>${score >= questions.length / 2 ? "Pass" : "Fail"}</p>

 

      <button onclick="showStudentDashboard()">Back</button>

    </div>

  `;

}

 

 

// ---------------- ADMIN ACTIONS ----------------

 

function createExam() {

  let title = document.getElementById("examTitle").value;

 

  if (!title) {

    alert("Enter title");

    return;

  }

 

  exams.push({ id: exams.length + 1, title });

  alert("Exam created");

}

 

function addQuestion() {

  let q = document.getElementById("qText").value;

 

  let options = [

    opt1.value,

    opt2.value,

    opt3.value,

    opt4.value

  ];

 

  let answer = parseInt(correct.value);

 

  if (!q || options.includes("")) {

    alert("Fill all fields");

    return;

  }

 

  questions.push({ q, options, answer });

  alert("Question added");

}

 

 

// ---------------- LOGOUT ----------------

 

function logout() {

  showLogin();

}

 

 

// START

showLogin();
