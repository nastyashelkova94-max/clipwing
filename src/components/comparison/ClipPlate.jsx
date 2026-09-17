import { useCallback, useRef, useState } from 'react'

const PLATE = 'relative aspect-[9/16] w-full overflow-hidden bg-slate-900'

// A 9:16 clip that costs nothing until it is asked for: a poster frame and a
// play button, with the <video> mounted only on the first press. That is what
// keeps a page carrying ten vertical clips from pulling ~40 MB on load — there
// is no `preload="none"` cheaper than not having the element at all. Once
// mounted the clip carries native controls, so it can be paused, scrubbed and
// unmuted from the keyboard. Everything that would go in the ⋮ menu (download,
// speed, cast, picture-in-picture, full screen) is switched off, so on a clip
// this narrow Chrome shows the sound button in its place.
export default function ClipPlate({
  src,
  poster,
  alt,
  label,
  radius = 'rounded-[10px]',
  // The play mark is sized by its plate: a 48px button swallows a 56px still.
  playClassName = 'h-12 w-12',
  iconClassName = 'h-5 w-5',
}) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  // Started by the press on the poster, so it plays with sound. Should the
  // browser still refuse that, it plays muted rather than not at all. Stable,
  // so a re-render doesn't hand React a new ref and restart a paused clip.
  const attachVideo = useCallback((video) => {
    videoRef.current = video
    if (!video) return
    video.play().catch(() => {
      video.muted = true
      video.play().catch(() => {})
    })
  }, [])

  return (
    <div className={`${PLATE} ${radius}`}>
      {playing ? (
        <>
          <video
            ref={attachVideo}
            src={src}
            poster={poster}
            controls
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            disablePictureInPicture
            disableRemotePlayback
            loop
            playsInline
            preload="none"
            aria-label={label}
            className={`h-full w-full object-cover ${radius}`}
          />
          {/* A press anywhere on the picture pauses or resumes it. The strip
              along the bottom is left to the native controls, so the sound
              button and the scrubber still take their own presses. */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={`Play or pause clip: ${label}`}
            className="absolute inset-x-0 top-0 bottom-16 cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </>
      ) : (
        <>
          <img
            src={poster}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover ${radius}`}
          />
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play clip: ${label}`}
            className="group absolute inset-0 flex items-center justify-center outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <PlayMark playClassName={playClassName} iconClassName={iconClassName} />
          </button>
        </>
      )}
    </div>
  )
}

function PlayMark({ playClassName, iconClassName }) {
  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center rounded-full border border-white/60 bg-white/25 backdrop-blur-md transition-[transform,background-color] duration-200 group-hover:bg-white/40 group-focus-visible:bg-white/40 motion-safe:group-hover:scale-105 ${playClassName}`}
    >
      {/* No nudge: the triangle is drawn with its centroid on the 24×24 box
          centre (bbox 8→20, centroid 12), which is what optical centring in a
          circle asks for. Shifting it again pushed it off to the right. */}
      <svg viewBox="0 0 24 24" className={`block fill-white ${iconClassName}`}>
        <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
      </svg>
    </span>
  )
}
