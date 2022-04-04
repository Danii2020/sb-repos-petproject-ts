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

// Get the top five repos by stars, using the sort method.
export const getTopFiveStars = (repos:IRepos[]):IRepos[] => {
    return repos.sort((a, b) => {
        return b.stars - a.stars;
    }).slice(0, 5);
}

// Sort the repos alphabetically by their names.
export const sortRepoAlpha = (repos:IRepos[]):IRepos[] => {
    return repos.sort((a, b) => {
        return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
    });
}
// Then, filter the sorted repos which names don't start with 'h'.
export const removeHRepos = (sortedRepos:IRepos[]):IRepos[] => {
    return sortedRepos.filter(repo => repo.name[0] !== 'h')
}