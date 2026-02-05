import { experience } from '../data/experience'

function ExperienceList() {
  return (
    <>
      <h2 className="text-[15px] font-medium text-secondary mb-4">Experiências</h2>
      <ul>
        {experience.map((item) => (
          <li
            key={`${item.company}-${item.period}`}
            className="flex w-full items-center justify-between mb-4 last:mb-0"
          >
            <p className="text-sm">{item.company}</p>
            <div className="flex gap-3 text-secondary">
              <span className="text-sm">{item.role}</span>
              <span className="text-sm tabular-nums">{item.period}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ExperienceList
