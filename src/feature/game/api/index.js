/**
 * @import { z } from "zod";
 * @import {
 *    gameCreateSchema,
 *    gameJoinSchema,
 *    gameListQuerySchema,
 *    gameStartSchema,
 *    playerEndpointUpdateSchema,
 *    playerRegisterSchema,
 *    spectatorRegisterSchema
 * } from "@feature/game/dto";
 * @import {
 *    gameListResponseSchema,
 *    gameSchema,
 *    gameStreamDtoSchema,
 *    spectatorCreateResponseSchema,
 *    teamPlayerResponseSchema,
 *    teamPlayerSchema,
 * } from "@feature/game/models";
 */
import { apiClient } from '@core/helpers/fetch';

/**
 * @returns {Promise<z.infer<typeof teamPlayerSchema>[]>}
 */
export function listPlayers() {
  return apiClient('/players', {
    method: 'GET',
  });
}

/**
 * @param {z.infer<typeof playerRegisterSchema>} dto
 * @returns {Promise<z.infer<typeof teamPlayerResponseSchema>>}
 */
export function registerPlayer(dto) {
  return apiClient('/players', {
    method: 'POST',
    body: dto,
  });
}

/**
 * @param {string | number} playerId
 * @param {z.infer<typeof playerEndpointUpdateSchema>} dto
 * @returns {Promise<z.infer<typeof teamPlayerSchema>>}
 */
export function updatePlayerMoveEndpoint(playerId, dto) {
  return apiClient(`/players/${playerId}`, {
    method: 'PUT',
    body: dto,
  });
}

/**
 * @param {z.infer<typeof gameListQuerySchema>} dto
 * @returns {Promise<z.infer<typeof gameListResponseSchema>>}
 */
export function listGames(dto) {
  return apiClient('/games', {
    method: 'GET',
    query: dto,
  });
}

/**
 * @param {string | number} playerId
 * @returns {Promise<z.infer<typeof gameSchema>>}
 */
export function getGame(gameId) {
  return apiClient(`/games/${gameId}`, {
    method: 'GET',
  });
}

/**
 * @param {z.infer<typeof gameCreateSchema>} dto
 * @returns {Promise<z.infer<typeof gameSchema>>}
 */
export function createGame(dto) {
  return apiClient('/games', {
    method: 'POST',
    body: dto,
  });
}

/**
 * @param {string | number} gameId
 * @param {z.infer<typeof gameStartSchema>} dto
 * @returns {Promise<z.infer<typeof gameSchema>>}
 */
export function startGame(gameId, dto) {
  return apiClient(`/games/${gameId}/start`, {
    method: 'POST',
    body: dto,
  });
}

/**
 * @param {string | number} gameId
 * @param {z.infer<typeof gameJoinSchema>} dto
 * @returns {Promise<z.infer<typeof gameSchema>>}
 */
export function joinGame(gameId, dto) {
  return apiClient(`/games/${gameId}/join`, {
    method: 'POST',
    body: dto,
  });
}

/**
 * @param {string | number} gameId
 * @param {z.infer<typeof spectatorRegisterSchema>} dto
 * @returns {Promise<z.infer<typeof spectatorCreateResponseSchema>>}
 */
export function registerSpectator(gameId, dto) {
  return apiClient(`/games/${gameId}/spectators`, {
    method: 'POST',
    body: dto,
  });
}

/**
 * @returns {Promise<z.infer<typeof gameStreamDtoSchema>>}
 */
export function getApiMockState() {
  return apiClient('/games/mock-state', {
    method: 'POST',
  });
}

/**
 * @param {any} dto
 * @returns {Promise<z.infer<typeof gameStreamDtoSchema>>}
 */
export function sendApiMockAction(dto) {
  return apiClient('/games/mock-state', {
    method: 'POST',
    body: dto,
  });
}
