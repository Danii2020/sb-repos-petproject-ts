import axios from "axios";
import { IApiShapeResponse, IRepos } from "./interfaces";

// Fetch data from the GitHub API.
const fetchData = async (api_url:string)Promise<> => {
    try {
        const response = await axios.get(api_url);
        return response.data; 
    } catch (err) {
        console.error(err);
    }
    
}

// Get repos with recursion to retrieve all the pages.
const getReposR = async (url_api, pageNumber, repoData) => {
    let parsePage = (pageNumber) => url_api + `?per_page=100&page=${pageNumber}`;
    let newUrl = parsePage(pageNumber);
    const fetchedRepos = await fetchData(newUrl);
    if (fetchedRepos.length === 0) return repoData;
    return getReposR(url_api, pageNumber + 1, repoData.concat(fetchedRepos));
}

// Get repos by calling the recursive function above.
// Then transform into an JS object.
export const getRepos = async (url_api) => {
    const reposArray = await getReposR(url_api, 1, []);
    return reposArray.map(repo => ({
        id:repo.id,
        name:repo.full_name.split("/")[1],
        url:repo.html_url,
        updated:repo.updated_at,
        stars:repo.stargazers_count
    }));
}

// Get more than five stars from the data retrieve before.
export const getMoreThanFiveStars = (repos) => {
    return repos.filter(repo => repo.stars > 5);
}

// Get the sum of all stars from the data retrieve before.
export const getSumOfStars = (repos) => {
    return repos.reduce((sum, repo) => sum + repo.stars, 0);
}

// Get the five last updated repos from the data retrieve before.
// The easiest way to do this is by sorting the repo by dates using sort and 
// the date class (the date class is powerful).
export const getFiveLastUpdated = (repos) => {
    return repos.sort((a, b) => {
        return new Date(b.updated) - new Date(a.updated);
    }).slice(0, 5);
}