import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  Users, 
  Wallet, 
  BarChart3, 
  Globe,
  Zap,
  Shield
} from 'lucide-react';
import {
  mockBlockchainStats,
  mockRecentBlocks,
  mockRecentTransactions,
  mockNetworkStats,
  mockChartData
} from '../data/mockData';

const Dashboard = () => {
  const [stats, setStats] = useState(mockBlockchainStats);
  const [recentBlocks, setRecentBlocks] = useState(mockRecentBlocks);
  const [recentTxs, setRecentTxs] = useState(mockRecentTransactions);
  const [networkStats, setNetworkStats] = useState(mockNetworkStats);
  const [activeTab, setActiveTab] = useState('overview');

  const formatHash = (hash) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleString('de-DE');
  };

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className={`flex items-center text-xs ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
            {change}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Bitcoin Blockchain Explorer</h1>
        <p className="text-muted-foreground">
          Echtzeitdaten der Bitcoin-Blockchain - Block #{stats.currentBlock}
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Bitcoin Preis"
          value={stats.price}
          change={stats.change24h}
          trend="up"
          icon={TrendingUp}
        />
        <StatCard
          title="Hash Rate"
          value={stats.hashRate}
          icon={Activity}
        />
        <StatCard
          title="Mempool"
          value={`${stats.mempool.toLocaleString()} TX`}
          icon={Clock}
        />
        <StatCard
          title="Marktkapitalisierung"
          value={stats.marketCap}
          icon={BarChart3}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="blocks">Blöcke</TabsTrigger>
          <TabsTrigger value="transactions">Transaktionen</TabsTrigger>
          <TabsTrigger value="network">Netzwerk</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Blocks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Neueste Blöcke
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBlocks.slice(0, 5).map((block) => (
                    <div key={block.height} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div>
                        <div className="font-medium">Block #{block.height}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatHash(block.hash)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{block.transactions} TX</div>
                        <div className="text-xs text-muted-foreground">{block.size}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Neueste Transaktionen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTxs.map((tx) => (
                    <div key={tx.hash} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div>
                        <div className="font-medium">{formatHash(tx.hash)}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatTime(tx.time)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{tx.amount} BTC</div>
                        <Badge variant={tx.status === 'confirmed' ? 'default' : 'secondary'}>
                          {tx.confirmations} Bestätigungen
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Schwierigkeit"
              value={stats.difficulty}
              icon={Shield}
            />
            <StatCard
              title="Durchschnittliche Blockzeit"
              value={stats.avgBlockTime}
              icon={Clock}
            />
            <StatCard
              title="Gesamte Transaktionen"
              value={stats.totalTransactions}
              icon={Activity}
            />
          </div>
        </TabsContent>

        <TabsContent value="blocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Block Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBlocks.map((block) => (
                  <div key={block.height} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">Block #{block.height}</h3>
                        <p className="text-sm text-muted-foreground">von {block.miner}</p>
                      </div>
                      <Badge variant="outline">{formatTime(block.time)}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Hash:</span>
                        <p className="font-mono break-all">{formatHash(block.hash)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Transaktionen:</span>
                        <p className="font-medium">{block.transactions}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Größe:</span>
                        <p className="font-medium">{block.size}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Belohnung:</span>
                        <p className="font-medium">{block.reward}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaktionsdetails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTxs.map((tx) => (
                  <div key={tx.hash} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-mono text-sm">{formatHash(tx.hash)}</h3>
                        <p className="text-sm text-muted-foreground">{formatTime(tx.time)}</p>
                      </div>
                      <Badge variant={tx.status === 'confirmed' ? 'default' : 'secondary'}>
                        {tx.status === 'confirmed' ? 'Bestätigt' : 'Ausstehend'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Betrag:</span>
                        <p className="font-medium text-green-600">{tx.amount} BTC</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gebühr:</span>
                        <p className="font-medium">{tx.fee} BTC</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bestätigungen:</span>
                        <p className="font-medium">{tx.confirmations}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Aktive Nodes"
              value={networkStats.nodes.toLocaleString()}
              icon={Globe}
            />
            <StatCard
              title="Länder"
              value={networkStats.countries}
              icon={Users}
            />
            <StatCard
              title="Erreichbare Nodes"
              value={networkStats.reachableNodes.toLocaleString()}
              icon={Activity}
            />
            <StatCard
              title="Tor Nodes"
              value={networkStats.torNodes.toLocaleString()}
              icon={Shield}
            />
            <StatCard
              title="SegWit Adoption"
              value={networkStats.segwitAdoption}
              icon={TrendingUp}
            />
            <StatCard
              title="Lightning Kapazität"
              value={networkStats.lightningCapacity}
              icon={Zap}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;