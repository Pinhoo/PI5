import z from 'zod';

export const teamIdSchema = z.enum(['1', '2'], 'O ID do time deve ser 1 ou 2');

export const gameStatusSchema = z.enum(
  ['WAITING_PLAYERS', 'PLAYING', 'PAUSED', 'FINISHED'],
  "O status do jogo deve ser 'WAITING_PLAYERS', 'PLAYING', 'PAUSED' ou 'FINISHED'"
);

export const turnPhaseSchema = z.enum(
  ['setup_placement', 'player_turn'],
  "A fase do turno deve ser 'setup_placement' ou 'player_turn'"
);

export const cellSchema = z.object({
  level: z.number().int().nonnegative(),
  professor: z.string().optional().nullable(),
});

export const boardSchema = z.array(z.array(cellSchema));

export const teamPlayerSchema = z.object({
  id: z.number().int().positive(),
  group_name: z.string(),
  ai_player_name: z.string().nullable(),
  ai_player_avatar: z.url().optional().nullable(),
  ai_player_description: z.string().optional().nullable(),
  ai_player_move_endpoint: z.url().optional().nullable(),
  games_played: z.number().int().nonnegative(),
  games_won: z.number().int().nonnegative(),
  games_lost: z.number().int().nonnegative(),
  average_move_time_ms: z.number().nonnegative().nullable(),
});

export const teamPlayerResponseSchema = z.object({
  ...teamPlayerSchema.shape,
  player_access_token: z.string(),
});

export const spectatorCreateResponseSchema = z.object({
  id: z.number().int().positive(),
  game_id: z.string(),
  spectator_name: z.string(),
  spectator_avatar: z.url().optional().nullable(),
  created_at: z.string(),
  spectator_access_token: z.string(),
});

export const gameSchema = z.object({
  id: z.string(),
  status: z
    .enum(
      ['WAITING_PLAYERS', 'PLAYING', 'PAUSED', 'FINISHED'],
      "O status do jogo deve ser 'WAITING_PLAYERS', 'PLAYING', 'PAUSED' ou 'FINISHED'"
    )
    .default('WAITING_PLAYERS'),
  turing_player: teamPlayerSchema.nullable(),
  lovelace_player: teamPlayerSchema.nullable(),
  board: boardSchema,
  current_turn_number: z.number().int().nonnegative(),
  current_turn_team_id: teamIdSchema.nullable(),
  current_turn_phase: turnPhaseSchema,
  winner_team: teamIdSchema.nullable(),
  winner_player_id: z.number().int().nullable(),
  lost_player_id: z.number().int().nullable(),
  started_at: z.string().nullable(),
  finished_at: z.string().nullable(),
  auto_start: z.boolean(),
  created_at: z.string(),
  created_by: z.number().int(),
});

export const gameListResponseSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  page_size: z.number().int().positive(),
  items: z.array(gameSchema),
});

export const gameStreamDtoSchema = z.object({
  game_id: z.string(),
  status: gameStatusSchema,
  turn_number: z.number().int().nonnegative(),
  turn_team_id: teamIdSchema.nullable(),
  turn_phase: turnPhaseSchema,
  board: boardSchema,
  last_action: z.record(z.unknown()).nullable(),
});
