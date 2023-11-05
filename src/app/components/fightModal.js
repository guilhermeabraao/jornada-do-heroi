import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useHeroContext } from '@/context/heroContext';
import Image from 'next/image';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    background: 'rgb(2,0,36)',
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(34,34,106,1) 49%, rgba(5,7,18,1) 100%)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8
};
const divFlex = {
    display: 'flex',
    gap: 8
}

const divStats = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}

export default function FightModal() {

    const { heroFight, clearHeros } = useHeroContext();
    return (
        <div>
            <Modal
                open={true}
                onClose={clearHeros}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={divFlex}>
                        <Typography sx={{ color: 'green', fontWeight: 'bold' }}>Winner</Typography>
                        <Typography>{heroFight.totalPower.first > heroFight.totalPower.second ? heroFight.firstHero.name : heroFight.secondHero.name}</Typography>
                    </div>
                    <div style={{ width: '100%', ...divFlex, justifyContent: 'space-evenly' }}>
                        <div style={divFlex}>
                            <div style={{ textAlign: 'center' }}>
                                <Image src={heroFight.firstHero?.image} height={300} width={200} alt={heroFight.firstHero?.name} />
                                <p>{heroFight.firstHero?.name}</p>
                            </div>
                            <div style={divStats}>
                                {Object.entries(heroFight.firstHero.powerstats).map(([stat, valor]) => (
                                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{valor}
                                        {Object.entries(heroFight.statsCompare).map(([key, boolean]) => (
                                            key === stat ? (boolean ? <ArrowDropUpIcon sx={{ color: 'green' }} /> : <ArrowDropDownIcon sx={{ color: 'red' }} />) : null))}
                                    </Typography>
                                ))}
                            </div>
                        </div>
                        <div style={divStats}>
                            {Object.entries(heroFight.firstHero.powerstats).map(([stat, valor]) => (
                                <Typography>{stat}</Typography>
                            ))}
                        </div>
                        <div style={divFlex}>
                            <div style={divStats}>
                                {Object.entries(heroFight.secondHero.powerstats).map(([stat, valor]) => (
                                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{valor}
                                        {Object.entries(heroFight.statsCompare).map(([key, boolean]) => (
                                            key === stat ? (boolean ? <ArrowDropDownIcon sx={{ color: 'red' }} /> : <ArrowDropUpIcon sx={{ color: 'green' }} />) : null))}
                                    </Typography>
                                ))}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Image src={heroFight.secondHero?.image} height={300} width={200} alt={heroFight.secondHero?.name} />
                                <p>{heroFight.secondHero?.name}</p>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}