import {ClientType, useClient} from "~/utils/client";
import {interval, useTimer} from "~/utils/timer";
import {Accessor, createEffect, createSignal, Setter} from "solid-js";
import {PortfolioLegConfig, PortfolioLegConfigsProps, LegTable} from "~/components/portfolio/LegTable";


const pollUpdateLegs = async (client: ClientType, setPortfolio: Setter<PortfolioLegConfig[]>, preview: boolean) => {
    const url = preview ? "/leg/preview" : "/leg"
    const {data} = await client.GET(url, {
        params: {}
    })
    const rows: PortfolioLegConfig[] = []

    for (const leg of data!) {
        rows.push(leg as unknown as PortfolioLegConfig)
    }
    // sort by account, then instrument
    rows.sort((a, b) => {
        return a.account.localeCompare(b.account) || a.instrument.localeCompare(b.instrument)
    })
    // console.debug('Portfolio rows', rows)
    setPortfolio(rows)
}

export const Legs = (props: { preview: boolean }) => {
    const client = useClient()
    const timer = useTimer({interval})
    const [legs, setLegs] = createSignal<PortfolioLegConfig[]>([]);

    createEffect(() => {
        timer()
        void (pollUpdateLegs(client, setLegs, props.preview))
    })
    const preview = props.preview ? "Preview" : ""
    return (
        <div>
            <h2>Legs {preview}</h2>
            <LegTable data={legs()}/>
        </div>
    )
}
export const useExampleLeg = (): Accessor<PortfolioLegConfig> => {
    const client = useClient()
    const timer = useTimer({interval})
    const [exampleLeg, setExampleLeg] = createSignal<PortfolioLegConfig>({} as PortfolioLegConfig)

    createEffect(() => {
        timer();
        (async () => {
            const exampleLeg = await client.GET("/leg/example", {
                params: {}
            })
            setExampleLeg(exampleLeg.data!)
        })()
    })
    return exampleLeg
}
export const LegExample = (props: {}) => {
    const exampleLeg = useExampleLeg()
    return (
        <div>
            <h2>Leg Example</h2>
            <div>
                <pre style={{
                    "text-align": "left"
                }}>
                    {JSON.stringify(exampleLeg(), null, 2)}
                </pre>
            </div>
        </div>
    )
}