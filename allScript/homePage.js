const URL =
        "https://phi-lab-server.vercel.app/api/v1/lab";
        let issues = [];
        async function loadIssues() {

            const response =
            await fetch(URL + "/issues");

            const data =
            await response.json();
            issues = data.data;
            displayIssues(issues);
            setActiveButton("allBtn");

        }

        function displayIssues(data) {
            const container =
            document.getElementById("issuesContainer");
            container.innerHTML = "";

            document.getElementById("totalIssues")
            .innerText =
            data.length;
            for(let i = 0; i < data.length; i++)
             {
                const issue = data[i];
                // Border Color
                let borderColor = "";
                if(issue.status === "open") {
                    borderColor = "bg-green-500";
                }
                else {

                    borderColor = "bg-[#4A00FF]";
                }
            
                let statusColor = "";

                if(issue.status === "open") {

                    statusColor = "text-green-500";
                }

                else {

                    statusColor = "text-[#4A00FF]";

                }
                // Priority Color
                let priorityColor = "";

                if(issue.priority === "high") {

                    priorityColor =
                    "bg-red-100 text-red-500";

                }

                else if(issue.priority === "medium") {

                    priorityColor =
                    "bg-yellow-100 text-yellow-700";

                }

                else {

                    priorityColor =
                    "bg-green-100 text-green-700";

                }
                // Card
                const card = `

                    <div
                        class="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg duration-300"
                    >

                        <!-- Top Border -->
                        <div class="h-1 ${borderColor}"></div>

                        <!-- Content -->
                        <div class="p-4 space-y-4">

                            <!-- Top -->
                            <div class="flex justify-between items-center">

                                <!-- Status -->
                                <div class="flex items-center gap-2">

                                    <img
                                        class="w-4 h-4"
                                        src="${
                                            issue.status === 'open'
                                            ? '../assets/Open-Status.png'
                                            : '../assets/Closed- Status .png'
                                        }"
                                    > 

                                </div>

                                <!-- Priority -->
                                <button
                                    onclick="showDetails(${issue.id})"
                                    class="text-[10px] px-3 py-1 rounded-full uppercase ${priorityColor}"
                                >

                                    ${issue.priority}

                                </button>

                            </div>

                            <!-- Title -->
                            <h2 class="font-bold text-sm leading-6">

                                ${issue.title}

                            </h2>

                            <!-- Description -->
                            <p class="text-xs text-gray-500 leading-5">

                                ${issue.description.slice(0, 80)}...

                            </p>

                            <!-- Tags -->
                            <div class="flex gap-2 flex-wrap">

                                <p class="bg-red-100 text-red-500 px-2 py-1 rounded-full text-[10px]">

                                    BUG

                                </p>

                                <p class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-[10px]">

                                    HELP WANTED

                                </p>

                            </div>

                            <!-- Footer -->
                            <div class="border-t pt-3">

                                <p class="text-[11px] text-gray-400">

                                    By ${issue.assignee || "Unknown"}

                                </p>

                            </div>

                        </div>

                    </div>

                `;

                container.innerHTML += card;

            }

        }

        function setActiveButton(buttonId) {
            // Reset
            document.getElementById("allBtn")
            .className =
            "btn rounded-full px-8 bg-white text-black border";

            document.getElementById("openBtn")
            .className =
            "btn rounded-full px-8 bg-white text-black border";
            document.getElementById("closedBtn")
            .className =
            "btn rounded-full px-8 bg-white text-black border";
            // Active
            document.getElementById(buttonId)
            .className =
            "btn rounded-full px-8 bg-[#4A00FF] text-white border-none";

        }
 function showAll() {
            displayIssues(issues);
            setActiveButton("allBtn");

        }

        function showOpen() {
            const openIssues = [];
            for(let i = 0; i < issues.length; i++) {

                if(issues[i].status === "open") {
                    openIssues.push(issues[i]);
                }
            }
            displayIssues(openIssues);
            setActiveButton("openBtn");

        }

        function showClosed() {

            const closedIssues = [];



            for(let i = 0; i < issues.length; i++) {

                if(issues[i].status === "closed") {

                    closedIssues.push(issues[i]);

                }

            }

            displayIssues(closedIssues);

            setActiveButton("closedBtn");

        }
        async function searchIssues() {
            const text =
            document.getElementById("searchInput")
            .value;
            const response =
            await fetch(
                URL +
                "/issues/search?q=" +
                text
            );
            const data =
            await response.json();

            displayIssues(data.data);

        }
        // Details Modal
        async function showDetails(id) {

            const response =
            await fetch(

                URL +

                "/issue/" +
                id
            );
            const data =
            await response.json();
            const issue =
            data.data;
            // Status Color
            let statusColor = "";
            if(issue.status === "open")
             {
                statusColor =
                "bg-green-500";
            }
            else {
                statusColor =
                "bg-[#4A00FF]";

            }
            // Priority Color
            let priorityColor = "";
            if(issue.priority === "high") {

                priorityColor =
                "bg-red-500";

            }

            else if(issue.priority === "medium") {

                priorityColor =
                "bg-yellow-500";

            }

            else {

                priorityColor =
                "bg-green-500";

            }
document.getElementById("modalContent")
            .innerHTML = `

                <div class="space-y-6">

                    <!-- Title -->
                    <h2 class="text-3xl font-bold text-gray-800">

                        ${issue.title}
                    </h2>
                    <!-- Top -->
                    <div class="flex items-center gap-4 flex-wrap">

                        <p class="${statusColor} text-white px-4 py-1 rounded-full text-xs">
                            ${issue.status}
                        </p>
                        <p class="text-sm text-gray-500">
                            Opened by ${issue.assignee || "Unknown"}
                        </p>
                    </div>
                    <!-- Tags -->
                    <div class="flex gap-3 flex-wrap">
                        <p class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs">
                            BUG
                        </p>
                        <p class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                            HELP WANTED
                        </p>
                    </div>
                    <!-- Description -->
                    <p class="text-gray-600 leading-8">
                        ${issue.description}
                    </p>
                    <!-- Info -->
                    <div class="bg-gray-50 rounded-2xl p-5 grid grid-cols-2 gap-6">
                        <div>
                            <p class="text-sm text-gray-400">
                                Assignee:
                            </p>
                            <h2 class="font-bold mt-2">
                                ${issue.assignee || "Unknown"}
                            </h2>
                        </div>
                        <div>

                            <p class="text-sm text-gray-400">

                                Priority:

                            </p>

                            <p class="${priorityColor} text-white text-xs px-3 py-1 rounded-full inline-block mt-2 uppercase">

                                ${issue.priority}

                            </p>

                        </div>

                    </div>

                </div>

            `;
            document.getElementById("issueModal")
            .showModal();

        }

 loadIssues();