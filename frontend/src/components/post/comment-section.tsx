import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function CommentSection({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <Button type="submit">Save changes</Button>
    </form>
  )
}
