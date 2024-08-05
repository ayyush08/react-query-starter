import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import RQSuperHeroes from './components/RQSuperHeroes.page'
import SuperHeroes from './components/SuperHeroes.page'
import HomePage from './components/HomePage.page.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import RQSuperHero from './components/RQSuperHero.page.jsx'
import ParallelQueries from './components/ParallelQueries.page.jsx'
import DynamicParallel from './components/DynamicParallel.page.jsx'
import DependentQueries from './components/DependentQueries.page.jsx'

const queryClient = new QueryClient()


function App() {


  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='rq-dependent' element={<DependentQueries email='vishwas@example.com'/>}/>
          <Route path='/rq-dynamic-parallel' element={<DynamicParallel heroIds={[1,3]}/>}/>
          <Route path='/rq-parallel' element={<ParallelQueries/>}/>
          <Route path='/rq-super-heroes/:heroId' element={<RQSuperHero/>
          }/>
        <Route path='/super-heroes' element={<SuperHeroes />} />
          <Route path='/rq-super-heroes' element={<RQSuperHeroes />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </QueryClientProvider>
  )
}

export default App