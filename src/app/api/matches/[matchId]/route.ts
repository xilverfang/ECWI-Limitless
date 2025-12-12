import { NextRequest, NextResponse } from 'next/server'

// Real Premier League fixtures data from provided JSON
const PREMIER_LEAGUE_FIXTURES = [
  {
    date: "Saturday, December 13, 2025",
    home: "Chelsea",
    away: "Everton",
    stadium: "Stamford Bridge",
    stadium_capacity: 40044,
    location: "London (Fulham)",
    referee: "To be confirmed"
  },
  {
    date: "Saturday, December 13, 2025",
    home: "Liverpool",
    away: "Brighton & Hove Albion",
    stadium: "Anfield",
    stadium_capacity: 61276,
    location: "Liverpool (Anfield)",
    referee: "To be confirmed"
  },
  {
    date: "Saturday, December 13, 2025",
    home: "Burnley",
    away: "Fulham",
    stadium: "Turf Moor",
    stadium_capacity: 21990,
    location: "Burnley",
    referee: "To be confirmed"
  },
  {
    date: "Saturday, December 13, 2025",
    home: "Arsenal",
    away: "Wolverhampton Wanderers",
    stadium: "Emirates Stadium",
    stadium_capacity: 60704,
    location: "London (Holloway)",
    referee: "To be confirmed"
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Crystal Palace",
    away: "Manchester City",
    stadium: "Selhurst Park",
    stadium_capacity: 25194,
    location: "London (Selhurst)",
    referee: "To be confirmed"
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Nottingham Forest",
    away: "Tottenham Hotspur",
    stadium: "City Ground",
    stadium_capacity: 30404,
    location: "West Bridgford",
    referee: "To be confirmed"
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Sunderland",
    away: "Newcastle United",
    stadium: "Stadium of Light",
    stadium_capacity: 48095,
    location: "Sunderland",
    referee: "To be confirmed"
  },
  {
    date: "Sunday, December 14, 2025",
    home: "West Ham United",
    away: "Aston Villa",
    stadium: "London Stadium",
    stadium_capacity: 62500,
    location: "London (Stratford)",
    referee: "To be confirmed"
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Brentford",
    away: "Leeds United",
    stadium: "Brentford Community Stadium",
    stadium_capacity: 17250,
    location: "London (Brentford)",
    referee: "To be confirmed"
  },
  {
    date: "Monday, December 15, 2025",
    home: "Manchester United",
    away: "AFC Bournemouth",
    stadium: "Old Trafford",
    stadium_capacity: 74244,
    location: "Manchester (Trafford)",
    referee: "To be confirmed"
  }
]

// Analysis data for each fixture
const FIXTURES_ANALYSIS = [
  {
    date: "Saturday, December 13, 2025",
    home: "Chelsea",
    away: "Everton",
    likely_winner: "Chelsea",
    home_form_last_5_PL: "L-D-L-D-W (Inconsistent, struggling for wins)",
    away_form_last_5_PL: "W-W-L-W-W (Excellent form)",
    head_to_head_note_home: "In all competitions, Chelsea's all-time record against Everton is 77 wins, 58 draws, and 59 losses in 194 meetings.",
    head_to_head_note_away: "Everton have not won a Premier League game at Stamford Bridge since 1994.",
    key_man_home: "Enzo Fernandez (Midfield, crucial for control and creativity).",
    key_man_away: "",
    injuries_affecting_outcome: [
      "Chelsea: Levi Colwill (Defence) - His absence weakens the backline stability, which is already a concern.",
      "Everton: Jarrad Branthwaite (Defence) - A suspension/injury to a key defender for a team relying on defense is a major blow."
    ]
  },
  {
    date: "Saturday, December 13, 2025",
    home: "Liverpool",
    away: "Brighton & Hove Albion",
    likely_winner: "Liverpool (Despite the drama, home advantage and a need for a bounce-back win)",
    home_form_last_5_PL: "W-L-L-D-W (Mixed results, better at home; coming off key European win)",
    away_form_last_5_PL: "D-W-L-D-W (Steady, but inconsistent on the road)",
    head_to_head_note: "Recent history is balanced. Last clash was a 3-2 Brighton win. High-scoring fixture historically.",
    key_man_home: "Hugo Ekitike (Forward, currently their top scorer, expected to lead the line due to other issues).",
    key_man_away: "Georginio Rutter (Forward, influential in their attacking play and scoring goals).",
    injuries_affecting_outcome: [
      "Liverpool: Mohamed Salah (Forward) - Currently omitted/benched following an 'explosive rant' about manager Arne Slot. His potential absence (or presence as an unsettled sub) is the single biggest factor affecting Liverpool's chances and morale.",
      "Liverpool: Alexander Isak (Forward) - Picked up a knock in midweek. If he misses out, it heavily relies on Ekitike/others.",
      "Brighton: Kaoru Mitoma (Winger) - Returns from injury but if he were unavailable, his absence would severely limit Brighton's creative threat and pace on the wing."
    ]
  },
  {
    date: "Saturday, December 13, 2025",
    home: "Burnley",
    away: "Fulham",
    likely_winner: "Fulham",
    home_form_last_5_PL: "L-L-L-L-L (Alarming run of five consecutive defeats)",
    away_form_last_5_PL: "W-L-W-D-L (Inconsistent, but overall better than Burnley)",
    head_to_head_note: "Historically, their encounters often produce goals. This is a must-win for both teams.",
    key_man_home: "Armando Broja (Striker, needs to start converting chances to lift the team).",
    key_man_away: "João Palhinha (Midfield, crucial in breaking up play and starting attacks).",
    injuries_affecting_outcome: [
      "Burnley: Lyle Foster (Forward) - If he misses out, it severely limits their goal-scoring options.",
      "Fulham: Harrison Reed (Midfield) - A strong defensive midfielder whose absence could leave the central area exposed."
    ]
  },
  {
    date: "Saturday, December 13, 2025",
    home: "Arsenal",
    away: "Wolverhampton Wanderers",
    likely_winner: "Arsenal",
    home_form_last_5_PL: "W-W-D-W-W (Strong form, especially at home)",
    away_form_last_5_PL: "L-L-D-L-L (Struggling at the bottom of the table)",
    head_to_head_note: "Arsenal typically dominates this fixture, particularly at the Emirates.",
    key_man_home: "Bukayo Saka (Winger, constant threat with goals and assists, the team's primary offensive outlet).",
    key_man_away: "João Gomes (Midfield, vital for their transition play and defensive solidity).",
    injuries_affecting_outcome: [
      "Arsenal: Gabriel Martinelli (Winger) - His pace on the left flank is a key component of Arsenal's attack; a long-term absence would be felt.",
      "Wolverhampton: Sasa Kalajdzic (Striker) - Their attack is already weak; losing a major forward further limits their ability to score."
    ]
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Crystal Palace",
    away: "Manchester City",
    likely_winner: "Manchester City",
    home_form_last_5_PL: "W-W-W-L-D (Excellent recent form and strong defensively)",
    away_form_last_5_PL: "W-D-W-L-W (Generally strong, but dropping points occasionally)",
    head_to_head_note: "Palace famously beat City in the FA Cup Final last season and have been resilient in recent league meetings (two draws in the last five).",
    key_man_home: "Jean-Philippe Mateta (Forward, the club's leading scorer (7 PL goals) and focal point of their counter-attacking strategy).",
    key_man_away: "Erling Haaland (Striker, fully fit and leading the line, though recent goal output has 'slowed down' compared to his usual rate.",
    injuries_affecting_outcome: [
      "Crystal Palace: Jean-Philippe Mateta (Striker) - A potential injury to their main target man limits their ability to hold up the ball and counter-attack.",
      "Manchester City: Erling Haaland (Striker) - A potential injury to the team's leading goalscorer would significantly impact their goal-scoring efficiency."
    ]
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Nottingham Forest",
    away: "Tottenham Hotspur",
    likely_winner: "Tottenham Hotspur",
    home_form_last_5_PL: "D-W-L-D-W (Solid home record, tough to beat at the City Ground)",
    away_form_last_5_PL: "L-W-W-L-D (Inconsistent, but with moments of brilliance)",
    head_to_head_note: "Recent H2H is mixed, but Spurs have won two of the last four. Both teams have scored in recent matches.",
    key_man_home: "Morgan Gibbs-White (Attacking Midfield, the heart of their offense and a strong set-piece taker).",
    key_man_away: "Richarlison (Forward, picking up goal-scoring form and crucial in the attacking third).",
    injuries_affecting_outcome: [
      "Nottingham Forest: Ola Aina (Defence) - A long-term injury to a key full-back forces a shuffle in a less-than-deep defense.",
      "Tottenham Hotspur: James Maddison (Midfield) - Still recovering from a major injury; his absence is a huge blow to their creativity and link-up play."
    ]
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Sunderland",
    away: "Newcastle United",
    likely_winner: "Newcastle United",
    home_form_last_5_PL: "D-L-W-L-D (Struggling to find consistency since promotion)",
    away_form_last_5_PL: "W-W-D-W-L (Strong form, challenging near the top of the table)",
    head_to_head_note: "A highly intense Tyne-Wear derby; form often goes out the window, but Newcastle has the superior squad and recent history.",
    key_man_home: "Granit Xhaka (Midfield, vital for leadership, control, and defensive screening).",
    key_man_away: "Nick Woltemade (Striker, Isak's replacement and top scorer this season (7 goals); vital target man for their attack).",
    injuries_affecting_outcome: [
      "Sunderland: A key defensive injury would be critical against Newcastle's potent attack.",
      "Newcastle: Bruno Guimarães (Midfield) - An injury to their star defensive midfielder would be a major stability concern."
    ]
  },
  {
    date: "Sunday, December 14, 2025",
    home: "West Ham United",
    away: "Aston Villa",
    likely_winner: "Draw",
    home_form_last_5_PL: "L-D-W-L-W (Inconsistent, performing better at home)",
    away_form_last_5_PL: "W-W-W-L-D (Excellent recent form under Unai Emery)",
    head_to_head_note: "Historically a very balanced fixture with many draws and close results.",
    key_man_home: "Jarrod Bowen (Winger/Forward, the team's main attacking threat and most likely source of goals).",
    key_man_away: "Ollie Watkins (Striker, in excellent goal-scoring form and critical to Villa's high press).",
    injuries_affecting_outcome: [
      "West Ham: Lucas Paquetá (Midfield) - If he is out, it removes the link between midfield and attack.",
      "Aston Villa: Emi Buendía (Attacking Midfield) - His creativity is often the difference in breaking down stubborn defenses."
    ]
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Brentford",
    away: "Leeds United",
    likely_winner: "Brentford",
    home_form_last_5_PL: "W-W-L-L-W (Strong home record, but on the back of two away losses)",
    away_form_last_5_PL: "W-D-L-D-W (Improving form, but poor away from home (1 win, 6 losses in last 7))",
    head_to_head_note: "Leeds have struggled in this fixture recently, with Brentford holding a strong home advantage.",
    key_man_home: "Igor Thiago (Striker, currently Brentford's top scorer and a constant aerial threat).",
    key_man_away: "Dominic Calvert-Lewin (Striker, his ability to score is crucial to Leeds' resurgence).",
    injuries_affecting_outcome: [
      "Brentford: Kevin Schade (Winger) - His pace is a key component of their counter-attacking strategy.",
      "Leeds United: Sean Longstaff (Midfield) - His energy and ball-winning ability in midfield would be greatly missed."
    ]
  },
  {
    date: "Monday, December 15, 2025",
    home: "Manchester United",
    away: "AFC Bournemouth",
    likely_winner: "Manchester United",
    home_form_last_5_PL: "W-D-L-W-W (Inconsistent, but finding wins recently)",
    away_form_last_5_PL: "L-W-L-D-W (Better form recently, showing an ability to score)",
    head_to_head_note: "Manchester United usually wins this fixture, but Bournemouth secured a notable win last season.",
    key_man_home: "Bruno Fernandes (Attacking Midfield, the creative engine and penalty taker; vital for goals and assists).",
    key_man_away: "Antoine Semenyo (Striker, leading the line and a powerful runner; an outlet for the team).",
    injuries_affecting_outcome: [
      "AFC Bournemouth: Tyler Adams (Midfield) - Their defensive stability relies heavily on his presence in the engine room."
    ]
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const { matchId } = await params

    // Get match from our fixtures data
    const match = getMatchById(matchId)

    if (!match) {
      return NextResponse.json(
        { success: false, error: 'Match not found' },
        { status: 404 }
      )
    }

    // Get analysis for this match
    const analysis = getAnalysisForMatch(match.homeTeam, match.awayTeam, match.dateDisplay)

    // Generate insights from the analysis data
    const insights = generateInsightsFromAnalysis(analysis, match)

    // Predict winner based on likely_winner from analysis
    const prediction = getPredictionFromAnalysis(analysis, match)

    // Generate comments based on match analysis (no API calls)
    const comments = generateMatchComments(analysis, match)

    // Format match data with prediction
    const matchData = {
      ...match,
      predictedWinner: prediction.winner,
      confidence: prediction.confidence,
      analysis, // Include full analysis data
    }

    return NextResponse.json({
      success: true,
      match: matchData,
      insights,
      analysis, // Include full analysis object
      comments, // Generated comments based on analysis
    })
  } catch (error: any) {
    console.error('Error in match detail API:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch match',
      },
      { status: 500 }
    )
  }
}

// Get match by ID from fixtures data
function getMatchById(id: string) {
  // Try to find match by ID (format: pl-1, pl-2, etc.)
  const matchIndex = parseInt(id.replace('pl-', '')) - 1
  
  if (matchIndex >= 0 && matchIndex < PREMIER_LEAGUE_FIXTURES.length) {
    const fixture = PREMIER_LEAGUE_FIXTURES[matchIndex]
    
    // Extract date components from the string for time calculation only
    // Use the original date string for display
    let defaultTime = '15:00' // Default
    const dateMatch = fixture.date.match(/(\w+), (\w+) (\d+), (\d+)/)
    
    // Set specific times for certain matches
    if (fixture.home === 'Burnley' && fixture.away === 'Fulham') {
      defaultTime = '18:30'
    } else if (fixture.home === 'Arsenal' && fixture.away === 'Wolverhampton Wanderers') {
      defaultTime = '21:00'
    } else if ((fixture.home === 'Chelsea' && fixture.away === 'Everton') || 
               (fixture.home === 'Liverpool' && fixture.away === 'Brighton & Hove Albion')) {
      defaultTime = '16:00'
    } else if (fixture.home === 'Brentford' && fixture.away === 'Leeds United') {
      defaultTime = '17:30'
    } else if (fixture.home === 'Manchester United' && fixture.away === 'AFC Bournemouth') {
      defaultTime = '21:00'
    } else if (dateMatch) {
      const [dayName] = dateMatch
      // Set time based on day name
      if (dayName === 'Sunday') defaultTime = '14:00'
      else if (dayName === 'Monday') defaultTime = '20:00'
      else defaultTime = '15:00'
    }
    
    // Parse date for internal use (YYYY-MM-DD format) but keep original for display
    let dateStr = '2025-12-13' // Default fallback
    if (dateMatch) {
      const [, , month, day, year] = dateMatch
      const monthMap: Record<string, string> = {
        'January': '01', 'February': '02', 'March': '03', 'April': '04',
        'May': '05', 'June': '06', 'July': '07', 'August': '08',
        'September': '09', 'October': '10', 'November': '11', 'December': '12'
      }
      const monthNum = monthMap[month] || '12'
      dateStr = `${year}-${monthNum}-${day.padStart(2, '0')}`
    }
    
    return {
      id,
      homeTeam: fixture.home,
      awayTeam: fixture.away,
      date: dateStr,
      time: defaultTime,
      venue: fixture.stadium,
      city: fixture.location,
      capacity: fixture.stadium_capacity,
      referee: fixture.referee,
      league: 'Premier League',
      dateDisplay: fixture.date,
    }
  }
  
  return null
}

// Get analysis data for a specific match
function getAnalysisForMatch(homeTeam: string, awayTeam: string, date: string) {
  return FIXTURES_ANALYSIS.find(
    (analysis) =>
      analysis.home === homeTeam &&
      analysis.away === awayTeam &&
      analysis.date === date
  ) || null
}

// Generate insights from analysis data
function generateInsightsFromAnalysis(analysis: any, match: any) {
  const insights = []

  if (!analysis) {
    // Fallback if no analysis found
    return generateBasicInsights(match)
  }

  // Home form insight
  insights.push({
    type: 'form',
    title: 'Home Team Form',
    description: `${match.homeTeam}: ${analysis.home_form_last_5_PL}`,
    impact: analysis.home_form_last_5_PL.includes('W-W') || analysis.home_form_last_5_PL.includes('Strong') ? 'positive' : 
            analysis.home_form_last_5_PL.includes('L-L') || analysis.home_form_last_5_PL.includes('struggling') ? 'negative' : 'neutral',
    team: 'home',
  })

  // Away form insight
  insights.push({
    type: 'form',
    title: 'Away Team Form',
    description: `${match.awayTeam}: ${analysis.away_form_last_5_PL}`,
    impact: analysis.away_form_last_5_PL.includes('W-W') || analysis.away_form_last_5_PL.includes('Excellent') ? 'positive' : 
            analysis.away_form_last_5_PL.includes('L-L') || analysis.away_form_last_5_PL.includes('Struggling') ? 'negative' : 'neutral',
    team: 'away',
  })

  // Head-to-head insights (support both separate home/away notes and single note)
  if (analysis.head_to_head_note_home) {
    insights.push({
      type: 'head-to-head',
      title: 'Head-to-Head Record',
      description: analysis.head_to_head_note_home,
      impact: 'neutral',
      team: 'home',
    })
  }
  if (analysis.head_to_head_note_away) {
    insights.push({
      type: 'head-to-head',
      title: 'Head-to-Head Record',
      description: analysis.head_to_head_note_away,
      impact: 'neutral',
      team: 'away',
    })
  }
  // Fallback to single head_to_head_note if separate ones don't exist
  if (!analysis.head_to_head_note_home && !analysis.head_to_head_note_away && analysis.head_to_head_note) {
    insights.push({
      type: 'head-to-head',
      title: 'Head-to-Head Record',
      description: analysis.head_to_head_note,
      impact: 'neutral',
      team: 'home',
    })
  }

  // Key players insight
  if (analysis.key_man_home) {
    insights.push({
      type: 'form',
      title: 'Key Player - Home',
      description: analysis.key_man_home,
      impact: 'positive',
      team: 'home',
    })
  }

  if (analysis.key_man_away) {
    insights.push({
      type: 'form',
      title: 'Key Player - Away',
      description: analysis.key_man_away,
      impact: 'positive',
      team: 'away',
    })
  }

  // Injuries insight
  if (analysis.injuries_affecting_outcome && analysis.injuries_affecting_outcome.length > 0) {
    analysis.injuries_affecting_outcome.forEach((injury: string) => {
      const isHomeInjury = injury.startsWith(match.homeTeam)
      insights.push({
        type: 'injury',
        title: 'Injury Concern',
        description: injury,
        impact: 'negative',
        team: isHomeInjury ? 'home' : 'away',
      })
    })
  }

  // Stadium capacity insight
  if (match.capacity && match.capacity > 50000) {
    insights.push({
      type: 'home-record',
      title: 'Large Stadium Advantage',
      description: `${match.venue} (Capacity: ${match.capacity.toLocaleString()}) provides significant home advantage`,
      impact: 'positive',
      team: 'home',
    })
  }

  return insights
}

// Generate basic insights if analysis not found
function generateBasicInsights(match: any) {
  return [
    {
      type: 'home-record',
      title: 'Home Advantage',
      description: `${match.homeTeam} playing at ${match.venue}`,
      impact: 'positive',
      team: 'home',
    },
  ]
}

// Get prediction from analysis data
function getPredictionFromAnalysis(analysis: any, match: any): {
  winner: 'home' | 'away' | 'draw'
  confidence: number
} {
  if (!analysis) {
    return { winner: 'home', confidence: 50 }
  }

  const likelyWinner = analysis.likely_winner

  if (likelyWinner === 'Draw') {
    return { winner: 'draw', confidence: 50 }
  }

  // Determine confidence based on form and analysis
  let confidence = 65 // Base confidence

  // Increase confidence if form is strong
  if (analysis.home_form_last_5_PL?.includes('W-W-W') || analysis.away_form_last_5_PL?.includes('W-W-W')) {
    confidence = 75
  }

  // Decrease confidence if form is poor
  if (analysis.home_form_last_5_PL?.includes('L-L-L') || analysis.away_form_last_5_PL?.includes('L-L-L')) {
    confidence = 55
  }

  // Match likely_winner to home or away team using both analysis and match data
  const homeTeam = match.homeTeam || analysis.home
  const awayTeam = match.awayTeam || analysis.away
  
  const isHomeWinner = homeTeam === likelyWinner || 
                       homeTeam.includes(likelyWinner) || 
                       likelyWinner.includes(homeTeam) ||
                       analysis.home === likelyWinner ||
                       analysis.home.includes(likelyWinner) ||
                       likelyWinner.includes(analysis.home)
  
  const isAwayWinner = awayTeam === likelyWinner || 
                       awayTeam.includes(likelyWinner) || 
                       likelyWinner.includes(awayTeam) ||
                       analysis.away === likelyWinner ||
                       analysis.away.includes(likelyWinner) ||
                       likelyWinner.includes(analysis.away)

  if (isHomeWinner) {
    return { winner: 'home', confidence }
  } else if (isAwayWinner) {
    return { winner: 'away', confidence }
  } else {
    // Default to home if can't determine
    console.warn(`Could not match likely_winner "${likelyWinner}" to home "${homeTeam}" or away "${awayTeam}"`)
    return { winner: 'home', confidence: 60 }
  }
}

// Generate realistic comments based on match analysis
function generateMatchComments(analysis: any, match: any) {
  if (!analysis) {
    return []
  }

  const comments = []
  const homeTeam = match.homeTeam
  const awayTeam = match.awayTeam
  const likelyWinner = analysis.likely_winner

  // Comment 1: Based on form
  if (analysis.home_form_last_5_PL?.includes('W-W-W') || analysis.away_form_last_5_PL?.includes('W-W-W')) {
    const strongTeam = analysis.home_form_last_5_PL?.includes('W-W-W') ? homeTeam : awayTeam
    comments.push({
      id: 'comment-1',
      author: '@FootyAnalyst',
      text: `${strongTeam} are in excellent form right now. Their recent winning streak gives them a huge psychological advantage going into this match.`,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      likes: Math.floor(Math.random() * 100) + 50,
      sentiment: 'positive',
    })
  }

  // Comment 2: Based on head-to-head
  const headToHeadNote = analysis.head_to_head_note_home || analysis.head_to_head_note_away || analysis.head_to_head_note
  if (headToHeadNote) {
    comments.push({
      id: 'comment-2',
      author: '@PLStats',
      text: `${headToHeadNote} This historical record could play a significant role in today's match.`,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      likes: Math.floor(Math.random() * 80) + 30,
      sentiment: 'neutral',
    })
  }

  // Comment 3: Based on key players
  if (analysis.key_man_home) {
    const playerName = analysis.key_man_home.split('(')[0].trim()
    comments.push({
      id: 'comment-3',
      author: '@TacticalView',
      text: `${playerName} will be crucial for ${homeTeam} today. Their performance could be the difference maker in this fixture.`,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      likes: Math.floor(Math.random() * 70) + 20,
      sentiment: 'positive',
    })
  }

  // Comment 4: Based on injuries
  if (analysis.injuries_affecting_outcome && analysis.injuries_affecting_outcome.length > 0) {
    const injury = analysis.injuries_affecting_outcome[0]
    comments.push({
      id: 'comment-4',
      author: '@InjuryReport',
      text: `${injury} This could significantly impact the team's performance and tactical setup.`,
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      likes: Math.floor(Math.random() * 90) + 40,
      sentiment: 'negative',
    })
  }

  // Comment 5: Based on prediction
  if (likelyWinner && likelyWinner !== 'Draw') {
    comments.push({
      id: 'comment-5',
      author: '@MatchPredictor',
      text: `Based on current form and team analysis, ${likelyWinner} look like the favorites to take all three points here. However, football is unpredictable!`,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      likes: Math.floor(Math.random() * 120) + 60,
      sentiment: 'positive',
    })
  }

  // Comment 6: General match comment
  comments.push({
    id: 'comment-6',
    author: '@PremierLeagueFan',
    text: `This should be an interesting clash between ${homeTeam} and ${awayTeam}. Both teams have something to prove. Looking forward to it!`,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    likes: Math.floor(Math.random() * 60) + 15,
    sentiment: 'neutral',
  })

  // Comment 7: Based on away form if strong
  if (analysis.away_form_last_5_PL?.includes('W-W')) {
    comments.push({
      id: 'comment-7',
      author: '@AwayFormExpert',
      text: `${awayTeam} have been excellent on the road recently. Their away form suggests they won't be intimidated playing at ${match.venue}.`,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      likes: Math.floor(Math.random() * 85) + 35,
      sentiment: 'positive',
    })
  }

  // Sort by timestamp (newest first) and limit to 8 comments
  return comments
    .sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0
      return timeB - timeA
    })
    .slice(0, 8)
}
