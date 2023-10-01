export const CoinPositions = [
    [  2.2,  14 ],  [  4.2,  16.2 ],  [  6.7,  14 ],  [  8.7,  16.2 ],
    [ -2.2,  14 ],  [ -4.2,  16.2 ],  [ -6.7,  14 ],  [ -8.7,  16.2 ],

    [  2.2, -14 ],  [  4.2, -16.2 ],  [  6.7, -14 ],  [  8.7, -16.2 ],
    [ -2.2, -14 ],  [ -4.2, -16.2 ],  [ -6.7, -14 ],  [ -8.7, -16.2 ]
]
// [cone], [cube], [cylinder], [sphere], ...
export const PlayPositions = [
    [  2.2,  2.2 ],  [  2.2,  6.7 ],  [  6.7,  2.2 ],  [  6.7,  6.7 ],
    [ -2.2,  2.2 ],  [ -2.2,  6.7 ],  [ -6.7,  2.2 ],  [ -6.7,  6.7 ],
    [  2.2, -2.2 ],  [  2.2, -6.7 ],  [  6.7, -2.2 ],  [  6.7, -6.7 ],
    [ -2.2, -2.2 ],  [ -2.2, -6.7 ],  [ -6.7, -2.2 ],  [ -6.7, -6.7 ]
]

export const OpenBoardPositions = [
    {
        pos         : [2.2, 2.2],
        region      : 1,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [2.2, 6.7],
        region      : 1,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [6.7, 2.2],
        region      : 1,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [6.7, 6.7],
        region      : 1,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [-2.2, 2.2],
        region      : 2,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [-2.2, 6.7],
        region      : 2,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [-6.7, 2.2],
        region      : 2,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [-6.7, 6.7],
        region      : 2,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [2.2, -2.2],
        region      : 3,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [2.2, -6.7],
        region      : 3,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [6.7, -2.2],
        region      : 3,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [6.7, -6.7],
        region      : 3,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [-2.2, -2.2],
        region      : 4,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [-2.2, -6.7],
        region      : 4,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [-6.7, -2.2],
        region      : 4,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    },
    {
        pos         : [-6.7, -6.7],
        region      : 4,
        shapeList   : [],
        currCoin    : { shape : null, player : null },
        cellStatus  : false   //true => win. 
    }
]