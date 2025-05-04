class KnightTravails {

    constructor() {

    }

    /**
     * Moves the knight from the initial point to the end following
     * the shortest possible way
     * @param {*} start The initial coordinates
     * @param {*} end The final coordinates
     */
    knightMoves(start, end) {
        //Function constants
        const MAX_X = 7;
        const MAX_Y = 7;
        const MIN_X = 0;
        const MIN_Y = 0;

        let pathFound = [];

        /**
         * Returns the possible moves for the knight from the given coordinates
         * @param {*} coordinates 
         */
        const calculatePossibleMoves = (coordinates) => {

            //Store all the possible moves
            let possibleMoves = [
                [coordinates[0]-2, coordinates[1]+1],
                [coordinates[0]-1, coordinates[1]+2],
                [coordinates[0]+1, coordinates[1]+2],
                [coordinates[0]+2, coordinates[1]+1],
                [coordinates[0]+2, coordinates[1]-1],
                [coordinates[0]+1, coordinates[1]-2],
                [coordinates[0]-1, coordinates[1]-2],
                [coordinates[0]-2, coordinates[1]-1]
            ];

            //Filter the possible moves to determine if they are within the boundaries of the chessboard
            return possibleMoves.filter((coordinate) => {
                return coordinate[0] >= MIN_X && coordinate[0] <= MAX_X &&
                       coordinate[1] >= MIN_Y && coordinate[1] <= MAX_Y;
            })
        }

        const findPathRecursive = (start, end, actualPath, pathFound) => {
            //If the path we are following is longer than the path stored, this is not the way
            if (pathFound.length > 0 && actualPath.length > pathFound.length) {
                return;
            };

            if (start[0] === end[0] && start[1] === end[1]) {
                pathFound.length = 0;
                pathFound.push(...actualPath);
                return;
            }

            const possiblePaths = calculatePossibleMoves(start);

            //Filter so we dont repeat nodes
            const possiblePathsFiltered = possiblePaths.filter(coordinate => {
                return !actualPath.some(storedCoordinate => 
                    storedCoordinate[0] === coordinate[0] && storedCoordinate[1] === coordinate[1]
                );
            });

            possiblePathsFiltered.forEach(coordinate => {
                actualPath.push(coordinate);
                findPathRecursive(coordinate, end, actualPath, pathFound);
                actualPath.pop();
            });
        }

        findPathRecursive(start, end, [start], pathFound);
        console.log(`You made it in ${pathFound.length - 1} moves! Here's your path:`);
        console.log(pathFound); 
    }
}