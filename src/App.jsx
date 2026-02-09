import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

const PIX_KEY = '8e027698-75aa-4f73-9809-f9b576bf0e44'

function Toast({ message, visible, onDone }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onDone, 2200)
      return () => clearTimeout(t)
    }
  }, [visible, onDone])

  if (!visible) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="toast-enter bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full shadow-2xl">
        {message}
      </div>
    </div>
  )
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  }
  // Fallback
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  try {
    document.execCommand('copy')
    document.body.removeChild(textarea)
    return Promise.resolve()
  } catch {
    document.body.removeChild(textarea)
    return Promise.reject()
  }
}

function HeroSection() {
  const ref = useRef(null)

  const scrollToPix = () => {
    const el = document.getElementById('pix')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] text-white"
        >
          Enquanto cancelam histórias,{' '}
          <br className="hidden sm:block" />
          eu continuo criando.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 text-lg sm:text-xl md:text-2xl font-light text-white/70 tracking-wide"
        >
          Independência criativa. Sem estúdio. Sem permissão.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10"
        >
          <button
            onClick={scrollToPix}
            className="inline-flex items-center gap-2 bg-white text-black font-medium text-base sm:text-lg px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-300 cursor-pointer active:scale-95"
          >
            Financiar a Próxima Obra
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function ManifestoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-[#f5f5f7] py-24 sm:py-32 md:py-40">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-[#1d1d1f]"
        >
          Sem emissora.{' '}
          <br className="hidden sm:block" />
          Sem investidores.{' '}
          <br className="hidden sm:block" />
          Sem roteiro imposto.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 text-lg sm:text-xl md:text-2xl font-light text-[#6e6e73] leading-relaxed max-w-2xl mx-auto"
        >
          Cada episódio é produzido de forma independente.
          Este projeto cresce com quem acredita.
        </motion.p>
      </div>
    </section>
  )
}

function PixSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [toast, setToast] = useState({ visible: false, message: '' })

  const handleCopy = useCallback(async () => {
    try {
      await copyToClipboard(PIX_KEY)
      setToast({ visible: true, message: 'Chave copiada' })
    } catch {
      // Fallback: show key for manual copy
      setToast({ visible: true, message: 'Segure para copiar a chave' })
    }
  }, [])

  return (
    <section id="pix" ref={ref} className="bg-black py-24 sm:py-32 md:py-40">
      <div className="max-w-xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white"
        >
          Contribuir via PIX
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-4 text-base sm:text-lg font-light text-white/50"
        >
          Contribuição voluntária para acelerar a próxima produção.
        </motion.p>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={handleCopy}
            className="group relative cursor-pointer rounded-2xl overflow-hidden transition-transform duration-300 active:scale-95 hover:scale-[1.02]"
            aria-label="Copiar chave PIX"
          >
            <div className="bg-white p-4 sm:p-5 rounded-2xl">
              <img
                src="/qrcode-pix-clean.png"
                alt="QR Code PIX"
                className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]"
                draggable={false}
              />
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                Toque para copiar a chave
              </span>
            </div>
          </button>
        </motion.div>

        {/* PIX Key */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8"
        >
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3 font-medium">
            Chave PIX
          </p>
          <p className="text-sm sm:text-base text-white/60 font-mono break-all select-all leading-relaxed">
            {PIX_KEY}
          </p>
        </motion.div>

        {/* Copy button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6"
        >
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 cursor-pointer active:scale-95 backdrop-blur-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copiar chave
          </button>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <a
            href="mailto:contato@exemplo.com"
            className="text-sm text-white/30 hover:text-white/50 transition-colors duration-300"
          >
            Parcerias e contato
          </a>
        </motion.div>
      </div>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onDone={() => setToast({ visible: false, message: '' })}
      />
    </section>
  )
}

export default function App() {
  return (
    <main>
      <HeroSection />
      <ManifestoSection />
      <PixSection />
    </main>
  )
}
