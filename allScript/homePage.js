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