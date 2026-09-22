/* =========================================================
   VIRTUAL LAB
   Vanilla HTML / CSS / JavaScript
   ========================================================= */

const app = document.getElementById("app");

/* =========================================================
   DATA
   ========================================================= */

const student = {
  name: "Mira Shah",
  initials: "MS",
  program: "B.Tech · Computer Science",
  term: "Semester 04",
  id: "CS24-0417"
};

const faculty = {
  name: "Dr. Arjun Rao",
  initials: "AR",
  department: "Computer Science & IT",
  id: "FAC-018"
};

const practicals = [
  {
    id: "p1",
    title: "Linked List Operations",
    course: "Data Structures",
    topic: "Linked Lists",
    due: "Due in 2 days",
    status: "Not started",
    progress: 0,
    color: "blue"
  },
  {
    id: "p2",
    title: "Stack Implementation",
    course: "Data Structures",
    topic: "Stacks",
    due: "Coming soon",
    status: "Not started",
    progress: 0,
    color: "orange"
  },
  {
    id: "p3",
    title: "Queue Implementation",
    course: "Data Structures",
    topic: "Queues",
    due: "Coming soon",
    status: "Not started",
    progress: 0,
    color: "violet"
  },
  {
    id: "p4",
    title: "Binary Search Tree",
    course: "Data Structures",
    topic: "Trees",
    due: "Coming soon",
    status: "Not started",
    progress: 0,
    color: "lime"
  }
];

const labs = [
  {
    name: "Data Structures",
    code: "CS204",
    description: "Build intuition for the structures behind efficient programs.",
    available: true,
    experiments: 6,
    color: "blue",
    symbol: "01"
  },
  {
    name: "Operating Systems",
    code: "CS305",
    description: "See processes, memory, and scheduling from the inside.",
    available: false,
    experiments: 0,
    color: "violet",
    symbol: "02"
  },
  {
    name: "Database Systems",
    code: "CS306",
    description: "Query, model, and reason about data in motion.",
    available: false,
    experiments: 0,
    color: "orange",
    symbol: "03"
  },
  {
    name: "Computer Networks",
    code: "CS307",
    description: "Trace packets and protocols across the stack.",
    available: false,
    experiments: 0,
    color: "lime",
    symbol: "04"
  },
  {
    name: "Artificial Intelligence",
    code: "CS401",
    description: "Explore how models learn patterns from data.",
    available: false,
    experiments: 0,
    color: "blue",
    symbol: "05"
  }
];

/* =========================================================
   ROUTER
   ========================================================= */

function navigate(path) {
  window.history.pushState({}, "", path);
  render();
  window.scrollTo(0, 0);
}

window.addEventListener("popstate", render);

/* =========================================================
   LOGO
   ========================================================= */

function Brand(dark = false) {
  return `
    <a href="/" class="brand" onclick="event.preventDefault(); navigate('/')">
      <span class="logo-mark"
        style="${dark ? "background:#f3f1ea;color:#19212e" : ""}">
        VL
      </span>

      <span>
        VirtualLab<span class="brand-dot">.</span>
      </span>
    </a>
  `;
}

/* =========================================================
   BUTTON
   ========================================================= */

function Button(text, action, variant = "primary") {
  return `
    <button
      class="btn btn-${variant}"
      onclick="${action}">
      ${text}
    </button>
  `;
}

/* =========================================================
   LANDING PAGE
   ========================================================= */

function LandingPage() {

  return `
  <main class="landing-page lab-grid">

    <!-- NAVBAR -->
    <nav class="container landing-nav">

      ${Brand()}

      <div class="landing-nav-actions">

        ${Button(
          "Login",
          "navigate('/login')",
          "outline"
        )}

        ${Button(
          "Get started",
          "navigate('/login')",
          "dark"
        )}

      </div>

    </nav>


    <!-- HERO -->
    <section class="container hero">

      <div class="hero-content fade-up">

        <div class="hero-eyebrow">
          <span class="hero-eyebrow-dot"></span>
          Interactive computer science laboratory
        </div>

        <h1 class="hero-title">
          Learn by building.
          <br>
          <span>Understand by seeing.</span>
        </h1>

        <p class="hero-description">
          VirtualLab turns computer science practicals into
          interactive experiments. Write code, execute it,
          and watch the underlying concepts come alive.
        </p>

        <div style="
          display:flex;
          gap:12px;
          margin-top:30px;
          flex-wrap:wrap;
        ">

          ${Button(
            "Explore labs →",
            "navigate('/student/labs')",
            "primary"
          )}

          ${Button(
            "How it works",
            "document.getElementById('how-it-works').scrollIntoView({behavior:'smooth'})",
            "outline"
          )}

        </div>

      </div>

      <!-- CODE PREVIEW -->
      <div
        class="code-window fade-up fade-up-delay-1"
        style="margin-top:60px; max-width:900px;"
      >

        <div class="code-window-header">

          <span class="code-dot"></span>
          <span class="code-dot"></span>
          <span class="code-dot"></span>

          <span class="code-window-title">
            linked-list.js
          </span>

        </div>

        <div class="code-content">

          <div class="code-line">
            <span class="code-number">01</span>
            <span style="color:#9cdcfe">class</span>
            <span style="color:#dcdcaa">Node</span> {
          </div>

          <div class="code-line">
            <span class="code-number">02</span>
            &nbsp;&nbsp;<span style="color:#9cdcfe">constructor</span>(value) {
          </div>

          <div class="code-line">
            <span class="code-number">03</span>
            &nbsp;&nbsp;&nbsp;&nbsp;this.value = value;
          </div>

          <div class="code-line">
            <span class="code-number">04</span>
            &nbsp;&nbsp;&nbsp;&nbsp;this.next = null;
          </div>

          <div class="code-line">
            <span class="code-number">05</span>
            &nbsp;&nbsp;}
          </div>

          <div class="code-line">
            <span class="code-number">06</span>
            }
          </div>

          <div class="code-line">
            <span class="code-number">07</span>
          </div>

          <div class="code-line">
            <span class="code-number">08</span>
            <span style="color:#9cdcfe">const</span>
            head = <span style="color:#569cd6">new</span>
            Node(10);
          </div>

          <div class="code-line">
            <span class="code-number">09</span>
            head.next =
            <span style="color:#569cd6">new</span>
            Node(20);
          </div>

        </div>

      </div>

    </section>


    <!-- HOW IT WORKS -->
    <section
      id="how-it-works"
      class="container section"
    >

      <div class="section-heading">

        <div>
          <div class="hero-eyebrow">
            The method
          </div>

          <h2>Four steps from code to intuition.</h2>
        </div>

        <p>
          VirtualLab connects programming with visual
          understanding so students can see what their
          code actually does.
        </p>

      </div>


      <div class="feature-grid">

        <div class="card feature-card fade-up">
          <div class="feature-number">01 / BUILD</div>

          <h3>Write</h3>

          <p>
            Write your implementation directly inside
            the virtual laboratory.
          </p>
        </div>


        <div class="card feature-card fade-up fade-up-delay-1">
          <div class="feature-number">02 / RUN</div>

          <h3>Execute</h3>

          <p>
            Run your code and receive immediate
            feedback from the execution engine.
          </p>
        </div>


        <div class="card feature-card fade-up fade-up-delay-2">
          <div class="feature-number">03 / SEE</div>

          <h3>Visualize</h3>

          <p>
            Watch data structures, memory and program
            state change as your code executes.
          </p>
        </div>


        <div class="card feature-card fade-up fade-up-delay-3">
          <div class="feature-number">04 / LEARN</div>

          <h3>Understand</h3>

          <p>
            Use checkpoints, hints and feedback to
            build stronger programming intuition.
          </p>
        </div>

      </div>

    </section>


    <!-- INSIDE THE LAB -->
    <section class="container section">

      <div class="section-heading">

        <div>
          <div class="hero-eyebrow">
            Inside the lab
          </div>

          <h2>Everything in one workspace.</h2>
        </div>

      </div>


      <div style="
        display:grid;
        grid-template-columns:1.3fr .7fr;
        gap:16px;
      ">

        <div class="code-window">

          <div class="code-window-header">
            <span class="code-window-title">
              execution engine
            </span>
          </div>

          <div class="code-content">

            <div style="
              display:flex;
              flex-direction:column;
              gap:18px;
              font-family:var(--font-mono);
              font-size:13px;
            ">

              <div>
                <span style="color:#8bd5ca">●</span>
                Code compiled successfully
              </div>

              <div>
                <span style="color:#d8f25a">→</span>
                Node created: 10
              </div>

              <div>
                <span style="color:#d8f25a">→</span>
                Node created: 20
              </div>

              <div>
                <span style="color:#d8f25a">→</span>
                LinkedList.head → Node(10)
              </div>

              <div>
                <span style="color:#7aa2f7">✓</span>
                Execution complete
              </div>

            </div>

          </div>

        </div>


        <div
          class="card"
          style="
            padding:30px;
            display:flex;
            flex-direction:column;
            justify-content:center;
          "
        >

          <div class="hero-eyebrow">
            LIVE VISUALIZATION
          </div>

          <h3 style="font-size:28px;">
            See your data structures evolve.
          </h3>

          <p style="
            color:var(--muted-foreground);
            line-height:1.6;
          ">
            Every execution step can be connected
            to a visual representation of memory,
            nodes and pointers.
          </p>

          <div style="
            display:flex;
            align-items:center;
            gap:8px;
            margin-top:20px;
            font-family:var(--font-mono);
          ">

            <span class="badge badge-blue">HEAD</span>

            <span class="pulse-line">→</span>

            <span class="badge badge-lime">10</span>

            <span class="pulse-line">→</span>

            <span class="badge badge-orange">20</span>

            <span>→ NULL</span>

          </div>

        </div>

      </div>

    </section>


    <!-- CTA -->
    <section class="container section">

      <div
        class="card"
        style="
          background:var(--sidebar);
          color:white;
          padding:50px;
          text-align:center;
        "
      >

        <div class="hero-eyebrow" style="justify-content:center;color:#aeb7c4;">
          START LEARNING
        </div>

        <h2 style="
          font-size:46px;
          margin-bottom:15px;
        ">
          Your laboratory is ready.
        </h2>

        <p style="
          color:#aeb7c4;
          max-width:560px;
          margin:0 auto 28px;
          line-height:1.6;
        ">
          Explore interactive practicals and turn
          abstract programming concepts into something
          you can actually see.
        </p>

        ${Button(
          "Enter VirtualLab →",
          "navigate('/login')",
          "lime"
        )}

      </div>

    </section>


    <!-- FOOTER -->
    <footer class="container footer">

      <div class="footer-inner">

        <div>
          ${Brand()}
        </div>

        <div>
          Virtual laboratory for computer science education.
        </div>

      </div>

    </footer>

  </main>
  `;
}


/* =========================================================
   LOGIN
   ========================================================= */

function LoginPage() {

  return `
  <main class="login-page">

    <section class="login-visual">

      <div>
        ${Brand()}

        <div style="margin-top:100px;">

          <div class="hero-eyebrow">
            Virtual laboratory
          </div>

          <h1>
            Practical learning,
            <br>
            made visible.
          </h1>

          <p>
            Write code, run experiments and understand
            computer science through interactive
            visualizations.
          </p>

        </div>

      </div>

      <div class="font-mono" style="font-size:12px;">
        VIRTUAL LAB · 2026
      </div>

    </section>


    <section class="login-form-panel">

      <div class="login-form">

        <div style="margin-bottom:40px;">
          ${Brand(true)}
        </div>

        <h2>Welcome back.</h2>

        <p class="login-form-subtitle">
          Sign in to continue to your laboratory.
        </p>


        <div class="role-switch">

          <button
            id="studentRole"
            class="role-button active"
            onclick="setLoginRole('student')"
          >
            Student
          </button>

          <button
            id="facultyRole"
            class="role-button"
            onclick="setLoginRole('faculty')"
          >
            Faculty
          </button>

        </div>


        <form onsubmit="handleLogin(event)">

          <div class="input-group" style="margin-bottom:18px;">

            <label class="input-label">
              Email
            </label>

            <input
              id="loginEmail"
              class="input"
              type="email"
              placeholder="you@example.com"
              required
            />

          </div>


          <div class="input-group" style="margin-bottom:22px;">

            <label class="input-label">
              Password
            </label>

            <input
              id="loginPassword"
              class="input"
              type="password"
              placeholder="••••••••"
              required
            />

          </div>


          <button
            class="btn btn-lime"
            style="width:100%;"
            type="submit"
          >
            Continue →
          </button>

        </form>


        <p style="
          color:#788394;
          font-size:12px;
          margin-top:18px;
          text-align:center;
        ">
          Demo authentication for SIH prototype
        </p>

      </div>

    </section>

  </main>
  `;
}

let loginRole = "student";

function setLoginRole(role) {

  loginRole = role;

  const studentBtn = document.getElementById("studentRole");
  const facultyBtn = document.getElementById("facultyRole");

  if (!studentBtn || !facultyBtn) return;

  studentBtn.classList.toggle(
    "active",
    role === "student"
  );

  facultyBtn.classList.toggle(
    "active",
    role === "faculty"
  );
}

function handleLogin(event) {

  event.preventDefault();

  if (loginRole === "student") {
    navigate("/student/dashboard");
  } else {
    navigate("/faculty/dashboard");
  }
}


/* =========================================================
   SIDEBAR
   ========================================================= */

function Sidebar(role) {

  const isStudent = role === "student";

  const links = isStudent
    ? [
        ["Overview", "/student/dashboard"],
        ["Lab directory", "/student/labs"]
      ]
    : [
        ["Overview", "/faculty/dashboard"],
        ["Practicals", "/faculty/practicals"]
      ];

  const currentPath = window.location.pathname;

  return `
  <aside class="sidebar" id="sidebar">

    <div class="sidebar-brand">
      ${Brand(true)}
    </div>


    <div class="sidebar-section-label">
      Workspace
    </div>


    <nav class="sidebar-nav">

      ${links.map(([label, path]) => `
        <a
          href="${path}"
          class="sidebar-link ${currentPath === path ? "active" : ""}"
          onclick="event.preventDefault(); navigate('${path}')"
        >
          ${label}
        </a>
      `).join("")}

    </nav>


    <div class="sidebar-spacer"></div>


    <div class="sidebar-account">

      <div class="sidebar-user">

        <div class="avatar">
          ${isStudent ? student.initials : faculty.initials}
        </div>

        <div>
          <div class="user-name">
            ${isStudent ? student.name : faculty.name}
          </div>

          <div class="user-meta">
            ${isStudent ? student.id : faculty.id}
          </div>
        </div>

      </div>

      <button
        class="sidebar-link"
        style="width:100%;border:0;background:transparent;"
        onclick="navigate('/login')"
      >
        Sign out
      </button>

    </div>

  </aside>
  `;
}


/* =========================================================
   APP SHELL
   ========================================================= */

function AppShell(content, role = "student") {

  return `
  <div class="app-shell">

    ${Sidebar(role)}

    <div class="main-area">

      <header class="topbar">

        <button
          class="btn btn-ghost mobile-menu-button"
          onclick="toggleSidebar()"
        >
          ☰
        </button>

        <div class="font-mono" style="font-size:12px;">
          ${role === "student" ? "STUDENT WORKSPACE" : "FACULTY WORKSPACE"}
        </div>

        <div class="avatar">
          ${role === "student" ? student.initials : faculty.initials}
        </div>

      </header>

      <main class="page-content">
        ${content}
      </main>

    </div>

  </div>
  `;
}

function toggleSidebar() {

  const sidebar = document.getElementById("sidebar");

  if (sidebar) {
    sidebar.classList.toggle("open");
  }
}


/* =========================================================
   STUDENT DASHBOARD
   ========================================================= */

function StudentDashboard() {

  return AppShell(`

    <div class="dashboard-header fade-up">

      <div class="hero-eyebrow">
        STUDENT OVERVIEW
      </div>

      <h1>
        Good morning, ${student.name.split(" ")[0]}.
      </h1>

      <p>
        Continue your practical learning journey.
      </p>

    </div>


    <div class="stats-grid">

      ${StatCard("04", "Assigned practicals", "This semester")}

      ${StatCard("01", "Completed", "Keep going")}

      ${StatCard("25%", "Overall progress", "Across active labs")}

      ${StatCard("02", "Day streak", "Current streak")}

    </div>


    <div class="section-heading">

      <div>
        <div class="hero-eyebrow">
          ASSIGNED PRACTICALS
        </div>

        <h2 style="font-size:28px;">
          Your workspace
        </h2>
      </div>

      <button
        class="btn btn-outline"
        onclick="navigate('/student/labs')"
      >
        View all labs →
      </button>

    </div>


    <div class="practical-grid">

      ${practicals.map(PracticalCard).join("")}

    </div>


    <div style="margin-top:30px;">

      <div class="card" style="padding:24px;">

        <div class="hero-eyebrow">
          NEXT EXPERIMENT
        </div>

        <h3 style="font-size:24px;">
          Linked List Operations
        </h3>

        <p class="text-muted">
          Learn how nodes, pointers and memory references
          work through an interactive experiment.
        </p>

        <button
          class="btn btn-primary"
          onclick="navigate('/student/lab/linked-list')"
        >
          Open practical →
        </button>

      </div>

    </div>

  `, "student");
}


/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard(value, label, detail) {

  return `
    <div class="card stat-card fade-up">

      <div class="stat-label">
        ${label}
      </div>

      <div class="stat-value">
        ${value}
      </div>

      <div class="stat-detail">
        ${detail}
      </div>

    </div>
  `;
}


/* =========================================================
   PRACTICAL CARD
   ========================================================= */

function PracticalCard(item) {

  return `
    <div class="card practical-card">

      <div class="practical-card-top">

        <div>

          <span class="badge badge-${item.color}">
            ${item.course}
          </span>

          <h3 style="margin-top:14px;">
            ${item.title}
          </h3>

          <div class="practical-card-meta">
            ${item.topic} · ${item.due}
          </div>

        </div>

        <span class="badge badge-neutral">
          ${item.status}
        </span>

      </div>


      <div class="progress">

        <div
          class="progress-bar"
          style="width:${item.progress || 0}%"
        ></div>

      </div>


      <div style="
        display:flex;
        justify-content:space-between;
        margin-top:9px;
        font-size:11px;
        color:var(--muted-foreground);
      ">

        <span>
          ${item.progress || 0}% complete
        </span>

        ${
          item.id === "p1"
            ? `
              <button
                class="btn btn-primary"
                style="padding:7px 11px;font-size:11px;"
                onclick="navigate('/student/lab/linked-list')"
              >
                Start
              </button>
            `
            : ""
        }

      </div>

    </div>
  `;
}


/* =========================================================
   LAB DIRECTORY
   ========================================================= */

function LabsPage() {

  return AppShell(`

    <div class="dashboard-header">

      <div class="hero-eyebrow">
        LAB DIRECTORY
      </div>

      <h1>
        Explore the laboratory.
      </h1>

      <p>
        Choose a subject and start an interactive experiment.
      </p>

    </div>


    <div class="lab-grid-cards">

      ${labs.map(lab => `

        <div class="
          card
          lab-card
          ${lab.available ? "" : "lab-card-disabled"}
        ">

          <div class="lab-card-symbol">
            ${lab.symbol} / ${lab.code}
          </div>

          <h3>
            ${lab.name}
          </h3>

          <p>
            ${lab.description}
          </p>


          ${
            lab.available
              ? `
                <button
                  class="btn btn-primary"
                  onclick="navigate('/student/lab/linked-list')"
                >
                  Enter lab →
                </button>
              `
              : `
                <span class="badge badge-neutral">
                  Coming soon
                </span>
              `
          }

        </div>

      `).join("")}

    </div>

  `, "student");
}


/* =========================================================
   LINKED LIST LAB
   ========================================================= */

function LinkedListLabPage() {

  return AppShell(`

    <div class="dashboard-header">

      <div class="hero-eyebrow">
        DATA STRUCTURES / LINKED LISTS
      </div>

      <h1>
        Linked List Operations
      </h1>

      <p>
        Build, execute and visualize a linked list.
      </p>

    </div>


    <div class="lab-workspace">


      <!-- EDITOR -->

      <div class="card editor-panel">

        <div class="editor-header">

          <span class="font-mono" style="font-size:12px;">
            main.cpp
          </span>

          <button
            class="btn btn-lime"
            style="padding:7px 12px;font-size:12px;"
            onclick="runCode()"
          >
            ▶ Run
          </button>

        </div>


        <div class="editor-body">

          <div class="editor-code">

            <div class="editor-line">
              #include &lt;iostream&gt;
            </div>

            <div class="editor-line">
            </div>

            <div class="editor-line">
              using namespace std;
            </div>

            <div class="editor-line">
            </div>

            <div class="editor-line">
              struct Node {
            </div>

            <div class="editor-line">
              &nbsp;&nbsp;int data;
            </div>

            <div class="editor-line">
              &nbsp;&nbsp;Node* next;
            </div>

            <div class="editor-line">
              };
            </div>

            <div class="editor-line">
            </div>

            <div class="editor-line">
              int main() {
            </div>

            <div class="editor-line">
              &nbsp;&nbsp;Node* head = new Node();
            </div>

            <div class="editor-line">
              &nbsp;&nbsp;head-&gt;data = 10;
            </div>

            <div class="editor-line">
              &nbsp;&nbsp;head-&gt;next = nullptr;
            </div>

            <div class="editor-line">
            </div>

            <div class="editor-line">
              &nbsp;&nbsp;cout &lt;&lt; head-&gt;data;
            </div>

            <div class="editor-line">
              &nbsp;&nbsp;return 0;
            </div>

            <div class="editor-line">
              }
            </div>

          </div>

        </div>

      </div>


      <!-- RIGHT SIDE -->

      <div style="display:flex;flex-direction:column;gap:16px;">


        <!-- EXPERIMENT -->

        <div class="card" style="padding:22px;">

          <div class="hero-eyebrow">
            EXPERIMENT BRIEF
          </div>

          <h3 style="font-size:22px;">
            Create your first node
          </h3>

          <p class="text-muted" style="line-height:1.6;">
            Initialize a node with a value and connect
            it to the next node using a pointer.
          </p>

          <button
            class="btn btn-outline"
            onclick="showHint()"
          >
            💡 Show hint
          </button>

        </div>


        <!-- VISUALIZATION -->

        <div class="card" style="padding:22px;">

          <div class="hero-eyebrow">
            LIVE VISUALIZATION
          </div>

          <h3 style="font-size:22px;">
            Memory
          </h3>


          <div style="
            display:flex;
            align-items:center;
            gap:10px;
            overflow-x:auto;
            padding:20px 0;
            font-family:var(--font-mono);
          ">

            <div
              style="
                min-width:100px;
                padding:15px;
                background:#e9edff;
                border-radius:8px;
                text-align:center;
              "
            >
              <div style="font-size:10px;">
                HEAD
              </div>

              <strong>10</strong>

            </div>

            <span>→</span>

            <div
              style="
                min-width:100px;
                padding:15px;
                background:#edf7bd;
                border-radius:8px;
                text-align:center;
              "
            >
              <div style="font-size:10px;">
                NODE
              </div>

              <strong>20</strong>

            </div>

            <span>→</span>

            <div
              style="
                min-width:80px;
                padding:15px;
                background:#eceef1;
                border-radius:8px;
                text-align:center;
              "
            >
              NULL
            </div>

          </div>

        </div>


        <!-- CONSOLE -->

        <div class="card">

          <div class="console-tabs">

            <button
              class="console-tab active"
            >
              Console
            </button>

            <button
              class="console-tab"
            >
              Variables
            </button>

          </div>

          <div
            id="consoleOutput"
            class="console-content font-mono"
            style="font-size:12px;color:var(--muted-foreground);"
          >
            Run your code to see the output.
          </div>

        </div>

      </div>

    </div>

  `, "student");
}


/* =========================================================
   RUN CODE
   ========================================================= */

function runCode() {

  const consoleOutput =
    document.getElementById("consoleOutput");

  if (!consoleOutput) return;

  consoleOutput.innerHTML = `
    <div style="color:#2f9e62;margin-bottom:8px;">
      ✓ Compilation successful
    </div>

    <div>
      Output:
    </div>

    <div style="
      color:var(--foreground);
      margin-top:8px;
    ">
      10
    </div>

    <div style="
      margin-top:12px;
      color:var(--muted-foreground);
    ">
      Execution completed in 0.04s
    </div>
  `;

  showToast("Code executed successfully");
}


/* =========================================================
   HINT
   ========================================================= */

function showHint() {

  const modal = document.createElement("div");

  modal.className = "modal-backdrop";

  modal.innerHTML = `
    <div class="modal">

      <div class="modal-header">

        <strong>
          Hint
        </strong>

        <button
          class="btn btn-ghost"
          onclick="this.closest('.modal-backdrop').remove()"
        >
          ✕
        </button>

      </div>

      <div class="modal-body">

        <p style="line-height:1.7;">
          A linked-list node normally stores two things:
          its data and a pointer to the next node.
        </p>

        <div
          class="card"
          style="
            padding:16px;
            background:#f0f2f7;
            font-family:var(--font-mono);
          "
        >
          Node* next;
        </div>

      </div>

    </div>
  `;

  document.body.appendChild(modal);
}


/* =========================================================
   FACULTY DASHBOARD
   ========================================================= */

function FacultyDashboard() {

  return AppShell(`

    <div class="dashboard-header">

      <div class="hero-eyebrow">
        FACULTY OVERVIEW
      </div>

      <h1>
        Teaching dashboard
      </h1>

      <p>
        Monitor practicals, submissions and student progress.
      </p>

    </div>


    <div class="stats-grid">

      ${StatCard("03", "Published practicals", "This semester")}

      ${StatCard("55", "Submissions", "Across all practicals")}

      ${StatCard("78%", "Average completion", "Current cohort")}

      ${StatCard("12", "Students active", "Today")}

    </div>


    <div
      style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:16px;
      "
    >

      <div class="card" style="padding:24px;">

        <div class="hero-eyebrow">
          COHORT PERFORMANCE
        </div>

        <h3 style="font-size:23px;">
          Practical completion
        </h3>

        <div style="
          height:180px;
          display:flex;
          align-items:flex-end;
          gap:18px;
          padding-top:20px;
        ">

          ${[45, 62, 70, 78, 84, 91].map((height, i) => `
            <div style="
              flex:1;
              height:${height}%;
              background:${i === 5 ? "var(--primary)" : "var(--secondary)"};
              border-radius:5px 5px 0 0;
            "></div>
          `).join("")}

        </div>

      </div>


      <div class="card" style="padding:24px;">

        <div class="hero-eyebrow">
          COMMON DIFFICULTIES
        </div>

        ${[
          ["Pointer manipulation", 72],
          ["Recursion base cases", 54],
          ["SQL grouping logic", 38]
        ].map(item => `

          <div style="margin-top:20px;">

            <div style="
              display:flex;
              justify-content:space-between;
              margin-bottom:7px;
              font-size:13px;
            ">

              <span>${item[0]}</span>
              <strong>${item[1]}%</strong>

            </div>

            <div class="progress">

              <div
                class="progress-bar"
                style="width:${item[1]}%"
              ></div>

            </div>

          </div>

        `).join("")}

      </div>

    </div>

  `, "faculty");
}


/* =========================================================
   FACULTY PRACTICALS
   ========================================================= */

function FacultyPracticalsPage() {

  const facultyPracticals = [
    ["Linked List Operations", "Data Structures", "Linked Lists", "18 Mar 2025", 31],
    ["Stack Implementation", "Data Structures", "Stacks", "21 Mar 2025", 24],
    ["Queue Implementation", "Data Structures", "Queues", "28 Mar 2025", 0]
  ];

  return AppShell(`

    <div class="dashboard-header">

      <div class="hero-eyebrow">
        PRACTICAL MANAGEMENT
      </div>

      <h1>
        Practicals
      </h1>

      <p>
        Create and manage interactive experiments.
      </p>

    </div>


    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:20px;
      gap:12px;
      flex-wrap:wrap;
    ">

      <input
        class="input"
        style="max-width:350px;"
        placeholder="Search practicals..."
        oninput="filterPracticals(this.value)"
      />

      <button
        class="btn btn-primary"
        onclick="createPractical()"
      >
        + Create practical
      </button>

    </div>


    <div class="card" style="overflow:auto;">

      <table
        style="
          width:100%;
          border-collapse:collapse;
          min-width:700px;
        "
      >

        <thead>

          <tr style="
            text-align:left;
            border-bottom:1px solid var(--border);
          ">

            <th style="padding:16px;">Practical</th>
            <th>Course</th>
            <th>Topic</th>
            <th>Due</th>
            <th>Submissions</th>

          </tr>

        </thead>

        <tbody id="practicalTable">

          ${facultyPracticals.map(item => `

            <tr style="
              border-bottom:1px solid var(--border);
            ">

              <td style="padding:16px;font-weight:600;">
                ${item[0]}
              </td>

              <td>${item[1]}</td>

              <td>${item[2]}</td>

              <td>${item[3]}</td>

              <td>${item[4]}</td>

            </tr>

          `).join("")}

        </tbody>

      </table>

    </div>

  `, "faculty");
}


/* =========================================================
   PRACTICAL SEARCH
   ========================================================= */

function filterPracticals(value) {

  const rows =
    document.querySelectorAll("#practicalTable tr");

  rows.forEach(row => {

    row.style.display =
      row.innerText
        .toLowerCase()
        .includes(value.toLowerCase())
        ? ""
        : "none";

  });
}


/* =========================================================
   CREATE PRACTICAL
   ========================================================= */

function createPractical() {

  const modal = document.createElement("div");

  modal.className = "modal-backdrop";

  modal.innerHTML = `
    <div class="modal">

      <div class="modal-header">

        <strong>
          Create Practical
        </strong>

        <button
          class="btn btn-ghost"
          onclick="this.closest('.modal-backdrop').remove()"
        >
          ✕
        </button>

      </div>

      <div class="modal-body">

        <div class="input-group" style="margin-bottom:16px;">

          <label class="input-label">
            Practical title
          </label>

          <input
            id="newPracticalTitle"
            class="input"
            placeholder="e.g. Binary Search Tree"
          />

        </div>


        <div class="input-group">

          <label class="input-label">
            Course
          </label>

          <input
            class="input"
            value="Data Structures"
          />

        </div>

      </div>


      <div class="modal-footer">

        <button
          class="btn btn-outline"
          onclick="this.closest('.modal-backdrop').remove()"
        >
          Cancel
        </button>

        <button
          class="btn btn-primary"
          onclick="
            this.closest('.modal-backdrop').remove();
            showToast('Practical created successfully');
          "
        >
          Create
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(modal);
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  const existing =
    document.querySelector(".toast");

  if (existing) {
    existing.remove();
  }

  const toast =
    document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}


/* =========================================================
   ROUTE RENDERING
   ========================================================= */

function render() {

  const path = window.location.pathname;

  if (path === "/") {
    app.innerHTML = LandingPage();
    return;
  }

  if (path === "/login") {
    app.innerHTML = LoginPage();
    return;
  }

  if (path === "/student/dashboard") {
    app.innerHTML = StudentDashboard();
    return;
  }

  if (path === "/student/labs") {
    app.innerHTML = LabsPage();
    return;
  }

  if (path === "/student/lab/linked-list") {
    app.innerHTML = LinkedListLabPage();
    return;
  }

  if (path === "/faculty/dashboard") {
    app.innerHTML = FacultyDashboard();
    return;
  }

  if (path === "/faculty/practicals") {
    app.innerHTML = FacultyPracticalsPage();
    return;
  }

  app.innerHTML = `
    <div style="
      min-height:100vh;
      display:grid;
      place-items:center;
      background:var(--background);
      text-align:center;
      padding:30px;
    ">

      <div>

        <div class="font-mono">
          404
        </div>

        <h1>
          Page not found
        </h1>

        <button
          class="btn btn-primary"
          onclick="navigate('/')"
        >
          Return home
        </button>

      </div>

    </div>
  `;
}


/* =========================================================
   START APPLICATION
   ========================================================= */

render();