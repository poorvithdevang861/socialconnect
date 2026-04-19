import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFriends, subscribeFriends } from '../utils/friends'

/**
 * Same friends source as /friends — shown on event detail and join confirmation.
 */
function FriendsAttendingBlock({
  variant = 'default',
  className = '',
  showManageLink = true,
}) {
  const [friends, setFriends] = useState(getFriends)

  useEffect(() => {
    const sync = () => setFriends(getFriends())
    sync()
    return subscribeFriends(sync)
  }, [])

  if (friends.length === 0) {
    return (
      <div className={className}>
        <p className="text-sm text-slate-600">
          No friends yet.{' '}
          {showManageLink ? (
            <Link className="font-bold text-primary hover:underline" to="/friends">
              Add friends
            </Link>
          ) : null}{' '}
          to see who might join you at events.
        </p>
      </div>
    )
  }

  const maxAvatars = 4
  const shown = friends.slice(0, maxAvatars)
  const rest = Math.max(0, friends.length - maxAvatars)
  const names = friends.map((f) => f.name)
  const summary =
    friends.length === 1
      ? `${names[0]} is on your list`
      : friends.length === 2
        ? `${names[0]} and ${names[1]}`
        : friends.length === 3
          ? `${names[0]}, ${names[1]} and ${names[2]}`
          : `${names.slice(0, 2).join(', ')} and ${friends.length - 2} others`

  const compact = variant === 'compact'

  return (
    <div className={className}>
      <div className={`flex items-center gap-3 ${compact ? 'flex-wrap' : ''}`}>
        <div className="flex -space-x-3 overflow-hidden">
          {shown.map((f) => (
            <img
              alt=""
              className="inline-block size-10 rounded-full object-cover ring-2 ring-white"
              key={f.id}
              src={f.avatar}
            />
          ))}
          {rest > 0 ? (
            <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-xs font-medium ring-2 ring-white">
              +{rest}
            </div>
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-slate-600 ${compact ? 'text-sm' : 'text-sm'}`}>
            <span className="font-semibold text-slate-800">{summary}</span>
            {showManageLink ? (
              <>
                {' '}
                ·{' '}
                <Link className="font-bold text-primary hover:underline" to="/friends">
                  Manage
                </Link>
              </>
            ) : null}
          </p>
          {!compact ? (
            <p className="mt-0.5 text-xs text-slate-500">
              If they sign up for this event, you&apos;ll see them here.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default FriendsAttendingBlock
