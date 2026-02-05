import { experience } from '../data/experience'

function ExperienceList() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-body-18-medium font-medium text-primary">
        Experi&ecirc;ncias
      </h2>
      <ul className="flex flex-col gap-3">
        {experience.map((item) => (
          <li
            key={`${item.company}-${item.period}`}
            className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-body-14-medium font-medium text-secondary">
              {item.company}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-body-14-regular font-normal text-secondary">
              <span>{item.role}</span>
              <span className="tabular-nums">{item.period}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ExperienceList
