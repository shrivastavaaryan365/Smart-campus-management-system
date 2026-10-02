/* =========================================
   SMART CAMPUS MANAGEMENT SYSTEM
   ========================================= */


/* ================= ELEMENTS ================= */

const loginPage =
    document.getElementById("loginPage");

const app =
    document.getElementById("app");

const loginForm =
    document.getElementById("loginForm");


/* ================= LOGIN ================= */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const role =
        document.getElementById("loginRole").value;


    if (!email) {

        showToast("Please enter your email");

        return;
    }


    localStorage.setItem(
        "campusLoggedIn",
        "true"
    );

    localStorage.setItem(
        "campusRole",
        role
    );

    localStorage.setItem(
        "campusEmail",
        email
    );


    loginPage.style.display = "none";

    app.classList.add("show");


    updateUserRole(role);

    showToast("Login successful 🎉");

});


/* ================= ROLE ================= */

function updateUserRole(role) {

    const sidebarRole =
        document.getElementById("sidebarRole");

    if (role === "admin") {

        sidebarRole.innerText =
            "Administrator";

    } else if (role === "faculty") {

        sidebarRole.innerText =
            "Faculty";

    } else {

        sidebarRole.innerText =
            "Student";

    }

}


/* ================= PAGE NAVIGATION ================= */

function showSection(sectionId, button) {

    const sections =
        document.querySelectorAll(".page-section");

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const selected =
        document.getElementById(sectionId);

    if (selected) {

        selected.classList.add(
            "active-section"
        );

    }


    const buttons =
        document.querySelectorAll(".nav-item");

    buttons.forEach(item => {

        item.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    }


    updatePageTitle(sectionId);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    // Close mobile sidebar

    const sidebar =
        document.querySelector(".sidebar");

    sidebar.classList.remove(
        "mobile-open"
    );

}


/* ================= SHOW SECTION BY ID ================= */

function showSectionById(sectionId) {

    const button =
        document.querySelector(
            `.nav-item[onclick*="'${sectionId}'"]`
        );

    showSection(sectionId, button);

}


/* ================= PAGE TITLE ================= */

function updatePageTitle(sectionId) {

    const titles = {

        dashboard: "Dashboard",

        attendance: "Attendance",

        assignments: "Assignments",

        timetable: "Timetable",

        notices: "Campus Notices",

        results: "Academic Results",

        leave: "Leave Application",

        complaints: "Complaints & Feedback",

        profile: "My Profile"

    };


    document.getElementById(
        "pageTitle"
    ).innerText =
        titles[sectionId] || "Dashboard";

}


/* ================= DATE ================= */

function updateDate() {

    const date =
        new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    document.getElementById(
        "currentDate"
    ).innerText =
        date.toLocaleDateString(
            "en-IN",
            options
        );

}

updateDate();


/* ================= DARK MODE ================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark");


    const button =
        document.getElementById(
            "themeButton"
        );


    if (
        document.body.classList.contains(
            "dark"
        )
    ) {

        button.innerText = "☀️";

        localStorage.setItem(
            "darkMode",
            "true"
        );

    } else {

        button.innerText = "🌙";

        localStorage.setItem(
            "darkMode",
            "false"
        );

    }

}


/* ================= LOAD DARK MODE ================= */

if (
    localStorage.getItem(
        "darkMode"
    ) === "true"
) {

    document.body.classList.add("dark");

    document.getElementById(
        "themeButton"
    ).innerText = "☀️";

}


/* ================= LOGOUT ================= */

function logout() {

    localStorage.removeItem(
        "campusLoggedIn"
    );

    localStorage.removeItem(
        "campusRole"
    );

    localStorage.removeItem(
        "campusEmail"
    );

    app.classList.remove("show");

    loginPage.style.display = "flex";

    showToast("Logged out successfully");

}


/* ================= MOBILE SIDEBAR ================= */

function toggleSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    sidebar.classList.toggle(
        "mobile-open"
    );

}


/* ================= ASSIGNMENT FILTER ================= */

function filterAssignments(status) {

    const cards =
        document.querySelectorAll(
            ".assignment-card"
        );


    cards.forEach(card => {

        if (
            status === "all" ||
            card.dataset.status === status
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* ================= SUBMIT ASSIGNMENT ================= */

function submitAssignment(button) {

    const card =
        button.closest(
            ".assignment-card"
        );


    const badge =
        card.querySelector(
            ".badge"
        );


    badge.innerText =
        "Submitted";

    badge.className =
        "badge success";


    card.dataset.status =
        "submitted";


    button.innerText =
        "Submitted";

    button.classList.add(
        "disabled-btn"
    );

    button.disabled = true;


    showToast(
        "Assignment submitted successfully!"
    );

}


/* ================= LEAVE APPLICATION ================= */

const leaveForm =
    document.getElementById(
        "leaveForm"
    );


leaveForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const from =
            document.getElementById(
                "fromDate"
            ).value;

        const to =
            document.getElementById(
                "toDate"
            ).value;


        if (!from || !to) {

            showToast(
                "Please select dates"
            );

            return;

        }


        const list =
            document.getElementById(
                "leaveList"
            );


        const row =
            document.createElement(
                "div"
            );


        row.className =
            "leave-row";


        row.innerHTML = `

            <div>

                <strong>
                    ${formatDate(from)}
                    -
                    ${formatDate(to)}
                </strong>

                <p>
                    New Leave Application
                </p>

            </div>

            <span class="badge warning">
                Pending
            </span>

        `;


        list.prepend(row);


        leaveForm.reset();


        showToast(
            "Leave application submitted!"
        );

    }
);


/* ================= COMPLAINT ================= */

const complaintForm =
    document.getElementById(
        "complaintForm"
    );


complaintForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const category =
            document.getElementById(
                "complaintCategory"
            ).value;


        const description =
            document.getElementById(
                "complaintDescription"
            ).value;


        if (!category || !description) {

            showToast(
                "Please fill all fields"
            );

            return;

        }


        const list =
            document.getElementById(
                "complaintList"
            );


        const id =
            Math.floor(
                Math.random() * 900
            ) + 100;


        const row =
            document.createElement(
                "div"
            );


        row.className =
            "complaint-row";


        row.innerHTML = `

            <div>

                <strong>
                    #CMP${id}
                </strong>

                <p>
                    ${description}
                </p>

            </div>

            <span class="badge warning">
                Pending
            </span>

        `;


        list.prepend(row);


        complaintForm.reset();


        showToast(
            "Complaint submitted successfully!"
        );

    }
);


/* ================= NOTIFICATIONS ================= */

function showNotifications() {

    showToast(
        "You have 3 new notifications 🔔"
    );

}


/* ================= DATE FORMAT ================= */

function formatDate(dateString) {

    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short"
        }
    );

}


/* ================= TOAST ================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    toastMessage.innerText =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* ================= AUTO LOGIN ================= */

window.addEventListener(
    "DOMContentLoaded",
    function () {

        const loggedIn =
            localStorage.getItem(
                "campusLoggedIn"
            );


        const role =
            localStorage.getItem(
                "campusRole"
            );


        if (
            loggedIn === "true"
        ) {

            loginPage.style.display =
                "none";

            app.classList.add(
                "show"
            );

            updateUserRole(
                role || "student"
            );

        }

    }
);