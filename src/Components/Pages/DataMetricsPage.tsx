import React from "react"
import { Typography } from "@chainsafe/common-components"
import { ITheme, makeStyles, createStyles } from "@chainsafe/common-theme"

const useStyles = makeStyles(
  ({ constants, breakpoints, palette }: ITheme) => {
    return createStyles({
      root: {
        maxWidth: `${constants.readCopyWidth}px`,
        margin: `${constants.generalUnit * 3}px auto 0`,
        // display: "flex",
        // flexDirection: "row",
        [breakpoints.up("md")]: {
          maxWidth: "calc((100% / 12) * 8)",
          // margin: `calc(${constants.generalUnit * 3}px + ${constants.headerHeight}px) auto 0`,
          margin: `${constants.generalUnit * 3}px auto 0`,
          padding: `${constants.generalUnit * 4}px ${constants.generalUnit * 4}px `,
        },
        [breakpoints.down("md")]: {
          margin: `${constants.generalUnit * 3}px auto 0`,
          padding: `0 ${constants.generalUnit * 8}px ${constants.generalUnit * 8}px`,
        }
      },
      fixScroll: {
        "&:before":{
          display: "block",
          content: '""',
          marginTop: `-${constants.headerHeight}px`,
          height: constants.headerHeight,
          visibility: "hidden",
          pointerEvents: "none"
        }
      },
      table: {
        textAlign: "left",
        "& tr": {
          display: "table",
          borderBottom: `1px solid ${palette.common.black.main}`
        },
      },
      cta: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& a": {
          margin: `${constants.generalUnit}px 0`,
          textDecoration: "none"
        }
      }
    })
  },
)

const DataMetricsPage = () => {
  const classes = useStyles()

  return (<article className={classes.root}>
    <Typography variant="h1" component="h2">
      Introduction
    </Typography>
    <Typography component="p">
      Flashbots is a research and development organization working on mitigating the negative externalities of current MEV (maximal extractable value, otherwise known as miner extractable value) extraction techniques and avoiding the existential risks MEV could cause to state-rich blockchains like Ethereum. Our primary focus is to enable a permissionless, transparent, and fair ecosystem for MEV extraction.
      <br/>
      We plan to achieve this by: 
      <ul>
        <li>
          Bringing transparency to MEV activity
        </li>
        <li>
          Democratizing access to MEV revenue
        </li>
        <li>
          Enabling redistribution of MEV revenue in a way that benefits the community
        </li>
      </ul>
    </Typography>
    <Typography component="p">
      On Jan 6, 2021 Flashbots released Flashbots Alpha v0.1, a proof of concept communication channel between miners and users that enables transparent and efficient MEV extraction. User who send transactions on Flashbots, which we call searchers, can send bundles of transactions directly to miners (specifically mining pools running MEV-Geth which are whitelisted in the Flashbots MEV-Relay miner registry and are receiving Flashbots bundles) and bid for inclusion in a block. This is done with <a rel="noopener noreferrer" target="_blank" href="https://github.com/flashbots/mev-geth">MEV-Geth</a>, a slightly modified fork of the Geth client, and <a rel="noopener noreferrer" target="_blank" href="https://github.com/flashbots/mev-relay-js">MEV-Relay</a>, a transaction bundle relayer. 
    </Typography>
    <Typography component="p">
      The Flashbots Dashboard is a collection of real time metrics on the Flashbots network that goes back to the first pre-release test bundle mined on-chain on December 29, 2021. In this document we cover several key definitions used for these metrics, explain how the data used in the dashboard is collected, and offer some caveats for our metrics.
    </Typography>
    <Typography component="p">
      Flashbots’ dashboard only reflects activity on the Flashbots network. If you are interested in metrics related to the broader Ethereum network and MEV, please refer to <a rel="noopener noreferrer" target="_blank" href="https://explore.flashbots.net/">MEV-Explore</a>.
    </Typography>
    <Typography component="p">
      <b>
        Key information:
      </b>
      <ul>
        <li>
          This is release v0 of the Flashbots Dashboard. Our goal is to provide transparency and insights on the Flashbots network for the users of Flashbots and the general community.
        </li>
        <li>
          Flashbots Dashboard displays a range of summary statistics on the usage of Flashbots Network, and metrics pertaining to the two types of direct users of Flashbots network: searchers and miners. 
        </li>
        <li>
          For profitability metrics we only quantify miner profits today. We are currently developing methods to quantify searcher profits accurately.
        </li>
        <li>
          Flashbots Dashboard only provides metrics related to activities on Flashbots Network. For quantification of MEV extraction activities on the broader Ethereum network, please refer to MEV Explore v0 Dashboard: <a rel="noopener noreferrer" target="_blank" href="https://explore.flashbots.net/">explore.flashbots.net</a>.
        </li>
        <li>
          Flashbots Dashboard has two sources of data: mined bundles data covering Flashbots bundles that landed on-chain (coverage begins with <a rel="noopener noreferrer" target="_blank" href="https://etherscan.io/block/11550019">block 11550019</a> mined on December 29th, 2020, which is the first canonical block with a Flashbots bundle included), and relay data covering all bundles searchers have sent to MEV-Relay (coverage begins with <a rel="noopener noreferrer" target="_blank" href="https://etherscan.io/block/11833997">block 11833997</a> mined on Feb 11th, 2021, which is we updated MEV-Relay was updated to capture more metrics).
        </li>
      </ul>    
    </Typography>
    <Typography component="p">
      <b>
        Definitions <br/>
        Network page
      </b>
      <ul>
        <li>
          <b>Maximum Extractable Value (MEV):</b> formerly named Miner Extractable Value, is a measure of the total value that can be extracted permissionlessly (i.e. without any special rights) from transaction ordering.
        </li>
        <li>
          <b>Realized Extractable Value (REV):</b> a subset of MEV which is the actual value extracted. Note that miners and searchers will both realize some amount of MEV. Furthermore, there are costs to extracting MEV that must be taken into account (e.g. gas costs). A framework expanding on REV can be found <a rel="noopener noreferrer" target="_blank" href="https://hackmd.io/IGlkjRDrTmSJf_MM_f2Bcg">here</a>.
        </li>
        <li>
          <b>Bundles:</b> Flashbots Core introduces a new eth_sendBundle RPC which standardizes format of messages in the communication channel between searchers and miners. This message is called a "Flashbots Bundle,” and bundles are one or more transactions sent by a Flashbots searcher that are bundled together and executed in the order they are specified. A bundle can contain pending transactions from the public mempool. Bundles are sent to Flashbots’ relay and then forwarded to miners if they contain no errors. An example bundle can be found <a rel="noopener noreferrer" target="_blank" href="https://github.com/flashbots/ethers-provider-flashbots-bundle#example">here</a>.
        </li>
        <li>
          <b>Relay:</b> A gateway that Flashbots operates that sits between searchers and miners. The relay simulates bundles before forwarding them to miners if they contain no errors. Today the relay is necessary to prevent spam attacks against miners, but Flashbots is actively doing research on how to remove the need for a trusted relay. More information can be found <a rel="noopener noreferrer" target="_blank"  href="https://github.com/flashbots/mev-relay-js">here</a>.
        </li>
      </ul>
    </Typography>
    <Typography component="p">
      <b>
        Searcher page
      </b>
      <ul>
        <li>
          <b>EOAs:</b> An externally owned account that is sending transactions on the Flashbots network. Some bundles may contain multiple transactions. In this case we take the EOA of the last transaction in a bundle. Typically the last transaction in a bundle contains payment to the miner after the user’s trade has been executed and thus is the most likely candidate for which EOA originated the bundle, although this may not always be the case.
        </li>
        <li>
          <b>Contracts:</b> An address that is being interacted with by a transaction from an EOA. In almost all cases these are bespoke smart contracts created by searchers, but they could be any contract, e.g. an EOA interacting directly with the Uniswap Router. There are also a small number of transactions from EOAs to themselves or other EOAs which are misclassified as transactions to contracts.
          <br/><br/>
          For bundles with multiple transactions we take the contract of the last transaction in a bundle to be the contract. Typically the last transaction in a bundle contains payment to the miner after the user’s trade has been executed and thus is the most likely candidate for which EOA originated the bundle, although this may not always be the case.
        </li>
        <li>
          <b>Searchers in the relay:</b> Searchers in the relay are searchers that we identify with the unique signing key that they used to sign bundles sent to the relay. Each unique signing key counts towards a unique searcher. This may provide an overestimate of the number of unique searchers there are given how easily signing keys can be generated. More information on the signing key can be found <a rel="noopener noreferrer" target="_blank" href="https://github.com/flashbots/mev-relay-js">here</a>.
        </li>
      </ul>
    </Typography>
    <Typography component="p">
      <b>
        Miner page
      </b>
      <ul>
        <li>
          <b>Hashrate adoption:</b> Hashrate adoption represents the Ethereum hashrate accounted for by mining pools running MEV-Geth and receiving Flashbots transaction bundles.
        </li>
        <li>
          <b>Miner profit:</b> Miner profit is measured by Miner Realized Extracted Value, which is a subset of maximal extractable value (“MEV”). Specifically it is the portion of MEV that the miner is paid minus  the opportunity cost of extracting that MEV. The formula for this is (miner_payment - tail_gas_price * bundle_gas_consumed). In other words, it is the miner’s payment for including a bundle minus the gas cost of transactions they displaced. Flashbots is designed such that miners should only ever include a bundle in a block if it is profitable for them to do so.
          <br/><br/>
          Where USD values are shown that takes into account the USD value of ETH at the time of a transaction by looking at the average price of ETH on ETH/USDC, ETH/USDT, and ETH/DAI markets on Uniswap v2.
        </li>
        <li>
          <b>Tail gas price:</b> the gas price of the least profitable transaction in a block. For example the tail gas price of <a rel="noopener noreferrer" target="_blank" href="https://etherscan.io/txs?block=12343885">block 12343885</a> was 59 gwei. In order for a bundle to be included it must have beaten this gas price.
        </li>
        <li>
          <b>Increase in miner revenue:</b> Increase in miner revenue is computed using the following formula (miner profit - block_tail_gas_price * bundle_gas_consumed)/(block_tail_gas_price * block_gas_consumption + block_reward). Put another way, it measures the increase in miner revenue attributable to Flashbots divided by gas fees plus the normal block reward.
        </li>
      </ul>
    </Typography>
    <Typography component="p">
      <b>
        Data coverage:
      </b>
      <ul>
        <li>
          <b>
            Data range:
          </b>
          <ul>
            <li>
              Our <b>mined bundles</b> bundles database begins with <a rel="noopener noreferrer" target="_blank" href="https://etherscan.io/block/11550019">block 11550019</a> which occurred on December 29th during our pre-alpha. Flashbots Alpha was released on January 6th, and prior to that the only bundles mined were test bundles.
            </li>
            <li>
              Our <b>relay bundles</b> database begins with <a rel="noopener noreferrer" target="_blank" href="https://etherscan.io/block/11833997">block 11833997</a> which occurred on February 11th. We started to collect more data on bundles after that block.
            </li>
          </ul>
        </li>
        <li>
          <b>
            Data sources:
          </b>
          <ul>
            <li>
              <b>Mined bundles:</b> a database of Flashbots bundles that have been mined. 
            </li>
            <li>
              <b>Relay bundles:</b> a database of Flashbots bundles that have been sent to the relay. We have strict policies governing who can access this data internally.
            </li>
            <li>
              <b>Block data:</b> a database of block information gathered from a node Flashbots runs. In particular this is where we record the tail gas price of blocks as well as the price of ETH in USD at the time of a block.
            </li>
          </ul>
        </li>
        <li>
          <b>Data reproducibility:</b> aside from the <b>relay bundles</b> dataset all other data can be reproduced through on-chain Ethereum data. Further, <a rel="noopener noreferrer" target="_blank" href="https://blocks.flashbots.net/">our public API</a> can be used to help identify and get data on Flashbots blocks.
        </li>
      </ul>
    </Typography>
    <Typography component="p">
      <b>
        Caveats
      </b>
      <ul>
        <li>
          <b>Only data related to Flashbots is covered:</b> these statistics shouldn't be taken as representative of the Ethereum network overall.  
        </li>
        <li>
          <b>Flashbots hashrate adoption is not the hashrate running MEV-geth:</b> it is difficult to tell how much hashrate miners use to mine Flashbots blocks at any given time. A reasonable estimate of this is the % of blocks in the last 10,000 blocks that have Flashbots bundles included.
        </li>
        <li>
          <b>We have little visibility into how profitable searcher’s transactions are:</b> determining how much profit searchers made in their bundles with little to no errors in a scalable way is a difficult problem. We are working on tuning MEV-Inspect to cover most bundles, but currently have little visibility into searcher’s profitability.
        </li>
        <li>
          <b>Searchers in the relay is a rough estimate of the number of unique users:</b> <i>searchers in the relay</i> uses the number of distinct signing keys we see to estimate the number of unique users. Given how easy it is to create a new unique signing key, and the incentives to do so, searchers may use several signing keys. This would mean we are counting some searchers multiple times and that would bias the number of unique users upwards.
          <br/><br/>
          On the other hand there may be searchers in the relay who are submitting bundles but have not yet landed them on-chain. As a result, there would be no EOA or contract for us to count these searchers with. Searchers in the relay thus may reflect some amount of searchers that are using Flashbots but have yet to land bundles. 
        </li>
        <li>
          <b>Unique number of EOAs likely overcounts the number of unique users:</b> searchers sometimes use multiple EOAs to interact with the same contract, and this metric overestimates the number of unique users.
        </li>
        <li>
          <b>Unique number of contracts likely undercounts the number of unique users:</b> searchers sometimes interact directly with DeFi protocols in their bundles. Two unique users interacting with the same contract would be counted as one unique user. As such this metric underestimates the number of unique users.
          <br/><br/>
          We suggest using searchers in the relay, unique number of EOAs, and unique number of contracts together to try to gauge user activity on Flashbots.
        </li>
        <li>
          <b>Occasionally bundles sent to miners that are not a part of Flashbots are recorded as Flashbots bundles:</b> while this is only a small subset of bundles there are some bundles which are misclassified as Flashbots bundles. The reason for this is that some alternative MEV relays have adopted MEV-geth and the same format for bundles that Flashbots uses. A number of searchers send the same bundles to Flashbots and those alternative relays. As a result we misclassify a small number of bundles.
        </li>
      </ul>
    </Typography>
    <Typography component="p">
      <b>
        Next steps
      </b>
      <ul>
        <li>
          <b>Searcher profitability metrics:</b> we currently do not quantify how profitable specific Flashbots bundles or searchers in general are. This is a highly demanded metric that we are working on releasing as soon as possible.
        </li>
        <li>
          <b>Searcher strategy metrics:</b> similarly, we do not detect what kinds of strategies searchers are pursuing, e.g. is a given bundle a liquidation or an arbitrage. Our next step after initial searcher profit analysis is to develop heuristics to identify searcher strategies in bundles.
        </li>
        <li>
           <b>Flashbots network impact metrics:</b> we plan to research and develop metrics to help better understand the effect that Flashbots has on the overall Ethereum network. 
        </li>
        <li>
          <b>Relay bundle submission latency metrics:</b> to provide searchers more real time insights into the health of the Flashbots relay we plan to develop metrics that help searchers better understand aggregate latency between bundle submission, simulation, and forwarding.
        </li>
      </ul>
    </Typography>
    </article>)
}

export default DataMetricsPage