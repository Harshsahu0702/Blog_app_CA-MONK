import { motion } from 'framer-motion';

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* White Base Background */}
            <div className="absolute inset-0 bg-white" />

            {/* Moving Grid Pattern - Improved Visibility */}
            <div className="absolute inset-0 bg-grid-animated opacity-60" />

            {/* Radial Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-transparent to-white/40" />

            {/* Floating Orbs - Adjusted Colors for 'Crazy' Light Theme */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/30 blur-[100px]"
            />
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/30 blur-[100px]"
            />
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-pink-500/20 blur-[80px]"
            />
        </div>
    );
}
