import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Search, 
  Copy, 
  ExternalLink, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft,
  Clock,
  CheckCircle
} from 'lucide-react';
import { mockAddresses, mockRecentTransactions } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const AddressSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      // Find mock address or create a mock result
      const foundAddress = mockAddresses.find(addr => 
        addr.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery.toLowerCase().includes(addr.address.toLowerCase().substring(0, 10))
      );
      
      if (foundAddress) {
        setSelectedAddress(foundAddress);
      } else {
        // Create mock result for demo
        setSelectedAddress({
          address: searchQuery,
          balance: "0.00000000",
          totalReceived: "0.00000000",
          totalSent: "0.00000000",
          transactionCount: 0,
          firstSeen: null,
          lastSeen: null
        });
      }
      setIsSearching(false);
    }, 1000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Kopiert!",
      description: "Adresse in Zwischenablage kopiert."
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nie';
    return new Date(dateString).toLocaleString('de-DE');
  };

  const formatHash = (hash) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Adress-Suche</h1>
        <p className="text-muted-foreground">
          Geben Sie eine Bitcoin-Adresse ein, um Details und Transaktionshistorie anzuzeigen.
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Bitcoin-Adresse suchen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Geben Sie eine Bitcoin-Adresse oder Transaktions-Hash ein..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="font-mono"
            />
            <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
              {isSearching ? 'Suche...' : 'Suchen'}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2')}
            >
              Beispiel-Adresse 1
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery('3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy')}
            >
              Beispiel-Adresse 2
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Address Details */}
      {selectedAddress && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  Adress-Details
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(selectedAddress.address)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Kopieren
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Adresse</label>
                <p className="font-mono text-sm break-all bg-muted p-2 rounded mt-1">
                  {selectedAddress.address}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedAddress.balance} BTC
                  </div>
                  <div className="text-sm text-muted-foreground">Aktueller Saldo</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">
                    {selectedAddress.totalReceived} BTC
                  </div>
                  <div className="text-sm text-muted-foreground">Gesamt erhalten</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">
                    {selectedAddress.totalSent} BTC
                  </div>
                  <div className="text-sm text-muted-foreground">Gesamt gesendet</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">
                    {selectedAddress.transactionCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Transaktionen</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Erste Aktivität</label>
                  <p className="text-sm mt-1">{formatDate(selectedAddress.firstSeen)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Letzte Aktivität</label>
                  <p className="text-sm mt-1">{formatDate(selectedAddress.lastSeen)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaktionshistorie</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAddress.transactionCount > 0 ? (
                <div className="space-y-3">
                  {mockRecentTransactions.map((tx, index) => (
                    <div key={tx.hash} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          {Math.random() > 0.5 ? (
                            <ArrowUpRight className="h-4 w-4 text-red-500" />
                          ) : (
                            <ArrowDownLeft className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-mono text-sm">{formatHash(tx.hash)}</span>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(tx.hash)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={tx.status === 'confirmed' ? 'default' : 'secondary'}>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {tx.confirmations} Bestätigungen
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Betrag:</span>
                          <p className="font-medium">{tx.amount} BTC</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gebühr:</span>
                          <p className="font-medium">{tx.fee} BTC</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Zeit:</span>
                          <p className="font-medium">{formatDate(tx.time)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <p className="font-medium text-green-600">Bestätigt</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Keine Transaktionen gefunden.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AddressSearch;