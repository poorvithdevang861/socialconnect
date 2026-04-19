import { useEffect, useState } from 'react'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { addFriend, getFriends, removeFriend, subscribeFriends } from '../utils/friends'

function FriendsPage() {
  const [friends, setFriends] = useState(getFriends)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [addError, setAddError] = useState('')

  useEffect(() => {
    const sync = () => setFriends(getFriends())
    sync()
    return subscribeFriends(sync)
  }, [])

  const handleAdd = (e) => {
    e.preventDefault()
    const n = name.trim()
    if (!n) return
    const ok = addFriend({ name: n, avatar: avatar.trim() })
    if (ok) {
      setName('')
      setAvatar('')
      setAddError('')
    } else {
      setAddError('That name is already in your list.')
    }
  }

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-[1600px] premium-shell shell-pad-lg">
      <div className="mb-8">
        <SectionHeader
          title="Friends"
          subtitle="People you volunteer with — we show them on event pages when you join so you can spot familiar faces."
          titleClassName="premium-h1"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <section className="lg:col-span-5">
          <div className="cc-card cc-card-pad-lg">
            <h2 className="text-lg font-bold text-slate-900">Add a friend</h2>
            <p className="mt-1 text-sm text-slate-500">
              Name is required. Avatar URL is optional. We only show people you add — nothing is prefilled.
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleAdd}>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Display name
                </label>
                <input
                  className="h-12 w-full rounded-2xl border border-black/[0.08] bg-background-light px-4 text-[15px] text-ink outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/25"
                  onChange={(ev) => {
                    setName(ev.target.value)
                    setAddError('')
                  }}
                  placeholder="e.g. Priya Sharma"
                  value={name}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Photo URL (optional)
                </label>
                <input
                  className="h-12 w-full rounded-2xl border border-black/[0.08] bg-background-light px-4 text-[15px] text-ink outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/25"
                  onChange={(ev) => setAvatar(ev.target.value)}
                  placeholder="https://…"
                  type="url"
                  value={avatar}
                />
              </div>
              {addError ? <p className="text-sm font-medium text-red-600">{addError}</p> : null}
              <Button className="w-full justify-center py-3 font-bold" type="submit">
                Add friend
              </Button>
            </form>
          </div>
        </section>

        <section className="lg:col-span-7">
          <div className="cc-card cc-card-pad-lg">
            <h2 className="text-lg font-bold text-slate-900">Your list ({friends.length})</h2>
            {friends.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">No friends added yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-slate-100">
                {friends.map((f) => (
                  <li className="flex items-center gap-4 py-4 first:pt-0" key={f.id}>
                    <img
                      alt=""
                      className="size-12 shrink-0 rounded-full object-cover ring-2 ring-white"
                      src={f.avatar}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">{f.name}</p>
                    </div>
                    <button
                      className="shrink-0 rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-red-600"
                      onClick={() => removeFriend(f.id)}
                      type="button"
                      aria-label={`Remove ${f.name}`}
                    >
                      <span className="material-symbols-outlined">person_remove</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default FriendsPage
