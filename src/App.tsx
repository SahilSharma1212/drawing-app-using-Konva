import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import unnamedImage from './assets/unnamed.png';
import { Brush, ChevronRight, Circle, Eraser, FolderKanban, Minus, MousePointer, MoveUpRight, Save, Square, Text, Type } from "lucide-react";
import pad2 from "./assets/pad2.png"
import { useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import Konva from "konva";



export default function App() {

  const [isDrwaing, setIsDrawing] = useState(false)
  const [selectedTool, setSelectedTool] = useState("Pen")

  const [lines, setLines] = useState<{ points: number[] }[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e:Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (!stage) {
      return; // If the stage is null, exit early
    }
  
  
    const point = stage.getPointerPosition();
    if (!point) {
      return; // If the stage is null, exit early
    }
    setLines([...lines, { points: [point.x, point.y] }]);
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    if (!stage) {
      return; // If the stage is null, exit early
    }
  
    const point = stage.getPointerPosition();
    if (!point) {
      return; // If the stage is null, exit early
    }

    setLines((prevLines) => {
      const lastLine = prevLines[prevLines.length - 1];
      const updatedLine = {
        ...lastLine,
        points: [...lastLine.points, point.x, point.y],
      };
      return [...prevLines.slice(0, -1), updatedLine];
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };


  return (
    <div className={`relative overflow-x-hidden ${isDrwaing ? 'overflow-y-scroll' : "overflow-y-hidden"}`}>

      {/* bg drawing pad */}
      <motion.div
        className="bg-cover bg-center bg-no-repeat opacity-10 absolute -right-75 -top-50 rotate-45 z-0"
        style={{ backgroundImage: `url(${pad2})`, height: 900, width: 900 }}
        animate={{ x: [-10, 10, -20, 0, 10, -10], y: [-10, 10, -20, 0, 10, -10], rotate: [-2, 2, -3, 0, 2, -2] }}
        transition={{ repeat: Infinity, duration: 33 }}
      />




      {/* navbar */}
      <nav className="flex justify-between p-2 z-10 max-sm:justify-center">

        {/* logo */}
        <div className="flex items-center justify-center gap-2 max-md:scale-80 max-sm:hidden">
          <motion.div
            className="rounded-full bg-gradient-to-br from-gray-200/80 via-gray-500/80 to-blue-300/15 opacity-75 h-14 w-14 shadow-2xl shadow-gray-500/10 backdrop-blur-3xl flex items-center justify-center text-3xl font-semibold"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
          >D</motion.div>

          <div className="max-md:hidden text-xl font-semibold">Drawing App</div>
        </div>

        {/* navbar options */}
        <div className="flex px-2 py-1 bg-gradient-to-b from-gray-400/30 via-gray-500/30 to-blue-300/10 rounded-xl items-center border border-gray-500/50 shadow-2xl shadow-gray-500/10 max-md:scale-80 max-sm:scale-75">
          {/* mail */}
          <a className="text-white gap-3 hover:bg-gray-300/10 p-3 px-8 rounded-lg transition duration-300 cursor-pointer h-full flex items-center justify-center" href="https://mail.google.com/mail/?view=cm&to=sahilbhaisharma1212@gmail.com" target="blank">
            <IoMdMail className="text-2xl" /> Email
          </a>
          {/* github */}
          <a className="text-white gap-3 hover:bg-gray-300/10 p-3 px-8 rounded-lg transition duration-300 cursor-pointer h-full flex items-center justify-center" href="https://github.com/sahilSharma1212" target="blank">
            <FaGithub className="text-2xl" />Github
          </a>
          {/* linkedin */}
          <a className="text-white gap-3 hover:bg-gray-300/10 p-3 px-8 rounded-lg transition duration-300 cursor-pointer flex justify-center items-center" href="https://www.linkedin.com/in/sahil-sharma-822a752a9/" target="blank">
            <FaLinkedinIn className="text-2xl" /> Linked IN
          </a>
        </div>

        {/* logo */}
        <motion.div
          className="rounded-full bg-gradient-to-br from-gray-600 via-gray-800 to-black opacity-75 h-14 w-14 shadow-2xl shadow-gray-500/10 max-md:scale-80 max-md:hidden"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
        />
      </nav>




      {/* hero section */}
      <div className="flex flex-col items-center w-screen pt-16 z-10">



        {/* main hero composition */}
        <div className="main-hero-composition flex justify-center items-center gap-56 flex-wrap max-md:gap-32 max-xl:gap-40">



          {/* motion div with background image */}
          <div className="flex flex-col relative max-sm:scale-95 ">

            {/* top features div */}
            <div className="flex flex-row justify-between absolute top-0">


              {/* square feature */}
              <div className="flex flex-col items-center absolute top-0 left-0">

                <div
                  className="h-12 flex justify-center items-center px-2 py-1 gap-2 "
                >
                  <div className="h-10 w-10 flex rounded-full bg-white/20 justify-center items-center">

                    <Square strokeWidth={1} className="w-6 h-6" />
                  </div>
                  <p className="">Sqaures</p>
                </div>
                <div className="w-0.5 h-40 bg-gradient-to-r from-white/0 via-white/35 to-white/0 rounded-full">
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
                    animate={{ y: [0, 144, 0] }} // Moves from top to bottom and back
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>


              {/* arrows feature */}
              <div className="flex flex-col items-center absolute top-10 left-35">

                <div className="h-12 flex justify-center items-center px-2 py-1 gap-2 ">
                  <div className="h-10 w-10 flex rounded-full bg-white/20 justify-center items-center">

                    <MoveUpRight strokeWidth={1} className="w-6 h-6" />
                  </div>
                  <p className="">Arrows</p>
                </div>
                {/* line */}
                <div className="w-0.5 h-24 bg-gradient-to-r from-white/0 via-white/35 to-white/0 rounded-full">
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
                    animate={{ y: [0, 144, 0] }} // Moves from top to bottom and back
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>


              {/* lines feature */}
              <div className="flex flex-col items-center absolute top-2 left-72">

                <div className="h-12 flex justify-center items-center px-2 py-1 gap-2 ">
                  <div className="h-10 w-10 flex rounded-full bg-white/20 justify-center items-center">

                    <Minus strokeWidth={1} className="w-6 h-6" />
                  </div>
                  <p className="">Lines</p>
                </div>
                <div className="w-0.5 h-40 bg-gradient-to-r from-white/0 via-white/35 to-white/0 rounded-full">
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
                    animate={{ y: [0, 144, 0] }} // Moves from top to bottom and back
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

            </div>

            {/* image div */}
            <motion.div
              className="w-96 h-96 bg-cover bg-center rounded-lg shadow-2xl"
              style={{ backgroundImage: `url(${unnamedImage})` }}
              animate={{ y: [4, -2, 3, 1, 0, 5], rotate: [-2, 2, -3, 0, 2, -2] }}
              transition={{ duration: 15, repeat: Infinity }}
            />

            {/* new features section */}
            <div className="flex justify-center gap-10 mt-8 text-white">

              {/* free draw feature */}
              <div className="flex flex-col items-center absolute top-70 left-5">

                <div className="w-0.5 h-32 bg-gradient-to-r from-white/0 via-white/35 to-white/0">

                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
                    animate={{ y: [0, 100, 0] }} // Moves from top to bottom and back
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



              {/* text feature */}
              <div className="flex flex-col items-center absolute top-70 left-39">

                <div className="w-0.5 h-20 bg-gradient-to-r from-white/0 via-white/35 to-white/0">
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
                    animate={{ y: [0, 50, 0] }} // Moves from top to bottom and back
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex gap-2 items-center">

                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow py-1 px-2">
                    <Text className="w-6 h-6" />
                  </div>
                  <p className="text-sm">Text</p>
                </div>

              </div>



              {/* circles feature */}
              <div className="flex flex-col items-center absolute top-70 left-68">

                <div className="w-0.5 h-28 bg-gradient-to-r from-white/0 via-white/35 to-white/0">
                  {/* moving line div */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/45 rounded-full"
                    animate={{ y: [0, 80, 0] }} // Moves from top to bottom and back
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


          {/* tech used boxes + summary + buttons */}
          <div className=" flex flex-col items-center gap-6 justify-center sm:scale-90 2xl:scale-100">



            {/* hero heading */}
            <h1 className="text-4xl font-bold bg-gradient-to-br to-gray-400 via-gray-500 from-gray-300 bg-clip-text text-transparent z-10 max-sm:w-80 flex justify-center items-center" style={{textAlign:"center"}}>
              Draw what you Desire!
            </h1>




            {/* Summary */}
            <p className="text-center text-white text-md max-w-lg opacity-80 z-10 max-sm:w-80">
              A minimal interactive drawing interface built using modern frontend tools. Users can draw shapes, lines, arrows, and more using canvas support with animations and responsive UI.
            </p>



            {/* Tech Boxes */}
            <div className="flex flex-wrap gap-4 justify-center w-xl z-10 max-sm:w-96 ">

              {/* Framework */}
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 min-w-64 hover:-translate-y-2 hover:scale-105 transition-all" href="https://react.dev/" target="blank">
                <p className="text-sm font-semibold opacity-70">Framework</p>
                <p className="text-md">React <span className="text-xs opacity-70">version 19.0.0</span></p>
                <p className="text-md">Vite <span className="text-xs opacity-70">version 6.3.1</span></p>
              </a>

              {/* Styling */}
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 min-w-64 hover:-translate-y-2 hover:scale-105 transition-all" href="https://tailwindcss.com/" target="blank">
                <p className="text-sm font-semibold opacity-70">UI Design</p>
                <p className="text-md"><span className="opacity-70">Styling </span>- TailwindCSS</p>
                <p className="text-md"><span className="opacity-70">Icons -</span> Lucide | React-Icons</p>
              </a>

              {/* Animations */}
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 min-w-64 hover:-translate-y-2 hover:scale-105 transition-all" href="https://motion.dev/docs/react-animation" target="blank">
                <p className="text-sm font-semibold opacity-70">Animations</p>
                <p className="text-md">Framer Motion</p>
                <p className="text-md">Tailwind Animations</p>
              </a>

              {/* Canvas */}
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 min-w-64 hover:-translate-y-2 hover:scale-105 transition-all" href="https://konvajs.org/docs/react/index.html" target="blank">
                <p className="text-sm font-semibold opacity-70">Canvas</p>
                <p className="text-md">Konva <span className="text-xs opacity-70">version 9.3.20</span></p>
                <p className="text-md">React-Konva <span className="text-xs opacity-70">version 19.0.3</span></p>
              </a>

              {/* deployed with gitpages */}
              <div className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 w-96  hover:-translate-y-2 hover:scale-105 transition-all max-sm:w-80">
                <p className="text-md">Deployed with the help of GitPages </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button className="px-5 py-2 bg-transparent hover:bg-gradient-to-br hover:from-gray-400/20 hover:via-gray-600/20 hover:to-blue-300/10 text-white rounded-xl shadow-lg transition hover:scale-105 duration-300 z-20 border border-gray-500">
                <a href="https://github.com/SahilSharma1212" target="blank" className="flex items-center gap-2">View Other Projects <FolderKanban strokeWidth={1} /></a>
              </button>
              <button className="px-5 py-2 bg-white hover:bg-gray-300 text-black font-semibold rounded-xl shadow-lg transition hover:scale-105 duration-300 z-20 flex gap-2 items-center"
                onClick={() => setIsDrawing(!isDrwaing)}>
                {isDrwaing ? "Stop Drawing" : "Start Drawing"} <ChevronRight />
              </button>
            </div>
          </div>




        </div>


        {/* drawing board and toolbar */}
        <div className="flex flex-col items-center justify-center mt-14">
          


          {/* drawing board */}
          <div className="w-full h-[702px] bg-[#06070e] mt-10 z-10 relative">

            {/* Toolbar */}
          <div className="bg-[#0a0c17] flex rounded-lg justify-center gap-3 p-1 absolute top-3 left-[50%] -translate-x-[50%] z-30 shadow-xl shadow-gray-400/5 border border-gray-500/20">
            <div onClick={() => setSelectedTool('pointer')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "pointer" ? "bg-gray-800" : "bg-transparent"}`}>
              <MousePointer strokeWidth={1} className="text-white w-6 h-6" />
            </div>
            <div onClick={() => setSelectedTool('brush')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "brush" ? "bg-gray-800" : "bg-transparent"}`}>
              <Brush strokeWidth={1} className="text-white w-6 h-6" />
            </div>
            <div onClick={() => setSelectedTool('line')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "line" ? "bg-gray-800" : "bg-transparent"}`}>
              <Minus strokeWidth={1} className="text-white w-6 h-6" />
            </div>
            <div onClick={() => setSelectedTool('rectangle')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "rectangle" ? "bg-gray-800" : "bg-transparent"}`}>
              <Square strokeWidth={1} className="text-white w-6 h-6" />
            </div>
            <div onClick={() => setSelectedTool('circle')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "circle" ? "bg-gray-800" : "bg-transparent"}`}>
              <Circle strokeWidth={1} className="text-white w-6 h-6" />
            </div>
            <div onClick={() => setSelectedTool('text')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "text" ? "bg-gray-800" : "bg-transparent"}`}>
              <Type strokeWidth={1} className="text-white w-6 h-6" />
            </div>
            <div onClick={() => setSelectedTool('move')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "move" ? "bg-gray-800" : "bg-transparent"}`}>
              <MoveUpRight strokeWidth={1} className="text-white w-6 h-6" />
            </div>
            <div onClick={() => setSelectedTool('eraser')} className={`p-3 hover:bg-gray-800 rounded ${selectedTool === "eraser" ? "bg-gray-800" : "bg-transparent"}`}>
              <Eraser strokeWidth={1} className="text-white w-6 h-6" />
            </div>
            <div onClick={()=>console.log("hi")} className={`p-3 hover:bg-gray-800 rounded`}>
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
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke="#fff"
                    strokeWidth={2}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation="source-over"
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        </div>


      </div>
    </div>
  );
}
