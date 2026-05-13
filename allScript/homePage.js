

const url="https://phi-lab-server.vercel.app/api/v1/lab";
let issues=[];



// load all issues 
async function loadIssues(){
    const response=fetch(url+ "/issues");
   const data=await response.json();
   issues=data.data;

   displayIssues(issues);
   activeButton("allBtn");

}

function displayIssues(data)
{
    let container=document.getElementById("issueContainer");
    container.innerHTML="";
    updateState(data);

    if(data.length==0)
    {
        
        container.innerHTML=`<h2 class="text-2xl text-gray-400">
            No Issues Found
          </h2>`;
          return;
    }


    
}

