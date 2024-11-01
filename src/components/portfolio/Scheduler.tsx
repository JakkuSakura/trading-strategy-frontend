import {Accessor, createEffect, createSignal, Setter} from "solid-js";
import {interval, useTimer} from "~/utils/timer";
import {ClientType, useClient} from "~/utils/client";
import {ColumnDef} from "@tanstack/solid-table";
import {Table} from "~/components/Table";

type BasisRow = [string, string, number]
type BasisPreview = BasisRow[]
const pollSchedulerPreview = async (client: ClientType, setPreview: Setter<BasisEntry[]>, preview: boolean) => {
    const {data} = await client.GET("/schedule", {
        params: {}
    })
    const rows: BasisEntry[] = []
    for (const row of data as unknown as BasisPreview) {
        rows.push({
            long: row[0],
            short: row[1],
            basis: row[2].toFixed(6),
        })
    }
    setPreview(rows)
}

export type BasisEntry = {
    long: string
    short: string
    basis: string
}


const defaultColumns: ColumnDef<BasisEntry>[] = [
    {
        accessorKey: 'long',
    },
    {
        accessorKey: 'short'
    },
    {
        accessorKey: 'basis'
    }
]


export const SchedulerPreview = (props: {}) => {
    const client = useClient()
    const [preview, setPreview] = createSignal<BasisEntry[]>([])
    const timer = useTimer({interval})
    createEffect(() => {
        timer()
        void (pollSchedulerPreview(client, setPreview, true))
    })
    return (
        <div>
            <h2>Scheduler Preview</h2>
            <Table columns={defaultColumns} data={preview()}/>
        </div>
    )
}