import { MENU_ITEMS } from "@/constant";
import { actionItemClick } from "@/slice/menuSlice";
import { useRef,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

const Board=()=>{
    const canvasRef= useRef(null);
    const dispatch= useDispatch();
    const {activeMenuItem,activeActionItem}=useSelector(state=>state.menu)
    const {color,size}=useSelector(state=>state.toolbox[activeMenuItem])
    const shouldDraw = useRef(false)
    const drawHistory = useRef([])
    const historyPointer = useRef(1)

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        drawHistory.current.push(imageData)
        historyPointer.current = drawHistory.current.length - 1

        const beginPath = (x, y) => {
            context.beginPath()
            context.moveTo(x, y)
        }
        const drawLine = (x, y) => {
            context.lineTo(x, y)
            context.stroke()
        }
        const handleMouseDown = (e) => {
            shouldDraw.current = true
            beginPath(e.clientX, e.clientY)
        }
        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return
            drawLine(e.clientX, e.clientY)
        }
        const handleMouseUp = (e) => {
            shouldDraw.current = false
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            drawHistory.current.push(imageData)
            historyPointer.current = drawHistory.current.length - 1
        }
        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseup', handleMouseUp)
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseup', handleMouseUp)
        }
    },[])
    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        const changeConfig = (color, size) => {
            context.strokeStyle = color
            context.lineWidth = size
        }

        const handleChangeConfig = (config) => {
            console.log("config", config)
            changeConfig(config.color, config.size)
        }
        changeConfig(color, size)
    }, [color, size])

    useEffect(()=>{
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        if(activeActionItem===MENU_ITEMS.DOWNLOAD){
            const URL = canvas.toDataURL()
            console.log(URL)
            const anchor = document.createElement('a')
            anchor.href = URL
            anchor.download = 'sketch.jpg'
            anchor.click()
        }
        else if(activeActionItem===MENU_ITEMS.UNDO || activeActionItem===MENU_ITEMS.REDO){
            if(historyPointer.current > 0 && activeActionItem === MENU_ITEMS.UNDO) historyPointer.current-=1;
            if(historyPointer.current < drawHistory.current.length -1 && activeActionItem === MENU_ITEMS.REDO) historyPointer.current+=1;
            const imageData = drawHistory.current[historyPointer.current]
            context.putImageData(imageData, 0, 0)
        }
        dispatch(actionItemClick(null))
    },[activeActionItem])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}
export default Board;