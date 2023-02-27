import { Club, Game, GameStatus, League, Team } from "../types";
import axios from "axios";
import { IshdClub, IshdGame, IshdLeague, IshdPlan, IshdTeam } from "./types";
import {CLUB_NAME} from "../lib/constants";

export async function getGamePlan() : Promise<Game[]> {
    const url: string = `https://www.ishd.de/vereine/verein/${CLUB_NAME}/spielplan/${new Date().getFullYear()}.json?page=1&limit=500`;
    console.log(url);
    try {
        const request = await axios.get<IshdPlan>(url, {maxRedirects: 0});

        if (!request.data) {
            return [];
        }

        const games = request.data._embedded.schedule;
        const newGames = [];
        games.forEach((game) => {
            newGames.push(parseGame(game));
        })
        return newGames;
    } catch {
        return [];
    }
}

function parseGame(game: IshdGame): Game {
    const newGame = {
        id: game.id,
        homeTeam: parseTeam(game.home_team),
        awayTeam: parseTeam(game.away_team),
        homeGoals: game.home_goals,
        awayGoals: game.away_goals,
        league: parseLeague(game.league),
        hasGameSheet: game.has_game_sheet,
        venue: game.venue,
        startTime: new Date(game.date_time),
        estimatedEndTime: new Date(game.estimated_end_time),
        comments: game.comments,
        status: null,
        ishdLink: "https://www.ishd.de" + game._links.self.href,
        customGame: false
    }

    if (game.has_been_aborted) {
        newGame.status = GameStatus.aborted;
    } else if (game.has_been_cancelled) {
        newGame.status = GameStatus.cancelled;
    } else if (game.is_forfeit) {
        newGame.status = GameStatus.forfeit;
    } else if (game.is_after_penalty_shoot_out) {
        newGame.status = GameStatus.penaltyShootOut;
    } else if (game.is_after_overtime) {
        newGame.status = GameStatus.overtime;
    } else {
        newGame.status = GameStatus.regularResult;
    }

    return newGame;
}

function parseTeam(team: IshdTeam): Team {
    return {
        id: team.team_id,
        club: parseClub(team.club),
        fullName: team.full_name,
        shortName: team.short_name,
        alternateTeamName: team.alternate_team_name,
        romanNumber: team.number_roman,
        ishdLink: "https://www.ishd.de" + team._links.self.href
    }
}

function parseLeague(league: IshdLeague): League {
    return {
        season: league.season.year,
        code: league.code,
        name: league.name,
        type: league.type,
        ageGroup: league.age_group,
        ishdLink: "https://www.ishd.de" + league._links.self.href
    }
}

function parseClub(club: IshdClub): Club {
    return {
        id: club.id,
        name: club.name,
        shortName: club.short_name,
        websiteUrl: club.website?.url,
        logoUrl: "https://www.ishd.de" + club._links.logo.href,
        ishdLink: "https://www.ishd.de" + club._links.self.href
    }
}