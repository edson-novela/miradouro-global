'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCompass, FiBriefcase, FiHeart, FiShield } from 'react-icons/fi'

interface Service {
  icon: React.ReactNode
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: <FiCompass className="text-3xl" />,
    title: "Roteiros Personalizados",
    description: "Criamos itinerários sob medida para atender seus desejos e necessidades."
  },
  {
    icon: <FiBriefcase className="text-3xl" />,
    title: "Viagens Corporativas",
    description: "Soluções completas para viagens de negócios com conforto e eficiência."
  },
  {
    icon: <FiHeart className="text-3xl" />,
    title: "Lua de Mel",
    description: "Pacotes românticos para tornar seu momento ainda mais especial."
  },
  {
    icon: <FiShield className="text-3xl" />,
    title: "Seguro Viagem",
    description: "Proteção completa para sua tranquilidade durante a viagem."
  }
]

export default function Services() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto py-32 px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="mb-16"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-4 text-amber-600">
            Nossos Serviços
          </motion.h2>
          <motion.p variants={item} className="text-gray-600">
            Oferecemos soluções completas para tornar sua viagem perfeita
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4 text-amber-600">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}