/** Demo event venue — matches Event Details / confirmation copy */
export const GREEN_EARTH_VENUE_QUERY =
  'Ahmedabad City Park, North Entrance, Sabarmati Riverfront Road, Ahmedabad, Gujarat 380001'

/**
 * @param {string} query Address or place text for Google Maps search
 * @returns {string} URL that opens Maps in a new tab
 */
export function googleMapsSearchHref(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`
}
