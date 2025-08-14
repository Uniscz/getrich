import { useEffect, useState } from 'react'
import { auth } from '@/lib/supabase.jsx'

export default function NovaSenha() {
  const [ok, setOk] = useState(false)
  const [pwd, setPwd] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // HashRouter: .../#/nova-senha#access_token=...&type=recovery
    const afterFirstHash = window.location.href.split('#').slice(2).join('#')
    const params = new URLSearchParams(afterFirstHash)
    if (params.get('type') === 'recovery' && params.get('access_token')) {
      setOk(true)
    } else {
      setMsg('Link inválido ou expirado.')
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await auth.updatePassword(pwd)
    setLoading(false)
    setMsg(error ? (error.message || 'Erro ao atualizar senha') : 'Senha atualizada! Faça login.')
  }

  if (!ok) return <div style={{padding:16}}>{msg || 'Validando link...'}</div>

  return (
    <form onSubmit={onSubmit} style={{maxWidth:360, margin:'40px auto', padding:16}}>
      <h2>Definir nova senha</h2>
      <input
        type="password"
        placeholder="Nova senha"
        value={pwd}
        onChange={(e)=>setPwd(e.target.value)}
        required
        style={{width:'100%', padding:10, margin:'12px 0'}}
      />
      <button disabled={loading || pwd.length<6}>
        {loading ? 'Salvando...' : 'Salvar senha'}
      </button>
      <p>{msg}</p>
    </form>
  )
}
