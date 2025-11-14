/**
 * Popular football accounts to scrape for match insights
 * These are well-known football news and analysis accounts
 */

export const FOOTBALL_ACCOUNTS = {
  // Premier League
  premierLeague: [
    'premierleague',
    'SkySportsPL',
    'BBCSport',
    'OptaJoe',
    'Squawka',
  ],
  
  // La Liga
  laLiga: [
    'LaLiga',
    'LaLigaEN',
    'OptaJose',
  ],
  
  // Serie A
  serieA: [
    'SerieA_EN',
    'OptaPaolo',
  ],
  
  // Bundesliga
  bundesliga: [
    'Bundesliga_EN',
    'OptaFranz',
  ],
  
  // Ligue 1
  ligue1: [
    'Ligue1_ENG',
  ],
  
  // General Football
  general: [
    'ESPNFC',
    'brfootball',
    'TheAthleticFC',
    'SkySportsNews',
    'BBCMOTD',
    '433',
    'FIFAcom',
  ],
  
  // Football Analytics
  analytics: [
    'OptaJoe',
    'StatsBomb',
    'fbref',
    'understat_com',
  ],
}

/**
 * Get relevant accounts based on league
 */
export function getAccountsForLeague(league?: string): string[] {
  if (!league) {
    return [
      ...FOOTBALL_ACCOUNTS.general,
      ...FOOTBALL_ACCOUNTS.analytics,
    ]
  }

  const leagueLower = league.toLowerCase()
  
  if (leagueLower.includes('premier') || leagueLower.includes('epl')) {
    return [
      ...FOOTBALL_ACCOUNTS.premierLeague,
      ...FOOTBALL_ACCOUNTS.general,
    ]
  }
  
  if (leagueLower.includes('la liga') || leagueLower.includes('spain')) {
    return [
      ...FOOTBALL_ACCOUNTS.laLiga,
      ...FOOTBALL_ACCOUNTS.general,
    ]
  }
  
  if (leagueLower.includes('serie a') || leagueLower.includes('italy')) {
    return [
      ...FOOTBALL_ACCOUNTS.serieA,
      ...FOOTBALL_ACCOUNTS.general,
    ]
  }
  
  if (leagueLower.includes('bundesliga') || leagueLower.includes('germany')) {
    return [
      ...FOOTBALL_ACCOUNTS.bundesliga,
      ...FOOTBALL_ACCOUNTS.general,
    ]
  }
  
  if (leagueLower.includes('ligue') || leagueLower.includes('france')) {
    return [
      ...FOOTBALL_ACCOUNTS.ligue1,
      ...FOOTBALL_ACCOUNTS.general,
    ]
  }
  
  // Default to general accounts
  return [
    ...FOOTBALL_ACCOUNTS.general,
    ...FOOTBALL_ACCOUNTS.analytics,
  ]
}

