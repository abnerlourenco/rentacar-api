import { connection } from '..';

import { v4 as uuidv4 } from 'uuid';

async function create () {
  if (!connection.isInitialized) {
    await connection.initialize(); // Attempt to connect if not already connected
  }

  const specifications = [
    { name: 'Cambio automático', description: 'Câmbio automático' },
    { name: 'Cambio Manual', description: 'Câmbio manual de 6 marchas' },
    { name: 'Freios ABS', description: 'Sistema de freios antitravamento' },
    { name: 'Ar-condicionado', description: 'Ar-condicionado digital dual zone' },
    { name: 'Teto solar', description: 'Teto solar panorâmico' },
    { name: 'Piloto automático', description: 'Controle de velocidade adaptativo' },
    { name: 'Assistente de Faixa', description: 'Assistente de permanência em faixa' },
    { name: 'Airbags', description: 'Múltiplos airbags de segurança' },
    { name: 'Sensor de estacionamento', description: 'Sensores dianteiros e traseiros' },
    { name: 'Controle de tração', description: 'Controle eletrônico de tração (TCS)' },
    { name: 'Faróis LED', description: 'Iluminação em LED de alta eficiência' },
    { name: 'Banco em couro', description: 'Bancos revestidos em couro premium' },
    { name: 'Volante multifuncional', description: 'Volante com comandos integrados' },
    { name: 'Sistema de navegação', description: 'GPS integrado com mapas atualizados' },
    { name: 'Câmera de ré', description: 'Câmera traseira para manobras' },
    { name: 'Suspensão a ar', description: 'Ajuste automático de altura' },
    { name: 'Sistema Start-Stop', description: 'Desligamento automático do motor' },
    { name: 'Abertura keyless', description: 'Abertura de portas sem chave' },
    { name: 'Carregador wireless', description: 'Carregamento sem fio para dispositivos' },
    { name: 'Assistente de frenagem', description: 'Frenagem automática de emergência' },
    { name: 'Controle de estabilidade', description: 'Sistema de estabilidade eletrônico (ESP)' },
    { name: 'Alerta de ponto cego', description: 'Indicação de veículos no ponto cego' },
    { name: 'Painel digital', description: 'Painel de instrumentos totalmente digital' },
    { name: 'Som premium', description: 'Sistema de som de alta fidelidade' },
    { name: 'Conectividade Bluetooth', description: 'Conexão Bluetooth para chamadas e áudio' },
    { name: 'USB e entradas auxiliares', description: 'Portas USB para carregamento e mídia' },
    { name: 'Rodas de liga leve', description: 'Rodas esportivas de liga leve' },
    { name: 'Vidros elétricos', description: 'Abertura e fechamento automático dos vidros' },
    { name: 'Retrovisores elétricos', description: 'Ajuste elétrico dos retrovisores' },
    { name: 'Desembaçador traseiro', description: 'Sistema de remoção de névoa no vidro traseiro' },
    { name: 'Faróis automáticos', description: 'Acendimento automático dos faróis' },
    { name: 'Limpeza automática dos faróis', description: 'Sistema de lavagem dos faróis' },
    { name: 'Chave presencial', description: 'Sistema de partida sem chave (Keyless Go)' },
    { name: 'Banco do motorista elétrico', description: 'Ajuste elétrico do banco do motorista' },
    { name: 'Aquecimento dos bancos', description: 'Bancos dianteiros com aquecimento' },
    { name: 'Banco traseiro rebatível', description: 'Rebater assentos para aumentar o porta-malas' },
    { name: 'Sensor de chuva', description: 'Ativação automática do limpador de para-brisa' },
    { name: 'Comando por voz', description: 'Sistema de controle por voz' },
    { name: 'Wi-Fi integrado', description: 'Conexão Wi-Fi a bordo' },
    { name: 'Assistente de estacionamento', description: 'Sistema automático de estacionamento' },
    { name: 'Farol de neblina', description: 'Faróis específicos para neblina' },
    { name: 'Tração 4x4', description: 'Sistema de tração nas quatro rodas' },
    { name: 'Controle de descida', description: 'Assistente em declives íngremes' },
    { name: 'Alerta de colisão', description: 'Aviso de risco de colisão frontal' },
    { name: 'Reconhecimento de sinais', description: 'Leitura automática de placas de trânsito' },
    { name: 'Iluminação ambiente', description: 'Luzes internas configuráveis' },
    { name: 'Porta-malas elétrico', description: 'Abertura e fechamento elétrico do porta-malas' },
    { name: 'Vidros acústicos', description: 'Vidros com isolamento acústico' },
    { name: 'Filtro de ar PM2.5', description: 'Sistema de filtragem de partículas finas' },
    { name: 'Direção elétrica', description: 'Sistema de direção assistida eletricamente' }
  ];

  const categories = [
    { name: 'Hatch', description: 'Carro compacto - ideal para uso urbano' },
    { name: 'Sedan', description: 'Carro com maior porta-malas e espaço interno' },
    { name: 'SUV', description: 'Veículo utilitário esportivo com maior altura' },
    { name: 'Crossover', description: 'Mistura de características de SUV e hatch' },
    { name: 'Picape', description: 'Veículo com caçamba para transporte de carga' },
    { name: 'Conversível', description: 'Carro com teto removível' },
    { name: 'Perua', description: 'Carro com maior espaço para bagagem, estilo wagon' },
    { name: 'Coupe', description: 'Veículo de duas portas com design esportivo' },
    { name: 'Minivan', description: 'Veículo familiar com capacidade para 7 ou mais pessoas' },
    { name: 'Utilitário', description: 'Veículo destinado a transporte e trabalho' },
    { name: 'Elétrico', description: 'Carro com motor 100% elétrico' },
    { name: 'Híbrido', description: 'Combinação de motor elétrico e a combustão' },
    { name: 'Esportivo', description: 'Carro de alta performance e design agressivo' },
    { name: 'Off-road', description: 'Veículo preparado para terrenos irregulares' },
    { name: 'Limusine', description: 'Carro de luxo com maior comprimento' },
    { name: 'Compacto', description: 'Carro pequeno e econômico para cidade' },
    { name: 'Roadster', description: 'Conversível esportivo com dois lugares' },
    { name: 'Van', description: 'Veículo para transporte de passageiros ou carga' },
    { name: 'Motorizado leve', description: 'Veículos de três rodas ou quadriciclos' },
    { name: 'Caminhão leve', description: 'Caminhão de pequeno porte para transporte leve' }
  ];

  const insertSpecificationsQuery = `
INSERT INTO specifications(id, name, description, created_at) VALUES 
${specifications.map(spec => `('${uuidv4()}', '${spec.name}', '${spec.description}', 'now()')`).join(', ')}
`;

  const insertCategoriesQuery = `
INSERT INTO categories(id, name, description, created_at) VALUES 
${categories.map(data => `('${uuidv4()}', '${data.name}', '${data.description}', 'now()')`).join(', ')}
`;

  await Promise.all([
    connection.query(insertSpecificationsQuery),
    connection.query(insertCategoriesQuery)
  ]);
}

void create().then(() => {
  console.log('Car Atributes created successfully!!');
});
