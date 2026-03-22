import { Gamepad2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/ccaa-logo.svg"
              alt="CCAA Logo"
              className="h-10 w-auto"
            />
            <div className="h-8 w-px bg-blue-700" />
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-red-400" />
              <span className="font-semibold">Easter Games</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-blue-200">
              Desenvolvido por <span className="text-white font-medium">Teacher Breno Vitoriano</span>
            </p>
            <p className="text-xs text-blue-300 mt-1">
              CCAA - Centro de Cultura Anglo Americana
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-blue-800 text-center">
          <p className="text-xs text-blue-300">
            © 2025 CCAA - Todos os direitos reservados 🐰
          </p>
        </div>
      </div>
    </footer>
  )
}
