import { footer } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-muted">
        <p>
          <span className="font-display font-bold text-ink">EntySoftware</span> · {footer.place}
        </p>
        <p>© {year} EntySoftware. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}