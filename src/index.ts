import axios from "axios";
import { IApiShapeResponse, IRepos } from "./interfaces";


const API_URL = "https://api.github.com/orgs/stackbuilders/repos";
// Fetch data from the GitHub API.
const fetchData = async (api_url:string):Promise<IApiShapeResponse[]> => {
    try {
        const response = await axios.get(api_url);
        return response.data; 
    } catch (err) {
        throw(err);
    }
    
}

// Get repos with recursion to retrieve all the pages.
const getReposR = async (url_api:string, pageNumber:number, repoData:IApiShapeResponse[]):Promise<IApiShapeResponse[]> => {
    let parsePage = (pageNumber:number) => url_api + `?per_page=100&page=${pageNumber}`;
    let newUrl:string = parsePage(pageNumber);
    const fetchedRepos:IApiShapeResponse[] = await fetchData(newUrl);
    if (fetchedRepos.length === 0) return repoData;
    return getReposR(url_api, pageNumber + 1, repoData.concat(fetchedRepos));
}

// Get repos by calling the recursive function above.
// Then transform into an JS object.
export const getRepos = async (url_api:string):Promise<IRepos[]> => {
    const reposArray:IApiShapeResponse[] = await getReposR(url_api, 1, []);
    return reposArray.map(repo => ({
        id:repo.id,
        name:repo.full_name.split("/")[1],
        url:repo.html_url,
        updated:repo.updated_at,
        stars:repo.stargazers_count
    }));
}

// Get more than five stars from the data retrieve before.
export const getMoreThanFiveStars = (repos:IRepos[]):IRepos[] => {
    return repos.filter(repo => repo.stars > 5);
}

// Get the sum of all stars from the data retrieve before.
export const getSumOfStars = (repos:IRepos[]):number => {
    return repos.reduce((sum, repo) => sum + repo.stars, 0);
}

// Get the five last updated repos from the data retrieve before.
// The easiest way to do this is by sorting the repo by dates using sort and 
// the date class (the date class is powerful).
export const getFiveLastUpdated = (repos:IRepos[]):IRepos[] => {
    return repos.sort((a, b) => {
        return Number(new Date(b.updated)) - Number(new Date(a.updated));
    }).slice(0, 5);
}


export const getTopFiveStars = (repos:IRepos[]):IRepos[] => {
    return repos.sort((a, b) => {
        return b.stars - a.stars;
    }).slice(0, 5);
}

export const sortRepoAlpha = (repos:IRepos[]):IRepos[] => {
    return repos.sort((a, b) => {
        return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
    });
}

(async () => {
    // Retrieve and store all repos.
    const repos = await getRepos(API_URL);

    // Retrieve and store repos with more than five stars.
    const moreThanFiveRepos = getMoreThanFiveStars(repos);

    
    // Retrieve and store the sum of stars in all repos.
    const sumOfStars = getSumOfStars(repos);


    // Retrieve and store the last five updated repos.
    const fiveLastUpdatedRepos = getFiveLastUpdated(repos);

    const topFiveStars = getTopFiveStars(repos);

    const repoSorted = sortRepoAlpha(repos);
    // Show the results in console.
    console.log("Repos with more than five stars:\n");
    console.log(moreThanFiveRepos);

    console.log("Five last updated repos:\n");
    console.log(fiveLastUpdatedRepos);

    console.log("The sum of all stars in repos is:\n");
    console.log(sumOfStars);

    console.log("The top 5 stars are:\n");
    console.log(topFiveStars);

    console.log("The sorted repo is:\n");
    console.log(repoSorted);
})();