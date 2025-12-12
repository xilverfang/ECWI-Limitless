import axios from 'axios'

// API-Sports.io Football API
const API_SPORTS_BASE_URL = 'https://v3.football.api-sports.io'

export interface FootballFixture {
  fixture: {
    id: number
    referee: string | null
    timezone: string
    date: string
    timestamp: number
    periods: {
      first: number | null
      second: number | null
    }
    venue: {
      id: number
      name: string
      city: string
    }
    status: {
      long: string
      short: string
      elapsed: number | null
      extra: number | null
    }
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
    round: string
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
      winner: boolean | null
    }
    away: {
      id: number
      name: string
      logo: string
      winner: boolean | null
    }
  }
  goals: {
    home: number | null
    away: number | null
  }
  score: {
    halftime: {
      home: number | null
      away: number | null
    }
    fulltime: {
      home: number | null
      away: number | null
    }
    extratime: {
      home: number | null
      away: number | null
    }
    penalty: {
      home: number | null
      away: number | null
    }
  }
}

export interface ApiSportsResponse<T> {
  get: string
  parameters: Record<string, any>
  errors: any[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: T[]
}

// League IDs mapping for API-Sports.io
export const LEAGUE_IDS: Record<string, number> = {
  'premier-league': 39, // Premier League
  'la-liga': 140, // La Liga
  'bundesliga': 78, // Bundesliga
  'serie-a': 135, // Serie A
  'ucl': 2, // UEFA Champions League
}

/**
 * Get API-Sports.io client with headers
 */
function getApiClient() {
  const apiKey = process.env.API_SPORTS_KEY || process.env.RAPIDAPI_KEY
  if (!apiKey) {
    console.error('API_SPORTS_KEY is not set in environment variables')
    throw new Error('API_SPORTS_KEY is not set in environment variables')
  }

  console.log('API Key found:', apiKey.substring(0, 10) + '...') // Log first 10 chars for debugging

  return axios.create({
    baseURL: API_SPORTS_BASE_URL,
    headers: {
      'x-apisports-key': apiKey,
    },
    timeout: 15000, // Increased timeout
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
    const currentYear = new Date().getFullYear()
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    
    // Calculate date 30 days from now for 'to' parameter
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 30)
    const toDate = futureDate.toISOString().split('T')[0]
    
    // Limit next to 2 digits as per API docs (max 99, but typically use smaller numbers)
    const nextParam = Math.min(next, 99)
    
    // Try with 'next' parameter first (simpler)
    const params: Record<string, any> = {
      league: leagueId,
      season: currentYear,
      next: nextParam,
    }

    console.log('Fetching fixtures with params:', params)
    
    const response = await client.get<ApiSportsResponse<FootballFixture>>('/fixtures', {
      params,
    })

    console.log('API-Sports.io response:', {
      get: response.data.get,
      results: response.data.results,
      errors: response.data.errors,
      fixturesCount: response.data.response?.length || 0,
    })

    // Check for API errors
    if (response.data.errors && response.data.errors.length > 0) {
      console.error('API returned errors:', response.data.errors)
      // If errors, try alternative approach with date range
      return await getUpcomingFixturesByDateRange(leagueId, today, toDate)
    }

    // If no results, try with date range as fallback
    if (!response.data.response || response.data.response.length === 0) {
      console.log('No results with next param, trying date range...')
      return await getUpcomingFixturesByDateRange(leagueId, today, toDate)
    }

    return response.data.response || []
  } catch (error: any) {
    console.error('Error fetching fixtures:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText,
    })
    // Return empty array instead of throwing to allow fallback
    return []
  }
}

/**
 * Get upcoming fixtures using date range (alternative method)
 */
async function getUpcomingFixturesByDateRange(
  leagueId: number,
  fromDate: string,
  toDate: string
): Promise<FootballFixture[]> {
  try {
    const client = getApiClient()
    const currentYear = new Date().getFullYear()
    
    const params: Record<string, any> = {
      league: leagueId,
      season: currentYear,
      from: fromDate,
      to: toDate,
    }

    console.log('Trying date range approach with params:', params)
    
    const response = await client.get<ApiSportsResponse<FootballFixture>>('/fixtures', {
      params,
    })

    console.log('Date range response:', {
      results: response.data.results,
      fixturesCount: response.data.response?.length || 0,
    })

    return response.data.response || []
  } catch (error: any) {
    console.error('Error with date range approach:', error.message)
    return []
  }
}

/**
 * Get fixtures for a specific date
 */
export async function getFixturesByDate(date: string, leagueId?: number): Promise<FootballFixture[]> {
  try {
    const client = getApiClient()
    const params: any = {
      date: date,
    }
    
    if (leagueId) {
      params.league = leagueId
    }
    
    const response = await client.get<ApiSportsResponse<FootballFixture>>('/fixtures', {
      params,
    })

    return response.data.response || []
  } catch (error: any) {
    console.error('Error fetching fixtures by date:', error.response?.data || error.message)
    throw new Error(`Failed to fetch fixtures: ${error.message}`)
  }
}

/**
 * Get fixture by ID
 */
export async function getFixtureById(fixtureId: number): Promise<FootballFixture | null> {
  try {
    const client = getApiClient()
    
    const response = await client.get<ApiSportsResponse<FootballFixture>>('/fixtures', {
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
 * Get live fixtures
 */
export async function getLiveFixtures(leagueId?: number): Promise<FootballFixture[]> {
  try {
    const client = getApiClient()
    const params: any = {
      live: 'all',
    }
    
    if (leagueId) {
      params.league = leagueId
    }
    
    const response = await client.get<ApiSportsResponse<FootballFixture>>('/fixtures', {
      params,
    })

    return response.data.response || []
  } catch (error: any) {
    console.error('Error fetching live fixtures:', error.response?.data || error.message)
    return []
  }
}

/**
 * Get head-to-head record between two teams
 */
export async function getHeadToHead(
  team1Id: number,
  team2Id: number,
  last: number = 5
): Promise<FootballFixture[]> {
  try {
    const client = getApiClient()
    
    const response = await client.get<ApiSportsResponse<FootballFixture>>('/fixtures', {
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
 * Get team form (last matches)
 */
export async function getTeamForm(teamId: number, last: number = 5): Promise<FootballFixture[]> {
  try {
    const client = getApiClient()
    
    const response = await client.get<ApiSportsResponse<FootballFixture>>('/fixtures', {
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
 * Get team fixtures (upcoming)
 */
export async function getTeamFixtures(teamId: number, next: number = 5): Promise<FootballFixture[]> {
  try {
    const client = getApiClient()
    
    const response = await client.get<ApiSportsResponse<FootballFixture>>('/fixtures', {
      params: {
        team: teamId,
        next: next,
      },
    })

    return response.data.response || []
  } catch (error: any) {
    console.error('Error fetching team fixtures:', error.response?.data || error.message)
    return []
  }
}

/**
 * Get injuries for a fixture
 */
export async function getInjuries(fixtureId: number): Promise<any[]> {
  try {
    const client = getApiClient()
    
    const response = await client.get<ApiSportsResponse<any>>('/injuries', {
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

/**
 * Get standings for a league
 */
export async function getStandings(leagueId: number, season: number = new Date().getFullYear()): Promise<any> {
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
