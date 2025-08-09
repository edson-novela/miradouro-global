'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RxPaperPlane } from "react-icons/rx";

export default function Newsletter() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="section-padding bg-gradient-to-r from-amber-500 to-amber-600 text-white">
      <div className="max-w-4xl mx-auto py-24">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Receba Ofertas Exclusivas</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Assine nossa newsletter e seja o primeiro a saber sobre nossos pacotes promocionais
          </p>
          
          <motion.form 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              className="flex-grow px-4 border text-white border-amber-50 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />
            <button 
              type="submit" 
              className="bg-amber-900 cursor-pointer hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-all"
            >
              <span>Assinar</span>
              <RxPaperPlane className="ml-2" />
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}