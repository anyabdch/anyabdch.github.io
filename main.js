var projects = [
    {
        title: "Dear-Spotify",
        cover: "discover-weekly.jpg",
        desc: "A resume of sorts",
        idx: "T"
    }, 
    {
        title: "DirectFlix",
        cover: "net_logo.png",
        desc: "Netflix random genre generator",
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
    }
]

function listProjects(projects){
    let portfolio = document.querySelector("#projectSlide");
    if (portfolio){
      if(projects instanceof Array){
        projects.forEach((project,index) => {
            let html1 = ''
            let html2 = ''
            if(index == 0){
                html1 = `
                            <button type="button" data-bs-target="#projectSlides" data-bs-slide-to=${index} 
                                    class="active" aria-current="true" aria-label="Project ${index}"></button>
                    </div>
                    `;
                html2 = ` <div class="carousel-item active">
                                    <a class="deets"
                                       rel="${project.title} Repository"
                                        href="//${project.site}"> 
                                        <img class="p-img" src="\static\website\images\${project.title}.png">                                       <h1>{{project.title}}</h1>
                                        <p>${project.desc}</p>
                                    </a>
                            </div>
                        </div> `
            }
            else{
                html1 = `
                            <button type="button" data-bs-target="#projectSlides" data-bs-slide-to=${index}
                            aria-label="Project ${index}"></button>
                    `;
                html2 = ` <div class="carousel-item">
                                        <a class="deets"
                                           rel="${project.title} Repository"
                                            href="//${project.site}"> 
                                            <img class="p-img" src="\static\website\images\${project.title}.png">                                       <h1>{{project.title}}</h1>
                                            <p>${project.desc}</p>
                                        </a>
                                </div>
                            </div> `
                }
            let container1 = document.createElement("div");
            container1.className = "carousel-indicators";
            container1.innerHTML = html1;
            portfolio.append(container1);
            
            let container2 = document.createElement("div");
            container2.className = "carousel-inner";
            container2.innerHTML = html2;
            portfolio.append(container2);
        })
  
      }
  
    }
  
  }

window.onresize = function() {
    if(window.innerWidth < 880){
        let menu = document.getElementById("flexibleNav");
        let butt = document.getElementById("bNav");
        butt.classList.remove("hidden");
        menu.classList.add("collapse", "navbar-collapse");
    }
    else{
        let menu = document.getElementById("flexibleNav");
        let butt = document.getElementById("bNav");
        butt.classList.add("hidden");
        menu.classList.remove("collapse", "navbar-collapse");
    }
};

function foo() {
    document.getElementById("contact").parentElement.classList.toggle("highlighted");
};
    
function meineFunktion() {
    foo();
    setTimeout(foo, 800)
};

/* window.onscroll = function() {
    let trig = document.getElementById("#carouselBar");
    let pic = document.getElementById('#b-img');
    if (trig.scrollIntoView){
        let menu = document.getElementById("#menuHeader");
        menu.setAttribute("background-color", "black !important");
    }
    if(pic.scrollIntoView){
        let menu = document.getElementById("#menuHeader");
        menu.setAttribute("background-color", "white !important");
    }
} */


