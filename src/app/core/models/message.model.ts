export interface Message {
  id: string;
  enviadorId: string;
  assunto: string;
  conteudo: string;
  destinatatios: {
    usuarioIds?: string[];
    grupoIds?: string[];
  };
  visualizado: boolean;
  dataVisualizacao?: Date;
  dataEnvio: Date;
}
