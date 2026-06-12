import { Typography } from "@ui/text/typography";
import { useGameContext } from "../context/game-context";
import { useGameSocket } from "../hooks/useGameSocket";
import { cn } from "@core/helpers";
import { getGame, getGameHistory } from "../api";
import { useState, useEffect } from "react";




export function ViewGame({ gameId }) {
    const { spectator } = useGameContext();
    const [gameStaticData, setGameStaticData] = useState(null);
    const [gameStaticTurns, setGameStaticTurns] = useState(null)
    const [turnIndex, setTurnIndex] = useState(0);

    useEffect(() => {
        async function loadGame() {
            const game_data = await getGame(gameId);
            setGameStaticData(game_data);

            const data_history = await getGameHistory(gameId);
            setGameStaticTurns(data_history);
        }

        loadGame();
    }, [gameId]);

    const { connected, gameState } = useGameSocket(
        gameId,
        spectator?.[gameId]?.spectator_access_token || null
    );
    try {
        return (
            <div className={cn('flex flex-col gap-4 py-8', 'flex-1')}>

                <Typography
                    variant={'h1'}
                    asTag={'h1'}
                    className={cn('text-4xl', 'font-bold')}
                >
                    {gameStaticData?.winner_player_id == null && 'Watch Game'}

                    {gameStaticData?.winner_player_id == gameStaticData?.turing_player.id && (
                        <p>Vencedor - {gameStaticData?.turing_player.ai_player_name}</p>
                    )}

                    {gameStaticData?.winner_player_id == gameStaticData?.lovelace_player.id && (
                        <p>Vencedor - {gameStaticData?.lovelace_player.ai_player_name}</p>
                    )}

                </Typography>
                <Typography
                    variant={'p'}
                    asTag={'p'}
                    className={cn('text-lg', 'text-neutral-600')}
                >
                    Watching: {gameId}
                </Typography>
                <div className={cn('flex', 'gap-2', 'items-center')}>
                    <Typography
                        variant={'span'}
                        asTag={'span'}
                        className={cn(
                            'rounded-full',
                            'bg-neutral-500',
                            'text-white',
                            'text-xs',
                            'px-4 py-1',
                            {
                                'bg-yellow-600': !connected,
                                'bg-green-500': connected,
                            }
                        )}
                    >
                        {!connected && 'Connecting ...'}
                        {connected && 'Connected'}
                    </Typography>

                    {gameState?.status === 'PLAYING' && (
                        <Typography
                            variant={'span'}
                            asTag={'span'}
                            className={cn(
                                'rounded-full',
                                'bg-neutral-500',
                                'text-white',
                                'text-xs',
                                'px-4 py-1'
                            )}
                        >
                            Assistindo
                        </Typography>
                    )}
                </div>

                {gameStaticData && (
                    <div>
                        <div className={cn(
                            'flex',
                            'items-center',
                            'justify-center',
                            'gap-8',
                            'py-8'
                        )}>
                            <div className={cn(
                                'block',
                                'items-center',
                                'justify-center',
                                'gap-8',
                                'py-8'
                            )}>
                                <img
                                    alt={gameStaticData?.turing_player?.ai_player_name}
                                    src={gameStaticData?.turing_player?.ai_player_avatar}
                                    className={cn(
                                        'w-32',
                                        'h-32',
                                        'rounded-full',
                                        'border-4',
                                        'border-blue-500'
                                    )}
                                />
                                <p className={cn(
                                    'h-32',
                                    'text-center',
                                    'text-2xl'
                                )}>{gameStaticData?.turing_player?.ai_player_name}</p>
                            </div>

                            <Typography
                                variant={'h2'}
                                asTag={'h2'}
                                className={cn(
                                    'text-4xl',
                                    'font-bold'
                                )}
                            >
                                VS
                            </Typography>

                            <div className={cn(
                                'block',
                                'items-center',
                                'justify-center',
                                'gap-8',
                                'py-8'
                            )}>
                                <img
                                    alt={gameStaticData?.lovelace_player?.ai_player_name}
                                    src={gameStaticData?.lovelace_player?.ai_player_avatar}
                                    className={cn(
                                        'w-32',
                                        'h-32',
                                        'rounded-full',
                                        'border-4',
                                        'border-red-500'
                                    )}
                                />
                                <p className={cn(
                                    'h-32',
                                    'text-center',
                                    'text-2xl'
                                )}>{gameStaticData?.lovelace_player?.ai_player_name}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className={cn('self-center')}>
                    {connected && gameState && (
                        <>
                            <div className={cn('grid grid-cols-5 min-w-4xl max-w-4xl gap-4')}>
                                {gameState?.board?.map((row, r) => {
                                    return row?.map((cell, c) => {
                                        return (
                                            <div
                                                key={`${r}-${c}`}
                                                className={cn(
                                                    'flex flex-col gap-2',
                                                    'items-start',
                                                    'h-40',
                                                    'bg-sky-300',
                                                    'p-4',
                                                    'rounded-xl',
                                                    {
                                                        'bg-sky-500': cell?.level == 1,
                                                        'bg-sky-600': cell?.level == 2,
                                                        'bg-sky-700': cell?.level == 3,
                                                        'bg-sky-800': cell?.level == 4,
                                                    }
                                                )}
                                            >
                                                <Typography
                                                    variant={'span'}
                                                    asTag={'span'}
                                                    className={cn(
                                                        'rounded-full',
                                                        'bg-neutral-500',
                                                        'text-white',
                                                        'text-xl font-bold',
                                                        'px-4 py-1'
                                                    )}
                                                >
                                                    {cell?.level}
                                                </Typography>
                                                {cell?.professor && (
                                                    <Typography
                                                        variant={'span'}
                                                        asTag={'span'}
                                                        className={cn(
                                                            'rounded-full',
                                                            'bg-neutral-500',
                                                            'text-white',
                                                            'text-xs',
                                                            'px-4 py-1'
                                                        )}
                                                    >
                                                        {cell?.professor}

                                                    </Typography>
                                                )}
                                            </div>
                                        );
                                    });
                                })}
                            </div>
                        </>
                    )}

                    {gameStaticData?.status != "FINISHED" && !gameState && (
                        <>
                            <div className={cn('grid grid-cols-5 min-w-4xl max-w-4xl gap-4')}>
                                {gameStaticData?.board?.map((row, r) => {
                                    return row?.map((cell, c) => {
                                        return (
                                            <div
                                                key={`${r}-${c}`}
                                                className={cn(
                                                    'flex flex-col gap-2',
                                                    'items-start',
                                                    'h-40',
                                                    'bg-sky-300',
                                                    'p-4',
                                                    'rounded-xl',
                                                    {
                                                        'bg-sky-500': cell?.level == 1,
                                                        'bg-sky-600': cell?.level == 2,
                                                        'bg-sky-700': cell?.level == 3,
                                                        'bg-sky-800': cell?.level == 4,
                                                    }
                                                )}
                                            >
                                                <Typography
                                                    variant={'span'}
                                                    asTag={'span'}
                                                    className={cn(
                                                        'rounded-full',
                                                        'bg-neutral-500',
                                                        'text-white',
                                                        'text-xl font-bold',
                                                        'px-4 py-1'
                                                    )}
                                                >
                                                    {cell?.level}
                                                </Typography>
                                                {cell?.professor && (
                                                    <Typography
                                                        variant={'span'}
                                                        asTag={'span'}
                                                        className={cn(
                                                            'rounded-full',
                                                            'bg-neutral-500',
                                                            'text-white',
                                                            'text-xs',
                                                            'px-4 py-1'
                                                        )}
                                                    >
                                                        {cell?.professor}

                                                    </Typography>
                                                )}
                                            </div>
                                        );
                                    });
                                })}
                            </div>
                        </>
                    )}

                    {gameStaticData?.status === "FINISHED" && !gameState && gameStaticTurns && (
                        <>
                            <div className={cn('grid grid-cols-5 min-w-4xl max-w-4xl gap-4')}>
                                {gameStaticTurns[turnIndex]?.board?.map((row, r) => {
                                    return row?.map((cell, c) => {
                                        return (
                                            <div
                                                key={`${r}-${c}`}
                                                className={cn(
                                                    'flex flex-col gap-2',
                                                    'items-start',
                                                    'h-40',
                                                    'bg-sky-300',
                                                    'p-4',
                                                    'rounded-xl',
                                                    {
                                                        'bg-sky-500': cell?.level == 1,
                                                        'bg-sky-600': cell?.level == 2,
                                                        'bg-sky-700': cell?.level == 3,
                                                        'bg-sky-800': cell?.level == 4,
                                                    }
                                                )}
                                            >
                                                <Typography
                                                    variant={'span'}
                                                    asTag={'span'}
                                                    className={cn(
                                                        'rounded-full',
                                                        'bg-neutral-500',
                                                        'text-white',
                                                        'text-xl font-bold',
                                                        'px-4 py-1'
                                                    )}
                                                >
                                                    {cell?.level}
                                                </Typography>
                                                {cell?.professor && (
                                                    <Typography
                                                        variant={'span'}
                                                        asTag={'span'}
                                                        className={cn(
                                                            'rounded-full',
                                                            'bg-neutral-500',
                                                            'text-white',
                                                            'text-xs',
                                                            'px-4 py-1'
                                                        )}
                                                    >
                                                        {cell?.professor}

                                                    </Typography>
                                                )}
                                            </div>
                                        );
                                    });
                                })}
                            </div>
                            <div className={cn(
                                'flex',
                                'justify-center',
                                'gap-4',
                                'mt-6'
                            )}>
                                {turnIndex > 0 && (
                                    <button
                                        onClick={() => setTurnIndex(prev => prev - 1)}
                                        className={cn(
                                            'px-6',
                                            'py-3',
                                            'rounded-lg',
                                            'bg-slate-700',
                                            'text-white',
                                            'font-semibold',
                                            'hover:bg-slate-800',
                                            'transition-colors',
                                            'cursor-pointer'
                                        )}
                                    >
                                        Voltar turno
                                    </button>
                                )}

                                <div
                                    className={cn(
                                        'flex',
                                        'items-center',
                                        'px-4',
                                        'text-lg',
                                        'font-bold'
                                    )}
                                >
                                    Turno {turnIndex + 1} / {gameStaticTurns.length}
                                </div>

                                {turnIndex < gameStaticTurns.length - 1 && (
                                    <button
                                        onClick={() => setTurnIndex(prev => prev + 1)}
                                        className={cn(
                                            'px-6',
                                            'py-3',
                                            'rounded-lg',
                                            'bg-blue-600',
                                            'text-white',
                                            'font-semibold',
                                            'hover:bg-blue-700',
                                            'transition-colors',
                                            'cursor-pointer'
                                        )}
                                    >
                                        Avançar turno
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                </div>


            </div>

        )
    } catch (err) {
        return (
            <div>
                {gameStaticData?.status === "WAITING_PLAYERS" && (<p>Aguardando jogadores...</p>)}
            </div>

            /* 
            <pre>
                    {JSON.stringify(gameStaticData, null, 2)}
                </pre>
            */

        )
    }
}