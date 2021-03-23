export interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: [];
    gists_url: [];
    starred_url: [];
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: [];
    received_events_url: string;
    type: string;
    site_admin: boolean;    
}
