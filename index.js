$(document).ready(function (){
  searchRepositories()
});

// showCommits()


function searchRepositories() {
  $('#search').on('click', (event) => {
    event.preventDefault();
    let search = $('#searchTerms').val();
    gitHubUrlwithSearchAppended = `https://api.github.com/search/repositories?q=${search}`
    $.get(gitHubUrlwithSearchAppended, function(data) {
      data.items.forEach((userRepo) => {
        $('#results').append(
          `<p>Repository Name: ${userRepo.name} <a href="#" onClick="showCommits(this)" data-owner="${userRepo.owner.login}" data-repo_name="${userRepo.name}">Show Commits</a></p>
         <p>Description: ${userRepo.description}</p>
         <p>HTML URL: <a href="${userRepo.owner.html_url}">Owner Repositories</a></p>
         <p>Repo Owner Login Name: ${userRepo.owner.login}</p>
         <p>Repo Owner Avatar: <img src="${userRepo.owner.avatar_url} height="40" width="40"></p>
         Repo Owner Profile Page:<a href="${userRepo.owner.url}">Profile</a></p>`)
      })
      // debugger
    }).fail(displayError())
  })
}

function displayError() {
  $('#errors').append("I'm sorry, there's been an error. Please try again.")
}

function showCommits(userRepo) {
  let gitHubCommitsUrl = `https://api.github.com/repos/${userRepo.dataset.owner}/${userRepo.dataset.repo_name}/commits`
  $.get(gitHubCommitsUrl, function(data) {
    data.forEach((commit) => {
      $('#details').append(
      `<p>SHA: ${commit.sha}</p>
      <p>Author Name: ${commit.commit.author.name}</p>
      <p>Author Login: ${commit.author.login}</p>
      <p>Author Avatar: <img src="${commit.author.avatar_url}" height="40" width="40"</p>`)
    })
  }).fail(displayError())
}
