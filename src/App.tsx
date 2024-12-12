import MazeCanvas from "./component/MazeCanvas"
import Maze from "./utils/maze"

const App = () => {
  const maze = new Maze(5, 7)
  return (
    <MazeCanvas maze={maze} />
  )
}

export default App