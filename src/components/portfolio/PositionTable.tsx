import {ColumnDef} from "@tanstack/solid-table";
import {Accessor} from "solid-js";
import {Table} from "~/components/Table";

export type PortfolioLegEntry = {
    account: string
    instrument: string
    total: number
    available: number
    locked: number
}
export type PositionTableProps = {
    data: PortfolioLegEntry[]
}

const defaultColumns: ColumnDef<PortfolioLegEntry>[] = [
    {
        id: 'account',
        accessorKey: 'account',
    },
    {
        id: 'instrument',
        accessorKey: 'instrument'
    },
    {
        id: 'total',
        accessorKey: 'total'
    },
    {
        id: 'available',
        accessorKey: 'available'
    },
    {
        id: 'locked',
        accessorKey: 'locked'
    }
]

export const PositionTable = (props: PositionTableProps) => {
    return (
        <div>
            <Table columns={defaultColumns} data={props.data}/>
        </div>
    )
}
