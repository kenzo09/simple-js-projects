// Instantiate
const github = new GitHub();
const ui = new UI();

// Search input
const searchUser = document.getElementById('search-user');

// Search input event listener
searchUser.addEventListener('keypress', e => {
  // Get input text
  const userText = e.target.value;

  if (e.keyCode === 13) {
    document.getElementById('profile').innerHTML = '<div class="loader"></div>';

    setTimeout(() => {
      // Make http call
      github
        .getUser(userText)
        .then(res => {
          if (res.profile.message === 'Not Found') {
            // Show alert
            ui.showAlert('User not found', 'alert alert-danger');
          } else {
            // Show profile
            ui.showProfile(res.profile);
            ui.showRepos(res.repos);
          }
        });
    }, Math.floor(Math.random() * 1000));
  }
});

searchUser.addEventListener('keyup', e => {
  if (!e.target.value) {
    // Clear profile
    ui.clearProfile();
  }
});