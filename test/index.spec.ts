import { 
    getMoreThanFiveStars, 
    getSumOfStars, 
    getFiveLastUpdated, 
    getTopFiveStars, 
    sortRepoAlpha, 
    removeHRepos } from "../src/index"
import {readFileSync} from "fs";
import assert from "assert";
import { IRepos } from "../src/interfaces.js";

const allRepos:IRepos[] = JSON.parse(readFileSync("./data/all_repos.json", 'utf-8'));

describe("getMoreThanFiveStars", () => {
    context("when a repos object is taken as parameter", () => {
        it("returns repos with more than five stars", () => {
            const moreThanFiveRepos:IRepos[] = getMoreThanFiveStars(allRepos);
            const checkFiveStars = (repos:IRepos[]) => repos.every(repo => repo.stars > 5);
            assert.equal(checkFiveStars(moreThanFiveRepos), true);
        });
    });
    
});

describe("getSumOfStars", () => {
    context("when a repos object is taken as parameter", () => {
        it ("returns the sum of all stars in repos", () => {
            assert.equal(getSumOfStars(allRepos), 593);
        });
    });
    
});


describe("getFiveLastUpdated", () => {
    context("when a repos object is taken as parameter", () => {
        it ("returns the last five update repos with their ids", () => {
            const fiveUpdatedRepos:IRepos[] = getFiveLastUpdated(allRepos);
            const idsRepos:number[] = fiveUpdatedRepos.map(repo => repo.id);;
            assert.deepEqual(idsRepos, [285614418, 166290903, 219633939, 475171575, 475098183]);
        });
    });
});

describe("giveTopFiveStars", () => {
    context("when a repos object is taken as parameter", () => {
        it ("returns the top five repos by stars", () => {
            const topFiveRepos:IRepos[] = getTopFiveStars(allRepos);
            const stars:number[] = topFiveRepos.map(repo => repo.stars);
            assert.deepEqual(stars, [98, 67, 45, 36, 34]);
        });
    });
});

describe("removeHRepos", () => {
    context("when a sorted repos object is taken as parameter", () => {
        it ("returns a repos object without repos which name starts with 'h'", () => {
            const sortedRepos:IRepos[] = sortRepoAlpha(allRepos);
            const reposWithoutH:IRepos[] = removeHRepos(sortedRepos);
            const checkNames = (repos:IRepos[]) => repos.every(repo => repo.name[0] !== 'h');
            assert.equal(checkNames(reposWithoutH), true);
        })
    })
})
