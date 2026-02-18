import { useState } from "react"
import { Link } from "./Link"
import styles from './JobCard.module.css'
import { useFavoritesStore } from "../store/favoritesStore"
import { useAuthStore } from "../store/authStore"

function JobCardFavoriteButton ({ jobId }) {
  const { isLoggedIn } = useAuthStore()
  // suscríbete a TODA la store y extra TODA la store
  const { toggleFavorite, isFavorite } = useFavoritesStore()

  return (
    <button
      disabled={!isLoggedIn}
      onClick={() => toggleFavorite(jobId)}
      aria-label={isFavorite(jobId) ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite(jobId) ? '❤️' : '🤍'}
    </button>
  )
}

function JobCardApplyButton ({ jobId }) {
  const [isApplied, setIsApplied] = useState(false)
  const { isLoggedIn } = useAuthStore()

  const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
  const buttonText = isApplied ? 'Aplicado' : 'Aplicar'

  const handleApplyClick = () => {
    console.log('Aplicando al trabajo con id:', jobId)
    setIsApplied(true)
  }

  return (
    <button disabled={!isLoggedIn} className={buttonClasses} onClick={handleApplyClick}>{buttonText}</button>
  )
}

export function JobCard({ job }) {
  return (
    <article 
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <h3>
          <Link className={styles.title} href={`/jobs/${job.id}`}>
            {job.titulo}
          </Link>
        </h3>
        <small>{job.empresa} | {job.ubicacion}</small>
        <p>{job.descripcion}</p>
      </div>
      <div className={styles.actions}>
        <Link href={`/jobs/${job.id}`} className={styles.details}>
          Ver detalles
        </Link>
        <JobCardApplyButton jobId={job.id} />
        <JobCardFavoriteButton jobId={job.id} />
      </div>
    </article>
  )
}