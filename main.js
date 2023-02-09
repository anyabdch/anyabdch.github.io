var projects = [
    {
        title: "Dear-Spotify",
        cover: "discover-weekly.jpg",
        desc: "A resume of sorts",
        idx: "T"
    },
    {
        title: "PocketConcert",
        cover: "SpotifyLogo.png",
        desc: "Spotify based recommendation software",
        idx: "F"
    },
    {
        title: "TicTacToe",
        cover: "TicTacToe.png",
        desc: "Play tic-tac-toe against AI",
        idx: "F"
    },
    {
        title: "DirectFlix",
        cover: "net_logo.png",
        desc: "Netflix random genre generator",
        idx: "T"
    }
]

function listProjects(projects){
    let portfolio = document.querySelector("#projects");
    if (portfolio){
      if(projects instanceof Array){
        for (let project of projects){
            let html = ''
            if(project.idx == "T"){
                html = `
                        <img class="p-img" src="images/${project.cover}">
                            <a class="deets" rel="${project.title} Repository" href="https://anyabdch.github.io/${project.title}/index.html">
                                <h1>${project.title}</h1>
                                <p>${project.desc}</p>
                            </a>
                    </div>
                    `
                }
            else{
                html = `
                        <img class="p-img" src="images/${project.cover}">
                            <a class="deets" rel="${project.title} Repository" href="https://github.com/anyabdch/${project.title}">
                                <h1>${project.title}</h1>
                                <p>${project.desc}</p>
                            </a>
                    </div>
                    `
                }
            let container = document.createElement("div");
            container.className = "proj";
            container.id = project.title
            container.innerHTML = html;
            container.tabIndex = projects.indexOf(project);
            portfolio.append(container);
        }
  
      }
  
    }
  
  }

function openClose(target){
    let obj = document.getElementById(target);
    obj.classList.toggle("hidden");
}

