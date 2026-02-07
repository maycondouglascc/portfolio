import profilePic from '../assets/profilepic.webp'
import resumePdf from '../assets/resume/maycondouglasresume.pdf'

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
          &#128075;&#x1F3FD; Oi, I'm Maycon
        </h1>

      <p className="text-body-15-medium font-normal text-secondary">
      I've worked as a designer for 8 years and have experience in creating and maintaining websites, applications, SaaS, and design systems. <br></br>My experience includes projects for multinational companies, via a <a href="https://dtidigital.com.br" target="_blank" rel="noopener noreferrer" className="font-medium">dti digital</a> & <a href="https://base.digital/" target="_blank" rel="noopener noreferrer" className="font-medium">BASE</a>, and freelance work for different startups.
      </p>
        <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="text-body-15-medium font-medium text-primary underline">Resumé</a>
      </div>
    </section>
  )
}

export default Intro
