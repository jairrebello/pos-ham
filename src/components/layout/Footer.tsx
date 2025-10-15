import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#02558C' }}>
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <span className="text-xl font-bold">UNIAENE</span>
            </div>
            <p className="text-gray-300 mb-4">
              Centro Universitário Adventista de Ensino do Nordeste oferecendo cursos de pós-graduação 
              de excelência para formar profissionais qualificados e éticos.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/cursos" className="text-gray-300 hover:text-white">Cursos</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">Sobre Nós</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contato</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300">(85) 3101-9000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">contato@uniaene.edu.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-300">Cachoeira Paulista - SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 UNIAENE. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};