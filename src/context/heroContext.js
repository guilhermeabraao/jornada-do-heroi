"use client"
import { api } from "../api/api";

const { createContext, useState, useContext } = require("react");

export const HeroContext = createContext({});

export default function HeroProvider({ children }) {
    const [heroList, setHeroList] = useState([]);
    const [filteredHeros, setFilteredHeros] = useState();
    const [firstHero, setFirstHero] = useState();
    const [secondHero, setSecondHero] = useState();
    const [heroFight, setHeroFight] = useState({
        firstHero: {},
        secondHero: {},
        statsCompare: {},
        totalPower: {
            first: 0,
            second: 0
        }
    })
    const [openModal, setOpenModal] = useState(false)

    const loadHeros = async () => {
        try {
            const { data } = await api.get('/');
            setHeroList(data);
            if (!filteredHeros) {
                setFilteredHeros(data);
            }

        } catch (error) {
            console.log(error.message);
        }

    }

    const filterHero = (e) => {
        const newFilter = heroList.filter(
            (hero) => hero.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setFilteredHeros(newFilter)
    }

    const selectHeros = (hero) => {
        if (!firstHero) {
            setFirstHero(hero)
            return;
        }
        if (firstHero.id == hero.id) {
            setFirstHero();
            return;
        }

        if (!secondHero) {
            setSecondHero(hero)
        }

        setHeroFight({
            firstHero: {
                id: firstHero.id,
                name: firstHero.name,
                image: firstHero.images.lg,
                powerstats: firstHero.powerstats
            },
            secondHero: {
                id: hero.id,
                name: hero.name,
                image: hero.images.lg,
                powerstats: hero.powerstats
            },
            statsCompare: {
                combat: firstHero.powerstats.combat > hero.powerstats.combat ? true : false,
                durability: firstHero.powerstats.durability > hero.powerstats.durability ? true : false,
                intelligence: firstHero.powerstats.intelligence > hero.powerstats.intelligence ? true : false,
                power: firstHero.powerstats.power > hero.powerstats.power ? true : false,
                speed: firstHero.powerstats.speed > hero.powerstats.speed ? true : false,
                strength: firstHero.powerstats.strength > hero.powerstats.strength ? true : false
            },
            totalPower: {
                first: Object.values(firstHero.powerstats).reduce((acumulador, valor) => acumulador + valor, 0),
                second: Object.values(hero.powerstats).reduce((acumulador, valor) => acumulador + valor, 0)
            }
        })

        setOpenModal(true);
    }

    const clearHeros = () => {
        setFirstHero();
        setSecondHero();
        setOpenModal();
    }


    return (
        <HeroContext.Provider value={{ loadHeros, heroList, setHeroList, filterHero, filteredHeros, setFilteredHeros, firstHero, setFirstHero, secondHero, setSecondHero, selectHeros, clearHeros, heroFight, openModal, setOpenModal }}>
            {children}
        </HeroContext.Provider>
    );
}

export const useHeroContext = () => useContext(HeroContext);