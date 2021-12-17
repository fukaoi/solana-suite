"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomAsset = void 0;
const fs_1 = __importDefault(require("fs"));
const storage_1 = require("../../src/storage");
var RandomAsset;
(function (RandomAsset) {
    const ASSET_DIR = './test/assets/';
    const dateFormat = () => {
        const t = new Date();
        return t.getFullYear() + '-' +
            ('0' + (t.getMonth() + 1)).slice(-2) + '-' +
            ('0' + (t.getDate())).slice(-2) + '/' +
            ('0' + t.getHours()).slice(-2) + ':' +
            ('0' + t.getMinutes()).slice(-2) + ':' +
            ('0' + t.getSeconds()).slice(-2);
    };
    const createCommonAsset = () => {
        const files = fs_1.default.readdirSync(ASSET_DIR);
        const index = Math.floor(Math.random() * files.length);
        const asset = files[index];
        const image = `${ASSET_DIR}${asset}`;
        const created = `created at ${dateFormat()}`;
        const name = (asset.split(/.jpeg|.png|.jpg/i)[0]).toUpperCase();
        const description = `This nft is ${name}:${created}`;
        const symbol = 'SUITE';
        return { name, description, image, symbol };
    };
    RandomAsset.metadata = () => {
        const storageData = storage_1.Storage.initStorageData();
        const commonAsset = createCommonAsset();
        storageData.name = commonAsset.name;
        storageData.image = commonAsset.image;
        storageData.description = commonAsset.description;
        storageData.symbol = commonAsset.symbol;
    };
    RandomAsset.storage = () => {
        const storageData = storage_1.Storage.initStorageData();
        const commonAsset = createCommonAsset();
        storageData.name = commonAsset.name;
        storageData.image = commonAsset.image;
        storageData.description = commonAsset.description;
        storageData.symbol = commonAsset.symbol;
        storageData.seller_fee_basis_points = 100;
        storageData.animation_url = 'https://ipfs.infura.io/ipfs/QmPkRtkGn5ckAY5m6ejpWcDPmnAUJgphtJWFkyQP7LNAcx';
        storageData.external_url = 'https://example.org/top';
        storageData.category = 'image';
        storageData.attributes = [
            {
                limits: 'transfer',
                value: 7
            },
            {
                limits: 'use_limit',
                value: 3
            },
        ];
        storageData.collection = { name: 'Pets in Japan' };
        storageData.properties = [
            {
                'uri': 'https://www.arweave.net/abcd5678?ext=png',
                'type': 'image/png'
            },
            {
                'uri': 'https://watch.videodelivery.net/9876jkl',
                'type': 'unknown',
                'cdn': true
            },
        ];
        storageData.creators = [
            {
                'address': '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U',
                'share': 100
            }
        ];
        return storageData;
    };
})(RandomAsset = exports.RandomAsset || (exports.RandomAsset = {}));
