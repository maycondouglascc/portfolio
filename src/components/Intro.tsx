function Intro() {
  return (
    <section className="flex flex-col gap-6">
      <img
        className="rounded object-cover"
        src="/files/profile-pic.webp"
        alt="Maycon's profile picture"
        width={80}
        height={80}
        fetchPriority="high"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-body-18-medium font-medium text-primary">
          &#x1F44F;&#x1F3FD; Oi, eu sou o Maycon
        </h1>
        <p className="text-body-16-regular font-normal text-secondary">
          Atuo como designer h&aacute; 8 anos e tenho
          experi&ecirc;ncia em projetos de cria&ccedil;&atilde;o e manuten&ccedil;&atilde;o de websites,
          aplicativos, SaaS e design systems
        </p>
        <p className="text-body-16-regular font-normal text-secondary">
          Minha experi&ecirc;ncia inclui projetos para multinacionais, via{" "}
          <a
            href="http://dtidigital.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            dti digital
          </a>{" "}
          &amp;{" "}
          <a
            href="http://base.digital/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            BASE
          </a>
          , e trabalhos aut&ocirc;nomos para diferentes startups
        </p>
      </div>
    </section>
  )
}

export default Intro
