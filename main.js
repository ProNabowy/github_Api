// =============================================================== Selector Elements
const form = document.querySelector("form");

const input = document.querySelector("input");

const submit = document.querySelectorAll("input")[1];

const result = document.querySelector(".results");

const fialld = document.querySelector(".fialld");

const notification = document.querySelector(".notification");


//  =============================================================== Create function To Active HTML Repos
let activeHTML = function (  repoName , stars , href) {

        //  =============================================================== Create Div to Make It Parent OF ALL ELemnts

        let div = document.createElement("div");
        //  =============================================================== Add Class To Div

        div.classList.add("repos");
        //  =============================================================== Create Div To Get Repos Name

        const repsoName = document.createElement("div");

                //  =============================================================== Add Class To repsoName

        repsoName.classList.add("repoName");

        //  =============================================================== Add innerHTML To ReposName

        repsoName.innerHTML = repoName;

        //  =============================================================== append Repo name To repos div

        div.appendChild(repsoName);

        //  =============================================================== Create Div To Add Span and Link at it

        const spans = document.createElement("div");

        // ===============================================================  Add Class To Div
            spans.classList.add("spans");

        // ===============================================================  Create Span 
        const span = document.createElement("span");

        // ===============================================================  Add innerHTML To span
        
        span.innerHTML = `Stars ${stars}`;

        // ===============================================================  append span to parent div

                spans.append(span);

        // ===============================================================  Create Create Link

        const aLink = document.createElement("a");

        // ===============================================================  Add innerHTML To link
        aLink.innerHTML = "Visit";

        // ===============================================================  Set Attrbutie to open link for another tap
        
        aLink.setAttribute("target" , "_blank");

        // ===============================================================  Add Href To Link
        
        aLink.setAttribute("href" , href);

        // ===============================================================  append aLink to parent div

        spans.append(aLink);

        // ===============================================================  append parent of Link And Span to div
        
        div.append(spans);

        return result.appendChild(div);
            
};

// ===============================================================  Get Repo name From user When him submit form

form.addEventListener("submit" , e => {
    e.preventDefault();
})

submit.addEventListener("click" , function () {
    let repoFromUser = input.value;

    // ===============================================================  Loop For result div to clear last repos 
        // Check if input have a value 

        if(input.value) {

    let reposDel = document.querySelectorAll(".repos");

    reposDel.forEach(repo => repo.remove());

    // ===============================================================  Create Fatch To Get Repos
    fetch(`https://api.github.com/users/${repoFromUser}/repos`).then((secess) => {
        let data = secess.json();
        return data;
    }).then((addData) => {
    // ===============================================================  Get Repos Length

    let leng = addData.length;
    
    // ===============================================================  Create Array to get name of Repo
    let arr = [];

    // ===============================================================  Loop For Repos to get name

    addData.forEach(name => arr.push(name.name));

    // ===============================================================  Create Array to get Stars of Repo

    let stars = [];

    // ===============================================================  Loop For Repos to get Stars

    addData.forEach(repo => stars.push(repo.stargazers_count));

    // ===============================================================  Get URL From Repos

    let URL = [];

    // ===============================================================  Loop For Repos To Get URL

    addData.forEach(repo => URL.push(repo.clone_url));

    // ===============================================================  Add Date To window Doucment

    for (let i = 0; i < leng; i++) {

        activeHTML(arr[i] , stars[i] , URL[i]);
        
    };
}).catch(() => {

    // ===============================================================  Create Action When user write a wrong repo name

    fialld.style.cssText += "visibility: visible; opacity: 1;";
    
    throw Error("didn't Found any Repos Like This name");
})};
});

// ===============================================================  Actice button to close notification

notification.addEventListener("click" , _ => {

    fialld.style.cssText += "visibility: hidden; opacity: 0;";

});