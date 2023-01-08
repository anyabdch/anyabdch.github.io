var projects = [
    {
        title: "PocketConcert",
        cover: "SpotifyLogo.png",
        desc: "Spotify based recommendation software"
    },
    {
        title: "TicTacToe",
        cover: "TicTacToe.png",
        desc: "Play tic-tac-toe against AI"
    },
    {
        title: "DirectFlix",
        cover: "net_logo.png",
        desc: "Netflix random genre generator"
    }
]

function listProjects(projects){
    let portfolio = document.querySelector("#projects");
    if (portfolio){
      if(projects instanceof Array){
        for (let project of projects){
            let html = `
                    <img class="p-img" src="images/${project.cover}">
                        <a class="deets" rel="${project.title} Repository" href="https://github.com/anyabdch/${project.title}">
                            <h1>${project.title}</h1>
                            <p>${project.desc}</p>
                        </a>
                </div>
                `
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

