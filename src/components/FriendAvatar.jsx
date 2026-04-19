import { friendPhotoUrl, getFriendInitials } from '../utils/friendAvatar'

/**
 * @param {{ name: string, avatar?: string, className?: string, size?: 'sm' | 'md' | 'lg' }} props
 */
function FriendAvatar({ name, avatar, className = '', size = 'md' }) {
  const url = friendPhotoUrl(avatar)
  const initials = getFriendInitials(name)
  const box = size === 'sm' ? 'size-8' : size === 'lg' ? 'size-12 sm:size-14' : 'size-10'
  const textSize = size === 'sm' ? 'text-[11px]' : size === 'lg' ? 'text-base sm:text-lg' : 'text-sm'

  if (url) {
    return (
      <img
        alt=""
        className={`inline-block shrink-0 rounded-full object-cover ring-2 ring-white ${box} ${className}`}
        src={url}
      />
    )
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/35 font-bold text-primary ring-2 ring-white ${box} ${textSize} ${className}`}
      aria-hidden
    >
      {initials}
    </span>
  )
}

export default FriendAvatar
