import game from "./game";
import team from "./team"
import {Express} from "express";

export default function start (app: Express) {
    game(app);
    team(app);
}