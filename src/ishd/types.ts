export interface IshdPlan {
    page:      number;
    limit:     number;
    pages:     number;
    total:     number;
    _links:    IshdPlanLinks;
    _embedded: IshdEmbedded;
}

export interface IshdEmbedded {
    schedule: IshdGame[];
}

export interface IshdGame {
    has_result:                 boolean;
    is_pending:                 boolean;
    is_regular_result:          boolean;
    is_after_overtime:          boolean;
    is_after_penalty_shoot_out: boolean;
    is_forfeit:                 boolean;
    has_been_cancelled:         boolean;
    has_been_aborted:           boolean;
    is_home_win:                boolean;
    is_home_loss:               boolean;
    is_away_win:                boolean;
    is_away_loss:               boolean;
    is_tie:                     boolean;
    winning_team:               IshdTeam | undefined;
    losing_team:                IshdTeam | undefined;
    comments:                   string;
    is_not_needed:              boolean;
    estimated_end_time:         Date;
    id:                         number;
    date_time:                  Date;
    home_team:                  IshdTeam;
    away_team:                  IshdTeam;
    venue:                      string;
    home_goals:                 number;
    away_goals:                 number;
    has_game_sheet:             boolean;
    league:                     IshdLeague;
    _links:                     IshdGameLinks;
}

export interface IshdGameLinks {
    self: IshdLinkHref;
}

export interface IshdLinkHref {
    href: string;
}

export interface IshdTeam {
    club:                IshdClub;
    full_name:           string;
    short_name:          string;
    short_club_name:     string;
    alternate_team_name: string;
    number_int:          number;
    club_name:           string;
    number_roman:        string;
    team_id:             number;
    _links:              IshdGameLinks;
}

export interface IshdClub {
    id:         number;
    name:       string;
    short_name: string;
    website?:   IshdWebsite;
    _links:     IshdClubLinks;
}

export interface IshdClubLinks {
    self: IshdLinkHref;
    logo: IshdLinkHref;
}

export interface IshdWebsite {
    url: string;
}

export interface IshdLeague {
    season:    IshdSeason;
    code:      string;
    name:      string;
    type:      string;
    age_group: string;
    _links:    IshdGameLinks;
}

export interface IshdSeason {
    year: number;
}

export interface IshdPlanLinks {
    self:  IshdLinkHref;
    first: IshdLinkHref;
    last:  IshdLinkHref;
}
