import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#005580] to-[#003355] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <a
            href="/agendamento"
            className="bg-cyan-400 hover:bg-cyan-500 text-[#003355] font-semibold py-6 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"
          >
            Agendamento de consulta
          </a>
          <a
            href="/medicos"
            className="bg-cyan-400 hover:bg-cyan-500 text-[#003355] font-semibold py-6 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"
          >
            Encontre seu médico
          </a>
          <a
            href="/exames"
            className="bg-cyan-400 hover:bg-cyan-500 text-[#003355] font-semibold py-6 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"
          >
            Resultado de Exames
          </a>
          <a
            href="/planos"
            className="bg-cyan-400 hover:bg-cyan-500 text-[#003355] font-semibold py-6 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"
          >
            Planos de Saúde
          </a>
        </div>
      </div>

      <div className="bg-[#002233] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="font-bold text-white mb-2">
                Número para Contato: (92) 2123 - 1311 (Agendamento de consultas e exames)
              </p>
              <p className="text-gray-300 text-sm">
                Endereço: Av. Gov. Danilo Areosa, 139, Distrito Industrial - Manaus / AM
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/hospitaladventistademanaus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/HAManaus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/hospitaladventistamanaus/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/c/HospitalAdventistadeManaus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/84282176/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://vm.tiktok.com/ZMNxm1qme/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};