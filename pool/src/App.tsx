import Canvas from "./engine/Canvas"
import styled from "styled-components"
import CustomMenu from "./components/drop-menu"
import { useRef, useState } from "react"
import { useMemo } from "react"
import Ball from "./engine/render/actors/ball"


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`


function App() {
  const [menuCoordinates, setMenuCoordinates] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (event: MouseEvent) => {
    setMenuCoordinates({ x: event.clientX, y: event.clientY });
  };

  const bRef = useRef<Ball[]>([new Ball(10,10, 50), new Ball(100,33, 70), new Ball(200, 100, 90)])
  const selectedRef = useRef<{ball:Ball | null}>({ball:null}); 

  const closeMenu = () => {
    setMenuCoordinates(null);
  };

  const memoizedCanvas = useMemo(
    () => <Canvas onContextMenu={handleContextMenu} ballsR={bRef} selectedBall={selectedRef}/>, 
    [selectedRef]);

  return (
    <Container>
      {memoizedCanvas}
      {menuCoordinates && (
        <CustomMenu x={menuCoordinates.x} y={menuCoordinates.y} onClose={closeMenu} selectedBall={selectedRef} />
      )}
    </Container>
  )
}

export default App
