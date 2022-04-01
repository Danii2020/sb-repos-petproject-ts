import { getRepos, getMoreThanFiveStars, getSumOfStars, getFiveLastUpdated } from "./index";
import {writeFileSync} from 'fs';


// const API_URL = "https://api.github.com/orgs/stackbuilders/repos";


// (async () => {
//     // Retrieve and store all repos.
//     const repos = await getRepos(API_URL);

//     // Retrieve and store repos with more than five stars.
//     const moreThanFiveRepos = getMoreThanFiveStars(repos);

    
//     // Retrieve and store the sum of stars in all repos.
//     const sumOfStars = getSumOfStars(repos);


//     // Retrieve and store the last five updated repos.
//     const fiveLastUpdatedRepos = getFiveLastUpdated(repos);


//     // Show the results in console.
//     console.log("Repos with more than five stars:\n");
//     console.log(moreThanFiveRepos);

//     console.log("Five last updated repos:\n");
//     console.log(fiveLastUpdatedRepos);

//     console.log("The sum of all stars in repos is:\n");
//     console.log(sumOfStars);
// })();