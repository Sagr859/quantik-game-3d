import { atom } from 'recoil'
import { OpenBoardPositions } from './utils/validPositions';

export const playerACoinState = atom({
    key     :   "playerACoin",
    default :   [
                    {
                        c_shape     :   'cube',
                        coin_id     :   'cube1_p1',
                        pos         :   [4.2, -16.2],
                        player_id   :   0,
                        status      :   false 
                    },
                    {
                        c_shape     :   'cube',
                        coin_id     :   'cube2_p1',
                        pos         :   [-4.2, -16.2],
                        player_id   :   0,
                        status      :   false 
                    },
                    {
                        c_shape     :   'sphere',
                        coin_id     :   'sphere1_p1',
                        pos         :   [8.7, -16.2],
                        player_id   :   0,
                        status      :   false 
                    },
                    {
                        c_shape     :   'sphere',
                        coin_id     :   'sphere2_p1',
                        pos         :   [-8.7, -16.2],
                        player_id   :   0,
                        status      :   false 
                    },
                    {
                        c_shape     :   'cone',
                        coin_id     :   'cone1_p1',
                        pos         :   [2.2, -14.0],
                        player_id   :   0,
                        status      :   false 
                    },
                    {
                        c_shape     :   'cone',
                        coin_id     :   'cone2_p1',
                        pos         :   [-2.2, -14.0],
                        player_id   :   0,
                        status      :   false 
                    },
                    {
                        c_shape     :   'cylinder',
                        coin_id     :   'cylinder1_p1',
                        pos         :   [6.7, -14.0],
                        player_id   :   0,
                        status      :   false 
                    },
                    {
                        c_shape     :   'cylinder',
                        coin_id     :   'cylinder2_p1',
                        pos         :   [-6.7, -14.0],
                        player_id   :   0,
                        status      :   false 
                    }
                ]
});

export const playerBCoinState = atom({
    key     :   "playerBCoin",
    default :   [
                    {
                        c_shape     :   'cube',
                        coin_id     :   'cube1_p2',
                        pos         :   [4.2, 16.2],
                        player_id   :   1,
                        status      :   false 
                    },
                    {
                        c_shape     :   'cube',
                        coin_id     :   'cube2_p2',
                        pos         :   [-4.2, 16.2],
                        player_id   :   1,
                        status      :   false 
                    },
                    {
                        c_shape     :   'sphere',
                        coin_id     :   'sphere1_p2',
                        pos         :   [8.7, 16.2],
                        player_id   :   1,
                        status      :   false 
                    },
                    {
                        c_shape     :   'sphere',
                        coin_id     :   'sphere2_p2',
                        pos         :   [-8.7, 16.2],
                        player_id   :   1,
                        status      :   false 
                    },
                    {
                        c_shape     :   'cone',
                        coin_id     :   'cone1_p2',
                        pos         :   [2.2, 14.0],
                        player_id   :   1,
                        status      :   false 
                    },
                    {
                        c_shape     :   'cone',
                        coin_id     :   'cone2_p2',
                        pos         :   [-2.2, 14.0],
                        player_id   :   1,
                        status      :   false 
                    },
                    {
                        c_shape     :   'cylinder',
                        coin_id     :   'cylinder1_p2',
                        pos         :   [6.7, 14.0],
                        player_id   :   1,
                        status      :   false 
                    },
                    {
                        c_shape     :   'cylinder',
                        coin_id     :   'cylinder2_p2',
                        pos         :   [-6.7, 14.0],
                        player_id   :   1,
                        status      :   false 
                    }
                ]
});

export const openGridState = atom({
    key     :   "openGridPos",
    default :   [...OpenBoardPositions]
})

export const gameStatus = atom({
    key : "gameStatus",
    default : {
        gameState : null, // null=> not started, 1=> started, 0=> ended
        gameResult : null, // null => game inprogress 1 => won 0 => tie 
        p1_status : null, // null => game inprogress, 1=> won/tie, 0=> lost
        p2_status : null, // null => game inprogress, 1=> won/tie, 0=> lost
        turn : 1, //oddNo => p1, evenNo => p2
    }
})