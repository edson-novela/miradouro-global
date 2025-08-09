'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useState } from 'react'
import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Viajante frequente",
    content: "A Miradouro Global transformou minha viagem à Itália em uma experiência mágica. Cada detalhe foi pensado para minha comodidade e diversão!",
    rating: 5,
    image: "/images/testimonial1.jpg"
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Aventureiro",
    content: "O safari na Tanzânia organizado por eles foi incrível. Guias experientes e acomodações de primeira linha. Recomendo totalmente!",
    rating: 5,
    image: "/images/testimonial2.jpg"
  },
  {
    id: 3,
    name: "Mariana Costa",
    role: "Blogueira de viagens",
    content: "Já usei vários serviços de agências, mas a atenção aos detalhes da Miradouro Global é incomparável. Meu pacote de lua de mel foi perfeito!",
    rating: 4,
    image: "/images/testimonial3.jpg"
  }
]

export default function Testimonials() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  const [current, setCurrent] = useState(0)

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section className="bg-amber-900 text-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="opacity-90 max-w-2xl mx-auto">
            Depoimentos reais de viajantes que viveram experiências incríveis conosco.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative group"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-10 sm:px-10 sm:py-12 max-w-4xl mx-auto shadow-xl transition-all">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Image 
                src={testimonials[current].image} 
                alt={testimonials[current].name}
                width={128}
                height={128}
                className="rounded-full object-cover border-4 border-amber-400/50 shadow-lg"
              />
              <div className="text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-3 text-amber-400">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <FiStar key={i} className="mx-0.5" />
                  ))}
                </div>
                <p className="text-lg sm:text-xl italic text-amber-100 mb-6 max-w-xl">
                  “{testimonials[current].content}”
                </p>
                <div>
                  <h4 className="font-semibold text-xl text-white">{testimonials[current].name}</h4>
                  <p className="text-amber-300 text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navegação */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all group-hover:opacity-100 opacity-60 sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Depoimento anterior"
          >
            <FiChevronLeft size={24} className="text-amber-300" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all group-hover:opacity-100 opacity-60 sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Próximo depoimento"
          >
            <FiChevronRight size={24} className="text-amber-300" />
          </button>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index ? 'bg-white scale-110' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
