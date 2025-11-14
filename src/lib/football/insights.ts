import { FootballFixture, HeadToHead, TeamStatistics } from './api'

export interface MatchInsight {
  type: 'home-record' | 'away-record' | 'form' | 'injury' | 'suspension' | 'head-to-head' | 'standings'
  title: string
  description: string
  impact: 'positive' | 'negative' | 'neutral'
  team: 'home' | 'away'
}

/**
 * Generate insights for a match based on real data
 */
export async function generateMatchInsights(
  fixture: FootballFixture,
  homeForm?: any[],
  awayForm?: any[],
  h2h?: HeadToHead[],
  injuries?: any[]
): Promise<MatchInsight[]> {
  const insights: MatchInsight[] = []
  const homeTeamId = fixture.teams.home.id
  const awayTeamId = fixture.teams.away.id

  // Head-to-head insights
  if (h2h && h2h.length > 0) {
    const homeWins = h2h.filter(m => m.goals.home > m.goals.away).length
    const awayWins = h2h.filter(m => m.goals.away > m.goals.home).length
    const draws = h2h.length - homeWins - awayWins

    if (homeWins > awayWins) {
      insights.push({
        type: 'head-to-head',
        title: 'Strong Head-to-Head Record',
        description: `${fixture.teams.home.name} has won ${homeWins} of the last ${h2h.length} meetings`,
        impact: 'positive',
        team: 'home',
      })
    } else if (awayWins > homeWins) {
      insights.push({
        type: 'head-to-head',
        title: 'Strong Head-to-Head Record',
        description: `${fixture.teams.away.name} has won ${awayWins} of the last ${h2h.length} meetings`,
        impact: 'positive',
        team: 'away',
      })
    } else if (draws > 0) {
      insights.push({
        type: 'head-to-head',
        title: 'Evenly Matched',
        description: `${draws} of the last ${h2h.length} meetings ended in draws`,
        impact: 'neutral',
        team: 'home',
      })
    }
  }

  // Home form insights
  if (homeForm && homeForm.length > 0) {
    const homeWins = homeForm.filter(m => {
      const isHome = m.teams.home.id === homeTeamId
      return isHome ? m.goals.home > m.goals.away : m.goals.away > m.goals.home
    }).length

    const winRate = (homeWins / homeForm.length) * 100

    if (winRate >= 60) {
      insights.push({
        type: 'home-record',
        title: 'Strong Home Form',
        description: `${fixture.teams.home.name} has won ${homeWins} of their last ${homeForm.length} home matches`,
        impact: 'positive',
        team: 'home',
      })
    } else if (winRate <= 30) {
      insights.push({
        type: 'home-record',
        title: 'Poor Home Form',
        description: `${fixture.teams.home.name} has struggled at home recently`,
        impact: 'negative',
        team: 'home',
      })
    }
  }

  // Away form insights
  if (awayForm && awayForm.length > 0) {
    const awayWins = awayForm.filter(m => {
      const isAway = m.teams.away.id === awayTeamId
      return isAway ? m.goals.away > m.goals.home : m.goals.home > m.goals.away
    }).length

    const winRate = (awayWins / awayForm.length) * 100

    if (winRate >= 60) {
      insights.push({
        type: 'away-record',
        title: 'Excellent Away Form',
        description: `${fixture.teams.away.name} has won ${awayWins} of their last ${awayForm.length} away matches`,
        impact: 'positive',
        team: 'away',
      })
    } else if (winRate <= 30) {
      insights.push({
        type: 'away-record',
        title: 'Poor Away Form',
        description: `${fixture.teams.away.name} has struggled away from home recently`,
        impact: 'negative',
        team: 'away',
      })
    }
  }

  // Injury insights
  if (injuries && injuries.length > 0) {
    const homeInjuries = injuries.filter(i => i.team.id === homeTeamId)
    const awayInjuries = injuries.filter(i => i.team.id === awayTeamId)

    if (homeInjuries.length > 0) {
      const keyPlayers = homeInjuries.filter(i => 
        i.player.name.toLowerCase().includes('key') || 
        i.player.name.length < 20 // Simple heuristic for key players
      )

      if (keyPlayers.length > 0) {
        insights.push({
          type: 'injury',
          title: 'Key Player Injuries',
          description: `${fixture.teams.home.name} has ${homeInjuries.length} player(s) injured`,
          impact: 'negative',
          team: 'home',
        })
      }
    }

    if (awayInjuries.length > 0) {
      const keyPlayers = awayInjuries.filter(i => 
        i.player.name.toLowerCase().includes('key') || 
        i.player.name.length < 20
      )

      if (keyPlayers.length > 0) {
        insights.push({
          type: 'injury',
          title: 'Key Player Injuries',
          description: `${fixture.teams.away.name} has ${awayInjuries.length} player(s) injured`,
          impact: 'negative',
          team: 'away',
        })
      }
    }
  }

  return insights
}

/**
 * Predict match winner based on insights
 */
export function predictWinner(insights: MatchInsight[]): {
  winner: 'home' | 'away' | 'draw'
  confidence: number
} {
  let homeScore = 50 // Start neutral
  let awayScore = 50

  insights.forEach(insight => {
    if (insight.impact === 'positive') {
      if (insight.team === 'home') {
        homeScore += 15
        awayScore -= 5
      } else {
        awayScore += 15
        homeScore -= 5
      }
    } else if (insight.impact === 'negative') {
      if (insight.team === 'home') {
        homeScore -= 15
        awayScore += 5
      } else {
        awayScore -= 15
        homeScore += 5
      }
    }
  })

  // Normalize scores
  homeScore = Math.max(0, Math.min(100, homeScore))
  awayScore = Math.max(0, Math.min(100, awayScore))

  const total = homeScore + awayScore
  const homeConfidence = Math.round((homeScore / total) * 100)
  const awayConfidence = Math.round((awayScore / total) * 100)

  if (Math.abs(homeConfidence - awayConfidence) < 10) {
    return {
      winner: 'draw',
      confidence: 50,
    }
  }

  if (homeConfidence > awayConfidence) {
    return {
      winner: 'home',
      confidence: homeConfidence,
    }
  } else {
    return {
      winner: 'away',
      confidence: awayConfidence,
    }
  }
}

