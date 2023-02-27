import {Team} from "./types";
import {getGameList} from "./gameManager";

export async function getTeamList(): Promise<Team[]> {
    const gameList = await getGameList();

    const teams : Team[] = [];

    gameList.forEach(e => {
        if (
            e.homeTeam.club.shortName === process.env.CLUB_SHORT_NAME &&
            !teamInList(e.homeTeam, teams)
        ) {
            teams.push(e.homeTeam);
        }
    })

    return teams;
}

function teamInList(team: Team, list: Team[]) : boolean {
    return list.some(t => {
        return t.id === team.id
    })
}