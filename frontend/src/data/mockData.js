// Mock Bitcoin Blockchain Data

export const mockBlockchainStats = {
  currentBlock: 875432,
  hashRate: "528.42 EH/s",
  difficulty: "83,148,355,517,896",
  mempool: 15432,
  avgBlockTime: "9.8 min",
  totalTransactions: "1,024,563,789",
  marketCap: "€1,847,234,567,890",
  price: "€94,562.34",
  change24h: "+2.34%"
};

export const mockRecentBlocks = [
  {
    height: 875432,
    hash: "00000000000000000001a9b2c3d4e5f6789abc123def456789abcdef123456",
    time: "2025-01-27T14:30:25Z",
    transactions: 3247,
    size: "1.2 MB",
    reward: "3.125 BTC",
    miner: "AntPool"
  },
  {
    height: 875431,
    hash: "00000000000000000002b8c3d4e5f6789abc123def456789abcdef123457",
    time: "2025-01-27T14:20:18Z",
    transactions: 2998,
    size: "1.1 MB",
    reward: "3.125 BTC",
    miner: "F2Pool"
  },
  {
    height: 875430,
    hash: "00000000000000000003c7d4e5f6789abc123def456789abcdef123458",
    time: "2025-01-27T14:11:42Z",
    transactions: 3156,
    size: "1.3 MB",
    reward: "3.125 BTC",
    miner: "Binance Pool"
  }
];

export const mockRecentTransactions = [
  {
    hash: "a1b2c3d4e5f6789abc123def456789abcdef123456789abcdef123456789abcd",
    time: "2025-01-27T14:35:12Z",
    amount: "2.45678901",
    fee: "0.00012340",
    status: "confirmed",
    confirmations: 3
  },
  {
    hash: "b2c3d4e5f6789abc123def456789abcdef123456789abcdef123456789abcde",
    time: "2025-01-27T14:33:45Z",
    amount: "0.15432100",
    fee: "0.00008750",
    status: "confirmed",
    confirmations: 4
  },
  {
    hash: "c3d4e5f6789abc123def456789abcdef123456789abcdef123456789abcdef",
    time: "2025-01-27T14:32:20Z",
    amount: "5.00000000",
    fee: "0.00025000",
    status: "confirmed",
    confirmations: 5
  }
];

export const mockAddresses = [
  {
    address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    balance: "12.45678901",
    totalReceived: "125.45678901",
    totalSent: "113.00000000",
    transactionCount: 247,
    firstSeen: "2023-03-15T10:20:30Z",
    lastSeen: "2025-01-27T14:35:12Z"
  },
  {
    address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
    balance: "0.00000000",
    totalReceived: "50.00000000",
    totalSent: "50.00000000",
    transactionCount: 124,
    firstSeen: "2024-01-20T09:15:45Z",
    lastSeen: "2025-01-26T16:42:18Z"
  }
];

export const mockWalletGroups = [
  {
    id: "group_1",
    name: "Familie Wallet",
    type: "multi-signature",
    requiredSignatures: 2,
    totalSignatures: 3,
    balance: "5.67890123",
    addresses: [
      "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
      "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    ],
    members: [
      { name: "Max Mustermann", role: "admin" },
      { name: "Anna Müller", role: "signer" },
      { name: "Peter Schmidt", role: "signer" }
    ],
    created: "2024-08-15T12:00:00Z"
  },
  {
    id: "group_2",
    name: "Business Vault",
    type: "multi-signature",
    requiredSignatures: 3,
    totalSignatures: 5,
    balance: "24.12345678",
    addresses: [
      "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
      "35hK24tcLEWcgNA4JxpvbkNkoAcDGqQPsP"
    ],
    members: [
      { name: "CEO", role: "admin" },
      { name: "CFO", role: "signer" },
      { name: "CTO", role: "signer" },
      { name: "Treasurer", role: "signer" },
      { name: "Board Member", role: "signer" }
    ],
    created: "2024-12-01T09:30:00Z"
  }
];

export const mockChartData = [
  { date: "2025-01-21", price: 92341.23, volume: 28456789012 },
  { date: "2025-01-22", price: 93124.56, volume: 31234567890 },
  { date: "2025-01-23", price: 91876.34, volume: 26789012345 },
  { date: "2025-01-24", price: 94523.12, volume: 35678901234 },
  { date: "2025-01-25", price: 93876.45, volume: 29012345678 },
  { date: "2025-01-26", price: 95234.67, volume: 38901234567 },
  { date: "2025-01-27", price: 94562.34, volume: 32345678901 }
];

export const mockMempoolData = [
  { feeRate: 1, transactions: 2345 },
  { feeRate: 5, transactions: 5432 },
  { feeRate: 10, transactions: 3456 },
  { feeRate: 20, transactions: 2198 },
  { feeRate: 50, transactions: 1234 },
  { feeRate: 100, transactions: 567 }
];

export const mockNetworkStats = {
  nodes: 15432,
  countries: 95,
  reachableNodes: 11234,
  torNodes: 2567,
  segwitAdoption: "84.2%",
  lightningCapacity: "5,234.56 BTC",
  lightningChannels: 87432
};