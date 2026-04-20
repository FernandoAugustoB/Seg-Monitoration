Esse projeto ira gerencia as informações de vários cliente de uma empresa de segurança, ele irá funcionar quase como um azure para devs, terá lista de clientes, lista das câmeras desses clientes e vai ser possivel abrir cards(terá será direcionado a um usuário ou a um grupo de usuários) para os clientes, no momento esse projeto esta em fase de demonstração então não terá api, então os dados precisam ser mockados para funcionar visualmente. Teram dois grupos de usuários inicialmente os operadores e os supervisores, cada um terá o seu login e os supervisores poderam gerenciar as permissões de cada usuário ou grupo de usuários.
A interface terá uma barra lateral, um header com um campo de busca rápida de clientes, o nome do usuário logado, o final do turno do usuário que ficará amarelo quando estiver há 30 min que acabar e vermelho caso passe do horário, e um botão que abrirá uma lista de notificações. 
Horário dos operadores: Os horários dos operadores são das 06hrs as 18hrs(horário diurno) e 18hrs as 06hrs(horário noturno).
Telas:
-Login: Simples com nome de usuário e senha.
-Dashboard: Terá uma checklist das tarefas de inicio, meio e final de plantão, campo de texto para descrever o inicio de plantão e outro com o final de plantão.
-Clientes: Lista dos clientes com filtros de busca, ao selecionar um cliente(tanto nessa tela quando na busca rápida do header) abrirá uma modal mostrando os cards abertos, uma lista bem simplificada das câmeras(se houver) e suas situações, log de operação com os ultimos acontecimentos, informação adicional("descrição do cliente") e um campo de comentário
-Câmeras: Lista de câmeras dos clientes, terá um campo de pesquisa para pesquisar o nome do cliente e ao selecionar um cliente aparecerá uma modal mostrando as câmeras do cliente, a situação delas e se foi identificado algum problema nela
-Cards: Aqui funcionará semelhante ao trello/azure, uma tela de cards que podem ser movidas para as seções, como identificado, repassado ao setor responsável, em progresso e finalizado, ao clicar em cima do card mostrará a quem esse card foi destinado, o nivel de urgencia, a descrição do card, comentários e log.
-Notificações: Mostra uma lista mais detalhada daquelas notificações do header, podendo marcalas como visualizadas e clicar nelas para ser redirecionado para a tela em questão se for necessário, exemplo, se alguem abrir um card e direciona-lá ao usuário.
-Caixa de mensagens: O supervisor poderá enviar mensagens/emails sobre um assunto especifico para um usuário ou um grupo de usuário, e eles poderam marcar como visualizados

Informações do projeto técnicos:
-Angular 21+
-PrimeNG Icons
-Tailwind
-Fonte Inter
-PrimeNG icons
-Não terá biblioteca de componentes, invés disso, criar os próprios componentes
-O projeto será em tema escuro por padrão usando preto cinza escuro e amarelo levemente alaranjado