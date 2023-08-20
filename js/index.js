


const users = document.getElementById('user-list')

const reposTitle = document.createElement('h1')
const repos = document.getElementById('repos-list')
repos.appendChild(reposTitle)



const h1 = document.createElement('h1')
h1.textContent ='User List'
users.appendChild(h1)

const form = document.getElementById('github-form')
const search = document.getElementById('search')

const repoForm = document.getElementById('repo-form')
repoForm.hidden = true
const listOfRepos = document.getElementsByClassName('repo')

// Adding event listener to the form


form.addEventListener('submit',(e)=> {
    e.preventDefault()
    const searchTerm = search.value
    
    console.log(searchTerm)
    
    fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
       headers:{
        Accept: 'application/vnd.github.v3+json'
            }
    })
    .then(response=> response.json())
    .then(data => handleUsers(data))
})

// write a function to handle the returned user data

function handleUsers (data) {
    // clear the list before populating
    const listOfUsers = document.getElementsByClassName('user')
    for (user of listOfUsers) {
        user.textContent = ''
    }

    userData = data.items
    console.log(userData)
    console.log("result of isArray: ",Array.isArray(userData))
    const entry = document.getElementById('search')

    const matches = userData.filter( (user) =>{
        
        
        return user.login.includes(entry.value)
    })
    for (match of matches) {
    // display username    
    const user = document.createElement('li')
    user.className = 'user'
    user.id = match.login
    const login = match.login
    user.textContent = login
    users.appendChild(user)

    // add event listener for username
    user.addEventListener('click', (e) =>{
        
        displayRepos(login)
        repoSearch(e.target)

    })
   
        // avatar
        const avatar = document.createElement('img')
        avatar.src = match.avatar_url
        avatar.width = '100'
        avatar.height = '100'
        user.appendChild(avatar)


        //link to their profile
        const link = document.createElement('a')
        link.href =match.url 
        link.textContent = match.url 
        user.appendChild(link)

    }
}
// repoSearch function-----------------------------------
function repoSearch(target) {
    repoForm.hidden = false
    repoForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        console.log('repo search executed')
       console.log(target.id)
        // Clear the repo list first
        for (repo of listOfRepos) {
            repo.textContent = ''
        }
        let repoSearchTerm = document.getElementById('repo-search')
        repoSearchTerm = repoSearchTerm.value
        fetch(`https://api.github.com/users/${target.id}/repos/${repoSearchTerm}`,{
            headers:{
                Accept: 'application/vnd.github.v3+json'
                    }
        })
        .then(response => response.json())
        .then(data => console.log('repo search result: ', data))

        // append the search result to the page


    })
}



//-------------------------------------

function displayRepos (login) {
   // Redeclare repo list
   console.log('displaying repo data for: ',login)
    reposTitle.textContent = `Repo List For ${login}`
        

    // clear repo list
    const listOfRepos = document.getElementsByClassName('repo')
for (repo of listOfRepos) {
    repo.textContent = ''
}
    
    
fetch(`https://api.github.com/users/${login}/repos`, {
    headers:{
     Accept: 'application/vnd.github.v3+json'
         }
    })
.then(response => response.json())
.then(data => {
   console.log(data)
   if (data.length < 1) {
    console.log('repo list is empty')
    const repos_li = document.createElement('li')
    repos_li.textContent = "User has no repos =("
    repos.appendChild(repos_li)
    
   }
   for (repo of listOfRepos) {
    repo.textContent = ''
}
// create new repo list elements
   data.forEach((repo)=>{
    const repos_li = document.createElement('li')
    repos_li.className = 'repo'
    const link = document.createElement('a')
    repos_li.appendChild(link)
    link.href = repo.html_url
    link.textContent = repo.html_url
    repos.appendChild(repos_li)
   })
})
   
function repoMessage () {

}
    
    
    
    
    
    
    
}



