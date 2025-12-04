"use client";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold">Página não encontrada</h1>
        <p className="text-muted-foreground">
          O conteúdo que você procurou não existe ou foi movido.
        </p>
        <a href="/" className="btn btn-primary">
          Voltar para a Home
        </a>
      </div>
    </div>
  );
}
