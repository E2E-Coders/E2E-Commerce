import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 dark:bg-slate-950 text-slate-200 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">E2E-Commerce</h3>
          <p className="text-slate-400 leading-relaxed">Marketplace focado em tecnologia, hardware, jogos e acessórios para entusiastas.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Contato</h4>
          <ul className="space-y-1 text-slate-300">
            <li>Email: <a href="mailto:gabrielrsantos.qa@gmail.com" className="hover:text-white">gabrielrsantos.qa@gmail.com</a></li>
            <li>Telefone: (11) 4002-8922</li>
            <li>Endereço: Av. Paulista, 1000 – São Paulo/SP</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Institucional</h4>
          <ul className="space-y-1">
            <li><Link to="/sobre" className="hover:text-white">Sobre nós</Link></li>
            <li><Link to="/termos" className="hover:text-white">Termos de uso</Link></li>
            <li><Link to="/privacidade" className="hover:text-white">Política de privacidade</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Recursos</h4>
            <ul className="space-y-1">
              <li>Promoções 40% OFF</li>
              <li>Catálogo Gamer+</li>
              <li>Dark Mode Persistente</li>
              <li>Estoque Dinâmico</li>
            </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} E2E-Commerce. Todos os direitos reservados.
      </div>
    </footer>
  )
}

export default Footer
