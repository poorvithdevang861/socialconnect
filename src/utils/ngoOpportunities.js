const NGO_OPPORTUNITIES_KEY = 'socialconnect.ngoOpportunitiesDrafts'

/** Shown on Manage events when nothing is saved yet — illustrates registrations & layout. */
export const DEMO_NGO_OPPORTUNITIES = [
  {
    id: 'demo-ngo-river-cleanup',
    isDemo: true,
    title: 'Riverfront cleanup drive',
    date: '2026-05-18',
    location: 'Ahmedabad · Riverfront',
    duration: '3 hours · 8am–11am',
    spots: '24',
    description:
      'Sample listing: volunteers collect recyclables and sort waste. Gloves and bags provided. This preview shows how registrations appear once you post real opportunities.',
    orgName: 'Preview',
    createdAt: '2026-04-10T10:00:00.000Z',
    registeredCount: 14,
  },
  {
    id: 'demo-ngo-youth-mentor',
    isDemo: true,
    title: 'Youth mentoring weekend',
    date: '2026-06-02',
    location: 'Community center · Satellite',
    duration: '5 hours · Sat',
    spots: '15',
    description:
      'Sample listing: one-on-one mentoring sessions and group activities. Demo data only — your live listings will replace this preview.',
    orgName: 'Preview',
    createdAt: '2026-04-08T10:00:00.000Z',
    registeredCount: 9,
  },
  {
    id: 'demo-ngo-food-drive',
    isDemo: true,
    title: 'Neighborhood food drive',
    date: '2026-04-26',
    location: 'West Ahmedabad',
    duration: '2 hours · evening',
    spots: '30',
    description:
      'Sample listing: pack and distribute meal kits. Use “Post an opportunity” to publish your own events here.',
    orgName: 'Preview',
    createdAt: '2026-04-05T10:00:00.000Z',
    registeredCount: 22,
  },
]

export function getNgoOpportunities() {
  try {
    const raw = localStorage.getItem(NGO_OPPORTUNITIES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveNgoOpportunities(list) {
  localStorage.setItem(NGO_OPPORTUNITIES_KEY, JSON.stringify(list))
}
