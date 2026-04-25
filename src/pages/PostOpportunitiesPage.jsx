import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import NgoLayout from '../components/NgoLayout'
import { getNgoProfile } from '../utils/ngoProfile'
import { getNgoOpportunities, saveNgoOpportunities } from '../utils/ngoOpportunities'

const MAX_IMAGE_CHARS = 380_000

function PostOpportunitiesPage() {
  const navigate = useNavigate()
  const profile = getNgoProfile()
  const fileInputRef = useRef(null)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [duration, setDuration] = useState('')
  const [spots, setSpots] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [posted, setPosted] = useState(false)

  useEffect(() => {
    if (!profile) {
      navigate('/signup/ngo', { replace: true })
    }
  }, [profile, navigate])

  const inputClass =
    'h-12 w-full rounded-2xl border border-black/[0.08] bg-background-light px-4 text-[15px] leading-tight text-ink placeholder:text-slate-400 outline-none transition-shadow focus:border-primary/40 focus:ring-2 focus:ring-primary/25'

  const textareaClass =
    'min-h-[120px] w-full rounded-2xl border border-black/[0.08] bg-background-light px-4 py-3 text-[15px] leading-relaxed text-ink placeholder:text-slate-400 outline-none transition-shadow focus:border-primary/40 focus:ring-2 focus:ring-primary/25'

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      if (typeof dataUrl !== 'string') return
      if (dataUrl.length > MAX_IMAGE_CHARS) {
        setCoverImage(null)
        return
      }
      setCoverImage(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setCoverImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const entry = {
      id: crypto.randomUUID(),
      status: 'pending_review',
      title: title.trim(),
      date,
      location: location.trim(),
      duration: duration.trim(),
      spots: spots.trim(),
      description: description.trim(),
      orgName: profile.orgName,
      createdAt: new Date().toISOString(),
      ...(coverImage ? { coverImage } : {}),
    }
    const next = [...getNgoOpportunities(), entry]
    saveNgoOpportunities(next)
    setPosted(true)
  }

  const resetForm = () => {
    setPosted(false)
    setTitle('')
    setDate('')
    setLocation('')
    setDuration('')
    setSpots('')
    setDescription('')
    clearImage()
  }

  if (!profile) {
    return null
  }

  return (
    <NgoLayout title="Post an event" subtitle={`${profile.orgName} · ${profile.city}`}>
      {posted ? (
        <div className="cc-card cc-card-pad-lg shadow-[0_14px_32px_rgba(15,15,16,0.08)]">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-success-green/[0.1] text-success-green">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <div>
              <h2 className="premium-h2 text-ink">Event submitted for review</h2>
              <p className="premium-body mt-2">
                Your event is saved as pending approval. Volunteers will only see it after platform review.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button className="h-12 flex-1 justify-center font-bold" onClick={resetForm} type="button">
                Post another
              </Button>
              <Link className="btn-secondary inline-flex h-12 flex-1 items-center justify-center font-bold" to="/ngo/manage-events">
                Manage events
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="cc-card cc-card-pad-lg bg-white shadow-[0_18px_42px_-14px_rgba(15,15,16,0.15)]">
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-ink">Post new event</h3>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Submit upcoming events for platform approval before volunteers can discover them.
            </p>
            <p className="premium-body mt-1">
              Logged in as <span className="font-bold text-ink">{profile.contactName}</span>
              <span className="text-slate-400"> · </span>
              <span className="text-slate-600">{profile.email}</span>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Cover image</p>
                <input
                  ref={fileInputRef}
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                  type="file"
                />
                <button
                  className="group relative flex w-full flex-col overflow-hidden rounded-2xl border-2 border-dashed border-black/[0.12] bg-background-light transition-colors hover:border-primary/35 hover:bg-primary/[0.03]"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {coverImage ? (
                    <>
                      <img alt="" className="aspect-[4/3] w-full object-cover" src={coverImage} />
                      <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                    </>
                  ) : (
                    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 px-4 py-8 text-center">
                      <span className="material-symbols-outlined text-5xl text-slate-300">add_photo_alternate</span>
                      <span className="text-sm font-bold text-slate-500">Add image</span>
                      <span className="text-xs text-slate-400">JPG or PNG · shown on your listing</span>
                    </div>
                  )}
                </button>
                {coverImage ? (
                  <button
                    className="mt-2 text-sm font-bold text-slate-500 underline-offset-2 hover:text-primary hover:underline"
                    onClick={clearImage}
                    type="button"
                  >
                    Remove image
                  </button>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Event title</label>
                  <input
                    className={inputClass}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Weekend beach cleanup"
                    required
                    type="text"
                    value={title}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Date</label>
                  <div className="relative">
                    <input
                      className={`${inputClass} cursor-pointer pr-10 text-slate-700 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      type="date"
                      value={date}
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      calendar_month
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Volunteers needed</label>
                  <input
                    className={inputClass}
                    inputMode="numeric"
                    min={1}
                    onChange={(e) => setSpots(e.target.value)}
                    placeholder="10"
                    required
                    type="number"
                    value={spots}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</label>
                  <input
                    className={inputClass}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Meeting point or venue"
                    required
                    type="text"
                    value={location}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Time commitment</label>
                  <input
                    className={inputClass}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3 hours, 9am–12pm"
                    required
                    type="text"
                    value={duration}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
                  <textarea
                    className={textareaClass}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What will volunteers do? What should they bring?"
                    required
                    rows={4}
                    value={description}
                  />
                </div>
              </div>
            </div>

            <Button className="h-12 w-full justify-center gap-2 font-bold" type="submit">
              Submit for review
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Button>
          </form>
        </div>
      )}
    </NgoLayout>
  )
}

export default PostOpportunitiesPage
