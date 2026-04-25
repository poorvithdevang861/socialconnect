const NGO_OPPORTUNITIES_KEY = 'socialconnect.ngoOpportunitiesDrafts'

/** Shown on Manage events when nothing is saved yet — illustrates registrations & layout. */
export const DEMO_NGO_OPPORTUNITIES = [
  {
    id: 'demo-ngo-river-cleanup',
    isDemo: true,
    status: 'approved',
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
    coverImage: 'https://images.pexels.com/photos/7656743/pexels-photo-7656743.jpeg',
  },
  {
    id: 'demo-ngo-youth-mentor',
    isDemo: true,
    status: 'pending_review',
    title: 'Youth mentoring weekend',
    date: '2026-06-02',
    location: 'Community center · Satellite',
    duration: '5 hours · Sat',
    spots: '15',
    description:
      'Sample listing: one-on-one mentoring sessions and group activities. This demo card is intentionally in review-pending state so NGOs can understand moderation flow.',
    orgName: 'Preview',
    createdAt: '2026-04-08T10:00:00.000Z',
    registeredCount: 9,
    coverImage: 'https://images.pexels.com/photos/6647025/pexels-photo-6647025.jpeg',
  },
  {
    id: 'demo-ngo-food-drive',
    isDemo: true,
    status: 'approved',
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
    coverImage: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg',
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
