const mainContainerController = 
{
  themes: [],

  getThemes: () =>
  {
    return new Promise((res, _rej) => 
    {
      setTimeout( async() => res (
        await fetch("./themes.json")
        .then( res => res.json() )
      ), Math.round(Math.random() * 100))          
    })
  },

  pageContentController: (page) => 
  {
    const title = mainContainerController.themes[page].title;
    const description = mainContainerController.themes[page].description;
    const author = mainContainerController.themes[page].author;
    const articles = mainContainerController.themes[page].articles;
    const $themeContent = document.querySelector("#themeContent");

    //Title and description
    $themeContent.innerHTML = 
    `
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        ${title}
      </h2>
      <p class="mt-4 text-gray-500">
        ${description}
      </p>
    `;

    //Paragraphs
    const dl = document.createElement("dl");
    dl.setAttribute("class", "mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-12 lg:gap-x-8")

    articles.forEach( article =>
    {
      dl.innerHTML += 
      `    
        <div class="border-t border-gray-200 pt-2">
          <dt class="font-medium text-gray-900">
            ${article.subTitle}
          </dt>
          <dd class="mt-2 text-sm text-gray-500">
            ${article.text}
          </dd>
        </div>
      `
    })

    $themeContent.appendChild(dl);

    //Authors
    $themeContent.innerHTML += 
    `
    <div class="border-t border-gray-200 flex inline-flex items-baseline space-x-1 mt-6 w-full">
      <h6 class="ont-medium text-gray-900">
        Authors:
      </h6>
      <p class="mt-2 text-sm text-gray-500">
        ${author}
      </p>
    </div>
    `
  },
  
  navController:
  {
    $navContainer: document.querySelector("#navLinks"),

    makeNav: (page) =>
    {
      mainContainerController.navController.$navContainer.innerHTML = ``;
      mainContainerController.themes.map((theme, indexTheme) =>
      {
        mainContainerController.navController.$navContainer.innerHTML += 
        `
          <a href="#" onClick="mainContainerController.navController.makeNav(${indexTheme})"
            class="
            navOptions text-gray-300 hover:bg-gray-700 hover:text-white 
            rounded-md px-3 py-2 text-sm font-medium text-center"
          >
            ${theme.title}
          </a>
        `
      })
      mainContainerController.navController.pageActivate(page);
    },

    pageActivate: (page) =>
    {
      const $navOptions = Array.from(document.querySelectorAll("a.navOptions"));
      $navOptions[page].classList = `
        navOptions bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium text-center`
      ;
      $navOptions[page].ariaCurrent = `page`;
      mainContainerController.pageContentController(page);
    }
  },

  init: async (pageInit = 0) =>
  {
    document.querySelector("#themeContent").innerHTML = "Carregando...";
    mainContainerController.themes = await mainContainerController.getThemes() || [];
    mainContainerController.navController.makeNav(pageInit);
    mainContainerController.pageContentController(pageInit);
  },
}

mainContainerController.init(Math.round(Math.random()*5));