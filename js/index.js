//On website load completion, add event listeners to form.
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#github-form').addEventListener('submit', (event) => {
        event.preventDefault()
        let input = document.querySelector('#search').value
        fetch(`https://api.github.com/search/users?q=${input}`)
        .then((promise) => {
            return promise.json()
        })
        .then((object) => {
            let searchResults = object.items
            for (let item of searchResults) {
                let login = item.login
                let avatar = item.avatar_url
                let url = item.html_url
                let userListElement = document.querySelector('#user-list')
                let newUserListElement = document.createElement('div')
                let newPhotoElement = document.createElement('img')
                let newLoginElement = document.createElement('h3')
                let newURLElement = document.createElement('a')
                newUserListElement.id = 'profilecard'
                newPhotoElement.id = 'cardphoto'
                newURLElement.href = url
                newURLElement.innerHTML = 'Github Page'
                newLoginElement.innerHTML = login
                newPhotoElement.src = avatar
                newUserListElement.appendChild(newPhotoElement)
                newUserListElement.appendChild(newLoginElement)
                newUserListElement.appendChild(newURLElement)
                userListElement.appendChild(newUserListElement)
                document.querySelector('#profilecard').addEventListener('click', (event) => {
                    fetch(`https://api.github.com/users/${login}/repos`)
                    .then((promise) => {
                        return promise.json()
                    })
                    .then((object) => {
                        let repoResults = object
                        for (let repoItem of repoResults) {
                            let repoList = document.querySelector('#repos-list')
                            let newRepoElement = document.createElement('li')
                            newRepoElement.innerText = repoItem.name
                            repoList.appendChild(newRepoElement)
                        }
                    })
                })
            }
        })
    })
})