import { useEffect, useRef } from "react";
import Maze from "../utils/maze";
import { Container } from "@mui/material";

interface MazeCanvasProps {
  maze: Maze;
  cellWidth?: number;
  cellSize?: number;
}

const MazeCanvas: React.FC<MazeCanvasProps> = ({
  maze, cellWidth = 7, cellSize = 80
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grid = maze.getWalls();

  console.log(grid);
  
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const gridWidth = maze.getWidth();
      const gridHeight = maze.getHeight();
      console.log(gridWidth, gridHeight);
      
      canvas.width = gridHeight * cellSize + cellWidth;
      canvas.height = gridWidth * cellSize + cellWidth;

      for (let x = 0; x < grid[0].length; x++) {
        for (let y = 0; y < grid[0][x].length; y++) {
          if (grid[0][x][y]) {
            ctx.fillStyle = 'black';
            ctx.fillRect(y * cellSize, x * cellSize, cellWidth,cellSize + cellWidth)
          }
        }
      }

      for (let x = 0; x < grid[1].length; x++) {
        for (let y = 0; y < grid[1][x].length; y++) {
          if (grid[1][x][y]) {
            ctx.fillStyle = 'black';
            ctx.fillRect(y * cellSize, x * cellSize, cellWidth + cellSize, cellWidth)
          }
        }
      }
    }
  }, [maze, cellSize, cellWidth, grid])

  return (
   <Container maxWidth='sm'>
      <canvas ref={canvasRef} />
   </Container>
  )
};

export default MazeCanvas;