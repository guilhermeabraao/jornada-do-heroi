"use client"
import HeroList from './components/heroList'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useHeroContext } from '@/context/heroContext';
import FightModal from './components/fightModal';
const style = {
  paddingTop: 100,
  display: "flex",
  justifyContent: "center"
}

export default function Home() {


  const { filterHero, openModal } = useHeroContext();


  return (
    <main style={style}>
      <HeroList />
      <OutlinedInput
        id="search"
        type='text'
        placeholder='Procurar herói'
        sx={{ height: 50, borderColor: 'white', background: 'white' }}
        endAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        onChange={(e) => filterHero(e)}
      />
      {openModal && <FightModal />}
    </main>
  )
}
