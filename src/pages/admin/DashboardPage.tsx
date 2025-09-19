import React from 'react';
import { Header } from '../../components/layout/Header';
import { GraduationCap, Users, BookOpen, TrendingUp } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const stats = [
    {
      label: 'Total de Cursos',
      value: '12',
      icon: GraduationCap,
      color: 'bg-blue-500',
      change: '+2 este mês'
    },
    {
      label: 'Cursos Ativos',
      value: '8',
      icon: BookOpen,
      color: 'bg-green-500',
      change: '66% do total'
    },
    {
      label: 'Total de Inscrições',
      value: '247',
      icon: Users,
      color: 'bg-purple-500',
      change: '+15 esta semana'
    },
    {
      label: 'Taxa de Conversão',
      value: '23%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5% vs. mês anterior'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAdmin />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Visão geral do sistema de gestão de cursos</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/courses/new"
              className="block bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-blue-900">Novo Curso</h3>
              <p className="text-blue-700 text-sm">Criar um novo curso de pós-graduação</p>
            </a>
            <a
              href="/admin/courses"
              className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors"
            >
              <h3 className="font-semibold text-green-900">Gerenciar Cursos</h3>
              <p className="text-green-700 text-sm">Ver e editar cursos existentes</p>
            </a>
            <a
              href="/admin/settings"
              className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition-colors"
            >
              <h3 className="font-semibold text-purple-900">Configurações</h3>
              <p className="text-purple-700 text-sm">Configurar o site e preferências</p>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Atividade Recente</h2>
          <div className="space-y-4">
            {[
              { action: 'Novo curso criado', course: 'Neuropsicologia', time: 'há 2 horas' },
              { action: 'Curso atualizado', course: 'Enfermagem em UTI', time: 'há 1 dia' },
              { action: 'Curso publicado', course: 'Gestão Educacional', time: 'há 2 dias' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.course}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};