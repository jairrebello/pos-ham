import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, Building2, Briefcase, GraduationCap, HeartPulse, Info, Users } from 'lucide-react';

interface HeaderProps {
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuStructure = [
    {
      id: 'hospital',
      label: 'O Hospital',
      icon: Building2,
      href: 'https://ham.org.br/o-hospital/',
      submenu: [
        { label: 'Quem Somos', href: 'https://ham.org.br/o-hospital/quem-somos/' },
        { label: 'Blog Viva +', href: 'https://ham.org.br/o-hospital/blog-viva/' },
        { label: 'Responsabilidade Ambiental', href: 'https://ham.org.br/o-hospital/responsabilidade-ambiental/' },
        { label: 'Notícias', href: 'https://ham.org.br/category/noticias/' },
        { label: 'Certificações, Premiações e Ações', href: 'https://ham.org.br/o-hospital/certificacoes/' },
        { label: 'Capelania Hospitalar', href: 'https://ham.org.br/o-hospital/capelania-hospitalar/' },
        { label: 'Políticas de Privacidade', href: 'https://ham.org.br/o-hospital/politicas-de-privacidade/' }
      ]
    },
    {
      id: 'servicos',
      label: 'Serviços',
      icon: Briefcase,
      href: 'https://ham.org.br/servicos/',
      submenu: [
        {
          label: 'Nossa Estrutura →',
          href: 'https://ham.org.br/servicos/nossa-estrutura/',
          submenu: [
            { label: 'Centro Oncológico', href: 'https://ham.org.br/oncologia/' },
            { label: 'Centro Cardiológico', href: 'https://ham.org.br/servicos/nossa-estrutura/#centro-cardiologico' },
            { label: 'Centro Ortopédico', href: 'https://ham.org.br/servicos/nossa-estrutura/#centro-ortopedico' },
            { label: 'Centro Ginecológico / Obstetrícia', href: 'https://ham.org.br/servicos/nossa-estrutura/#centro-ginecologico' },
            { label: 'Centro de Radiodiagnóstico', href: 'https://ham.org.br/servicos/nossa-estrutura/#centro-radiodiagnostico' },
            { label: 'Centro Neurológico', href: 'https://ham.org.br/servicos/nossa-estrutura/#centro-neurologico' },
            { label: 'Centro Cirúrgico', href: 'https://ham.org.br/servicos/nossa-estrutura/#centro-cirurgico' },
            { label: 'Centro de Hemodinâmica', href: 'https://ham.org.br/servicos/nossa-estrutura/#centro-hemodinamica' },
            { label: 'Centro de Terapia Intensiva Adulto', href: 'https://ham.org.br/servicos/nossa-estrutura/#cti-adulto' },
            { label: 'Pediatria', href: 'https://ham.org.br/servicos/nossa-estrutura/#pediatria' },
            { label: 'Maternidade', href: 'https://ham.org.br/servicos/nossa-estrutura/#maternidade' },
            { label: 'Laboratório de Análises Clínicas', href: 'https://ham.org.br/servicos/nossa-estrutura/#laboratorio' },
            { label: 'Pronto Atendimento', href: 'https://ham.org.br/servicos/nossa-estrutura/#pa' },
            { label: 'Recepção Vip Exclusive', href: 'https://ham.org.br/servicos/nossa-estrutura/#recepcao' }
          ]
        },
        { label: 'Agendamento de Consultas', href: 'https://ham.org.br/servicos/agendamento/' },
        { label: 'Planos de Saúde', href: 'https://ham.org.br/servicos/planos-de-saude/' },
        { label: 'Encontre Seu Médico', href: 'https://ham.org.br/servicos/encontre-seu-medico/' },
        { label: 'Exames', href: 'https://ham.org.br/servicos/exames-2/' }
      ]
    },
    {
      id: 'ensino',
      label: 'Ensino e Pesquisa',
      icon: GraduationCap,
      href: 'https://ham.org.br/neps/',
      submenu: [
        { label: 'Conheça o NEPS', href: 'https://ham.org.br/neps/' },
        { label: 'Espaço', href: 'https://ham.org.br/neps/#estrutura' },
        { label: 'Programas de Ensino', href: 'https://ham.org.br/neps/#programas-ensino' },
        { label: 'Programas de Capacitação Profissional', href: 'https://ham.org.br/neps/#programas-capacitacao' },
        { label: 'Pesquisa', href: 'https://ham.org.br/neps/#pesquisa' },
        { label: 'Comitê de Ética em Pesquisa', href: 'https://ham.org.br/neps/comite-de-etica-em-pesquisa/' },
        { label: 'Plataforma de Cursos NEPS', href: '/', internal: true }
      ]
    },
    {
      id: 'proasa',
      label: 'Proasa Saúde',
      icon: HeartPulse,
      href: 'https://para.proasasaude.com.br/'
    },
    {
      id: 'central',
      label: 'Central de Informações',
      icon: Info,
      href: 'https://ham.org.br/central-de-informacoes/',
      submenu: [
        { label: 'Horário de Visitas', href: 'https://ham.org.br/central-de-informacoes/#horario-visitas' },
        { label: 'Horário de Trocas de Acompanhantes', href: 'https://ham.org.br/central-de-informacoes/#troca-acompanhantes' },
        { label: 'Horários de Atendimento', href: 'https://ham.org.br/central-de-informacoes/#horario-atendimento' },
        { label: 'Fale Conosco', href: 'https://ham.org.br/central-de-informacoes/#fale-conosco' },
        { label: 'Sala de Imprensa', href: 'https://ham.org.br/central-de-informacoes/#imprensa' },
        { label: 'Visita Técnica', href: 'https://ham.org.br/central-de-informacoes/#visita' },
        { label: 'Transparência', href: 'https://ham.org.br/central-de-informacoes/transparencia/' }
      ]
    },
    {
      id: 'trabalhe',
      label: 'Trabalhe Conosco',
      icon: Users,
      href: 'https://ham.org.br/trabalhe-conosco/'
    }
  ];

  const handleLinkClick = (href: string, internal?: boolean) => {
    if (internal) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      setOpenDropdown(null);
      setIsMobileMenuOpen(false);
    } else {
      window.location.href = href;
    }
  };

  const toggleMobileSubmenu = (menuId: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === menuId ? null : menuId);
  };

  if (isAdmin) {
    return (
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="/admin">
                <img src="/logo-ham.png" alt="Hospital Adventista Manaus" className="w-auto" style={{ maxWidth: '200px', height: 'auto' }} />
              </a>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="/admin" className="text-gray-700 hover:text-[#02558C] font-medium">Dashboard</a>
              <a href="/admin/courses" className="text-gray-700 hover:text-[#02558C] font-medium">Cursos</a>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-md relative z-50" ref={dropdownRef}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{ height: '87px' }}>
          <div className="flex-shrink-0" style={{ margin: '10px 0 0 0' }}>
            <a href="https://ham.org.br/">
              <img
                src="/logo-ham.png"
                srcSet="/logo-ham.png 1x, /logo-ham.png 2x"
                alt="Hospital Adventista de Manaus"
                className="w-auto"
                style={{ maxWidth: '200px', height: 'auto' }}
              />
            </a>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            {menuStructure.map((item) => {
              const Icon = item.icon;
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isOpen = openDropdown === item.id;

              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => {
                      if (hasSubmenu) {
                        setOpenDropdown(isOpen ? null : item.id);
                      } else {
                        handleLinkClick(item.href);
                      }
                    }}
                    onMouseEnter={() => hasSubmenu && setOpenDropdown(item.id)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-[#02558C] font-medium transition-colors duration-200 py-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                    {hasSubmenu && <ChevronDown className="h-3 w-3" />}
                  </button>

                  {hasSubmenu && isOpen && (
                    <div
                      className="absolute left-0 mt-0 w-64 bg-white rounded-md shadow-lg py-2 z-50 animate-fade-in"
                      onMouseLeave={() => {
                        setOpenDropdown(null);
                        setOpenNestedSubmenu(null);
                      }}
                    >
                      {item.submenu?.map((subitem, idx) => (
                        <div key={idx} className="relative">
                          {subitem.submenu ? (
                            <>
                              <button
                                onMouseEnter={() => setOpenNestedSubmenu(`${item.id}-${idx}`)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[rgb(2,85,140)] hover:text-white transition-colors flex items-center justify-between"
                              >
                                {subitem.label.replace(' →', '')}
                                <span className="text-gray-400">›</span>
                              </button>
                              {openNestedSubmenu === `${item.id}-${idx}` && (
                                <div
                                  className="absolute left-full top-0 ml-0 w-64 bg-white rounded-md shadow-lg py-2 z-50 animate-fade-in"
                                  onMouseLeave={() => setOpenNestedSubmenu(null)}
                                >
                                  {subitem.submenu.map((nestedItem, nestedIdx) => (
                                    <a
                                      key={nestedIdx}
                                      href={nestedItem.href}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[rgb(2,85,140)] hover:text-white transition-colors"
                                    >
                                      {nestedItem.label}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <a
                              href={subitem.href}
                              onClick={(e) => {
                                if (subitem.internal) {
                                  e.preventDefault();
                                  handleLinkClick(subitem.href, true);
                                }
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-[rgb(2,85,140)] hover:text-white transition-colors"
                            >
                              {subitem.label}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <button
            className="lg:hidden text-gray-700 hover:text-[#02558C]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-2">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="O que você procura?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02558C]"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <nav className="px-2 pb-3">
            {menuStructure.map((item) => {
              const Icon = item.icon;
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isOpen = openMobileSubmenu === item.id;

              return (
                <div key={item.id} className="border-b last:border-b-0">
                  <button
                    onClick={() => {
                      if (hasSubmenu) {
                        toggleMobileSubmenu(item.id);
                      } else {
                        handleLinkClick(item.href);
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#02558C] transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    {hasSubmenu && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>

                  {hasSubmenu && isOpen && (
                    <div className="bg-gray-50 py-1">
                      {item.submenu?.map((subitem, idx) => (
                        <div key={idx}>
                          <a
                            href={subitem.href}
                            onClick={(e) => {
                              if (subitem.internal) {
                                e.preventDefault();
                                handleLinkClick(subitem.href, true);
                              }
                            }}
                            className="block px-6 py-2 text-sm text-gray-600 hover:text-[#02558C] hover:bg-gray-100"
                          >
                            {subitem.label}
                          </a>
                          {subitem.submenu && (
                            <div className="pl-4 bg-gray-100">
                              {subitem.submenu.map((nestedItem, nestedIdx) => (
                                <a
                                  key={nestedIdx}
                                  href={nestedItem.href}
                                  className="block px-6 py-1.5 text-xs text-gray-500 hover:text-[#02558C]"
                                >
                                  {nestedItem.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};
