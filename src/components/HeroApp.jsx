import { useEffect, useRef } from 'react'
import logoUrl from '@/assets/logo/clipwing-logo.svg'
import avatarJohn from '@/assets/images/hero-collage/parts/avatar-1.png'

const A = '/hero-app' // public asset base for the ported widget

/** TikTok's current music-note mark; drawn three times for the offset colours. */
const TIKTOK_NOTE =
  'M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3c-.01 0-1.89.09-3.24-1.48Z'

/** shadcn Avatar fallback glyph — the lucide `user` icon. */
function UserGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

/**
 * Interactive "clickable app" widget for the hero — a faithful port of the
 * Clipwing Autopilot static demo. The initial DOM is declared as JSX; all
 * dynamic behaviour (tab switching, board add, video player, comments,
 * scheduler calendar/time, success butterflies, floater parallax) runs
 * imperatively in the effect below, scoped to this component's root so it
 * never touches the rest of the React tree. Styles live in `src/hero-app.css`.
 */
export default function HeroApp() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const $ = (s) => root.querySelector(s)
    const $$ = (s) => [...root.querySelectorAll(s)]
    const cleanups = []
    const on = (el, ev, fn, opts) => {
      if (!el) return
      el.addEventListener(ev, fn, opts)
      cleanups.push(() => el.removeEventListener(ev, fn, opts))
    }

    /* markup twin of <UserGlyph /> for imperatively-built comments */
    const USER_GLYPH =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'

    /* ============================== TABS ============================== */
    const demoTabs = $$('.demo-tab')
    const panels = { board: $('#panel-board'), review: $('#panel-review'), schedule: $('#panel-schedule') }
    demoTabs.forEach((tab) =>
      on(tab, 'click', () => {
        demoTabs.forEach((t) => {
          t.classList.toggle('active', t === tab)
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false')
        })
        Object.entries(panels).forEach(([k, p]) => p.classList.toggle('active', k === tab.dataset.panel))
        if (tab.dataset.panel !== 'review') pauseVideo()
      })
    )
    const activateTab = (name) => {
      const tab = demoTabs.find((t) => t.dataset.panel === name)
      if (tab) tab.click()
    }

    /* ============================== BOARD ============================== */
    const ytInput = $('#ytInput')
    const ytAddBtn = $('#ytAddBtn')
    const ytError = $('#ytError')
    const boardList = $('#boardList')
    const queueCount = $('#queueCount')
    const YT_RE = /(youtube\.com\/(watch|shorts|live)|youtu\.be\/|loom\.com\/share)/i
    const FALLBACK_TITLE = 'Your video'
    const timers = []

    /* pull the 11-char video id out of any YouTube URL shape */
    const ytIdOf = (url) => {
      const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/|embed\/)|youtu\.be\/)([\w-]{6,})/i)
      return m ? m[1] : null
    }
    /* public oEmbed endpoint — no API key, returns { title, thumbnail_url } */
    const oembedUrl = (url) =>
      /loom\.com/i.test(url)
        ? `https://www.loom.com/v1/oembed?url=${encodeURIComponent(url)}`
        : `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`

    /* Prefer the crisp maxres cover (derived from the id), stepping down to
       hqdefault and finally the oEmbed thumbnail if a size is missing. Images
       load cross-origin without CORS, so the real cover always shows. */
    function paintThumb(thumb, id, oembedThumb) {
      thumb.classList.remove('skeleton')
      const img = document.createElement('img')
      img.alt = ''
      const chain = []
      if (id) chain.push(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
      if (oembedThumb) chain.push(oembedThumb)
      chain.push(`${A}/maxresdefault.jpg`)
      let i = 0
      img.onerror = () => {
        i += 1
        if (i < chain.length) img.src = chain[i]
        else img.onerror = null
      }
      img.src = chain[0]
      thumb.innerHTML = ''
      thumb.appendChild(img)
    }

    function addTask() {
      const v = ytInput.value.trim()
      if (!v || !YT_RE.test(v)) {
        ytError.classList.add('show')
        ytInput.focus()
        return
      }
      ytError.classList.remove('show')
      ytInput.value = ''
      const card = document.createElement('div')
      card.className = 'board-card'
      card.innerHTML = `
        <div class="board-thumb skeleton"></div>
        <div class="board-meta">
          <p class="board-title">Fetching video…</p>
          <div class="board-chips"><span class="chip chip-live"><i></i>Just uploaded</span></div>
        </div>`
      boardList.prepend(card)
      queueCount.textContent = boardList.children.length

      const id = ytIdOf(v)
      /* fetch the real title + cover, but hold the skeleton for a beat so the
         "Just uploaded" state is visible; on any failure we still paint a
         cover + generic title so the card never dead-ends */
      Promise.all([
        fetch(oembedUrl(v)).then((r) => (r.ok ? r.json() : Promise.reject())),
        new Promise((res) => timers.push(setTimeout(res, 800))),
      ])
        .then(([data]) => {
          if (!card.isConnected) return
          paintThumb(card.querySelector('.board-thumb'), id, data.thumbnail_url)
          card.querySelector('.board-title').textContent = data.title || FALLBACK_TITLE
          card.querySelector('.board-chips').innerHTML =
            '<span class="chip chip-live"><i></i>Finding moments</span>'
        })
        .catch(() => {
          if (!card.isConnected) return
          paintThumb(card.querySelector('.board-thumb'), id, null)
          card.querySelector('.board-title').textContent = FALLBACK_TITLE
          card.querySelector('.board-chips').innerHTML =
            '<span class="chip chip-live"><i></i>Finding moments</span>'
        })

      timers.push(
        setTimeout(() => {
          const chips = card.querySelector('.board-chips')
          if (chips)
            chips.insertAdjacentHTML(
              'beforeend',
              `<span class="chip chip-editor"><span class="chip-face"><img src="${A}/Alex.png" alt=""></span>Alex is on it</span>`
            )
        }, 3200)
      )
    }
    on(ytAddBtn, 'click', addTask)
    on(ytInput, 'keydown', (e) => {
      if (e.key === 'Enter') addTask()
    })
    on(ytInput, 'input', () => ytError.classList.remove('show'))
    $$('.ready-row').forEach((row) =>
      on(row, 'click', () => {
        activateTab('review')
        loadClip(+row.dataset.clip)
      })
    )

    /* ============================== PLAYER ============================== */
    const video = $('#demoVideo')
    const frame = $('#playerFrame')
    const bigPlay = $('#bigPlay')
    const playToggle = $('#playToggle')
    const icPlay = playToggle.querySelector('.ic-play')
    const icPause = playToggle.querySelector('.ic-pause')
    const timeCur = $('#timeCur')
    const timeDur = $('#timeDur')
    const track = $('#playerTrack')
    const fill = $('#trackFill')
    const dot = $('#trackDot')
    const muteBtn = $('#muteBtn')
    const commentStamp = $('#commentStamp')
    const CLIPS = [
      { src: `${A}/clip1.mp4`, poster: `${A}/post-video-poster.jpg` },
      { src: `${A}/clip2.mp4`, poster: `${A}/clip2-poster.png` },
      { src: `${A}/clip3.mp4`, poster: `${A}/clip3-poster.png` },
    ]
    let clipIdx = 0
    const fmt = (s) => {
      s = Math.max(0, Math.floor(s || 0))
      return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')
    }
    function playVideo() {
      video.play().catch(() => {})
    }
    function pauseVideo() {
      video.pause()
    }
    function syncPlayState() {
      const playing = !video.paused && !video.ended
      frame.classList.toggle('playing', playing)
      icPlay.style.display = playing ? 'none' : ''
      icPause.style.display = playing ? '' : 'none'
    }
    on(video, 'play', syncPlayState)
    on(video, 'pause', syncPlayState)
    on(video, 'ended', syncPlayState)
    on(bigPlay, 'click', playVideo)
    const togglePlay = () => (video.paused ? playVideo() : pauseVideo())
    on(frame, 'click', (e) => {
      if (e.target === video) togglePlay()
    })
    on(playToggle, 'click', togglePlay)
    on(video, 'loadedmetadata', () => {
      timeDur.textContent = fmt(video.duration)
    })
    on(video, 'timeupdate', () => {
      const p = video.duration ? (video.currentTime / video.duration) * 100 : 0
      fill.style.width = p + '%'
      dot.style.left = p + '%'
      timeCur.textContent = fmt(video.currentTime)
      commentStamp.textContent = fmt(video.currentTime)
    })
    function seekFromEvent(e) {
      const r = track.getBoundingClientRect()
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left
      const p = Math.min(1, Math.max(0, x / r.width))
      if (video.duration) video.currentTime = p * video.duration
    }
    let scrubbing = false
    on(track, 'pointerdown', (e) => {
      scrubbing = true
      track.setPointerCapture(e.pointerId)
      seekFromEvent(e)
    })
    on(track, 'pointermove', (e) => {
      if (scrubbing) seekFromEvent(e)
    })
    on(track, 'pointerup', () => {
      scrubbing = false
    })
    on(muteBtn, 'click', () => {
      video.muted = !video.muted
      muteBtn.style.opacity = video.muted ? 0.45 : 1
    })
    /* approve / request changes — one flag per clip, so approving one clip
       never touches the others; Request Changes clears it back to pending. */
    const approveBtn = $('#approveBtn')
    const approved = [false, false, false]
    const CHECK_SVG =
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    function renderApprove() {
      const done = approved[clipIdx]
      approveBtn.classList.toggle('approved', done)
      approveBtn.innerHTML = `${CHECK_SVG} ${done ? 'Approved' : 'Approve'}`
    }

    /* comments — each clip owns its own thread; the three seed notes are split
       one per clip. `who` picks the reviewer avatar; a user reply uses the
       fallback glyph. */
    const commentsList = $('#commentsList')
    const commentForm = $('#commentForm')
    const commentInput = $('#commentInput')
    const CLIP_COMMENTS = [
      [{ who: 'John', ago: '1d ago', t: 12, html: 'Amazing clip! Can’t wait to publish it' }],
      [{ who: 'John', ago: '1d ago', t: 7, html: 'Let’s change the soundtrack' }],
      [{ who: 'John', ago: '1d ago', t: 20, html: 'Cut this part <a class="mention">@Alex</a>' }],
    ]
    const commentMarkup = (c) => {
      const face =
        c.who === 'You'
          ? `<span class="comment-face avatar-fallback">${USER_GLYPH}</span>`
          : `<span class="comment-face"><img src="${avatarJohn}" alt=""></span>`
      return `${face}<div class="comment-body"><p class="comment-head">${c.who} <time>${c.ago}</time></p><p class="comment-text"><button class="tc" data-t="${c.t}" type="button">${fmt(c.t)}</button> ${c.html}</p></div>`
    }
    function renderComments() {
      commentsList.innerHTML = ''
      CLIP_COMMENTS[clipIdx].forEach((c) => {
        const el = document.createElement('div')
        el.className = 'comment'
        el.innerHTML = commentMarkup(c)
        commentsList.appendChild(el)
      })
      commentsList.scrollTop = commentsList.scrollHeight
    }

    function loadClip(i) {
      clipIdx = (i + CLIPS.length) % CLIPS.length
      const c = CLIPS[clipIdx]
      const wasPlaying = !video.paused
      video.src = c.src
      video.poster = c.poster
      video.load()
      fill.style.width = '0%'
      dot.style.left = '0%'
      timeCur.textContent = '0:00'
      $('#clipLabel').textContent = `Clip ${clipIdx + 1} of 3`
      const preview = $('.sched-preview img')
      if (preview) preview.src = c.poster
      renderApprove()
      renderComments()
      if (wasPlaying) playVideo()
      else syncPlayState()
    }
    on($('#clipPrev'), 'click', () => loadClip(clipIdx - 1))
    on($('#clipNext'), 'click', () => loadClip(clipIdx + 1))

    on(approveBtn, 'click', () => {
      approved[clipIdx] = !approved[clipIdx]
      renderApprove()
    })
    on($('#requestBtn'), 'click', () => {
      approved[clipIdx] = false
      renderApprove()
      commentInput.focus()
    })
    renderApprove()
    renderComments()

    const seekFromTimecode = (e) => {
      const tc = e.target.closest('.tc[data-t]')
      if (!tc) return
      video.currentTime = +tc.dataset.t
      playVideo()
    }
    on(commentsList, 'click', seekFromTimecode)
    on(commentStamp, 'click', () => playVideo())
    /* escape text the user typed so it renders as text, never markup */
    const escapeHtml = (s) =>
      s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch])
    on(commentForm, 'submit', (e) => {
      e.preventDefault()
      const text = commentInput.value.trim()
      if (!text) {
        commentInput.focus()
        return
      }
      const t = Math.floor(video.currentTime || 0)
      /* store on this clip's thread, then re-render — so it persists when you
         switch clips and come back */
      CLIP_COMMENTS[clipIdx].push({ who: 'You', ago: 'just now', t, html: escapeHtml(text) })
      renderComments()
      commentInput.value = ''
    })

    /* ============================== SCHEDULER ============================== */
    const platforms = $$('#schedPlatforms .platform')
    platforms.forEach((p) =>
      on(p, 'click', () => {
        platforms.forEach((x) => {
          x.classList.toggle('active', x === p)
          x.setAttribute('aria-pressed', x === p ? 'true' : 'false')
        })
      })
    )

    /* calendar */
    const dateField = $('#dateField')
    const dateLabel = $('#dateLabel')
    const calendar = $('#calendar')
    const calTitle = $('#calTitle')
    const calGrid = $('#calGrid')
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const DAYS_FMT = { weekday: 'short', month: 'short', day: 'numeric' }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let viewY = today.getFullYear()
    let viewM = today.getMonth()
    /* the field opens empty ("Pick a date") until the user chooses a day */
    let selDate = null
    function renderCal() {
      calTitle.textContent = `${MONTHS[viewM]} ${viewY}`
      calGrid.innerHTML = ''
      const first = new Date(viewY, viewM, 1)
      const startOffset = (first.getDay() + 6) % 7
      const start = new Date(viewY, viewM, 1 - startOffset)
      for (let i = 0; i < 42; i++) {
        const d = new Date(start)
        d.setDate(start.getDate() + i)
        const b = document.createElement('button')
        b.type = 'button'
        b.className = 'cal-day'
        b.textContent = d.getDate()
        if (d.getMonth() !== viewM) b.classList.add('other')
        if (d < today) b.classList.add('past')
        if (d.getTime() === today.getTime()) b.classList.add('today')
        if (selDate && d.getTime() === selDate.getTime()) b.classList.add('selected')
        b.addEventListener('click', () => {
          selDate = d
          dateLabel.textContent = d.toLocaleDateString('en-US', DAYS_FMT)
          dateField.classList.add('filled')
          calendar.hidden = true
          syncPopoverState()
          renderCal()
        })
        calGrid.appendChild(b)
      }
    }
    renderCal()
    on($('#calPrev'), 'click', () => {
      viewM--
      if (viewM < 0) {
        viewM = 11
        viewY--
      }
      renderCal()
    })
    on($('#calNext'), 'click', () => {
      viewM++
      if (viewM > 11) {
        viewM = 0
        viewY++
      }
      renderCal()
    })
    /* keeps the window's overflow open only while a popover is showing */
    const syncPopoverState = () =>
      root.classList.toggle('popover-open', !calendar.hidden || !timeList.hidden)
    on(dateField, 'click', () => {
      calendar.hidden = !calendar.hidden
      timeList.hidden = true
      syncPopoverState()
    })

    /* time */
    const timeField = $('#timeField')
    const timeLabel = $('#timeLabel')
    const timeList = $('#timeList')
    let selTime = '09:00'
    for (let h = 6; h <= 22; h++) {
      for (const m of ['00', '30']) {
        const t = String(h).padStart(2, '0') + ':' + m
        const b = document.createElement('button')
        b.type = 'button'
        b.textContent = t
        if (t === selTime) b.classList.add('selected')
        b.addEventListener('click', () => {
          selTime = t
          timeLabel.textContent = t
          timeField.classList.add('filled')
          Array.from(timeList.querySelectorAll('.selected')).forEach((x) => x.classList.remove('selected'))
          b.classList.add('selected')
          timeList.hidden = true
          syncPopoverState()
        })
        timeList.appendChild(b)
      }
    }
    const demoWindow = $('#demoWindow')
    on(timeField, 'click', () => {
      timeList.hidden = !timeList.hidden
      calendar.hidden = true
      syncPopoverState()
      if (timeList.hidden) return
      /* Opens downward and stops short of the window's bottom edge. Only when
         there is genuinely no room below (stacked mobile layout) does it flip up. */
      const win = demoWindow.getBoundingClientRect()
      const field = timeField.getBoundingClientRect()
      const below = win.bottom - field.bottom - 24
      const above = field.top - win.top - 24
      const flipUp = below < 96 && above > below
      timeList.classList.toggle('up', flipUp)
      timeList.style.maxHeight = `${Math.max(96, Math.min(200, flipUp ? above : below))}px`
      /* scroll the list itself — scrollIntoView() would also scroll the page
         and make the whole app jump under the cursor */
      const sel = timeList.querySelector('.selected')
      if (sel) timeList.scrollTop = sel.offsetTop - (timeList.clientHeight - sel.offsetHeight) / 2
    })
    const onDocPointer = (e) => {
      if (!root.contains(e.target)) {
        calendar.hidden = true
        timeList.hidden = true
        syncPopoverState()
        return
      }
      if (!e.target.closest('.sched-datewrap')) calendar.hidden = true
      if (!e.target.closest('.sched-timewrap')) timeList.hidden = true
      syncPopoverState()
    }
    document.addEventListener('pointerdown', onDocPointer)
    cleanups.push(() => document.removeEventListener('pointerdown', onDocPointer))

    /* schedule submit */
    const schedBtn = $('#schedBtn')
    const schedSuccess = $('#schedSuccess')
    const schedSummary = $('#schedSummary')
    const schedTitle = $('#schedTitle')
    on(schedBtn, 'click', () => {
      if (!selDate) {
        calendar.hidden = false
        dateField.style.borderColor = 'var(--accent)'
        timers.push(setTimeout(() => (dateField.style.borderColor = ''), 1200))
        return
      }
      const platform = $('#schedPlatforms .platform.active').dataset.name
      const dateStr = selDate.toLocaleDateString('en-US', DAYS_FMT)
      const title = schedTitle.value.trim()
      schedSummary.textContent = `${platform} · ${dateStr} · ${selTime}` + (title ? ` — “${title}”` : '')
      calendar.hidden = true
      timeList.hidden = true
      syncPopoverState()
      schedSuccess.hidden = false
    })
    on($('#schedReset'), 'click', () => {
      schedSuccess.hidden = true
    })

    /* ============================== FLOATER PARALLAX ============================== */
    const stage = $('.demo-stage')
    const fSlack = $('#floaterSlack')
    if (matchMedia('(pointer: fine)').matches && stage && fSlack) {
      on(stage, 'mousemove', (e) => {
        const r = stage.getBoundingClientRect()
        const dx = (e.clientX - r.left) / r.width - 0.5
        const dy = (e.clientY - r.top) / r.height - 0.5
        fSlack.style.translate = `${dx * -14}px ${dy * -10}px`
      })
    }

    return () => {
      cleanups.forEach((fn) => fn())
      timers.forEach((t) => clearTimeout(t))
    }
  }, [])

  return (
    <div className="hero-app" ref={rootRef}>
      <div className="demo-stage">
        <div className="demo-hint" aria-hidden="true">
          <span className="demo-hint-text">try it — it’s clickable</span>
          <svg className="demo-hint-arrow" width="46" height="38" viewBox="0 0 46 38" fill="none">
            <path d="M3 3C10 22 24 30 41 31" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M34 25.5L41.5 31L33.5 34.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="glass glass-demo">
          <div className="demo-window" id="demoWindow">
            <div className="demo-topbar">
              <div className="demo-brand">
                <img className="logo-img logo-img-sm" src={logoUrl} alt="Clipwing" />
              </div>
              <div className="demo-tabs" role="tablist" aria-label="Demo screens">
                <button className="demo-tab active" data-panel="board" role="tab" aria-selected="true" type="button">Clip board</button>
                <button className="demo-tab" data-panel="review" role="tab" aria-selected="false" type="button">Review <span className="demo-tab-badge">3</span></button>
                <button className="demo-tab" data-panel="schedule" role="tab" aria-selected="false" type="button">Scheduler</button>
              </div>
              <div className="demo-top-right">
                <span className="demo-bell">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <i></i>
                </span>
                <span className="demo-avatar avatar-fallback" aria-label="Your account"><UserGlyph /></span>
              </div>
            </div>

            {/* BOARD */}
            <div className="demo-panel active" id="panel-board">
              <div className="board-add">
                <label className="demo-label" htmlFor="ytInput">Video link</label>
                <div className="board-add-row">
                  <input id="ytInput" className="demo-input" type="text" placeholder="https://youtube.com/watch?v=…" autoComplete="off" spellCheck="false" />
                  <button className="btn btn-primary demo-add-btn" id="ytAddBtn" type="button">Add</button>
                </div>
                <p className="board-error" id="ytError">Paste a YouTube or Loom link — e.g. youtube.com/watch?v=…</p>
                <p className="demo-label board-group">Queued <span className="board-count" id="queueCount">1</span></p>
                <div className="board-list" id="boardList">
                  <div className="board-card">
                    {/* maxres, not hqdefault: hqdefault is a 4:3 letterbox and
                        crops badly once the thumbnail goes full-bleed */}
                    <div className="board-thumb"><img src={`${A}/thumbnail.png`} alt="" /></div>
                    <div className="board-meta">
                      <p className="board-title">What I learned coming back to Twitter after years of absence</p>
                      <div className="board-chips">
                        <span className="chip chip-live"><i></i>Clips Review</span>
                        <span className="chip chip-editor"><span className="chip-face"><img src={`${A}/Alex.png`} alt="" /></span>Alex is on it</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="board-queue">
                <p className="demo-label board-group">Ready for review <span className="board-count">3</span></p>
                <div className="board-ready">
                  <button className="ready-row" type="button" data-goto="review" data-clip="0">
                    <img src={`${A}/post-video-poster.jpg`} alt="" />
                    <span className="ready-name">Clip 1</span>
                    <span className="chip">0:41</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button className="ready-row" type="button" data-goto="review" data-clip="1">
                    <img src={`${A}/clip2-poster.png`} alt="" />
                    <span className="ready-name">Clip 2</span>
                    <span className="chip">0:32</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button className="ready-row" type="button" data-goto="review" data-clip="2">
                    <img src={`${A}/clip3-poster.png`} alt="" />
                    <span className="ready-name">Clip 3</span>
                    <span className="chip">0:30</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* REVIEW */}
            <div className="demo-panel" id="panel-review">
              <div className="review-grid">
                <div className="review-player">
                  <div className="review-player-top">
                    <div className="review-clipnav">
                      <button className="icon-btn" id="clipPrev" type="button" aria-label="Previous clip"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                      <span id="clipLabel">Clip 1 of 3</span>
                      <button className="icon-btn" id="clipNext" type="button" aria-label="Next clip"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                    </div>
                    <div className="review-actions">
                      <button className="btn btn-outline" id="requestBtn" type="button">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Request Changes
                      </button>
                      <button className="btn btn-primary" id="approveBtn" type="button">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Approve
                      </button>
                    </div>
                  </div>
                  <div className="player-frame" id="playerFrame">
                    <video id="demoVideo" src={`${A}/clip1.mp4`} poster={`${A}/post-video-poster.jpg`} playsInline preload="metadata"></video>
                    <button className="player-bigplay" id="bigPlay" type="button" aria-label="Play">
                      <svg className="ic-tri" width="24" height="27" viewBox="9.4 3.5 13.8 17" fill="currentColor" aria-hidden="true"><path d="M10 6.15c0-1.53 1.66-2.48 2.98-1.7l8.3 4.9c1.3.77 1.3 2.66 0 3.43l-8.3 4.9c-1.32.78-2.98-.17-2.98-1.7V6.15z" /></svg>
                    </button>
                  </div>
                  <div className="player-controls">
                    <button className="icon-btn" id="playToggle" type="button" aria-label="Play / pause">
                      <svg className="ic-play" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5z" /></svg>
                      <svg className="ic-pause" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'none' }}><path d="M7 5h3.4v14H7zM13.6 5H17v14h-3.6z" /></svg>
                    </button>
                    <span className="player-time" id="timeCur">0:00</span>
                    <div className="player-track" id="playerTrack"><div className="player-track-fill" id="trackFill"></div><div className="player-track-dot" id="trackDot"></div></div>
                    <span className="player-time" id="timeDur">0:10</span>
                    <button className="icon-btn" id="muteBtn" type="button" aria-label="Mute">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 010 7M18.4 5.6a9 9 0 010 12.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span className="player-speed">1x</span>
                  </div>
                </div>
                <div className="review-side">
                  <div className="review-side-tabs">
                    <span className="side-tab active">Comments</span>
                  </div>
                  {/* comments are rendered per-clip by the effect */}
                  <div className="comments" id="commentsList"></div>
                  <form className="comment-form" id="commentForm">
                    <button className="tc tc-live" id="commentStamp" type="button" title="Jump to time">0:00</button>
                    <input className="demo-input comment-input" id="commentInput" type="text" placeholder="Leave your comment…" autoComplete="off" />
                    <button className="btn btn-primary comment-send" type="submit" aria-label="Send comment">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                        <path d="M6 12h16" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* SCHEDULER */}
            <div className="demo-panel" id="panel-schedule">
              <div className="sched-grid">
                <div className="sched-preview">
                  <img src={`${A}/post-video-poster.jpg`} alt="" />
                  <span className="sched-preview-badge">Approved ✓</span>
                </div>
                <div className="sched-form">
                  <p className="demo-label">Platform</p>
                  <div className="sched-platforms" id="schedPlatforms">
                    <button className="platform active" data-name="YouTube" type="button" aria-pressed="true">
                      <svg width="19" height="19" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z" /><path fill="#fff" d="M9.6 15.6V8.4l6.2 3.6-6.2 3.6z" /></svg>
                      YouTube
                    </button>
                    <button className="platform" data-name="TikTok" type="button" aria-pressed="false">
                      {/* current TikTok mark — cyan/red offsets under the black note */}
                      <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                        <path d={TIKTOK_NOTE} fill="#25F4EE" transform="translate(-1.1 -0.7)" />
                        <path d={TIKTOK_NOTE} fill="#FE2C55" transform="translate(1.1 0.7)" />
                        <path d={TIKTOK_NOTE} fill="#000000" />
                      </svg>
                      TikTok
                    </button>
                  </div>
                  <label className="demo-label" htmlFor="schedTitle">Title</label>
                  <input className="demo-input" id="schedTitle" type="text" placeholder="Add a title" autoComplete="off" />
                  <p className="demo-label">Date &amp; time</p>
                  <div className="sched-when">
                    <div className="sched-datewrap">
                      <button className="demo-input sched-field" id="dateField" type="button">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" /><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                        <span id="dateLabel">Pick a date</span>
                      </button>
                      <div className="calendar" id="calendar" hidden>
                        <div className="cal-head">
                          <button className="icon-btn" id="calPrev" type="button" aria-label="Previous month"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                          <span id="calTitle">July 2026</span>
                          <button className="icon-btn" id="calNext" type="button" aria-label="Next month"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                        </div>
                        <div className="cal-week"><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span></div>
                        <div className="cal-grid" id="calGrid"></div>
                      </div>
                    </div>
                    <div className="sched-timewrap">
                      <button className="demo-input sched-field" id="timeField" type="button">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                        <span id="timeLabel">09:00</span>
                      </button>
                      <div className="timelist" id="timeList" hidden></div>
                    </div>
                  </div>
                  <button className="btn btn-primary sched-submit" id="schedBtn" type="button">Schedule clip</button>
                </div>
                <div className="sched-success" id="schedSuccess" hidden>
                  <p className="sched-success-title">Scheduled!</p>
                  <p className="sched-success-sub" id="schedSummary">YouTube · Wed, Jul 29 · 09:00</p>
                  <button className="btn btn-outline btn-sm" id="schedReset" type="button">Schedule another</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* floaters */}
        <div className="floater floater-slack" id="floaterSlack" aria-hidden="true">
          <svg className="slack-ic" width="30" height="30" viewBox="0 0 122.8 122.8"><path d="M25.8 77.6a12.9 12.9 0 11-12.9-12.9h12.9zm6.5 0a12.9 12.9 0 0125.8 0v32.3a12.9 12.9 0 01-25.8 0z" fill="#e01e5a" /><path d="M45.2 25.8a12.9 12.9 0 1112.9-12.9v12.9zm0 6.5a12.9 12.9 0 010 25.8H12.9a12.9 12.9 0 010-25.8z" fill="#36c5f0" /><path d="M97 45.2a12.9 12.9 0 1112.9 12.9H97zm-6.5 0a12.9 12.9 0 01-25.8 0V12.9a12.9 12.9 0 0125.8 0z" fill="#2eb67d" /><path d="M77.6 97a12.9 12.9 0 11-12.9 12.9V97zm0-6.5a12.9 12.9 0 010-25.8h32.3a12.9 12.9 0 010 25.8z" fill="#ecb22e" /></svg>
          <div><p className="floater-title">Clipwing</p><p className="floater-sub">Your clips are ready for review</p></div>
          <span className="floater-time">now</span>
        </div>
      </div>
    </div>
  )
}
