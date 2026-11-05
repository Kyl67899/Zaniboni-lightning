"use client"

import { Link2, Mail, Share2 } from "lucide-react"
import { BsFacebook, BsLinkedin, BsTwitterX } from "react-icons/bs"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ShareButton({ path, title }: { path: string; title: string }) {
  // Built on click: window doesn't exist during server rendering.
  const fullUrl = () => `${window.location.origin}${path}`

  const openShare = (url: string) => window.open(url, "_blank", "noopener,noreferrer,width=600,height=500")

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl())
      toast.success("Link copied")
    } catch {
      toast.error("Couldn’t copy the link")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="-ml-3 hover:bg-muted hover:text-foreground">
          <Share2 />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem
          onClick={() =>
            openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl())}`)
          }
        >
          <BsLinkedin />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl())}`)}
        >
          <BsFacebook />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            openShare(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl())}&text=${encodeURIComponent(title)}`,
            )
          }
        >
          <BsTwitterX />
          X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(fullUrl())}`
          }}
        >
          <Mail />
          Email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink}>
          <Link2 />
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
