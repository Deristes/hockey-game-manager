export interface Game {
    id: number,
    homeTeam: Team,
    awayTeam: Team,
    homeGoals: number|null,
    awayGoals: number|null,
    league: League,
    hasGameSheet: boolean,
    venue: string,
    startTime: Date,
    estimatedEndTime: Date,
    comments: string,
    status: GameStatus,
    ishdLink: string,
    customGame: boolean
}

export enum GameStatus {
    regularResult = "REGULARRESULT",
    overtime = "OVERTIME",
    penaltyShootOut =  "PENALTYSHOOTOUT",
    forfeit = "FORFEIT",
    cancelled = "CANCELLED",
    aborted = "ABORTED"
}

export interface Team {
    id: number,
    club: Club,
    fullName: string,
    shortName: string,
    alternateTeamName: string,
    romanNumber: string,
    ishdLink: string
}

export interface League {
    season: number,
    code: string,
    name: string,
    type: string,
    ageGroup: string,
    ishdLink: string
}

export interface Club {
    id: number,
    name: string,
    shortName: string,
    websiteUrl?: string,
    logoUrl: string,
    ishdLink: string
}

export enum Cache{
    gameList="GAMELIST"
}