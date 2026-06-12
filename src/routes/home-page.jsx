import { cn } from '@core/helpers';
import { listGames } from '@feature/game/api';
import { Typography } from '@ui/text/typography';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { joinGame } from '@feature/game/api';

export function HomePage() {
  const [partidas, setPartidas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function buscarPartidas() {
    setLoading(true);

    try {
      const response = await listGames();
      setPartidas(response)
    } catch (error) {
      console.error(error);
      setError(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarPartidas();
  }, [])

  return (
    <div className={cn('flex flex-col gap-4 py-8', 'flex-1')}>
      <Typography
        variant={'h1'}
        asTag={'h1'}
        className={cn('text-4xl', 'font-bold')}
      >
        Partidas
        {loading && <h1>Carregando partidas...</h1>}
        {error && <h3>{error}</h3>}

        {partidas.items?.map((game, g) => {
          return (
            <div key={g} className={cn('p-4', 'flex', 'flex-row', 'items-center', 'justify-between', 'bg-white', 'rounded-md', 'shadow')}>
              <Typography variant={'span'} asTag={'p'} className={cn('text-xs', 'font-semibold')}>
                #{game.id}
              </Typography>
              <Typography variant={'h5'} asTag={'h5'}>
                Status: {game?.status}
              </Typography>

              <div>
                <Link
                  style={{ margin: 10 }}
                  to={`/spectate/${game.id}`}
                  className={cn('mt-4', 'px-4', 'py-2', 'bg-gray-900', 'text-white', 'rounded-md', 'hover:bg-red-600', 'transition-colors')}
                >
                  Assistir
                </Link>

                <Link
                  onClick={async () => {
                    try {
                      await joinGame(game.id, {
                        player_id: 112,
                        team_slot: 1
                      })
                    }
                    catch (err) {
                      try {
                        await joinGame(game.id, {
                          player_id: 112,
                          team_slot: 2
                        })
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }}

                  to={`/spectate/${game.id}`}
                  className={cn('mt-4', 'px-4', 'py-2', 'bg-gray-900', 'text-white', 'rounded-md', 'hover:bg-red-600', 'transition-colors')}
                >
                  Jogar
                </Link>
              </div>
            </div>
          )
        })}
      </Typography>
    </div>
  );
}
