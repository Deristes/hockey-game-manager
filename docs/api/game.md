
# GET `/api/v1/game/list`

## Request

### Query params

##### Time (optional)

`"today"` &rarr; only elements of current day will be returned  
`"upcoming"` &rarr; only elements after current day will be returned  
`"previous"` &rarr; only elements before current day will be returned  

##### Team (optional)

`{team}` &rarr; Filters after specific team. Notation `1-jugend` or `1. Jugend`  

##### Place (optional)

`"home"` &rarr; Filters so only home games will be returned  
`"away"` &rarr; Filters so only away games will be returned  

## Response

JSON

`Game[]` _look at type definitions_