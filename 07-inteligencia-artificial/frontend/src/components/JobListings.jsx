import { JobCard } from './JobCard.jsx'

export function JobListings ({ jobs }) {
  return (
    <>
      <div className="jobs-listings">
        {
          jobs.length === 0 && (
            <p style={{ textAlign: 'center', padding: '1rem', textWrap: 'balance' }}>No se han encontrado empleos que coincidan con los criterios de búsqueda.</p>
          )
        }
        
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}