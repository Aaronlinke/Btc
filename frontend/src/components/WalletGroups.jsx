import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Users, 
  Shield, 
  Plus, 
  Settings, 
  Eye, 
  Copy, 
  Trash2,
  UserCheck,
  Wallet,
  Key
} from 'lucide-react';
import { mockWalletGroups } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const WalletGroups = () => {
  const [groups, setGroups] = useState(mockWalletGroups);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    requiredSignatures: 2,
    totalSignatures: 3,
    members: []
  });
  const { toast } = useToast();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Kopiert!",
      description: "Adresse in Zwischenablage kopiert."
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  const handleCreateGroup = () => {
    const group = {
      id: `group_${Date.now()}`,
      ...newGroup,
      type: "multi-signature",
      balance: "0.00000000",
      addresses: [],
      created: new Date().toISOString()
    };
    setGroups([...groups, group]);
    setNewGroup({ name: '', requiredSignatures: 2, totalSignatures: 3, members: [] });
    setIsCreateDialogOpen(false);
    toast({
      title: "Gruppe erstellt!",
      description: `Wallet-Gruppe "${group.name}" wurde erfolgreich erstellt.`
    });
  };

  const GroupCard = ({ group }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              {group.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {group.requiredSignatures}/{group.totalSignatures} Multi-Signature Wallet
            </p>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" onClick={() => setSelectedGroup(group)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {group.balance} BTC
          </div>
          <div className="text-sm text-muted-foreground">Gesamtsaldo</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Mitglieder:</span>
            <span className="font-medium">{group.members.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Adressen:</span>
            <span className="font-medium">{group.addresses.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Erstellt:</span>
            <span className="font-medium">{formatDate(group.created)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Mitglieder</Label>
          <div className="flex flex-wrap gap-1">
            {group.members.slice(0, 3).map((member, index) => (
              <Badge key={index} variant={member.role === 'admin' ? 'default' : 'secondary'}>
                {member.name}
              </Badge>
            ))}
            {group.members.length > 3 && (
              <Badge variant="outline">+{group.members.length - 3} weitere</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet-Gruppen</h1>
          <p className="text-muted-foreground">
            Verwalten Sie Multi-Signature Wallets und Gruppen-Wallets sicher.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Neue Gruppe
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Neue Wallet-Gruppe erstellen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Gruppenname</Label>
                <Input
                  id="name"
                  placeholder="z.B. Familie Wallet, Business Vault"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="required">Erforderliche Signaturen</Label>
                  <Select
                    value={newGroup.requiredSignatures.toString()}
                    onValueChange={(value) => setNewGroup({...newGroup, requiredSignatures: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="total">Gesamte Signaturen</Label>
                  <Select
                    value={newGroup.totalSignatures.toString()}
                    onValueChange={(value) => setNewGroup({...newGroup, totalSignatures: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleCreateGroup} 
                className="w-full"
                disabled={!newGroup.name.trim()}
              >
                Gruppe erstellen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Groups Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>

      {/* Group Details Dialog */}
      {selectedGroup && (
        <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                {selectedGroup.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {/* Group Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">
                    {selectedGroup.balance} BTC
                  </div>
                  <div className="text-xs text-muted-foreground">Saldo</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold">
                    {selectedGroup.requiredSignatures}/{selectedGroup.totalSignatures}
                  </div>
                  <div className="text-xs text-muted-foreground">Signaturen</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold">
                    {selectedGroup.addresses.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Adressen</div>
                </div>
              </div>

              {/* Members */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Mitglieder ({selectedGroup.members.length})
                </h4>
                <div className="space-y-2">
                  {selectedGroup.members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <UserCheck className="h-4 w-4" />
                        <span className="font-medium">{member.name}</span>
                      </div>
                      <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                        {member.role === 'admin' ? 'Administrator' : 'Unterzeichner'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Addresses */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  Adressen ({selectedGroup.addresses.length})
                </h4>
                {selectedGroup.addresses.length > 0 ? (
                  <div className="space-y-2">
                    {selectedGroup.addresses.map((address, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-mono text-sm">
                          {address.substring(0, 10)}...{address.substring(address.length - 10)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(address)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Noch keine Adressen generiert.</p>
                    <Button className="mt-2" size="sm">
                      Erste Adresse generieren
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WalletGroups;