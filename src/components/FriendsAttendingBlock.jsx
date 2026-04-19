import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import FriendAvatar from './FriendAvatar'
import { getFriends, subscribeFriends } from '../utils/friends'

/**
 * Same friends source as /friends — shown on event detail and join confirmation.
 * @param {{ showInviteButton?: boolean, inviteEventTitle?: string, inviteUrl?: string }} props
 */
function FriendsAttendingBlock({
  variant = 'default',
  className = '',
  showManageLink = true,
  showInviteButton = false,
  inviteEventTitle = 'This volunteer opportunity',
  inviteUrl,
}) {
  const [friends, setFriends] = useState(getFriends)

  useEffect(() => {
    const sync = () => setFriends(getFriends())
    sync()
    return subscribeFriends(sync)
  }, [])

  function handleInvite() {
    const url = inviteUrl ?? (typeof window !== 'undefined' ? window.location.href : '')
    const text = `${inviteEventTitle} — join me on CauseConnect`
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: inviteEventTitle,
          text,
          url,
        })
        .catch(() => {
          copyFallback(`${text}\n${url}`)
        })
    } else {
      copyFallback(`${text}\n${url}`)
    }
  }

  function copyFallback(line) {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(line).catch(() => {})
    }
  }

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
      <div className={`flex flex-col gap-3 sm:flex-row sm:items-start ${compact ? '' : 'sm:gap-4'}`}>
        <div className={`flex min-w-0 items-center gap-3 ${compact ? 'flex-wrap' : ''}`}>
          <div className="flex -space-x-3 overflow-hidden py-0.5">
            {shown.map((f) => (
              <FriendAvatar avatar={f.avatar} key={f.id} name={f.name} />
            ))}
            {rest > 0 ? (
              <div className="relative z-[2] flex size-10 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700 ring-2 ring-white">
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
        {showInviteButton ? (
          <Button
            className="w-full shrink-0 justify-center gap-2 py-2.5 text-sm font-bold sm:w-auto sm:min-w-[140px]"
            onClick={handleInvite}
            type="button"
            variant="secondary"
          >
            <span className="material-symbols-outlined text-[20px]">forward_to_inbox</span>
            Invite them
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default FriendsAttendingBlock
