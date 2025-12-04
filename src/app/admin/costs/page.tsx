'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockCosts = {
  today: [
    { service: 'tema-360', calls: 12, cost: 4.32 },
    { service: 'brand-snapshot', calls: 3, cost: 1.05 },
  ],
  month: [
    { service: 'tema-360', calls: 210, cost: 72.8 },
    { service: 'brand-snapshot', calls: 95, cost: 26.6 },
    { service: 'landing-blueprint', calls: 54, cost: 18.4 },
  ],
};

export default function CostsPage() {
  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Custos das APIs</h1>
        <p className="text-muted-foreground">
          Visão resumida de consumo. Integre com seu billing assim que estiver disponível.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hoje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockCosts.today.map((item) => (
              <div key={item.service} className="flex items-center justify-between text-sm">
                <span className="font-semibold">{item.service}</span>
                <span className="text-muted-foreground">
                  {item.calls} req • R$ {item.cost.toFixed(2)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mês</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockCosts.month.map((item) => (
              <div key={item.service} className="flex items-center justify-between text-sm">
                <span className="font-semibold">{item.service}</span>
                <span className="text-muted-foreground">
                  {item.calls} req • R$ {item.cost.toFixed(2)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
