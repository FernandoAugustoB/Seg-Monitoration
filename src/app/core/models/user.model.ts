export interface User {
  name: string;
  role: 'OPERATOR' | 'SUPERVISOR';
  shift: 'DAY' | 'NIGHT'; // 06-18 ou 18-06
}