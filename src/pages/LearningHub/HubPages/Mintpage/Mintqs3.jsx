import React from 'react'
import Lottie from 'react-lottie';
import qs3Asset from "../../HubAssets/Mintqs3Asset.json"

export const Mintqs3 = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: qs3Asset,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className='w-full h-fit'>
            <div className='grid justify-start items-center gap-6'>
                <h1 className='text-4xl font-semibold tracking-wider'>3. What is IPFS?</h1>
                <p className='text-2xl tracking-wider text-justify px-12 font-serif'>
                    IPFS (InterPlanetary File System) plays a significant role in the minting of
                    NFTs (Non-Fungible Tokens) by providing decentralized and reliable
                    storage for the associated digital content. Here&#39;s how IPFS contributes to
                    the minting process:
                </p>
                <div className='py-8'>
                    <Lottie options={defaultOptions} height={450} width={700} />
                </div>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Decentralized Content Storage:</span> When creating an NFT, the digital
                    content, such as images, videos, or music, needs to be stored securely and
                    reliably. IPFS offers a decentralized storage solution, distributing the
                    content across a global network of nodes. This ensures that the content is
                    not reliant on a single central server, reducing the risk of downtime or data
                    loss.
                </p>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Immutable Links:</span> IPFS generates a unique cryptographic hash for each
                    piece of content added to its network. This hash serves as a content-based
                    address, allowing the NFT to reference the content by this hash. This link is
                    permanent and immutable, ensuring that the digital content associated with
                    an NFT remains accessible and unchanged over time.
                </p>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Reduced Gas Fees:</span>On blockchain networks like Ethereum, where most
                    NFTs are minted, storing large files directly on the blockchain can be
                    prohibitively expensive in terms of gas fees (transaction fees). By using
                    IPFS, NFT creators can offload the content storage to a more cost-effective
                    decentralized network, saving on transaction costs.
                </p>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Scalability:</span> IPFS&#39;s distributed nature enables easy scaling of content
                    distribution. As NFTs gain popularity and more users access the associated
                    content, IPFS can efficiently handle increased demand without
                    compromising performance.
                </p>
                <p className='text-2xl tracking-wider text-justify px-12 font-serif'>
                    In practice, when minting an NFT, the digital content is typically uploaded to
                    IPFS, and the resulting IPFS content address (the cryptographic hash) is
                    stored on the blockchain as part of the NFT&#39;s metadata. This approach
                    ensures that the NFT&#39;s content can be retrieved from IPFS whenever
                    needed, providing a seamless and decentralized experience for NFT
                    owners and buyers.
                </p>
                <p className='text-2xl tracking-wider text-justify px-12 font-serif'>
                    In summary, IPFS enhances the minting process of NFTs by offering
                    decentralized and immutable content storage, reducing gas fees, and
                    enabling scalable distribution of digital assets, all of which contribute to the
                    reliability and accessibility of NFT-associated content.
                </p>
            </div>
        </div>
    )
}
