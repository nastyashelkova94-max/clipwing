import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export const NATIVE_W = 528
export const NATIVE_H = 598

const fieldClass =
  'h-[52px] rounded-[8px] border-slate-300 bg-white px-[17px] text-[19px] text-black shadow-none placeholder:text-slate-500 md:text-[19px]'

export default function NewTaskCard() {
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="relative text-left" style={{ width: NATIVE_W, height: NATIVE_H }}>
      <div className="absolute left-0 top-0 h-[597px] w-[527px] rounded-[42px] border border-slate-100 pointer-events-none shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
        <div aria-hidden className="absolute inset-0 rounded-[42px] bg-white/20" />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_10px_0_rgba(255,255,255,0.25)]" />
      </div>

      <Card className="absolute left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 gap-[22px] rounded-[28px] border-slate-200 bg-slate-50 p-[22px] shadow-[0_3px_3px_rgba(100,116,139,0.1)]">
        <CardHeader className="flex flex-col gap-[11px] p-0">
          <CardTitle className="text-[25px] font-semibold text-black">New Task</CardTitle>
          <CardDescription className="text-[19px] text-slate-500">Add a video source to create clips from</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-[22px] p-0">
          <div className="flex flex-col gap-[8px]">
            <Label htmlFor="task-link" className="text-[19px] font-medium text-black">Video Link</Label>
            <Input
              id="task-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className={fieldClass}
            />
          </div>

          <div className="flex h-[111px] flex-col items-center justify-center gap-[8px] rounded-[12px] border-[1.5px] border-dashed border-indigo-500 bg-white text-center">
            <span className="flex size-[48px] items-center justify-center rounded-full bg-slate-100">
              <Plus className="size-[24px] text-slate-400" />
            </span>
            <span className="text-[19px] text-slate-500">Add video</span>
          </div>

          <div className="flex flex-col gap-[8px]">
            <Label htmlFor="task-desc" className="text-[19px] font-medium text-black">Description</Label>
            <Textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Notes, preferences, any specific requirements or notes for the editor..."
              className="h-[86px] resize-none rounded-[8px] border-slate-300 bg-white px-[17px] py-[11px] text-[19px] text-black shadow-none placeholder:text-slate-500 md:text-[19px]"
            />
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-[11px] p-0">
          <Button variant="outline" className="h-auto rounded-[6px] border-slate-200 px-[22px] py-[11px] text-[19px] font-medium text-black">
            Cancel
          </Button>
          <Button className="h-auto rounded-[8px] px-[22px] py-[11px] text-[19px] font-medium">
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
