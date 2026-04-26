import { BrewPanel } from '@/components/brew/brew-panel';

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Brew</h1>
        <p className="mt-1 text-muted-foreground">
          Elegí tu método, ajustá los parámetros y seguí la receta.
        </p>
      </header>
      <BrewPanel />
    </main>
  );
}
