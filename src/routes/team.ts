import {getTeamList} from "../teamManager";
import {Express} from "express";


export default function start(app: Express) {
    app.get('/api/v1/team/list', async (_req, res) => {
        res.json(await getTeamList());
    })
}