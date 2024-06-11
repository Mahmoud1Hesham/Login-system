    var welcome = document.querySelector('#welcome');
    var logoutBtn = document.querySelector('#logout');
    var contentDiv = document.querySelector('#content');
    var usersArr = JSON.parse(localStorage.getItem('usersArr')) || [];
    var currentUser;

    for(var i = 0; i < usersArr.length; i++) {
        if(usersArr[i].hasOwnProperty('islogedin') && usersArr[i].islogedin === true) {
            console.log("Found logged-in user:", usersArr[i]);
            // Store the found user in the currentUser variable
            currentUser = usersArr[i];
            break; // Exit the loop once the current user is found and processed
        } else {
            console.log("No logged-in user found or missing properties.");
        }
    }
    
    // Now, currentUser holds the last logged-in user found in the usersArr
   function greatName(){ welcome.innerText = `Welcome ${currentUser.name || 'Guest'}`;   }

   window.addEventListener('load',function(){
greatName();
console.log('loaded');
   })



   function logout() {
    console.log('Logout function called');
    if (currentUser.islogedin) {
        console.log('User is logged in, logging out...');
        currentUser.islogedin = false;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        console.log('No user is logged in or missing properties.');
        currentUser = {};
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        open("../index.html",'_self');
    }
}
logoutBtn.addEventListener('click',function(){
    console.log('Logout button clicked');
    logout();
})

 // Function to fetch data from the API
    function fetchData(category) {
        fetch(`https://forkify-api.herokuapp.com/api/search?q=${category}`)
            .then(response => response.json())
            .then(data => {
                displayData(data.recipes);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Function to display data in the content div
    function displayData(recipes) {
        contentDiv.innerHTML = ''; // Clear previous content
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('col-md-3');
            recipeElement.innerHTML = `
                <figure class="inner">
                    <img class="w-100" src="${recipe.image_url}" alt="${recipe.title}">
                    <figcaption class="text-center">
                        <span class="title text-white h2">${recipe.title}</span>
                        <p class="puplisher text-white h3">by <span>${recipe.publisher}</span></p>
                    </figcaption>
                </figure>
            `;
            contentDiv.appendChild(recipeElement);
        });
    }

    // Event listeners for tab buttons
    var tabButtons = document.querySelectorAll('[data-category]');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            var category = this.getAttribute('data-category');
            fetchData(category);
        });
    });

    // Load default category (Pizza) on page load
    fetchData('pizza');
