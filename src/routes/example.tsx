import {PortfolioLegEntry, PositionTable} from "~/components/portfolio/PositionTable";

const fake_data: PortfolioLegEntry[] = [
    {
        account: 'account1',
        instrument: 'instrument1',
        total: 1,
        available: 2,
        locked: 3,
    },
    {
        account: 'account2',
        instrument: 'instrument2',
        total: 4,
        available: 5,
        locked: 6,
    },
    {
        account: 'account3',
        instrument: 'instrument3',
        total: 7,
        available: 8,
        locked: 9,
    }
]
export default function () {
    return (
        <main>
            <PositionTable data={fake_data}/>
        </main>
    );
}
