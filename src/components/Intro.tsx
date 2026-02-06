import profilePic from '../assets/profilepic.webp'

function Intro() {
  return (
    <section className="flex flex-col gap-6">
      <img
        className="rounded object-cover"
        src={profilePic}
        alt="Maycon's profile picture"
        width={80}
        height={80}
        fetchPriority="high"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-body-15-medium font-medium text-primary">
          &#128075;&#x1F3FD; Oi, eu sou o Maycon
        </h1>
        <p className="text-body-15-medium font-normal text-secondary">
          Atuo como designer há 8 anos e tenho
          experiência em projetos de criação e manutenção de websites,
          aplicativos, SaaS e design systems
        </p>
        <p className="text-body-15-medium font-normal text-secondary">
          Minha experiência inclui projetos para multinacionais, via{" "}
          <a
            href="http://dtidigital.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            dti digital
          </a>{" "}
          &{" "}
          <a
            href="http://base.digital/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            BASE
          </a>
          , e trabalhos autônomos para diferentes startups
        </p>
      </div>
    </section>
  )
}

export default Intro
