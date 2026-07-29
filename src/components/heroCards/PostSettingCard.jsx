import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import youtubeIcon from '../../assets/icons/social-youtube.png'
import tiktokIcon from '../../assets/icons/social-tiktok.png'

export const NATIVE_W = 439
export const NATIVE_H = 487

const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, '0')
  const m = i % 2 === 0 ? '00' : '30'
  return `${h}:${m}`
})

export default function PostSettingCard() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date(2026, 4, 13))
  const [time, setTime] = useState('09:00')
  const [dateOpen, setDateOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)

  const fieldClass =
    'justify-start gap-[10px] rounded-[8px] border-slate-300 bg-white px-[20px] text-[20px] font-normal text-black shadow-none hover:bg-white'

  return (
    <div className="relative text-left" style={{ width: NATIVE_W, height: NATIVE_H }}>
      <div className="absolute left-0 top-0 h-[487px] w-[438px] rounded-[42px] border border-slate-100 pointer-events-none shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
        <div aria-hidden className="absolute inset-0 rounded-[42px] bg-white/20" />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_8px_0_rgba(255,255,255,0.25)]" />
      </div>

      <div className="absolute left-[14px] top-[14px] h-[459px] w-[411px] overflow-hidden rounded-[28px] bg-slate-50 px-[23px] pt-[24px]">
        <p className="text-[24px] font-semibold text-black">Post setting</p>

        <div className="mt-[22px] flex flex-col gap-[8px]">
          <p className="text-[19px] font-medium text-black">Platform</p>
          <div className="flex items-center gap-[12px]">
            <Button variant="outline" size="icon" className="size-[55px] rounded-[8px] border-slate-200 bg-white hover:bg-white" aria-label="YouTube">
              <img src={youtubeIcon} alt="" className="size-[26px] max-w-none object-contain" />
            </Button>
            <Button variant="outline" size="icon" className="size-[55px] rounded-[8px] border-slate-200 bg-white hover:bg-white" aria-label="TikTok">
              <img src={tiktokIcon} alt="" className="size-[26px] max-w-none object-contain" />
            </Button>
          </div>
        </div>

        <div className="mt-[22px] flex flex-col gap-[8px]">
          <Label htmlFor="post-title" className="text-[19px] font-medium text-black">Title</Label>
          <Input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a title"
            className="h-[52px] rounded-[8px] border-slate-300 bg-white px-[20px] text-[20px] text-black shadow-none placeholder:text-slate-500 md:text-[20px]"
          />
        </div>

        <div className="mt-[22px] flex flex-col gap-[8px]">
          <p className="text-[19px] font-medium text-black">Date</p>
          <div className="flex gap-[13px]">
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className={`h-[52px] w-[214px] ${fieldClass}`}>
                  <CalendarIcon className="size-[22px] shrink-0 text-black" />
                  {format(date, 'EEE, MMM d')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  defaultMonth={date}
                  onSelect={(d) => {
                    if (d) setDate(d)
                    setDateOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>

            <Popover open={timeOpen} onOpenChange={setTimeOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className={`h-[52px] w-[133px] ${fieldClass} gap-[8px]`}>
                  <Clock3 className="size-[22px] shrink-0 text-black" />
                  {time}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-h-[240px] w-[133px] overflow-auto p-1" align="start">
                <div className="flex flex-col">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setTime(t)
                        setTimeOpen(false)
                      }}
                      className={`rounded-[6px] px-3 py-1.5 text-left text-sm hover:bg-accent ${t === time ? 'bg-accent font-medium' : ''}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button className="mt-[24px] h-[55px] w-full justify-start rounded-[8px] px-[23px] text-[20px] font-medium">
          Schedule clip
        </Button>
      </div>
    </div>
  )
}
