import { CopyEmailLink } from './CopyEmailLink'

function Footer() {
  return (
    <footer className="mt-12 border-t border-border pt-6">
      <h2 className="text-body-15-medium font-medium text-primary">
        Contato
      </h2>
      <ul className="mt-4 flex flex-wrap items-center gap-4 text-body-15-medium font-medium">
        <li>
          <a
            href="https://linkedin.com/in/maycondouglascc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
        </li>
        <li>
          <CopyEmailLink email="hi@maycondouglas.work" />
        </li>
        <li>
          <a
            href="https://literal.club/wzk000"
            target="_blank"
            rel="noopener noreferrer"
          >
            Literal
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
