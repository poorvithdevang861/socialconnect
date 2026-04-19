const NGO_OPPORTUNITIES_KEY = 'socialconnect.ngoOpportunitiesDrafts'

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
