import { useEffect, useState } from "react";
import { useGameContext } from "../context/game-context";
import { Typography } from "@ui/text/typography";
import { SpectatorRegisterForm } from "./spectator-register-form";
import { ViewGame } from "./view-game";


export function SpectateGame({ gameId }) {
    const { spectator: storedSpectator } = useGameContext();

    const [spectator, setSpectator] = useState(() => {
        if (storedSpectator?.[gameId]) {
            return storedSpectator?.[gameId];
        }

        return null;
    });

    useEffect(() => {
        if (storedSpectator?.[gameId]) {
            setSpectator(storedSpectator?.[gameId]);
        }
    }, [storedSpectator]);

    return (
        <>
            {!spectator && (
                <>
                    <Typography variant={'h3'}>Registro de Espectador</Typography>
                    <Typography variant={'p'}>

                    </Typography>
                    <SpectatorRegisterForm gameId={gameId} />
                </>
            )}

            {spectator && <ViewGame gameId={gameId} />}
        </>
    );
}