import Magnetic from '@/components/ui/Magnetic'
import Reveal from '@/components/ui/Reveal'
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/icons'
import { contact } from '@/data/content'
import { links, social } from '@/data/social'
import { ArrowUpRight } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-10 rounded-3xl bg-accent p-[clamp(32px,6vw,72px)] text-bg">
            <div className="min-w-0 flex-[1_1_480px]">
              <h2
                id="contacto-title"
                className="font-display text-[clamp(36px,5vw,64px)] leading-[1.05] font-bold tracking-[-0.02em]"
              >
                {contact.title}
              </h2>
              <p className="mt-4 max-w-lg text-lg text-bg/75">{contact.text}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* WhatsApp: botón principal oscuro */}
              <Magnetic>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex min-h-14 items-center gap-2 overflow-hidden rounded-2xl bg-bg px-7 font-semibold text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                  />
                  <WhatsAppIcon className="relative transition-colors duration-500 group-hover:text-bg" />
                  <span className="relative transition-colors duration-500 group-hover:text-bg">
                    Escríbenos por WhatsApp
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="relative transition-colors duration-500 group-hover:text-bg"
                  />
                </a>
              </Magnetic>

              {/* Instagram */}
              <Magnetic>
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-14 items-center gap-2 rounded-2xl border-2 border-bg px-7 font-semibold transition-colors duration-300 hover:bg-bg/10"
                >
                  <InstagramIcon />@{social.instagramUser}
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}