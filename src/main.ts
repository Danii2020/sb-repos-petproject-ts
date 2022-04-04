import { 
    getRepos, 
    getMoreThanFiveStars, 
    getSumOfStars, 
    getFiveLastUpdated, 
    getTopFiveStars, 
    sortRepoAlpha, 
    removeHRepos } from "./index";
import {writeFileSync} from 'fs';
import { IRepos } from "./interfaces";


const API_URL:string = "https://api.github.com/orgs/stackbuilders/repos";


(async () => {
    // Retrieve and store all repos.
    const repos:IRepos[] = await getRepos(API_URL);
    writeFileSync('./data/all_repos.json', JSON.stringify(repos));

    // Retrieve and store repos with more than five stars.
    const moreThanFiveRepos:IRepos[] = getMoreThanFiveStars(repos);
    writeFileSync('./data/more_than_five_stars.json', JSON.stringify(moreThanFiveRepos));
    
    // Retrieve and store the sum of stars in all repos.
    const sumOfStars:number = getSumOfStars(repos);
    writeFileSync('./data/sum_stars.txt', "The sum of stars is: " + String(sumOfStars));

    // Retrieve and store the last five updated repos.
    const fiveLastUpdatedRepos:IRepos[] = getFiveLastUpdated(repos);
    writeFileSync('./data/five_last_updated.json', JSON.stringify(fiveLastUpdatedRepos));

    // Retrieve and store the top five repos by stars.
    const topFiveStars:IRepos[] = getTopFiveStars(repos);
    writeFileSync('./data/top_five_stars.json', JSON.stringify(topFiveStars));

    // Retrieve the repos sorted by their names.
    const repoSorted:IRepos[] = sortRepoAlpha(repos);
    // Then, filter the sorted repos which names don't start with 'h'.
    const reposWithoutH:IRepos[] = removeHRepos(repoSorted);
    writeFileSync('./data/notH_repos.json', JSON.stringify(reposWithoutH));

    // Show the results in console.
    console.log("Repos with more than five stars:\n");
    console.log(moreThanFiveRepos);

    console.log("Five last updated repos:\n");
    console.log(fiveLastUpdatedRepos);

    console.log("The sum of all stars in repos is:\n");
    console.log(sumOfStars);

    console.log("The top 5 stars are:\n");
    console.log(topFiveStars);

    console.log("Repos which name start without 'h':\n");
    console.log(reposWithoutH);
})();