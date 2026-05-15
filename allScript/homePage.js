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