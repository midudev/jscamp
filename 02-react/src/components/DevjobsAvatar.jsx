import styles from './DevjobsAvatar.module.css';

export default function DevjobsAvatar({ username = 'midudev', service = 'github', size = 40 }) {
  const createUrl = (service, username) => {
    return `https://unavatar.io/${service}/${username}`
  }

  const url = createUrl(service, username)
  return (
    <img 
      src={url} 
      alt={`Avatar de ${username}`} 
      className={styles.avatar}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    />
  )
}