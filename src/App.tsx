import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import unnamedImage from './assets/unnamed.png';
import { Brush, ChevronRight, Circle, Eraser, FolderKanban, Minus, MousePointer, MoveUpRight, Save, Square } from "lucide-react";
import pad2 from "./assets/pad2.png";
import { useState, useRef } from "react";
import { Stage, Layer, Line, Rect, Arrow } from "react-konva";
import { Circle as KonvaCircle } from "react-konva";
import Konva from "konva";
export default function App() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState("brush");
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [lines, setLines] = useState<{ points: number[]; color: string }[]>([]);
  const [rectangles, setRectangles] = useState<{ x: number; y: number; width: number; height: number; color: string; filled: boolean }[]>([]);
  const [circles, setCircles] = useState<{ x: number; y: number; radius: number; color: string; filled: boolean }[]>([]);
  const [arrows, setArrows] = useState<{ x1: number; y1: number; x2: number; y2: number; color: string }[]>([]);
  const [straightLines, setStraightLines] = useState<{ points: number[]; color: string }[]>([]);
  const [selectedColor, setSelectedColor] = useState('#ede587');
  const isDrawingRef = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawingRef.current = true;
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;

    if (selectedTool === 'brush') {
      setLines([...lines, { points: [point.x, point.y], color: selectedColor }]);
    } else if (selectedTool === 'rectangle' || selectedTool === 'filled-rectangle') {
      setRectangles([...rectangles, {
        x: point.x,
        y: point.y,
        width: 0,
        height: 0,
        color: selectedColor,
        filled: selectedTool === 'filled-rectangle'
      }]);
    } else if (selectedTool === 'circle' || selectedTool === 'filled-circle') {
      setCircles([...circles, {
        x: point.x,
        y: point.y,
        radius: 0,
        color: selectedColor,
        filled: selectedTool === 'filled-circle'
      }]);
    } else if (selectedTool === 'arrow') {
      setArrows([...arrows, { x1: point.x, y1: point.y, x2: point.x, y2: point.y, color: selectedColor }]);
    } else if (selectedTool === 'line') {
      setStraightLines([...straightLines, { points: [point.x, point.y, point.x, point.y], color: selectedColor }]);
    } else if (selectedTool === 'eraser') {
      eraseAtPoint(point.x, point.y);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawingRef.current) return;
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;

    if (selectedTool === 'brush') {
      setLines(prev => {
        const last = prev[prev.length - 1];
        const updated = { ...last, points: [...last.points, point.x, point.y] };
        return [...prev.slice(0, -1), updated];
      });
    } else if (selectedTool === 'rectangle' || selectedTool === 'filled-rectangle') {
      setRectangles(prev => {
        const last = prev[prev.length - 1];
        const updated = {
          ...last,
          width: point.x - last.x,
          height: point.y - last.y,
        };
        return [...prev.slice(0, -1), updated];
      });
    } else if (selectedTool === 'circle' || selectedTool === 'filled-circle') {
      setCircles(prev => {
        const last = prev[prev.length - 1];
        const dx = point.x - last.x;
        const dy = point.y - last.y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        const updated = { ...last, radius };
        return [...prev.slice(0, -1), updated];
      });
    } else if (selectedTool === 'arrow') {
      setArrows(prev => {
        const last = prev[prev.length - 1];
        const updated = { ...last, x2: point.x, y2: point.y };
        return [...prev.slice(0, -1), updated];
      });
    } else if (selectedTool === 'line') {
      setStraightLines(prev => {
        const last = prev[prev.length - 1];
        const updated = { ...last, points: [last.points[0], last.points[1], point.x, point.y] };
        return [...prev.slice(0, -1), updated];
      });
    } else if (selectedTool === 'eraser') {
      eraseAtPoint(point.x, point.y);
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const eraseAtPoint = (x: number, y: number) => {
    const eraserRadius = 10;

    setLines(prev => prev.filter(line => {
      for (let i = 0; i < line.points.length - 1; i += 2) {
        const px = line.points[i];
        const py = line.points[i + 1];
        const distance = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
        if (distance < eraserRadius) return false;
      }
      return true;
    }));

    setRectangles(prev => prev.filter(rect => {
      const minX = Math.min(rect.x, rect.x + rect.width);
      const maxX = Math.max(rect.x, rect.x + rect.width);
      const minY = Math.min(rect.y, rect.y + rect.height);
      const maxY = Math.max(rect.y, rect.y + rect.height);
      return !(x >= minX - eraserRadius && x <= maxX + eraserRadius &&
        y >= minY - eraserRadius && y <= maxY + eraserRadius);
    }));

    setCircles(prev => prev.filter(circle => {
      const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
      return distance > circle.radius + eraserRadius;
    }));

    setArrows(prev => prev.filter(arrow => {
      const { x1, y1, x2, y2 } = arrow;
      const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      if (length === 0) return true;

      const t = Math.max(0, Math.min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / (length ** 2)));
      const projectionX = x1 + t * (x2 - x1);
      const projectionY = y1 + t * (y2 - y1);
      const distance = Math.sqrt((x - projectionX) ** 2 + (y - projectionY) ** 2);
      return distance > eraserRadius;
    }));

    setStraightLines(prev => prev.filter(line => {
      const [x1, y1, x2, y2] = line.points;
      const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      if (length === 0) return true;

      const t = Math.max(0, Math.min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / (length ** 2)));
      const projectionX = x1 + t * (x2 - x1);
      const projectionY = y1 + t * (y2 - y1);
      const distance = Math.sqrt((x - projectionX) ** 2 + (y - projectionY) ** 2);
      return distance > eraserRadius;
    }));
  };

  const handleSave = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL({
        mimeType: 'image/png',
        quality: 1.0,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'drawing.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={`relative overflow-x-hidden ${isDrawing ? 'overflow-y-scroll' : "overflow-y-hidden"}`}>
      {/* bg drawing pad */}
      <motion.div
        className="bg-cover bg-center bg-no-repeat opacity-10 absolute -right-75 -top-50 rotate-45 z-0"
        style={{ backgroundImage: `url(${pad2})`, height: 900, width: 900 }}
        animate={{ x: [-10, 10, -20, 0, 10, -10], y: [-10, 10, -20, 0, 10, -10], rotate: [-2, 2, -3, 0, 2, -2] }}
        transition={{ repeat: Infinity, duration: 33 }}
      />

      {/* navbar */}
      <nav className="flex justify-between p-2 z-10 max-sm:justify-center">
        <div className="flex items-center justify-center gap-2 max-md:scale-80 max-sm:hidden">
          <motion.div
            className="rounded-full bg-gradient-to-br from-gray-200/80 via-gray-500/80 to-blue-300/15 opacity-75 h-14 w-14 shadow-2xl shadow-gray-500/10 backdrop-blur-3xl flex items-center justify-center text-3xl font-semibold"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
          >D</motion.div>
          <div className="max-md:hidden text-xl font-semibold">Drawing App</div>
        </div>
        <div className="flex px-2 py-1 bg-gradient-to-b from-gray-400/30 via-gray-500/30 to-blue-300/10 rounded-xl items-center border border-gray-500/50 shadow-2xl shadow-gray-500/10 max-md:scale-80 max-sm:scale-75">
          <a className="text-white gap-3 hover:bg-gray-300/10 p-3 px-8 rounded-lg transition duration-300 cursor-pointer h-full flex items-center justify-center" href="https://mail.google.com/mail/?view=cm&to=sahilbhaisharma1212@gmail.com" target="_blank">
            <IoMdMail className="text-2xl" /> Email
          </a>
          <a className="text-white gap-3 hover:bg-gray-300/10 p-3 px-8 rounded-lg transition duration-300 cursor-pointer h-full flex items-center justify-center" href="https://github.com/sahilSharma1212" target="_blank">
            <FaGithub className="text-2xl" /> Github
          </a>
          <a className="text-white gap-3 hover:bg-gray-300/10 p-3 px-8 rounded-lg transition duration-300 cursor-pointer flex justify-center items-center" href="https://www.linkedin.com/in/sahil-sharma-822a752a9/" target="_blank">
            <FaLinkedinIn className="text-2xl" /> LinkedIn
          </a>
        </div>
        <motion.div
          className="rounded-full bg-gradient-to-br from-gray-600 via-gray-800 to-black opacity-75 h-14 w-14 shadow-2xl shadow-gray-500/10 max-md:scale-80 max-md:hidden"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
        />
      </nav>

      {/* hero section */}
      <div className="flex flex-col items-center w-screen pt-16 z-10">

        <div className="main-hero-composition flex justify-center items-center gap-56 flex-wrap max-md:gap-32 max-xl:gap-40">
          <div className="flex flex-col relative max-sm:scale-90">
            <div className="flex flex-row justify-between absolute top-0">
              <div className="flex flex-col items-center absolute top-0 left-0">
                <div className="h-12 flex justify-center items-center px-2 py-1 gap-2">
                  <div className="h-10 w-10 flex rounded-full bg-white/20 justify-center items-center">
                    <Square strokeWidth={1} className="w-6 h-6" />
                  </div>
                  <p>Squares</p>
                </div>
                <div className="w-0.5 h-40 bg-gradient-to-r from-white/0 via-white/35 to-white/0 rounded-full">
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
                    animate={{ y: [0, 144, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center absolute top-10 left-35">
                <div className="h-12 flex justify-center items-center px-2 py-1 gap-2">
                  <div className="h-10 w-10 flex rounded-full bg-white/20 justify-center items-center">
                    <MoveUpRight strokeWidth={1} className="w-6 h-6" />
                  </div>
                  <p>Arrows</p>
                </div>
                <div className="w-0.5 h-24 bg-gradient-to-r from-white/0 via-white/35 to-white/0 rounded-full">
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
                    animate={{ y: [0, 144, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center absolute top-2 left-72">
                <div className="h-12 flex justify-center items-center px-2 py-1 gap-2">
                  <div className="h-10 w-10 flex rounded-full bg-white/20 justify-center items-center">
                    <Minus strokeWidth={1} className="w-6 h-6" />
                  </div>
                  <p>Lines</p>
                </div>
                <div className="w-0.5 h-40 bg-gradient-to-r from-white/0 via-white/35 to-white/0 rounded-full">
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
                    animate={{ y: [0, 144, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
            <motion.div
              className="w-96 h-96 bg-cover bg-center rounded-lg shadow-2xl z-20"
              style={{ backgroundImage: `url(${unnamedImage})` }}
              animate={{ y: [4, -2, 3, 1, 0, 5], rotate: [-2, 2, -3, 0, 2, -2] }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            <div className="flex justify-center gap-10 mt-8 text-white">
              <div className="flex flex-col items-center absolute top-70 left-5">
                <div className="w-0.5 h-32 bg-gradient-to-r from-white/0 via-white/35 to-white/0">
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
                    animate={{ y: [0, 100, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow py-1 px-2">
                    <Brush className="w-6 h-6" />
                  </div>
                  <p className="text-sm">Free Draw</p>
                </div>
              </div>

              <div className="flex flex-col items-center absolute top-60 left-38 z-0">
                <div className="w-0.5 h-32 bg-gradient-to-r from-white/0 via-white/35 to-white/0">
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
                    animate={{ y: [0, 100, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow py-1 px-2">
                    <Save className="w-6 h-6" />
                  </div>
                  <p className="text-sm">Save</p>
                </div>
              </div>

              <div className="flex flex-col items-center absolute top-70 left-68">
                <div className="w-0.5 h-28 bg-gradient-to-r from-white/0 via-white/35 to-white/0">
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/45 rounded-full"
                    animate={{ y: [0, 80, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow py-1 px-2">
                    <Circle className="w-6 h-6" />
                  </div>
                  <p className="text-sm">Circles</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 justify-center sm:scale-90 2xl:scale-100">
            <h1 className="text-4xl font-bold bg-gradient-to-br to-gray-400 via-gray-500 from-gray-300 bg-clip-text text-transparent z-10 max-sm:w-80 flex justify-center items-center" style={{ textAlign: "center" }}>
              Draw what you Desire!
            </h1>
            <p className="text-center text-white text-md max-w-lg opacity-80 z-10 max-sm:w-80">
              A minimal interactive drawing interface built using modern frontend tools. Users can draw shapes, lines, arrows, and more using canvas support with animations and responsive UI.
            </p>
            <div className="flex flex-wrap gap-4 justify-center w-xl z-10 max-sm:w-96">
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 min-w-64 hover:-translate-y-2 hover:scale-105 transition-all" href="https://react.dev/" target="_blank">
                <p className="text-sm font-semibold opacity-70">Framework</p>
                <p className="text-md">React <span className="text-xs opacity-70">version 19.0.0</span></p>
                <p className="text-md">Vite <span className="text-xs opacity-70">version 6.3.1</span></p>
              </a>
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 min-w-64 hover:-translate-y-2 hover:scale-105 transition-all" href="https://tailwindcss.com/" target="_blank">
                <p className="text-sm font-semibold opacity-70">UI Design</p>
                <p className="text-md"><span className="opacity-70">Styling </span>- TailwindCSS</p>
                <p className="text-md"><span className="opacity-70">Icons -</span> Lucide | React-Icons</p>
              </a>
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 min-w-64 hover:-translate-y-2 hover:scale-105 transition-all" href="https://motion.dev/docs/react-animation" target="_blank">
                <p className="text-sm font-semibold opacity-70">Animations</p>
                <p className="text-md">Framer Motion</p>
                <p className="text-md">Tailwind Animations</p>
              </a>
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 min-w-64 hover:-translate-y-2 hover:scale-105 transition-all" href="https://konvajs.org/docs/react/index.html" target="_blank">
                <p className="text-sm font-semibold opacity-70">Canvas</p>
                <p className="text-md">Konva <span className="text-xs opacity-70">version 9.3.20</span></p>
                <p className="text-md">React-Konva <span className="text-xs opacity-70">version 19.0.3</span></p>
              </a>
              <div className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 w-96 hover:-translate-y-2 hover:scale-105 transition-all max-sm:w-80">
                <p className="text-md">Deployed with the help of GitPages</p>
              </div>
            </div>
            <div className="flex-col flex gap-4 pt-6 sm:flex-row max-sm:gap-2.5">
              <button className="px-5 py-2 bg-transparent hover:bg-gradient-to-br hover:from-gray-400/20 hover:via-gray-600/20 hover:to-blue-300/10 text-white rounded-xl shadow-lg transition hover:scale-105 duration-300 z-20 border border-gray-500">
                <a href="https://github.com/SahilSharma1212" target="_blank" className="flex items-center gap-2">View Other Projects <FolderKanban strokeWidth={1} /></a>
              </button>
              <button className="px-5 py-2 bg-white hover:bg-gray-300 text-black font-semibold rounded-xl shadow-lg transition hover:scale-105 duration-300 z-20 flex justify-between gap-2 items-center"
                onClick={() => setIsDrawing(!isDrawing)}>
                {isDrawing ? "Stop Drawing" : "Start Drawing"} <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* drawing board and toolbar */}
        <div className={`flex flex-col items-center justify-center mt-14 ${isDrawing ? "visible" : "hidden"}`}>
          <div className="w-full h-[702px] bg-[#06070e] mt-10 z-10 relative">
            <div className="bg-[#0a0c17] flex rounded-lg justify-center gap-3 p-1 absolute top-3 left-[50%] -translate-x-[50%] z-30 shadow-xl shadow-gray-400/5 border border-gray-500/20 max-sm:scale-75 flex-wrap max-w-96">
              <div onClick={() => setSelectedTool('pointer')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "pointer" ? "bg-gray-800" : "bg-transparent"}`}>
                <MousePointer strokeWidth={1} className="text-white w-6 h-6" />
              </div>
              <div onClick={() => setSelectedTool('brush')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "brush" ? "bg-gray-800" : "bg-transparent"}`}>
                <Brush strokeWidth={1} className="text-white w-6 h-6" />
              </div>
              <div onClick={() => setSelectedTool('rectangle')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "rectangle" ? "bg-gray-800" : "bg-transparent"}`}>
                <Square strokeWidth={1} className="text-white w-6 h-6" />
              </div>
              <div onClick={() => setSelectedTool('filled-rectangle')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "filled-rectangle" ? "bg-gray-800" : "bg-transparent"}`}>
                <Square fill="white" strokeWidth={1} className="text-white w-6 h-6" />
              </div>
              <div onClick={() => setSelectedTool('circle')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "circle" ? "bg-gray-800" : "bg-transparent"}`}>
                <Circle strokeWidth={1} className="text-white w-6 h-6" />
              </div>
              <div onClick={() => setSelectedTool('filled-circle')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "filled-circle" ? "bg-gray-800" : "bg-transparent"}`}>
                <Circle fill="white" strokeWidth={1} className="text-white w-6 h-6" />
              </div>
              <div onClick={() => setSelectedTool('line')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "line" ? "bg-gray-800" : "bg-transparent"}`}>
                <Minus strokeWidth={1} className="text-white w-6 h-6" />
              </div>
              <div onClick={() => setSelectedTool('arrow')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "arrow" ? "bg-gray-800" : "bg-transparent"}`}>
                <MoveUpRight strokeWidth={1} className="text-white w-6 h-6" />
              </div>
              <div onClick={() => setSelectedTool('eraser')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "eraser" ? "bg-gray-800" : "bg-transparent"}`}>
                <Eraser strokeWidth={1} className="text-white w-6 h-6" />
              </div>
              <div className="relative">
                <div
                  onClick={() => setShowColorOptions(!showColorOptions)}
                  className={`p-3 hover:bg-gray-800 rounded`}
                >
                  <Circle fill={selectedColor} strokeWidth={1} className="w-6 h-6" />
                </div>
                {showColorOptions && (
                  <div className="flex gap-2 p-2 bg-gray-900 rounded mt-1 absolute -bottom-1">
                    {['#f7928b', '#6f93ed', '#6fed93', '#ede587', 'white'].map((color) => (
                      <div
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          setShowColorOptions(false);
                        }}
                        className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-white' : 'border-gray-600'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div onClick={handleSave} className={`p-3 hover:bg-gray-800 rounded`}>
                <Save strokeWidth={1} className="text-white w-6 h-6" />
              </div>
            </div>
            <Stage
              width={window.innerWidth}
              height={700}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              className="border border-white/50 rounded-3xl"
              ref={stageRef}
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={2}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation="source-over"
                  />
                ))}
                {rectangles.map((rect, i) => (
                  <Rect
                    key={i}
                    x={rect.x}
                    y={rect.y}
                    width={rect.width}
                    height={rect.height}
                    stroke={rect.color}
                    fill={rect.filled ? rect.color : undefined}
                    strokeWidth={2}
                  />
                ))}
                {circles.map((circle, i) => (
                  <KonvaCircle
                    key={i}
                    x={circle.x}
                    y={circle.y}
                    radius={circle.radius}
                    stroke={circle.color}
                    fill={circle.filled ? circle.color : undefined}
                    strokeWidth={2}
                  />
                ))}
                {arrows.map((arrow, i) => (
                  <Arrow
                    key={i}
                    points={[arrow.x1, arrow.y1, arrow.x2, arrow.y2]}
                    stroke={arrow.color}
                    strokeWidth={3}
                    pointerLength={10}
                    pointerWidth={10}
                  />
                ))}
                {straightLines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={2}
                    lineCap="round"
                    globalCompositeOperation="source-over"
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        </div>


      </div>
      <footer className="w-full bg-[#06070e] py-6 mt-10 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex gap-6 max-sm:gap-4 max-sm:flex-col items-center">
            <a
              className="text-white/80 hover:text-white flex items-center gap-2 transition duration-300"
              href="https://mail.google.com/mail/?view=cm&to=sahilbhaisharma1212@gmail.com"
              target="_blank"
            >
              <IoMdMail className="text-xl" /> Email
            </a>
            <a
              className="text-white/80 hover:text-white flex items-center gap-2 transition duration-300"
              href="https://github.com/sahilSharma1212"
              target="_blank"
            >
              <FaGithub className="text-xl" /> Github
            </a>
            <a
              className="text-white/80 hover:text-white flex items-center gap-2 transition duration-300"
              href="https://www.linkedin.com/in/sahil-sharma-822a752a9/"
              target="_blank"
            >
              <FaLinkedinIn className="text-xl" /> LinkedIn
            </a>
          </div>
          <p className="text-white/60 text-sm text-center">
            Drawing App - Built with React, Konva, and Tailwind CSS
          </p>
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Sahil Sharma. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}