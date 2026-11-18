import { InstagramIcon, WhatsAppIcon } from '@/components/ui/icons'
import { footer } from '@/data/content'
import { links } from '@/data/social'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10 text-sm text-muted">
        <div className="flex flex-col gap-2">
          <img
            src="/logo-entysoftware.png"
            alt="EntySoftware"
            width={193}
            height={24}
            className="h-6 w-auto"
          />
          <p>{footer.place}</p>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={links.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de EntySoftware"
            className="grid size-11 place-items-center rounded-lg transition-colors hover:text-accent"
          >
            <InstagramIcon />
          </a>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp de EntySoftware"
            className="grid size-11 place-items-center rounded-lg transition-colors hover:text-accent"
          >
            <WhatsAppIcon />
          </a>
        </div>

        <p>© {year} EntySoftware. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}