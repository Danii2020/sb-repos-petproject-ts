export interface IApiResponse {
    id:number;
    name:string;
    full_name:string;
    html_url:string;
    updated_at:Date;
    stargazers_count:number;
}

export interface IRepos {
    id:number;
    name:string;
    url:string;
    updated:Date;
    stars:number;
}
