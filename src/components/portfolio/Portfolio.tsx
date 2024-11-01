import {ClientType, useClient} from "~/utils/client";
import {createEffect, createSignal, Setter} from "solid-js";
import {PositionTable, PortfolioLegEntry} from "~/components/portfolio/PositionTable";
import {interval, useTimer} from "~/utils/timer";


const pollUpdatePosition = async (client: ClientType, setPortfolioTable: Setter<PortfolioLegEntry[]>) => {
    const {data} = await client.GET("/position", {
        params: {}
    })
    const rows: PortfolioLegEntry[] = []
    // data is like: account -> portfolio -> instrument -> position
    for (const [account, portfolio] of Object.entries(data!.portfolios)) {
        for (const position of Object.values(portfolio.positions)) {
            rows.push({
                account: position.account || account,
                instrument: position.instrument,
                total: position.total,
                available: position.available,
                locked: position.locked,
            })

        }
    }
    // sort by account, then instrument
    rows.sort((a, b) => {
        return a.account.localeCompare(b.account) || a.instrument.localeCompare(b.instrument)
    })
    // console.debug('Portfolio rows', rows)
    setPortfolioTable(rows)
}

export const Portfolio = (props: {}) => {
    const client = useClient()
    const timer = useTimer({interval})
    const [portfolio, setPortfolio] = createSignal<PortfolioLegEntry[]>([]);
    createEffect(() => {
        timer()
        void (pollUpdatePosition(client, setPortfolio))
    })
    return (
        <div>
            <h2>Portfolio</h2>
            <PositionTable data={portfolio()}/>
        </div>
    )
}