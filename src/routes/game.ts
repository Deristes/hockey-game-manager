import {Express} from "express";
import {
    filterPlaceAway,
    filterPlaceHome,
    filterTeam, filterTimePrevious, filterTimeToday, filterTimeUpcoming,
    getGameList
} from "../gameManager";

export default function start(app: Express) {

    app.get('/api/v1/game/list', async (req, res) => {
        let list = await getGameList();

        let time: string;
        if (typeof req.query.time === "string") {
            time = req.query.time.toLowerCase();
        }
        let team: string;
        if (typeof req.query.team === "string") {
            team = req.query.team.toLowerCase();
        }
        let place: string;
        if (typeof req.query.place === "string") {
            place = req.query.place.toLowerCase();
        }

        // Filter Time
        if (time === "today") {
            list = filterTimeToday(list);
        }

        if (time === "upcoming") {
            list = filterTimeUpcoming(list);
        }

        if (time === "previous") {
            list = filterTimePrevious(list);
        }

        // Filter Team
        if (team !== "club" && team) {
            list = filterTeam(list, team);
        }

        // Filter Place
        if (place === "home") {
            list = filterPlaceHome(list);
        }
        if (place === "away") {
            list = filterPlaceAway(list);
        }

        res.json(list);
    })
}