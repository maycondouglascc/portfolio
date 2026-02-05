import { CopyEmailLink } from './CopyEmailLink'

function Footer() {
  return (
    <footer className="relative flex flex-col border-t border-border pt-6">
      <h2 className="text-[15px] font-medium text-secondary mb-4">Contato</h2>
      <ul className="flex gap-4">
        <li>
          <a 
            href="https://linkedin.com/in/maycondouglascc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm"
          >
            Linkedin
          </a>
        </li>
        <li>
          <CopyEmailLink email="hellomaycondouglas@gmail.com" label="Email" />
        </li>
        <li>
          <a 
            href="https://literal.club/wzk000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm"
          >
            Literal
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
