import { useHeroContext } from "@/context/heroContext";
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function HeroList() {

    const { loadHeros, filteredHeros, selectHeros, firstHero, secondHero } = useHeroContext();

    useEffect(() => {
        loadHeros();
    })


    const style = {
        width: "80vw",
        display: "flex",
        flexWrap: 'wrap',
        gap: 32
    }
    return (
        <div style={style}>
            {filteredHeros && filteredHeros.map(hero => (
                <div style={{ border: (firstHero?.id == hero.id || secondHero?.id == hero.id) ? 'solid 2px red' : 'none' }}>
                    <Card sx={{ maxWidth: 200 }} key={hero.id} onClick={() => selectHeros(hero)}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={hero.images.lg}
                                alt={hero.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {hero.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            ))
            }
        </div >
    )
}