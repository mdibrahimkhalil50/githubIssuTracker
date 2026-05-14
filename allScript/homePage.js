   // API URL
        const BASE_URL =
            "https://phi-lab-server.vercel.app/api/v1/lab";

        // Store Issues
        let issues = [];

        // =========================
        // Load All Issues
        // =========================

        async function loadIssues() {

            const response =
                await fetch(BASE_URL + "/issues");

            const data =
                await response.json();

            issues = data.data;

            displayIssues(issues);

            activeButton("allBtn");

        }

        // =========================
        // Display Issues
        // =========================

        function displayIssues(data) {

            // Container
            let container =
                document.getElementById("issuesContainer");

            // Clear
            container.innerHTML = "";

            // Update Stats
            updateStats(data);

            // No Data
            if(data.length === 0) {

                container.innerHTML = `

                <h2 class="text-2xl text-gray-400">
                    No Issues Found
                </h2>

                `;

                return;

            }

            // Loop
            for(let i = 0; i < data.length; i++) {

                let issue = data[i];

                // Priority Color
                let topColor = "";

                if(issue.priority === "high") {

                    topColor = "bg-green-400";

                }

                else if(issue.priority === "medium") {

                    topColor = "bg-yellow-400";

                }

                else {

                    topColor = "bg-purple-400";

                }

                // Card
                let card = `

                <div class="bg-white rounded-xl border shadow-sm overflow-hidden">

                    <!-- Top Border -->
                    <div class="h-1 ${topColor}"></div>

                    <!-- Content -->
                    <div class="p-4">

                        <!-- Top -->
                        <div class="flex justify-between items-center">

                            <p class="text-xs text-green-500">

                                ● ${issue.status}

                            </p>

                            <p class="text-xs bg-gray-100 px-2 py-1 rounded-full">

                                ${issue.priority}

                            </p>

                        </div>

                        <!-- Title -->
                        <h2 class="font-bold text-sm mt-4">

                            ${issue.title}

                        </h2>

                        <!-- Description -->
                        <p class="text-xs text-gray-500 mt-2">

                            ${issue.description}

                        </p>

                        <!-- Tags -->
                        <div class="flex gap-2 mt-4">

                            <p class="bg-red-100 text-red-500 px-2 py-1 rounded-full text-[10px]">

                                BUG

                            </p>

                            <p class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-[10px]">

                                HELP

                            </p>

                        </div>

                        <!-- Footer -->
                        <div class="border-t mt-4 pt-3 text-[11px] text-gray-400 flex justify-between">

                            <p>
                                ID: ${issue.id}
                            </p>

                            <p>
                                ${issue.assignee || "Unknown"}
                            </p>

                        </div>

                        <!-- Button -->
                        <button
                            onclick="singleIssue(${issue.id})"
                            class="btn btn-xs bg-purple-600 text-white border-none mt-4"
                        >
                            Details
                        </button>

                    </div>

                </div>

                `;

                // Add Card
                container.innerHTML += card;

            }

        }

        // =========================
        // Update Stats
        // =========================

        function updateStats(data) {

            // Total
            document.getElementById("totalIssues")
            .innerText =
                data.length;

            // Open Count
            let open = 0;

            // Closed Count
            let closed = 0;

            // Loop
            for(let i = 0; i < data.length; i++) {

                if(data[i].status === "open") {

                    open++;

                }

                else {

                    closed++;

                }

            }

            // Update UI
            document.getElementById("openCount")
            .innerText =
                "Open: " + open;

            document.getElementById("closedCount")
            .innerText =
                "Closed: " + closed;

        }

        // =========================
        // Search Issues
        // =========================

        async function searchIssues() {

            let text =
                document.getElementById("searchInput")
                .value;

            const response =
                await fetch(
                    BASE_URL +
                    "/issues/search?q=" +
                    text
                );

            const data =
                await response.json();

            displayIssues(data.data);

        }

        // =========================
        // Show All
        // =========================

        function showAll() {

            displayIssues(issues);

            activeButton("allBtn");

        }

        // =========================
        // Show Open
        // =========================

        function showOpen() {

            let openIssues = [];

            for(let i = 0; i < issues.length; i++) {

                if(issues[i].status === "open") {

                    openIssues.push(issues[i]);

                }

            }

            displayIssues(openIssues);

            activeButton("openBtn");

        }

        // =========================
        // Show Closed
        // =========================

        function showClosed() {

            let closedIssues = [];

            for(let i = 0; i < issues.length; i++) {

                if(issues[i].status === "closed") {

                    closedIssues.push(issues[i]);

                }

            }

            displayIssues(closedIssues);

            activeButton("closedBtn");

        }

        // =========================
        // Active Button
        // =========================

        function activeButton(id) {

            // Reset
            document.getElementById("allBtn")
            .className =
                "btn py-2 px-10";

            document.getElementById("openBtn")
            .className =
                "btn py-2 px-10";

            document.getElementById("closedBtn")
            .className =
                "btn py-2 px-10";

            // Active
            document.getElementById(id)
            .className =
                "btn btn-primary py-2 px-10";

        }

        // =========================
        // Single Issue
        // =========================

        async function singleIssue(id) {

            const response =
                await fetch(
                    BASE_URL + "/issue/" + id
                );

            const data =
                await response.json();

            const issue =
                data.data;

            alert(

                "Title: " + issue.title +

                "\n\nDescription: " +
                issue.description +

                "\n\nPriority: " +
                issue.priority +

                "\n\nStatus: " +
                issue.status

            );

        }

        // =========================
        // Open Modal
        // =========================

        function openModal() {

            document
            .getElementById("issueModal")
            .showModal();

        }

        // =========================
        // Add Issue
        // =========================

        function addIssue() {

            // Values
            let title =
                document.getElementById("issueTitle")
                .value;

            let description =
                document.getElementById("issueDescription")
                .value;

            let priority =
                document.getElementById("issuePriority")
                .value;

            // New Object
            let newIssue = {

                id: Date.now(),

                title: title,

                description: description,

                priority: priority,

                status: "open"

            };

            // Add Array
            issues.unshift(newIssue);

            // Update UI
            displayIssues(issues);

            // Active Button
            activeButton("allBtn");

            // Reset
            document.getElementById("issueTitle").value = "";

            document.getElementById("issueDescription").value = "";

            document.getElementById("issuePriority").value = "medium";

            // Close Modal
            document
            .getElementById("issueModal")
            .close();

        }

        // Initial Load
        loadIssues();