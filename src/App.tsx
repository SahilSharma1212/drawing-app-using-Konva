import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import unnamedImage from './assets/unnamed.png';
import { Brush, ChevronRight, Circle, FolderKanban, Minus, MoveUpRight, Square, Text } from "lucide-react";
import pad2 from "./assets/pad2.png"

export default function App() {
  return (
    <div className="relative">

      {/* bg drawing pad */}
      <motion.div
        className="bg-cover bg-center bg-no-repeat opacity-15 absolute -right-75 -top-50 rotate-45 z-0"
        style={{ backgroundImage: `url(${pad2})`, height: 900, width: 900 }}
        animate={{ x: [-10, 10, -20, 0, 10, -10], y: [-10, 10, -20, 0, 10, -10], rotate: [-2, 2, -3, 0, 2, -2] }}
        transition={{ repeat: Infinity, duration: 33 }}
      />


      {/* navbar */}
      <nav className="flex justify-between p-2 z-10">

        {/* logo */}
        <motion.div
          className="rounded-full bg-gradient-to-br from-gray-200/80 via-gray-500/80 to-blue-300/15 opacity-75 h-14 w-14 shadow-2xl shadow-gray-500/10 backdrop-blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
        />

        {/* navbar options */}
        <div className="flex px-2 py-1 bg-gradient-to-b from-gray-400/30 via-gray-500/30 to-blue-300/10 rounded-xl items-center border border-gray-500/50 shadow-2xl shadow-gray-500/10">
        {/* mail */}
          <a className="flex text-white gap-3 hover:bg-gray-300/10 p-3 px-8 rounded-lg transition duration-300 cursor-pointer" href="https://mail.google.com/mail/?view=cm&to=sahilbhaisharma1212@gmail.com" target="blank">
            <IoMdMail className="text-2xl" /> Email
          </a>
          {/* github */}
          <a className="flex text-white gap-3 hover:bg-gray-300/10 p-3 px-8 rounded-lg transition duration-300 cursor-pointer" href="https://github.com/sahilSharma1212" target="blank">
            <FaGithub className="text-2xl" />Github
          </a>
          {/* linkedin */}
          <a className="flex text-white gap-3 hover:bg-gray-300/10 p-3 px-8 rounded-lg transition duration-300 cursor-pointer" href="https://www.linkedin.com/in/sahil-sharma-822a752a9/" target="blank">
            <FaLinkedinIn className="text-2xl" /> Linked IN
          </a>
        </div>

        {/* logo */}
        <motion.div
          className="rounded-full bg-gradient-to-br from-gray-600 via-gray-800 to-black opacity-75 h-14 w-14 shadow-2xl shadow-gray-500/10"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
        />
      </nav>




      {/* hero section */}
      <div className="flex flex-col items-center w-screen pt-16 z-10">



        {/* main hero composition */}
        <div className="main-hero-composition flex justify-center items-center gap-56 flex-wrap mt-4">



          {/* motion div with background image */}
          <div className="flex flex-col relative">

            {/* top features div */}
            <div className="flex flex-row justify-between absolute top-0">


              {/* square feature */}
              <div className="flex flex-col items-center absolute top-0 left-0">

                <motion.div
                className="h-12 flex justify-center items-center px-2 py-1 gap-2 "
                animate={{y:[-3,3,-2,4]}}
                transition={{duration:10,repeat:Infinity}}
                >
                  <div className="h-10 w-10 flex rounded-full bg-white/20 justify-center items-center">

                    <Square strokeWidth={1} className="w-6 h-6" />
                  </div>
                  <p className="">Sqaures</p>
                </motion.div>
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
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/35 rounded-full"
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
          <div className="flex flex-col items-center gap-6 justify-center">



            {/* hero heading */}
            <h1 className="text-4xl font-bold bg-gradient-to-br to-gray-400 via-gray-500 from-gray-300 bg-clip-text text-transparent z-10">
              Draw what you Desire!
            </h1>




            {/* Summary */}
            <p className="text-center text-white text-md max-w-xl opacity-80 z-10">
              A minimal interactive drawing interface built using modern frontend tools. Users can draw shapes, lines, arrows, and more using canvas support with animations and responsive UI.
            </p>



            {/* Tech Boxes */}
            <div className="flex flex-wrap gap-4 justify-center w-[420px] z-10">

              {/* Framework */}
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30" href="https://react.dev/" target="blank">
                <p className="text-sm font-semibold opacity-70">Framework</p>
                <p className="text-md">React <span className="text-xs opacity-70">version 19.0.0</span></p>
                <p className="text-md">Vite <span className="text-xs opacity-70">version 6.3.1</span></p>
              </a>

              {/* Styling */}
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30" href="https://tailwindcss.com/" target="blank">
                <p className="text-sm font-semibold opacity-70">UI Design</p>
                <p className="text-md"><span className="opacity-70">Styling </span>- TailwindCSS</p>
                <p className="text-md"><span className="opacity-70">Icons -</span> Lucide | React-Icons</p>
              </a>

              {/* Animations */}
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30" href="https://motion.dev/docs/react-animation" target="blank">
                <p className="text-sm font-semibold opacity-70">Animations</p>
                <p className="text-md">Framer Motion</p>
                <p className="text-md">Tailwind Animations</p>
              </a>

              {/* Canvas */}
              <a className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30" href="https://konvajs.org/docs/react/index.html" target="blank">
                <p className="text-sm font-semibold opacity-70">Canvas</p>
                <p className="text-md">Konva <span className="text-xs opacity-70">version 9.3.20</span></p>
                <p className="text-md">React-Konva <span className="text-xs opacity-70">version 19.0.3</span></p>
              </a>

              {/* Canvas */}
              <div className="px-4 py-3 text-white rounded-xl shadow-2xl bg-gradient-to-br from-gray-400/20 via-gray-600/20 to-blue-300/10 backdrop-blur-lg border border-white/10 hover:border-white/30 ">
                <p className="text-md">Deployed with the help of GitPages </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button className="px-5 py-2 bg-transparent hover:bg-gradient-to-br hover:from-gray-400/20 hover:via-gray-600/20 hover:to-blue-300/10 text-white rounded-xl shadow-lg transition hover:scale-105 duration-300 z-20 border border-gray-500">
                <a href="https://github.com/SahilSharma1212" target="blank" className="flex items-center gap-2">View Other Projects <FolderKanban strokeWidth={1}/></a>
              </button>
              <button className="px-5 py-2 bg-white hover:bg-gray-300 text-black font-semibold rounded-xl shadow-lg transition hover:scale-105 duration-300 z-20 flex gap-2">
                Start Drawing <ChevronRight />
              </button>
            </div>
          </div>




        </div>


      </div>
    </div>
  );
}
