import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.AVAX_PROVIDER_URL as string));
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY as string);
web3.eth.accounts.wallet.add(account);

const presaleContractAddress = process.env.PRESALE_CONTRACT_ADDRESS as string;
const presaleContractAbi = JSON.parse(fs.readFileSync(path.join(__dirname, 'PresaleContractAbi.json'), 'utf8')) as AbiItem[];
const presaleContract = new web3.eth.Contract(presaleContractAbi, presaleContractAddress);

const buyTokens = async () => {
    const amountToBuy = web3.utils.toWei(process.env.AMOUNT_TO_BUY as string, 'ether');
    try {
        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await presaleContract.methods.buyTokens().estimateGas({ from: account.address, value: amountToBuy });

        const tx = presaleContract.methods.buyTokens();
        const receipt = await tx.send({
            from: account.address,
            value: amountToBuy,
            gas: gasEstimate,
            gasPrice
        });
        console.log('Transaction successful:', receipt);
    } catch (error) {
        console.error('Error buying tokens:', error);
    }
};

const main = async () => {
    console.log('Listening for presale events...');
    presaleContract.events.PresaleStarted()
        .on('data', async (event) => {
            console.log('Presale started:', event);
            await buyTokens();
        })
        .on('error', console.error);
};

main();