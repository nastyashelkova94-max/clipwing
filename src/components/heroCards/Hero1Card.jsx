import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SendHorizontal,
  Pen,
  Check,
  Play,
  Pause,
  Volume1,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import clipwingLogo from '../../assets/images/hero-collage/parts/clipwing-logo.svg'
import avatar1 from '../../assets/images/hero-collage/parts/avatar-1.png'
import avatar2 from '../../assets/images/hero-collage/parts/avatar-2.png'

const CLIP_SRC = '/clip-1.mov'

const initialComments = [
  { id: 1, avatar: avatar1, author: 'John', time: '1d ago', badge: '0:03', reply: '1 Reply', text: (<>{'Add zoom here '}<span className="text-indigo-500">@Alex</span></>) },
  { id: 2, avatar: avatar2, author: 'John', time: '1d ago', badge: '0:05', reply: 'Reply', text: 'Love this animation!' },
  { id: 3, avatar: avatar2, author: 'John', time: '1d ago', badge: '0:07', reply: 'Reply', text: "Let's add CTA screen here" },
]

export const NATIVE_W = 1638
export const NATIVE_H = 966

function formatTime(sec) {
  if (!Number.isFinite(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function Hero1Card() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [comments, setComments] = useState(initialComments)
  const [draft, setDraft] = useState('')

  const progress = duration ? current / duration : 0

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => setCurrent(v.currentTime)
    const onMeta = () => setDuration(v.duration)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }

  function seek(e) {
    const v = videoRef.current
    if (!v || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    v.currentTime = ratio * duration
    setCurrent(v.currentTime)
  }

  function submitComment() {
    const text = draft.trim()
    if (!text) return
    setComments((prev) => [...prev, { id: Date.now(), avatar: null, author: 'You', time: 'now', badge: '0:05', reply: 'Reply', text }])
    setDraft('')
  }

  return (
    <div className="relative text-left" style={{ width: NATIVE_W, height: NATIVE_H }}>
      <div className="absolute left-0 top-[2px] h-[963px] w-[1638px] rounded-[42px] border border-slate-100 pointer-events-none shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
        <div aria-hidden className="absolute inset-0 rounded-[42px] bg-white/20" />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_9px_0_rgba(255,255,255,0.25)]" />
      </div>

      <div className="absolute left-1/2 top-1/2 h-[936px] w-[1610px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] bg-slate-100">
        {/* Header */}
        <div className="flex h-[78px] w-full items-center gap-[11px] border-b border-slate-100 bg-white px-[22px]">
          <img src={clipwingLogo} alt="Clipwing" className="h-[33px] w-auto" />
          <div className="flex items-center gap-[6px] text-slate-500">
            <span className="text-[21px]">|</span>
            <span className="text-[21px]">Projects</span>
            <span className="text-[21px]">/</span>
            <span className="text-[21px]">My First Project</span>
            <span className="text-[21px]">/</span>
            <span className="w-[544px] text-[21px] text-black">I Built a Startup to Reverse Aging</span>
          </div>
          <div className="h-[44px] flex-1" />
          <Bell className="size-[22px] shrink-0 text-black" />
        </div>

        {/* Right column: comments panel (shadcn Tabs) */}
        <div className="absolute left-[896px] top-[100px] h-[813px] w-[693px] rounded-[11px] bg-white">
          <Tabs defaultValue="comments" className="gap-0">
            <TabsList style={{ height: 52 }} className="mx-[22px] mt-[22px] w-[648px] items-stretch p-[6px]">
              <TabsTrigger
                value="comments"
                className="h-full flex-1 text-[21px]"
              >
                Comments
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="h-full flex-1 text-[21px]"
              >
                Transcript
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comments" className="mx-[22px] mt-[22px] flex flex-col gap-[16px]">
              {comments.map((c) => (
                <div key={c.id} className="relative overflow-hidden rounded-[11px] border border-slate-100 bg-slate-100 px-[10px] py-[10px]">
                  <div className="flex items-center gap-[11px]">
                    {c.avatar ? (
                      <img src={c.avatar} alt="" className="size-[33px] shrink-0 rounded-full" />
                    ) : (
                      <Avatar className="size-[33px] shrink-0">
                        <AvatarFallback className="bg-slate-200 text-slate-500">
                          <User className="size-[18px]" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <span className="text-[21px] font-medium text-black">{c.author}</span>
                    <span className="text-[18px] font-medium text-slate-500">{c.time}</span>
                  </div>
                  <div className="mt-[10px] flex items-start gap-[11px] pl-[44px]">
                    <span className="shrink-0 rounded-[6px] bg-indigo-200 px-[11px] py-[2px] text-[21px] text-indigo-700">{c.badge}</span>
                    <p className="text-[21px] text-black">{c.text}</p>
                  </div>
                  {c.reply && (
                    <div className="mt-[8px] flex items-center gap-[4px] pl-[44px] text-[18px] text-black">
                      <span>{c.reply}</span>
                      {c.reply.startsWith('1') && <ChevronDown className="size-[16px]" />}
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="transcript" className="mx-[22px] mt-[22px] text-[21px] text-slate-500">
              Transcript will appear here.
            </TabsContent>
          </Tabs>
        </div>

        {/* Comment input (shadcn Input + Button) */}
        <div className="absolute left-[918px] top-[824px] flex h-[52px] w-[648px] items-center gap-[10px] rounded-[11px] border border-slate-100 bg-slate-100 px-[10px]">
          <span className="shrink-0 rounded-[6px] bg-indigo-200 px-[11px] py-[6px] text-[21px] text-indigo-700">0:05</span>
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitComment()}
            placeholder="Leave your comment..."
            className="h-full flex-1 border-0 bg-transparent px-0 text-[21px] text-black shadow-none placeholder:text-slate-500 focus-visible:ring-0 md:text-[21px]"
          />
          <Button
            type="button"
            onClick={submitComment}
            className="size-[44px] shrink-0 rounded-[8px]"
            aria-label="Send comment"
          >
            <SendHorizontal className="size-[22px]" />
          </Button>
        </div>

        {/* Video player */}
        <div className="absolute left-[22px] top-[100px] h-[813px] w-[851px] overflow-hidden rounded-[11px] bg-white">
          <div className="absolute left-1/2 top-[22px] flex h-[56px] w-[225px] -translate-x-[calc(50%+272px)] items-center gap-[11px]">
            <Button type="button" variant="outline" size="icon" className="size-[56px] rounded-[8px]" aria-label="Previous clip">
              <ChevronLeft className="size-[22px] text-black" />
            </Button>
            <span className="whitespace-nowrap text-[21px] text-black">Clip 1 of 3</span>
            <Button type="button" variant="outline" size="icon" className="size-[56px] rounded-[8px]" aria-label="Next clip">
              <ChevronRight className="size-[22px] text-black" />
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            className="absolute left-[412px] top-[22px] h-[56px] w-[246px] gap-[14px] rounded-[8px] text-[21px] font-medium text-black"
          >
            <Pen className="size-[22px] text-black" />
            Request Changes
          </Button>

          <Button
            type="button"
            className="absolute left-[669px] top-[22px] h-[56px] w-[160px] gap-[14px] rounded-[8px] text-[21px] font-medium"
          >
            <Check className="size-[22px]" />
            Approve
          </Button>

          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            role="button"
            tabIndex={0}
            onClick={togglePlay}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && togglePlay()}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="absolute left-[25px] top-[100px] h-[676px] w-[804px] cursor-pointer overflow-hidden bg-[#fefefe]"
          >
            <video
              ref={videoRef}
              src={CLIP_SRC}
              playsInline
              preload="metadata"
              className="absolute left-[208px] top-0 h-[623px] w-[387px] object-cover"
            />
            {!isPlaying && (
              <span className="absolute left-[360px] top-[296px] flex size-[85px] items-center justify-center rounded-full bg-white/92 shadow-[0_6px_36px_0_rgba(0,0,0,0.25)]">
                <Play className="size-[31px] translate-x-[2px] fill-black text-black" />
              </span>
            )}
          </div>

          <div className="absolute left-[23px] top-[734px] h-[57px] w-[804px]">
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              onClick={seek}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(current)}
              tabIndex={0}
              className="absolute left-0 top-[8px] h-[6px] w-[793px] cursor-pointer"
            >
              <div className="relative h-full w-full rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-slate-900" style={{ width: `${progress * 100}%` }} />
                <div
                  className="absolute top-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white shadow"
                  style={{ left: `${progress * 100}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={togglePlay}
              className="absolute left-0 top-[24px] flex size-[28px] items-center justify-center text-foreground"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="size-[22px] fill-current" /> : <Play className="size-[20px] fill-current" />}
            </button>
            <span className="absolute left-[33px] top-[22px] text-[21px] text-foreground">{formatTime(current)}</span>
            <span className="absolute left-[679px] top-[24px] text-[21px] text-foreground">{formatTime(duration)}</span>
            <span className="absolute left-[766px] top-[24px] text-[21px] text-foreground">1x</span>
            <Volume1 className="absolute left-[733px] top-[29px] h-[20px] w-[21px] text-foreground" />
          </div>
        </div>
      </div>
    </div>
  )
}
