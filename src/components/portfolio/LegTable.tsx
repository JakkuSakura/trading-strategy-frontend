import {ColumnDef} from "@tanstack/solid-table";
import {Accessor} from "solid-js";
import {components} from "~/lib/schema";
import {Table} from "~/components/Table";

export type PortfolioLegConfig = components["schemas"]["TargetLegConfig"]
export type PortfolioLegConfigsProps = {
    data: PortfolioLegConfig[]
}

const defaultColumns: ColumnDef<PortfolioLegConfig>[] = [
    {
        accessorKey: 'account',
    },
    {
        accessorKey: 'instrument'
    },
    {
        accessorKey: 'target_position'
    }
]

export const LegTable = (props: PortfolioLegConfigsProps) => {
    return (
        <div>
            <Table columns={defaultColumns} data={props.data}/>
        </div>
    )
}
