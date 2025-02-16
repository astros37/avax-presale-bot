# AVAX Presale Fast Buy Bot

This bot listens for presale events on the Avalanche (AVAX) network and quickly sends a transaction to buy tokens.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- An Avalanche wallet with some AVAX to cover gas fees
- A `.env` file with the following variables:
  ```
  AVAX_PROVIDER_URL=https://api.avax.network/ext/bc/C/rpc
  PRIVATE_KEY=your_private_key
  PRESALE_CONTRACT_ADDRESS=presale_contract_address
  AMOUNT_TO_BUY=amount_in_ether
  ```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/avax-presale-bot.git
   cd avax-presale-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your environment variables:
   ```env
   AVAX_PROVIDER_URL=https://api.avax.network/ext/bc/C/rpc
   PRIVATE_KEY=your_private_key
   PRESALE_CONTRACT_ADDRESS=presale_contract_address
   AMOUNT_TO_BUY=amount_in_ether
   ```

4. Add the ABI of the presale contract in a file named `PresaleContractAbi.json` in the root of the project.

## Usage

To start the bot, run:
```bash
npx ts-node fast_buy_bot.ts
```

The bot will listen for presale events and attempt to buy tokens as soon as the presale starts.

## Disclaimer

This bot is provided as-is, without any warranty. Use it at your own risk. The author is not responsible for any losses or damages that may occur as a result of using this bot.