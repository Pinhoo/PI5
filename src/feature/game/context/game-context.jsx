/**
 * @import { z } from "zod";
 * @import {
 *    teamPlayerSchema,
 *    spectatorCreateResponseSchema
 * } from "@feature/game/models";
 */
import { setAccessToken } from '@core/helpers/fetch';
import { createContext, useContext, useEffect, useState } from 'react';

/**
 * @type {React.Context<{
 *   player: z.infer<typeof teamPlayerSchema> | null,
 *   setPlayer: React.Dispatch<React.SetStateAction<
 *     z.infer<typeof teamPlayerSchema> | null
 *   >>,
 *   spectator: z.infer<typeof spectatorCreateResponseSchema> | null,
 *   setSpectator: React.Dispatch<React.SetStateAction<
 *     z.infer<typeof spectatorCreateResponseSchema> | null
 *   >>,
 *   logout: () => void
 * }>}
 */
const context = createContext({});

/**
 * Função auxiliar para ler um valor armazenado no localStorage, garantindo que
 * a leitura só ocorra em ambiente de navegador e que o valor seja parseado de
 * forma segura, retornando null caso o valor não exista ou seja inválido.
 *
 * @param {string} key
 * @returns {T extends any}
 */
function readStoredValue(key) {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

export const GameContextProvider = ({ children }) => {
  /**
   * @type {[
   *    player: z.infer<typeof teamPlayerSchema> | null,
   *    setPlayer: React.Dispatch<React.SetStateAction<
   *      z.infer<typeof teamPlayerSchema> | null
   *    >>
   * ]}
   */
  const [player, setPlayer] = useState(() => readStoredValue('player'));

  /**
   * @type {[
   *    spectator: z.infer<typeof spectatorCreateResponseSchema> | null,
   *    setSpectator: React.Dispatch<React.SetStateAction<
   *      z.infer<typeof spectatorCreateResponseSchema> | null
   *    >>
   * ]}
   */
  const [spectator, setSpectator] = useState(() =>
    readStoredValue('spectator')
  );

  function logout() {
    setPlayer(null);
    setSpectator(null);
  }

  useEffect(() => {
    if (player) {
      localStorage.setItem('player', JSON.stringify(player));
      setAccessToken(player?.player_access_token);
    } else {
      localStorage.removeItem('player');
      setAccessToken(null);
    }
  }, [player]);

  useEffect(() => {
    if (spectator) {
      localStorage.setItem('spectator', JSON.stringify(spectator));
    } else {
      localStorage.removeItem('spectator');
    }
  }, [spectator]);

  return (
    <context.Provider
      value={{ player, setPlayer, spectator, setSpectator, logout }}
    >
      {children}
    </context.Provider>
  );
};

export function useGameContext() {
  try {
    return useContext(context);
  } catch (err) {
    throw new Error(
      'useGameContext deve ser usado dentro de um GameContextProvider'
    );
  }
}
