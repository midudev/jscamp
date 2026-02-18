import { useRouter } from "../hooks/useRouter"
import styles from "./Home.module.css"

export default function HomePage () {
  const { navigateTo } = useRouter()

  const handleSearch = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const searchTerm = formData.get('search')
    
    const url = searchTerm
      ? `/search?text=${encodeURIComponent(searchTerm)}`
      : '/search'

    navigateTo(url)
  }

  return (
    <main>
      <section>
        <img src="./background.webp" width="200" />

        <h1>Encuentra el trabajo de tus sueños</h1>

        <p>Únete a la comunidad más grande de desarrolladores y encuentra tu próxima oportunidad.</p>

        <form role="search" onSubmit={handleSearch}>
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>

            <input
              name="search"
              required
              type="search"
              placeholder="Buscar empleos por título, habilidad o empresa"
            />

            <button type="submit">Buscar</button>
          </div>
        </form>
      </section>

      <section className={styles.section}>

        <header>
          <h2>¿Por qué DevJobs?</h2>
          <p>DevJobs es la principal plataforma de búsqueda de empleo para desarrolladores. Conectamos a los mejores
            talentos con las empresas más innovadoras.</p>
        </header>

        <div>
          <article>
            <svg fill="currentColor" height="32" viewBox="0 0 256 256" width="32"
              aria-hidden="true">
              <path
                d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z">
              </path>
            </svg>
            <h3>Encuentra el trabajo de tus sueños</h3>
            <p>Busca miles de empleos de las mejores empresas de todo el mundo.</p>
          </article>

          <article>
            <svg fill="currentColor" height="32" viewBox="0 0 256 256" width="32"
              aria-hidden="true">
              <path
                d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z">
              </path>
            </svg>
            <h3>Conecta con las mejores empresas</h3>
            <p>Conecta con empresas que están contratando por tus habilidades.</p>
          </article>

          <article>
            <svg fill="currentColor" height="32" viewBox="0 0 256 256" width="32"
              aria-hidden="true">
              <path
                d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z">
              </path>
            </svg>
            <h3>Obtén el salario que mereces</h3>
            <p>Obtén el salario que mereces con nuestra calculadora de salarios.</p>
          </article>
        </div>

      </section>
    </main>
  )
}