import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage({ location = 'Ahmedabad', onOpenFilters }) {
  const navigate = useNavigate()
  const [activeCause, setActiveCause] = useState('All')
  const [nearYouScope, setNearYouScope] = useState('month')

  const causes = useMemo(
    () => [
      { key: 'All', label: 'All Causes', icon: 'apps', tone: 'text-slate-600' },
      { key: 'Environment', label: 'Environment', icon: 'eco', tone: 'text-green-600' },
      { key: 'Education', label: 'Education', icon: 'school', tone: 'text-blue-600' },
      { key: 'Health', label: 'Health', icon: 'volunteer_activism', tone: 'text-rose-600' },
      { key: 'Food', label: 'Food Drives', icon: 'restaurant', tone: 'text-amber-600' },
      { key: 'Community', label: 'Community Care', icon: 'diversity_3', tone: 'text-purple-600' },
    ],
    [],
  )

  const allNearYou = useMemo(
    () => [
      {
        title: 'Green Earth Tree Plantation',
        cause: 'Environment',
        desc: "Help us restore the green cover of Ahmedabad. We're planting 500 indigenous saplings.",
        dateShort: 'July 15',
        joined: '50+ Joined',
        openings: '12 Openings',
        verified: true,
        route: '/event',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdHY3U9iXi2PjUs2zf6o6CEcIdI9b9DekpZ2Jg_KmD5bjXzx8orawvH0Fj5AFhz7AWwaz7O5cai9llap37-AtCWcpGJj7fwVYxxbLWEZrq-x44_FLuBhGxIEeexa1Jd515zvePM5vY31QEEYcwMACuFJ2gHAz7WyMEUG9PzUKALQJg9z64ii_clerVdOhfNKH75XE6DlU6_BK5eIqLbEiMc17gmaRVj0yIED44M-5v7wqBNOJvmc982OJVvvca9fcEi24mTpZBVvM',
      },
      {
        title: 'Sabarmati River Cleanup',
        cause: 'Environment',
        desc: 'Join the community effort to preserve our lifeline. Tools provided.',
        dateShort: 'July 18',
        joined: '120+ Joined',
        openings: '24 Openings',
        route: '/event',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKfMCYSYKMNIiPUrKfBcM1Cc1pnOLCOzaMv5y0jN7Kx1nG7VETRpbnEHg9uC8jMZ0NneugB_Y7CAjw5Lx862R6QqOxMlKQi_NjqY-VxNk35KVHx7fkk8HW0ig7sZh6iju6NBWmyLUTR4kFLAc6pGg-5JOHLM10aUoH67Pg9gIiBVdBJkKbPKZuflWjIazykJV5CCsHukgMqh7sQNUAQJdYMv1Ibdgn-zX4WeFX_MT4dy-NKWfVrEmmW1TI_imDMDOIJUPiWOjUbXM',
      },
      {
        title: 'Weekend Tutoring',
        cause: 'Education',
        desc: 'Help underprivileged children with their weekend lessons.',
        dateShort: 'July 20',
        joined: '15 Joined',
        openings: '5 Openings',
        route: '/event',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtVjPEQgTa5GnZj8q-80NZ3SjzxnLLVlWmdo1qjEyL1D0d4SwvhtLL77I9FnvUrRh_hmB90eT0WJ_YugBrVEFmAud6wzFUr_7bijy3PPNP9OWgpmxrbjHc5E0BFy2TUUH2AHo1KRXgW-iQZVN4W3I3dfUMW2wmP-OEU9zegVyDhKGAcnqRLdV4uZvepCKja00fmpr_zLQSRxiO-yyLIaUEbz2eNAXr6lOMXBtUSvRFcyyAz2HaSu5J2clatrZIEXT2lpuzN-4af2k',
      },
      {
        title: 'Animal Rescue Center',
        cause: 'Community',
        desc: "Volunteer at the city's largest rescue center. Help with feeding and care.",
        dateShort: 'July 22',
        joined: '28 Joined',
        openings: '8 Openings',
        route: '/event',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPOrDglRZ_wuQVrQsE5owpPUsvYKtHrz0atEFKl7kp3IF-faTZCjTY04O6QabfNnTZPe3snyokSVNuOHp4TfHeI73jpyPzaABY9aQejwle60djEiXH3gxfmXG7rA_auW3T2n2YmO3T8sd6mJY64KsNdpSBCcyu2xsbUA8D-9SKrvHkYnMt9uOqNpZBgzXAfVWRb6601yU7B6ro3ff-AM-Jd79DWoXyr9WESvP7UgVL64JPrEKX21bOHus33M9KFi17Fp1PYWnlXaE',
      },
      {
        title: 'Community Kitchen',
        cause: 'Food',
        desc: 'Help prepare and distribute meals to those in need this weekend.',
        dateShort: 'July 16',
        joined: '42 Joined',
        openings: '10 Openings',
        verified: true,
        route: '/event',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaTA_trNJ3oVwBlDd5NOyoSGD57zrqwYXcvbv4KkqP2oKAunXaR7EGT_tXXafrlEbGVYEkKFp8I-AERmRinzvja5l0KZOgbBXjTDlVYxoo-z7S7W9RsanPQ2UjYPZy1o8nHNOmX6jpHkRw_oyxgk-pwXqMlx5Ic7o9UsWpOu73f4Mbzl3F2EntNZmcBL2cuQfi4G2eET40eNHqXYX2uNRo0_ZQFFiEzlj3Hop0ku4PbwQZNX8mYaC1Kikv1mtBqGLjyZF5Sxhu6aM',
      },
      {
        title: 'Senior Home Visiting',
        cause: 'Community',
        desc: 'Spend quality time reading or talking with seniors at the local home.',
        dateShort: 'July 19',
        joined: '12 Joined',
        openings: '4 Openings',
        route: '/event',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA66_jD8TF4ysqx4OYkh5RD6Tdr3E-a5rUq8Lf5T6dR-SGXUKoBUEnxyvzA38qWq2Ls3vLruM6KwcMYYXDzvigEdeYsn2EJLOiRarmBxesop2-Ccgl9Nm37Futqd4tNI33N3cg7MwPdTZTU2548Ute-ArUYN61Wwl9MWbw7gWFWz65TfN1PvhtxotWrRUFVI6Gvu2qY-Div7QX3khtnf_p6B6Rqq0CIRSdwljQpRMou1zw6ktVsPdD0nqCkb1EJOcuCSwokIWNgIpQ',
      },
      {
        title: 'Lake Shore Cleanup',
        cause: 'Environment',
        desc: 'Help clear plastic waste from the Kankaria lake front area.',
        dateShort: 'July 25',
        joined: '85 Joined',
        openings: '30 Openings',
        route: '/event',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBoLBpZ4KJzaPgk_2rAcHwq3hb9YH3Wj5pmepV9LDb7gKIkdcUkHcROVws-o7rJAC4nGqgtQ5hSDUZ4E_vQ4iM7OBANbchW5lGP6xVP1IFaHKoM8hsNWeGG0lvmcvyyUudHf8dRTnyAEY4iPi8WfwQHjcS-svqNkqPrChFzxGe8bDBnfUGm41bpEojIy5BVfZSESzJ5zaGYx9Y7XbBYu8l5ATfA3T7urj80q9OcMAi8E0U-1r6CVnoHWDeonspkDZBlk_DsdrVxJA',
      },
      {
        title: 'Book Drive Coordination',
        cause: 'Education',
        desc: 'Organize and sort book donations for rural community libraries.',
        dateShort: 'July 27',
        joined: '19 Joined',
        openings: '15 Openings',
        route: '/event',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB955WI-Xxi58AJFQCtWuzroH2HeBtbHQMSG0qKutwmpI7X2vNIopogHTiwmD078qwbo7Zrc5-kn6WS25jnWGv6aSslXIkR0JaWrs_yFzXyS2vK1koDRH3eUrwRBDpVzXCgWd8oGKK8MgxnH_ibo6Y7IlwkpteDmEeFQgId_ZjItZ2hL0YZ8BVja23KbvZpwZkfFxGDkg6CFX3P1dxbaZcHSzOtQciC7L339fpOxk_PCoHLPwbFL3PkLCtdAl1iyo7aJ7buj6scMOk',
      },
      {
        title: 'City Park Restoration',
        cause: 'Environment',
        desc: 'General maintenance and beautification of public park spaces.',
        dateShort: 'July 30',
        joined: '34 Joined',
        openings: '20 Openings',
        route: '/event',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHTta6FADEfrAViXEl3aRVVM73dBKy0qi3QjL3wRmkLOlf72Z5uP_Hi40V4Cms4VGHxEi6lb_3dD3nu4Oq0q4rTuWzsy3RZLXWmViGQZ6BIvZ4GYsvz_hdaT1Qbbm2V-i4sW7gdNasZaAaxZQAOHYV4X-J0Ro96RxxZov7n6a74vphV7NoB1lVROD8sTlp2Dwui45dz1y2ROIpmW6o0E0Zcysi1kru1xuB3d3Oj8YMQwHhQtOukaaUdWrw3894rh_nYLpbtzc-B58',
      },
    ],
    [],
  )

  const nearYou = useMemo(() => {
    const causeFiltered = activeCause === 'All' ? allNearYou : allNearYou.filter((e) => e.cause === activeCause)
    if (nearYouScope === 'week') return causeFiltered.slice(0, 3)
    if (nearYouScope === 'month') return causeFiltered
    return causeFiltered
  }, [activeCause, allNearYou, nearYouScope])

  const featuredGrid = useMemo(() => {
    const items = [
      {
        title: 'Library Reading Buddies',
        cause: 'Education',
        desc: 'Read with kids and help improve confidence in 90 minutes.',
        dateShort: 'July 23',
        joined: '22+ Joined',
        openings: '6 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtVjPEQgTa5GnZj8q-80NZ3SjzxnLLVlWmdo1qjEyL1D0d4SwvhtLL77I9FnvUrRh_hmB90eT0WJ_YugBrVEFmAud6wzFUr_7bijy3PPNP9OWgpmxrbjHc5E0BFy2TUUH2AHo1KRXgW-iQZVN4W3I3dfUMW2wmP-OEU9zegVyDhKGAcnqRLdV4uZvepCKja00fmpr_zLQSRxiO-yyLIaUEbz2eNAXr6lOMXBtUSvRFcyyAz2HaSu5J2clatrZIEXT2lpuzN-4af2k',
      },
      {
        title: 'Blood Donation Camp',
        cause: 'Health',
        desc: 'Donate blood or help manage queues and donor support.',
        dateShort: 'July 24',
        joined: '90+ Joined',
        openings: '15 Openings',
        verified: true,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHFg7Lb1J2UB23UIzivsG38PCbA_c-m8AsYnHhVdYIZWBEUgF2f1-PUAqHttRpyBndUM6WegLt-VYdkLI-4hrm7wQVnvQwfOkIzNNivEPrljPFkFhBzi0IiI05YdrOD8IBx7EvE4sBCl6YMaGdtQRWeFVwNpz27x5tMwVZSQwq7Z_lzeiV2kOIIaiXILdzZmoOGGlRyLZavPc-7qCzajqGxct-FQvYIYCiOqYfvl7BPc1W4YWCqERRPGKTsCC1NLwOxfQQb0ieeak',
      },
      {
        title: 'Street Animal Care',
        cause: 'Community',
        desc: 'Help feed and check on community dogs with local NGOs.',
        dateShort: 'July 25',
        joined: '40+ Joined',
        openings: '10 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKfMCYSYKMNIiPUrKfBcM1Cc1pnOLCOzaMv5y0jN7Kx1nG7VETRpbnEHg9uC8jMZ0NneugB_Y7CAjw5Lx862R6QqOxMlKQi_NjqY-VxNk35KVHx7fkk8HW0ig7sZh6iju6NBWmyLUTR4kFLAc6pGg-5JOHLM10aUoH67Pg9gIiBVdBJkKbPKZuflWjIazykJV5CCsHukgMqh7sQNUAQJdYMv1Ibdgn-zX4WeFX_MT4dy-NKWfVrEmmW1TI_imDMDOIJUPiWOjUbXM',
      },
      {
        title: 'Recycling Drop-off Drive',
        cause: 'Environment',
        desc: 'Sort and pack recyclables collected across neighborhoods.',
        dateShort: 'July 26',
        joined: '55+ Joined',
        openings: '20 Openings',
        verified: true,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdHY3U9iXi2PjUs2zf6o6CEcIdI9b9DekpZ2Jg_KmD5bjXzx8orawvH0Fj5AFhz7AWwaz7O5cai9llap37-AtCWcpGJj7fwVYxxbLWEZrq-x44_FLuBhGxIEeexa1Jd515zvePM5vY31QEEYcwMACuFJ2gHAz7WyMEUG9PzUKALQJg9z64ii_clerVdOhfNKH75XE6DlU6_BK5eIqLbEiMc17gmaRVj0yIED44M-5v7wqBNOJvmc982OJVvvca9fcEi24mTpZBVvM',
      },
      {
        title: 'Senior Companion Walk',
        cause: 'Community',
        desc: 'Join a small group to accompany seniors for an evening walk.',
        dateShort: 'July 27',
        joined: '18+ Joined',
        openings: '5 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5rl4AYlwZb0sa2D0rx9umuDX0WuIOUITsB2IZSMYi5kRANvmCwEUsuavlBulk1N1h2Hdf0-UNOGzHN-yFWDlRZqJLcSdWwkY_dfF2kQ85HQEb_H5dQnlzptwcGpKbwVb03E1UttCf49B1RUyALJ6PyxGb_fax5rd6EANvUBFpwjJzYxUIgLInoWfXkkRvkESoPde8Didi7qj1PsjUyhCLNNCa5m98nSSynAOtLzkxuI8a-cNR1jZYpcIOShf4xYfHfBM0GGVjoDk',
      },
      {
        title: 'Meal Kit Packing',
        cause: 'Food',
        desc: 'Pack dry ration kits for families — quick and impactful.',
        dateShort: 'July 28',
        joined: '70+ Joined',
        openings: '14 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaTA_trNJ3oVwBlDd5NOyoSGD57zrqwYXcvbv4KkqP2oKAunXaR7EGT_tXXafrlEbGVYEkKFp8I-AERmRinzvja5l0KZOgbBXjTDlVYxoo-z7S7W9RsanPQ2UjYPZy1o8nHNOmX6jpHkRw_oyxgk-pwXqMlx5Ic7o9UsWpOu73f4Mbzl3F2EntNZmcBL2cuQfi4G2eET40eNHqXYX2uNRo0_ZQFFiEzlj3Hop0ku4PbwQZNX8mYaC1Kikv1mtBqGLjyZF5Sxhu6aM',
      },
    ]

    const filtered = activeCause === 'All' ? items : items.filter((e) => e.cause === activeCause)
    return filtered
  }, [activeCause])

  const mobileFriends = useMemo(
    () => [
      {
        title: 'Animal Shelter Help',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMD61qWrxeBzh7U61Bk82_Ghs0vRlnSOflvGLBtlGTo6o5ATjibiydEuAKYiin050eRWPbLueejmQXv2nTo17tRWvwLAhFD36TiL6jqAQbpW0A8_6o6erO_kdZFGzXOlGEoLCDTcZECnABfaeDcGs5E0f8yT6XqR3bMCT1QOzQaEk6Anr97NjApamsNHrBmYRlxL11pBl0gYD2-ko2zSWN0Q50YzcW6Do60jraLz9jjnhchBPndZd4nLBpw33JEPtLloqednWda8s',
        avatars: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCo71jIgykmb3Kid1rq-u6PsRxMx0nePiAqMQnv7F7IWFXtNcIwHGiKXlZRlQtEHYsJpKNEf8fgBVPTXtIKMkkyir5BBxnntgUt29EX6K6iOLicxiEcpT6z7fIxrUABTsEomWMsTDYKVa0oYa6sG-BIM91_fSrFzOihqqg5VvdZAyMcJAnAbidF7u677qfWT2sTty342TUjvwpASIG3eJpCBHdNE7C2JkBVPbdP3kSudNxLzVg9i6nrLTNqcXcuH1Qe6XcRFuUkAwk',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA1BBtJF904-uPnZ6CS_nsHVr_4d2B1ZAQtyp1Qy2uIQaZzLTLZA1jiYJoz7VYawTS8A5DliIZ75AXBia_uvEQRtwwcj7vGIiYAiho3l_q0_Il-085IVoag4WfeI3G4D5wlHhJiGb-U1pTb8rYJ2xMiXXRBrCy3jD8x8jfs3JLx1XEAOfzP-QIzyCqH_aqeBOKYM2W0It8KjZQ0_JeBeTIigtxx0f0stcO-pFJuYbdnZlZ9-L1vj3CPYktdv-OEUmrOry8n1PwNaJU',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAGsoJ4bPrnz3KB1xsgr4tvOtBkT4MKO5gM6Y_pDVvPdXgAKqccN5uiB0jnRypZkIeYE-VT7fuWzKP8Cyr2DcoKrI9h8wa6om3fIZk8SAj5aHMHE6nKukcKX_KZcFBau47Xlp3Yvz_VZb-PMYQKyEnOB4BOmhmW2LcJM4kl4SLJ3MyIMlEpIo0149YDGTGE4vl9jMurrPFY--y9gRv8PDVkLR3rvtxxzx1SoDObBjWZYjyNGQN-5TVZg4n9BEzbhuar8pjvS3Uashk',
        ],
        more: '+4 more',
      },
      {
        title: 'Teach Kids Weekend',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlQ6Wer9hHblywoFP1vSixJI8iLqpWkLOkV8nP6eKc1UBKgKvENolXj_COzpTryyUYuqSxE6-kQvXdjMwCGUerzqeQpSLYhGqcEzJEwXN8Rtr4AFluEyuGmq7wKziWdqSw2fDuYNgKTXP1FJ6g6-0Psmh_40x_ScLDs_a1Q6KXzn1xdPBrd2cpZRXhorn-IgjaBIyHMAFMy9R2VxT9Bqt2lCa1LaOuuyhpnyXvJAuBbebLV4CzmWTyjLANn6lfjL4q4YrYn3NSKgE',
        avatars: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDt8i2LhA9zg5xW1LzUjSIpzUWIS0vmPja6A8Rcai8tBsxYjDbC8LY8B0xL_mt4ORTsm620H2aNUtU8JG12zDcSvmYE03H_vJVMN4tVycKAv-NlsV49dpaKpAGCnSnqh14KKe7x0PYyWe5pA6MNXa_iFpvxfjLAZbcsmoZ2E7WY-eX7yOWgb4RKVNCbAMDKrkdPzJoOly92ZcADYjOiACtcJxNIZ4W5eE03SPbM9hiW9hBnAoldxh5E-gaqYApbI0fbHHn4Lp0mpE8',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBuVxDnfrS3n75JAn7K9Dx9Mu9yTiNS9qZUibEH84iVhA8aICoj0nBBUdeaWYAKFM6J2SQ0f79JzY1O68WG0bRAeG58dXXi8R0wXVTIJu6Wa7c2X1EchZd5ztMrTlpiqtvacyEbjC8-wCXNIj-5aP5OdlV5QxvjX6Xg8ZKZ3KuhO629mDnvEqTbVS9G-8mvfeFBVbv0vBBu8pmWU6mAk2gwzt9ZGoZii6th6JKIYgosqBMWBzwCFxBmtsYy0CSobk2-X1rNxzFWpOM',
        ],
        more: '+2 more',
      },
    ],
    [],
  )

  return (
    <main className="mx-auto max-w-7xl px-3 pb-[max(92px,calc(72px+env(safe-area-inset-bottom)))] pt-5 sm:px-4 md:px-10 md:py-8">
        <section className="mb-8 md:mb-10">
          <h2 className="text-[clamp(1.95rem,8.5vw,2.35rem)] font-black leading-tight text-slate-900 md:text-4xl">
            Welcome back, <span className="text-primary">Arjun!</span>
          </h2>
          <p className="mt-2 text-[clamp(0.95rem,3.9vw,1.1rem)] text-slate-500 md:text-lg">
            There are 12 new volunteering opportunities in {location} today.
          </p>
        </section>

        {/* Mobile search row (desktop keeps navbar search) */}
        <div className="pb-2 md:hidden">
          <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 focus-within:outline-none">
            <span className="material-symbols-outlined text-slate-400">search</span>
            <input
              className="w-full border-none bg-transparent text-[15px] placeholder:text-slate-400 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none"
              placeholder="Search causes, events..."
              type="search"
            />
            <button
              className="text-slate-400"
              onClick={onOpenFilters}
              type="button"
              aria-label="Open filters"
            >
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="hide-scrollbar flex gap-2.5 overflow-x-auto pb-2 sm:gap-3">
            {causes.map((c) => {
              const active = activeCause === c.key
              return (
                <button
                  className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-[13px] font-bold transition-colors sm:px-5 sm:text-sm ${
                    active
                      ? 'bg-primary text-white'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-primary'
                  }`}
                  key={c.key}
                  onClick={() => setActiveCause(c.key)}
                  type="button"
                >
                  <span className={`material-symbols-outlined text-lg ${active ? 'text-white' : c.tone}`}>
                    {c.icon}
                  </span>
                  {c.label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-start gap-2 md:justify-self-end md:justify-end">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
              onClick={onOpenFilters}
              type="button"
            >
              <span className="material-symbols-outlined text-lg text-primary">tune</span>
              Filters
            </button>
          </div>
        </div>

        <div className="space-y-12">
            <section>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="flex items-center gap-2 text-2xl font-extrabold">
                    <span className="material-symbols-outlined text-primary">near_me</span>
                    Near You
                  </h3>
                  <div className="flex items-center gap-2 rounded-xl bg-white p-1 ring-1 ring-slate-200">
                    {[
                      ['week', 'This week'],
                      ['month', 'This month'],
                    ].map(([key, label]) => (
                      <button
                        className={`rounded-lg px-3 py-1 text-xs font-black transition-colors ${
                          nearYouScope === key ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                        key={key}
                        onClick={() => setNearYouScope(key)}
                        type="button"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="self-start text-sm font-bold text-primary hover:underline sm:self-auto"
                  onClick={() => navigate('/events')}
                  type="button"
                >
                  View map
                </button>
              </div>

              <div className="hide-scrollbar -mx-3 flex gap-4 overflow-x-auto px-3 pb-1 sm:-mx-4 sm:px-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3">
                {nearYou.map((item) => (
                  <div
                    className="group min-w-[85vw] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl sm:min-w-[280px] md:min-w-0"
                    key={item.title}
                    onClick={item.route ? () => navigate(item.route) : undefined}
                    onKeyDown={
                      item.route
                        ? (event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              navigate(item.route)
                            }
                          }
                        : undefined
                    }
                    role={item.route ? 'button' : undefined}
                    tabIndex={item.route ? 0 : undefined}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={item.img}
                      />
                      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-success-green" /> {item.openings}
                      </div>
                      <div className="absolute bottom-4 left-4 max-w-[55%] rounded-lg bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur">
                        {item.cause}
                      </div>
                      {item.verified ? (
                        <div className="absolute bottom-4 right-4 rounded-lg bg-primary px-3 py-1 text-xs font-bold text-white shadow-lg">
                          Verified
                        </div>
                      ) : null}
                    </div>
                    <div className="p-4 sm:p-5">
                      <h4 className="mb-2 text-[clamp(1.05rem,4.8vw,1.25rem)] font-bold leading-tight transition-colors group-hover:text-primary">
                        {item.title}
                      </h4>
                      <p className="mb-4 line-clamp-2 text-sm text-slate-500">{item.desc}</p>
                      <div className="mb-6 flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">calendar_today</span>
                          {item.dateShort}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">group</span>
                          {item.joined}
                        </div>
                      </div>
                      <button
                        className="w-full rounded-xl bg-primary py-3 font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90"
                        onClick={(event) => {
                          event.stopPropagation()
                          if (item.route) navigate(item.route)
                        }}
                        type="button"
                      >
                        Join Opportunity
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-[22px] font-semibold md:text-2xl md:font-extrabold">
                  <span className="material-symbols-outlined text-primary">trending_up</span>
                  Trending This Week
                </h3>
                <button
                  className="text-sm font-medium text-primary md:hidden"
                  onClick={() => navigate('/events')}
                  type="button"
                >
                  See All
                </button>
              </div>
              <div className="hide-scrollbar -mx-3 flex gap-4 overflow-x-auto px-3 pb-1 sm:-mx-4 sm:px-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3">
                {[
                  {
                    tag: 'Education',
                    tagClass: 'text-blue-500',
                    title: 'Weekend Tutoring for Kids',
                    meta: '45 volunteers matched',
                    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtVjPEQgTa5GnZj8q-80NZ3SjzxnLLVlWmdo1qjEyL1D0d4SwvhtLL77I9FnvUrRh_hmB90eT0WJ_YugBrVEFmAud6wzFUr_7bijy3PPNP9OWgpmxrbjHc5E0BFy2TUUH2AHo1KRXgW-iQZVN4W3I3dfUMW2wmP-OEU9zegVyDhKGAcnqRLdV4uZvepCKja00fmpr_zLQSRxiO-yyLIaUEbz2eNAXr6lOMXBtUSvRFcyyAz2HaSu5J2clatrZIEXT2lpuzN-4af2k',
                  },
                  {
                    tag: 'Social Care',
                    tagClass: 'text-red-500',
                    title: 'Community Kitchen Drive',
                    meta: '82 volunteers matched',
                    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaTA_trNJ3oVwBlDd5NOyoSGD57zrqwYXcvbv4KkqP2oKAunXaR7EGT_tXXafrlEbGVYEkKFp8I-AERmRinzvja5l0KZOgbBXjTDlVYxoo-z7S7W9RsanPQ2UjYPZy1o8nHNOmX6jpHkRw_oyxgk-pwXqMlx5Ic7o9UsWpOu73f4Mbzl3F2EntNZmcBL2cuQfi4G2eET40eNHqXYX2uNRo0_ZQFFiEzlj3Hop0ku4PbwQZNX8mYaC1Kikv1mtBqGLjyZF5Sxhu6aM',
                  },
                  {
                    tag: 'Environment',
                    tagClass: 'text-green-500',
                    title: 'Urban Garden Project',
                    meta: '31 volunteers matched',
                    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBOg8TA3Ihi0kIsJEo6ijwacpGoTVX3ByTdbvQKjrvpx_hybl-IqpWwOSfnj74w0b6gs9LPChsGyMfxIzQSzZKSS42_5L1JCmJemCRP5-PD9DYWQd-2yrJU8hTkC0c2A2KnSpPeAVv8JRlsXXcChBG84TzAfFNFb9jWspUJOqv-kXrlE025PsmOElaAC_zhJxvmu7UtADf0-mHprS0QwpvQMo3mV38KLO6J1nNutx7XQDllBTS3WGGe8vRMxmCH8hf8kV23x06_Ss',
                  },
                ].map((t) => (
                  <div
                    className="min-w-[85vw] rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-colors hover:border-primary/50 sm:min-w-[280px] md:min-w-0 md:flex md:items-start md:gap-4"
                    key={t.title}
                  >
                    <div className="relative h-[160px] overflow-hidden rounded-xl md:h-24 md:w-24 md:shrink-0 md:rounded-lg">
                      <img alt={t.title} className="h-full w-full object-cover" src={t.img} />
                      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider md:hidden">
                        <span className="material-symbols-outlined text-[14px] text-blue-500">verified</span>
                        Verified
                      </div>
                    </div>
                    <div className="mt-3 flex min-w-0 flex-1 flex-col justify-between md:mt-0">
                      <div>
                        <span className={`text-[10px] font-black uppercase tracking-wider ${t.tagClass}`}>
                          {t.tag}
                        </span>
                        <h5 className="line-clamp-1 font-bold text-slate-900">{t.title}</h5>
                        <p className="mt-1 text-xs text-slate-500">{t.meta}</p>
                      </div>
                      <button className="mt-3 rounded-lg bg-[#22c55e] px-3 py-1.5 text-[12px] font-bold text-white md:hidden" onClick={() => navigate('/event')} type="button">
                        View Details
                      </button>
                      <button className="mt-3 hidden items-center gap-1 text-sm font-bold text-primary transition-all hover:gap-2 md:flex" onClick={() => navigate('/event')} type="button">
                        Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="cc-card cc-card-pad-lg overflow-hidden">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  CauseConnect picks
                </p>
                <h3 className="text-2xl font-extrabold text-slate-900">Explore by cause</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Jump into curated opportunities built around your interests.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { title: 'Education', sub: 'Mentor students • Weekend sessions', icon: 'school', tone: 'text-blue-600', bg: 'bg-blue-600/10' },
                  { title: 'Environment', sub: 'Plant trees • Cleanups • Recycling', icon: 'eco', tone: 'text-green-600', bg: 'bg-green-600/10' },
                  { title: 'Food Drives', sub: 'Pack meals • Distribute kits', icon: 'restaurant', tone: 'text-amber-600', bg: 'bg-amber-600/10' },
                  { title: 'Community Care', sub: 'Shelters • Elder care • NGOs', icon: 'diversity_3', tone: 'text-purple-600', bg: 'bg-purple-600/10' },
                ].map((c) => (
                  <button
                    className="cc-card-soft cc-card-pad group flex items-center gap-4 text-left transition-all hover:border-primary/30"
                    key={c.title}
                    onClick={() => setActiveCause(c.title === 'Food Drives' ? 'Food' : c.title)}
                    type="button"
                  >
                    <div className={`flex size-12 items-center justify-center rounded-xl ${c.bg} ${c.tone}`}>
                      <span className="material-symbols-outlined">{c.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold text-slate-900">{c.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{c.sub}</p>
                    </div>
                    <span className="material-symbols-outlined text-base text-slate-300 transition-colors group-hover:text-primary">
                      arrow_forward
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-extrabold">
                  <span className="material-symbols-outlined text-primary">view_module</span>
                  Featured Opportunities
                </h3>
                <button
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                  onClick={() => navigate('/events')}
                  type="button"
                >
                  View all <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredGrid.slice(0, 6).map((item) => (
                  <article
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl"
                    key={item.title}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={item.img}
                      />
                      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-success-green" /> {item.openings}
                      </div>
                      <div className="absolute bottom-4 left-4 max-w-[55%] rounded-lg bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur">
                        {item.cause}
                      </div>
                      {item.verified ? (
                        <div className="absolute bottom-4 right-4 rounded-lg bg-primary px-3 py-1 text-xs font-bold text-white shadow-lg">
                          Verified
                        </div>
                      ) : null}
                    </div>
                    <div className="p-5">
                      <h4 className="mb-2 text-xl font-bold leading-tight transition-colors group-hover:text-primary">
                        {item.title}
                      </h4>
                      <p className="mb-4 line-clamp-2 text-sm text-slate-500">{item.desc}</p>
                      <div className="mb-6 flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">calendar_today</span>
                          {item.dateShort}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">group</span>
                          {item.joined}
                        </div>
                      </div>
                      <button
                        className="w-full rounded-xl bg-primary py-3 font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90"
                        onClick={() => navigate('/event')}
                        type="button"
                      >
                        Join Opportunity
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="md:hidden">
              <div className="mb-4 px-1">
                <h3 className="text-[20px] font-semibold leading-tight text-slate-900">Friends Are Volunteering</h3>
              </div>
              <div className="space-y-3">
                {mobileFriends.map((item) => (
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3" key={item.title}>
                    <img alt={item.title} className="size-14 rounded-lg object-cover" src={item.img} />
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-[15px] font-semibold text-slate-900">{item.title}</h4>
                      <div className="mt-1 flex items-center -space-x-2">
                        {item.avatars.map((a) => (
                          <img alt="Friend avatar" className="size-6 rounded-full border-2 border-white object-cover" key={a} src={a} />
                        ))}
                        <span className="pl-3 text-[10px] text-slate-500">{item.more}</span>
                      </div>
                    </div>
                    <button className="rounded-lg bg-primary px-4 py-2 text-[12px] font-bold text-white" type="button">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="hidden grid-cols-1 gap-8 border-t border-slate-200 pt-8 md:grid lg:grid-cols-2">
              <section className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
                <div>
                  <h3 className="mb-6 flex items-center gap-2 text-xl font-extrabold">
                    <span className="material-symbols-outlined text-primary">groups</span>
                    Friends Volunteering
                  </h3>
                  <div className="space-y-6">
                    <div className="group flex cursor-pointer gap-4">
                      <div className="relative shrink-0">
                        <img
                          alt="Rahul"
                          className="h-12 w-12 rounded-full border-2 border-primary/20 object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEmwbHeLtUfBQWBkjm2WsCjanWjpbuhyFGRw8z6K-FlwzXTr6ZYZOQ6jjdUetXkLi02k0DsWqW8jFQkXCJRiY6twm99t9i27SZ6fdGv3f2BpUQQzenZMaGllUwrcCpEbhrl6CV4q4btczVtoBin9TWY9r5WIfHswmKwFiGvkntBeibNeiQ7IQd91bVPPaxOUcX30gwuzRUnlO1GOx5snADkZ46T-iw8RM0a4kJ0UJIPRRElU_tfdjyXjV7Nk_pkZaCIs_WKONKaZQ"
                        />
                        <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-success-green p-0.5 text-white">
                          <span className="material-symbols-outlined block text-[10px]">check</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          <span className="font-bold">Rahul S.</span> and 3 others joined{' '}
                          <span className="font-bold text-primary">‘Beach Cleanup’</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="group flex cursor-pointer gap-4">
                      <img
                        alt="Siddharth"
                        className="h-12 w-12 shrink-0 rounded-full border-2 border-primary/20 object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVE4Jxc9CcTxFekx_U9MUt8hqxxxcWdw5i_GAfLEhe_WCKha4sIqCZMKxDaXT1OEx5H1g-v_GxSpP7aO5Js0vgSDbZRsN_qy1IHJPjaQ1Et7dCdhej90xt2a4Ju8lYxvznSk2ndg5T-o_2Omtrtw9o1U_HiN8x49DyUrfG8Q8-LzCSIb1uySkQtXD1_fvUzbJc2M_TJ3CtZtdXo3zbKxG1GbTGi-e2hp6aQF54bpg3Ox3azgX_sl7Dtwn5T7u0wjSXhdMCbjt8mIc"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          <span className="font-bold">Siddharth V.</span> signed up for{' '}
                          <span className="font-bold text-primary">‘Teach India’</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-400">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="mt-8 w-full rounded-xl border border-primary/30 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                  onClick={() => navigate('/profile')}
                  type="button"
                >
                  Find More Friends
                </button>
              </section>

              <div className="space-y-6">
                <section className="flex h-full min-h-[200px] flex-col justify-between rounded-2xl bg-gradient-to-br from-primary to-orange-600 p-6 text-white">
                  <div>
                    <h3 className="mb-4 text-lg font-black">Your Impact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                        <p className="mb-1 text-xs font-bold opacity-80">Total Hours</p>
                        <p className="text-3xl font-black">24.5</p>
                      </div>
                      <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                        <p className="mb-1 text-xs font-bold opacity-80">Events</p>
                        <p className="text-3xl font-black">08</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold">
                    <span className="material-symbols-outlined text-xl">workspace_premium</span>
                    Silver Badge Contributor
                  </div>
                </section>
              </div>
            </div>

            <div className="group relative hidden h-64 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 md:block">
              <img
                alt="Map of Ahmedabad"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTqDwUcp4OqgD4aH0qE4HDW1O1KRAvlnXYNcRUbZC9YfH7KIgOpM6oAbkiybYjevAm3RSBG4GKdsrWSA-ephRfLklrg1OmkI0D1DMur8Z6XryR69XXSh6KmnpTZfEIgAEiUJuRtEiYE5xJ9T16apC-EnU_ckhliD09GWQJpzeOIuZ-0iHrj6xXmhbatC--wJomC-9sqaY4NIHezNt1dAqRZvnRI17tz_Vtpfn4YN20zDL78txxjRSWLFhYTET1mBzDYAWcZrlZ04c"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl bg-white/95 p-4 shadow-2xl backdrop-blur md:left-auto md:right-6 md:w-64">
                <span className="text-sm font-bold text-slate-900">Explore via Map</span>
                <span className="material-symbols-outlined text-primary">map</span>
              </div>
            </div>
        </div>
    </main>
  )
}

export default HomePage
