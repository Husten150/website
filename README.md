# Web3 UI Starter Pack

A front-end dApp starter built with Next.js, designed for fast development. This starter pack comes pre-configured with essential libraries and tools, so you can skip the setup and dive straight into building your Web3 project.

## Built With

- **Next.js**: A popular React framework for building fast, server-side rendered applications.
- **wagmi**: React hooks for Ethereum.
- **viem**: Ethereum interface for developers.
- **rainbowkit**: A toolkit for building wallet connection UIs.
- **shadcn-ui** and **acterenity ui**: Component libraries for modern UI elements.

## Getting Started

### Prerequisites

1. **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/web3-ui-starter-pack.git
   cd web3-ui-starter-pack
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   #or
   yarn
   ```

3. **Set up environment variables**:

   - Create a `.env.local` file in the root of your project.
   - Add the following variables:
     ```bash
     NEXT_PUBLIC_CONTRACT_ADDRESS=<Your_Contract_Address>
     NEXT_PUBLIC_ALCHEMY_API_KEY=<Your_Alchemy_API_Key>
     NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID=<Your_RainbowKit_Project_ID>
     ```

4. **Add ABI files**:
   - Place the ABI of your smart contract in the `abi` folder.

### Running the App

Start the development server:

```bash
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Usage

This starter pack provides a basic setup for connecting to Ethereum blockchain networks. Customize it according to your project's requirements by modifying components and adding new features.

## New UI Components

This starter now includes essential UI components for better user experience:

- **Alert Component** - Display messages with different severity levels (success, error, warning, info)
- **Skeleton Component** - Loading placeholders for better perceived performance
- **Spinner Component** - Animated loading indicators with multiple sizes
- **Loading Overlay** - Full loading states with customizable text
- **Web3 Status** - Specialized component for wallet connection status
- **Error Boundary** - React error boundary for graceful error handling

## TypeScript Types

Comprehensive TypeScript types are included in `types/web3.ts` for:
- Wallet and chain configurations
- Ad slot and content management
- Transaction handling
- Component props and hook returns

See [COMPONENTS.md](./COMPONENTS.md) for detailed documentation and usage examples.

## Contributing

Feel free to fork the repository and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.
