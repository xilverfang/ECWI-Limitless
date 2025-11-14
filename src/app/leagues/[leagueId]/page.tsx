import { notFound } from 'next/navigation'
import LeagueMatches from '@/components/LeagueMatches'

const VALID_LEAGUES = ['premier-league', 'la-liga', 'bundesliga', 'serie-a', 'ucl']

export default async function LeaguePage({ params }: { params: Promise<{ leagueId: string }> }) {
  const { leagueId } = await params

  if (!VALID_LEAGUES.includes(leagueId)) {
    notFound()
  }

  return <LeagueMatches leagueId={leagueId} />
}

