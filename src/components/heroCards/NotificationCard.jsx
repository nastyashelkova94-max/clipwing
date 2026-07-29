import { Card } from '@/components/ui/card'
import notifIcon from '../../assets/images/hero-collage/parts/notif-icon.png'

export const NATIVE_W = 472
export const NATIVE_H = 146

export default function NotificationCard() {
  return (
    <div className="relative text-left" style={{ width: NATIVE_W, height: NATIVE_H }}>
      <div className="absolute left-0 top-[2px] h-[143px] w-[471px] overflow-hidden rounded-[36px] border border-slate-100 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
        <div aria-hidden className="absolute inset-0 rounded-[36px] bg-white/20" />
        <Card className="absolute left-[13px] top-[13px] h-[116px] w-[444px] flex-row items-center gap-[16px] overflow-hidden rounded-[22px] border-0 bg-white px-[26px] py-0 shadow-none">
          <img src={notifIcon} alt="" className="size-[64px] shrink-0 object-contain" />
          <div className="flex flex-col gap-[4px]">
            <p className="text-[24px] font-semibold text-black">Clipwing</p>
            <p className="w-[272px] text-[19px] text-black">Your clips are ready for review</p>
          </div>
        </Card>
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_9px_0_rgba(255,255,255,0.25)]" />
      </div>
    </div>
  )
}
