import axios from 'axios'

// API-Football from RapidAPI
// Using beta endpoint as per user's subscription
const API_FOOTBALL_BASE_URL = 'https://api-football-beta.p.rapidapi.com'
const API_FOOTBALL_HOST = 'api-football-beta.p.rapidapi.com'

export interface FootballFixture {
  fixture: {
    id: number
    date: string
    venue: {
      id: number | null
      name: string
      city: string
    }
    status: {
      long: string
      short: string
      elapsed: number | null
    }
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
    }
    away: {
      id: number
      name: string
      logo: string
    }
  }
  goals: {
    home: number | null
    away: number | null
  }
  score: {
    fulltime: {
      home: number | null
      away: number | null
    }
  }
}

export interface TeamStatistics {
  team: {
    id: number
    name: string
    logo: string
  }
  statistics: Array<{
    type: string
    value: number | string | null
  }>
}

export interface HeadToHead {
  fixture: {
    id: number
    date: string
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
    }
    away: {
      id: number
      name: string
      logo: string
    }
  }
  goals: {
    home: number
    away: number
  }
  score: {
    fulltime: {
      home: number
      away: number
    }
  }
}

// League IDs mapping
export const LEAGUE_IDS: Record<string, number> = {
  'premier-league': 39, // Premier League
  'la-liga': 140, // La Liga
  'bundesliga': 78, // Bundesliga
  'serie-a': 135, // Serie A
  'ucl': 2, // UEFA Champions League
}

/**
 * Get API-Football client with headers
 */
function getApiClient() {
  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) {
    throw new Error('RAPIDAPI_KEY is not set in environment variables')
  }

  return axios.create({
    baseURL: API_FOOTBALL_BASE_URL,
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': API_FOOTBALL_HOST,
    },
    timeout: 10000,
  })
}

/**
 * Get upcoming fixtures for a league
 */
export async function getUpcomingFixtures(
  leagueId: number,
  next: number = 10
): Promise<FootballFixture[]> {
  try {
    const client = getApiClient()
    const currentDate = new Date().toISOString().split('T')[0]
    
    const response = await client.get('/fixtures', {
      params: {
        league: leagueId,
        next: next,
      },
    })

    return response.data.response || []
  } catch (error: any) {
    console.error('Error fetching fixtures:', error.response?.data || error.message)
    throw new Error(`Failed to fetch fixtures: ${error.message}`)
  }
}

/**
 * Get fixture by ID
 */
export async function getFixtureById(fixtureId: number): Promise<FootballFixture | null> {
  try {
    const client = getApiClient()
    
    const response = await client.get('/fixtures', {
      params: {
        id: fixtureId,
      },
    })

    return response.data.response?.[0] || null
  } catch (error: any) {
    console.error('Error fetching fixture:', error.response?.data || error.message)
    return null
  }
}

/**
 * Get team statistics for a fixture
 */
export async function getTeamStatistics(
  fixtureId: number,
  teamId: number
): Promise<TeamStatistics | null> {
  try {
    const client = getApiClient()
    
    const response = await client.get('/fixtures/statistics', {
      params: {
        fixture: fixtureId,
        team: teamId,
      },
    })

    return response.data.response?.[0] || null
  } catch (error: any) {
    console.error('Error fetching team statistics:', error.response?.data || error.message)
    return null
  }
}

/**
 * Get head-to-head record between two teams
 */
export async function getHeadToHead(
  team1Id: number,
  team2Id: number,
  last: number = 5
): Promise<HeadToHead[]> {
  try {
    const client = getApiClient()
    
    const response = await client.get('/fixtures/headtohead', {
      params: {
        h2h: `${team1Id}-${team2Id}`,
        last: last,
      },
    })

    return response.data.response || []
  } catch (error: any) {
    console.error('Error fetching head-to-head:', error.response?.data || error.message)
    return []
  }
}

/**
 * Get team form (last 5 matches)
 */
export async function getTeamForm(teamId: number, last: number = 5): Promise<any[]> {
  try {
    const client = getApiClient()
    
    const response = await client.get('/fixtures', {
      params: {
        team: teamId,
        last: last,
        status: 'FT', // Finished matches only
      },
    })

    return response.data.response || []
  } catch (error: any) {
    console.error('Error fetching team form:', error.response?.data || error.message)
    return []
  }
}

/**
 * Get team standings in a league
 */
export async function getStandings(leagueId: number, season: number = 2024): Promise<any> {
  try {
    const client = getApiClient()
    
    const response = await client.get('/standings', {
      params: {
        league: leagueId,
        season: season,
      },
    })

    return response.data.response?.[0] || null
  } catch (error: any) {
    console.error('Error fetching standings:', error.response?.data || error.message)
    return null
  }
}

/**
 * Get injuries and suspensions for a fixture
 */
export async function getInjuries(fixtureId: number): Promise<any[]> {
  try {
    const client = getApiClient()
    
    const response = await client.get('/injuries', {
      params: {
        fixture: fixtureId,
      },
    })

    return response.data.response || []
  } catch (error: any) {
    console.error('Error fetching injuries:', error.response?.data || error.message)
    return []
  }
}

