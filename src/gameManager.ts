import {Cache, Game} from "./types";
import cacheData from "memory-cache";
import {getGamePlan} from "./ishd/getData";
import {setCharAt} from "./helper/string";
import {CLUB_SHORT_NAME} from "./lib/constants";

async function refreshGameList(): Promise<Game[]> {
    const gamePlan = await getGamePlan();
    cacheData.put(Cache.gameList, gamePlan);
    return gamePlan;
}

export async function getGameList(): Promise<Game[]> {
    const list = cacheData.get(Cache.gameList);
    if (list) {
        return list;
    }
    return await refreshGameList();
}

export function filterTimeToday(list: Game[]): Game[] {
    return filterTimeByDate(list, new Date())
}

export function filterTimeUpcoming(list: Game[]): Game[] {
    return list.filter(e => {
        const startDate = new Date(e.startTime).setHours(0,0,0,0);
        const filterDate = new Date().setHours(0,0,0,0);
        return startDate >= filterDate;
    })
}

export function filterTimePrevious(list: Game[]): Game[] {
    return list.filter(e => {
        const startDate = new Date(e.startTime).setHours(0,0,0,0);
        const filterDate = new Date().setHours(0,0,0,0);
        return startDate < filterDate;
    })
}

export function filterTimeByDate(list: Game[], date: Date) {
    return list.filter(e => {
        const startDate = new Date(e.startTime).setHours(0,0,0,0);
        const filterDate = date.setHours(0,0,0,0)
        return startDate === filterDate
    })
}
export function filterPlaceHome(list: Game[]): Game[] {
    return list.filter(e => {
        return e.homeTeam.club.shortName === CLUB_SHORT_NAME;
    })
}

export function filterPlaceAway(list: Game[]): Game[] {
    return list.filter(e => {
        return e.awayTeam.club.shortName === CLUB_SHORT_NAME;
    })
}

export function filterTeam(list: Game[], team: string): Game[] {
    const formatTeam = formatTeamNameToAlternateTeamName(team);

    return list.filter(e => {
        return (
            (e.homeTeam.club.shortName === CLUB_SHORT_NAME && e.homeTeam.alternateTeamName === formatTeam) ||
            (e.awayTeam.club.shortName === CLUB_SHORT_NAME && e.awayTeam.alternateTeamName === formatTeam)
        );
    })
}

function formatTeamNameToAlternateTeamName(team: string) {
    let formatTeam = team.replace('-', '. ').replace('ue', 'ü');
    formatTeam = setCharAt(formatTeam, 3, formatTeam.charAt(3).toUpperCase())
    return formatTeam;
}