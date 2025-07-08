// src/app/page.tsx

import { redirect } from 'next/navigation';

export default function Home() {
  // Redireciona o usuário para a página de login
  redirect('/login');

  // Como o redirect interrompe a renderização, não é necessário retornar JSX.
  // Retornar null aqui é uma formalidade para o TypeScript.
  return null;
} 