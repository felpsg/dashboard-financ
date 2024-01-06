import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import { Link } from 'react-router-dom';
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon';
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import CalendarIcon from '@heroicons/react/24/outline/CalendarIcon';
import CogIcon from '@heroicons/react/24/outline/CogIcon';
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import LifebuoyIcon from '@heroicons/react/24/outline/LifebuoyIcon';
import PhoneIcon from '@heroicons/react/24/outline/PhoneIcon';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Bem-vindo'));
  }, [dispatch]);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Bem-vindo ao <span className="text-blue-600">LoanMaster</span></h1>
                    <p className="mb-8">A plataforma definitiva que revoluciona a maneira como você gerencia e acompanha empréstimos. Nossa missão é facilitar a sua vida financeira com ferramentas poderosas e insights inteligentes.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-10 mb-10">
                    <FeatureCard
                        Icon={CurrencyDollarIcon}
                        title="Investimento e Retorno"
                        description="Acompanhe o retorno sobre cada investimento com precisão."
                    />
                    <FeatureCard
                        Icon={ChartBarIcon}
                        title="Análise de Dados"
                        description="Visualize o crescimento e tendências com gráficos interativos."
                    />
                    <FeatureCard
                        Icon={UserGroupIcon}
                        title="Gerenciamento de Clientes"
                        description="Administre seu portfólio de clientes e seus empréstimos de maneira eficaz."
                    />
                    <FeatureCard
                        Icon={BellIcon}
                        title="Alertas e Notificações"
                        description="Receba notificações em tempo real sobre qualquer atraso ou atualização."
                    />
                    <FeatureCard
                        Icon={CalendarIcon}
                        title="Agendamento"
                        description="Mantenha-se organizado com nosso sistema de agendamento integrado."
                    />
                    <FeatureCard
                        Icon={CogIcon}
                        title="Personalização"
                        description="Customize o dashboard de acordo com suas preferências e necessidades."
                    />
                </div>
                <div className="text-center">
                    <Link to="/app/dashboard">
                        <button className="btn btn-primary px-8 py-3 text-lg">Acesse o Dashboard</button>
                    </Link>
                </div>
                <div className="divider my-10"></div>
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Entre em Contato</h3>
                    <p className="mb-4">Nossa equipe está pronta para ajudar você a obter o máximo do LoanMaster. Entre em contato para suporte ou para discutir funcionalidades personalizadas.</p>
                    <div className="flex gap-4 mb-6">
                        <a href="mailto:suporte@loanmaster.com" className="flex items-center text-blue-600">
                            <EnvelopeIcon className="h-6 w-6 mr-2" /> suporte@loanmaster.com
                        </a>
                        <a href="tel:+550999999999" className="flex items-center text-blue-600">
                            <PhoneIcon className="h-6 w-6 mr-2" /> +55 (0)9 9999-9999
                        </a>
                    </div>
                    <Link to="/support">
                        <button className="btn btn-outline btn-accent px-8 py-3 text-lg flex items-center">
                            <LifebuoyIcon className="h-6 w-6 mr-2" /> Suporte Técnico
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ Icon, title, description }) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl p-6 flex flex-col items-center">
            <Icon className="h-12 w-12 text-blue-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <p className="text-center">{description}</p>
        </div>
    );
}

export default InternalPage;
